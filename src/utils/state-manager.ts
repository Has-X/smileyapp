// State Management System for Smiley PWA
// Handles URL routing, state persistence, and navigation between panels

interface AppState {
  currentPanel: string;
  currentView?: string;
  currentAction?: string;
  chatMessages: any[];
  journalEntries: any[];
  memories: any[];
  conversationHistory: any[];
  scrollPositions: Record<string, number>;
  formData: Record<string, any>;
  lastActivity: number;
  sessionId: string;
}

interface RouteParams {
  panel?: string;
  view?: string;
  action?: string;
  id?: string;
}

class StateManager {
  private state: AppState;
  private listeners: Set<(state: AppState) => void> = new Set();
  private saveTimeout: number | null = null;
  private readonly STORAGE_KEY = 'smile-app-state';
  private readonly DEBOUNCE_MS = 500;

  constructor() {
    this.state = this.getInitialState();
    this.initializeFromURL();
    this.setupEventListeners();
    this.startPeriodicSave();
  }

  private getInitialState(): AppState {
    const saved = this.loadFromStorage();
    return {
      currentPanel: 'chat',
      currentView: 'default',
      currentAction: undefined,
      chatMessages: [],
      journalEntries: [],
      memories: [],
      conversationHistory: [],
      scrollPositions: {},
      formData: {},
      lastActivity: Date.now(),
      sessionId: this.generateSessionId(),
      ...saved
    };
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
  }

  private initializeFromURL() {
    const params = this.parseURL();
    if (params.panel) {
      this.state.currentPanel = params.panel;
    }
    if (params.view) {
      this.state.currentView = params.view;
    }
    if (params.action) {
      this.state.currentAction = params.action;
    }
    this.updateURL(false); // Update URL without triggering navigation
  }

  private parseURL(): RouteParams {
    const url = new URL(window.location.href);
    const params: RouteParams = {};
    
    params.panel = url.searchParams.get('panel') || undefined;
    params.view = url.searchParams.get('view') || undefined;
    params.action = url.searchParams.get('action') || undefined;
    params.id = url.searchParams.get('id') || undefined;
    
    return params;
  }

  private setupEventListeners() {
    // Handle browser back/forward
    window.addEventListener('popstate', () => {
      this.initializeFromURL();
      this.notifyListeners();
    });

    // Handle visibility changes to save state
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        this.saveToStorage();
      }
    });

    // Handle beforeunload to save state
    window.addEventListener('beforeunload', () => {
      this.saveToStorage();
    });

    // Track user activity
    ['click', 'keydown', 'scroll', 'touchstart'].forEach(event => {
      document.addEventListener(event, () => this.updateActivity(), { passive: true });
    });

    // Handle storage lock/unlock events to preserve routing
    window.addEventListener('smile:storage-locked', () => {
      // Save current state before lock
      this.saveToStorage();
    });

    window.addEventListener('smile:storage-unlocked', () => {
      // Restore state after unlock without changing current route
      this.loadFromStorage();
      this.notifyListeners();
    });

    // Preserve state when unlock is required
    window.addEventListener('smile:storage-unlock-required', () => {
      // Force save current state to session storage as backup
      this.saveToSessionStorage();
    });
  }

  private updateActivity() {
    this.state.lastActivity = Date.now();
    this.debouncedSave();
  }

  private debouncedSave() {
    if (this.saveTimeout) {
      clearTimeout(this.saveTimeout);
    }
    this.saveTimeout = window.setTimeout(() => {
      this.saveToStorage();
    }, this.DEBOUNCE_MS);
  }

  private startPeriodicSave() {
    setInterval(() => {
      this.saveToStorage();
    }, 30000); // Save every 30 seconds
  }

  private saveToStorage() {
    try {
      const stateToSave = {
        ...this.state,
        timestamp: Date.now()
      };
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(stateToSave));
    } catch (error) {
      console.warn('Failed to save state to localStorage:', error);
    }
  }

  private saveToSessionStorage() {
    try {
      // Save critical routing state to session storage as backup
      const criticalState = {
        currentPanel: this.state.currentPanel,
        currentView: this.state.currentView,
        currentAction: this.state.currentAction,
        scrollPositions: this.state.scrollPositions,
        timestamp: Date.now()
      };
      sessionStorage.setItem('smile-routing-backup', JSON.stringify(criticalState));
    } catch (error) {
      console.warn('Failed to save routing backup to sessionStorage:', error);
    }
  }

  private loadFromStorage(): Partial<AppState> {
    try {
      const saved = localStorage.getItem(this.STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Check if state is not too old (7 days)
        if (parsed.timestamp && Date.now() - parsed.timestamp < 7 * 24 * 60 * 60 * 1000) {
          delete parsed.timestamp;
          return parsed;
        }
      }

      // Fallback to session storage backup for routing
      const backup = sessionStorage.getItem('smile-routing-backup');
      if (backup) {
        const parsedBackup = JSON.parse(backup);
        // Only use recent backups (within last hour)
        if (parsedBackup.timestamp && Date.now() - parsedBackup.timestamp < 60 * 60 * 1000) {
          delete parsedBackup.timestamp;
          return parsedBackup;
        }
      }
    } catch (error) {
      console.warn('Failed to load state from storage:', error);
    }
    return {};
  }

  private updateURL(pushState = true) {
    const url = new URL(window.location.href);
    
    // Clear existing params
    url.searchParams.delete('panel');
    url.searchParams.delete('view'); 
    url.searchParams.delete('action');
    url.searchParams.delete('id');

    // Set current params
    if (this.state.currentPanel && this.state.currentPanel !== 'chat') {
      url.searchParams.set('panel', this.state.currentPanel);
    }
    if (this.state.currentView && this.state.currentView !== 'default') {
      url.searchParams.set('view', this.state.currentView);
    }
    if (this.state.currentAction) {
      url.searchParams.set('action', this.state.currentAction);
    }

    const newURL = url.toString();
    
    if (pushState && newURL !== window.location.href) {
      history.pushState(this.state, '', newURL);
    }
  }

  private notifyListeners() {
    this.listeners.forEach(listener => {
      try {
        listener(this.state);
      } catch (error) {
        console.error('State listener error:', error);
      }
    });
  }

  private setState(newState: Partial<AppState>, updateURL = true) {
    this.state = { ...this.state, ...newState };
    this.state.lastActivity = Date.now();
    
    if (updateURL) {
      this.updateURL();
    }
    
    this.debouncedSave();
  }

  // Public API
  public getState(): AppState {
    return { ...this.state };
  }

  public navigateToPanel(panel: string, view = 'default', action?: string) {
    // Save current scroll position
    this.saveScrollPosition();
    
    this.setState({
      currentPanel: panel,
      currentView: view,
      currentAction: action
    });
    
    this.notifyListeners();
    
    // Restore scroll position after navigation
    requestAnimationFrame(() => {
      this.restoreScrollPosition();
    });
  }

  public setView(view: string) {
    this.setState({ currentView: view });
    this.notifyListeners();
  }

  public setAction(action: string | null) {
    this.setState({ currentAction: action || undefined });
    this.notifyListeners();
  }

  public updateChatMessages(messages: any[]) {
    this.setState({ chatMessages: [...messages] });
  }

  public addChatMessage(message: any) {
    this.setState({ 
      chatMessages: [...this.state.chatMessages, message] 
    });
  }

  public updateJournalEntries(entries: any[]) {
    this.setState({ journalEntries: [...entries] });
  }

  public addJournalEntry(entry: any) {
    this.setState({
      journalEntries: [...this.state.journalEntries, entry]
    });
  }

  public updateMemories(memories: any[]) {
    this.setState({ memories: [...memories] });
  }

  public updateConversationHistory(history: any[]) {
    this.setState({ conversationHistory: [...history] });
  }

  public saveFormData(formId: string, data: any) {
    this.setState({
      formData: {
        ...this.state.formData,
        [formId]: data
      }
    });
  }

  public getFormData(formId: string): any {
    return this.state.formData[formId] || {};
  }

  public clearFormData(formId: string) {
    const newFormData = { ...this.state.formData };
    delete newFormData[formId];
    this.setState({ formData: newFormData });
  }

  public saveScrollPosition() {
    const key = `${this.state.currentPanel}-${this.state.currentView}`;
    this.state.scrollPositions[key] = window.scrollY;
  }

  public restoreScrollPosition() {
    const key = `${this.state.currentPanel}-${this.state.currentView}`;
    const position = this.state.scrollPositions[key] || 0;
    window.scrollTo(0, position);
  }

  public subscribe(listener: (state: AppState) => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  public clearState() {
    localStorage.removeItem(this.STORAGE_KEY);
    this.state = this.getInitialState();
    this.updateURL();
    this.notifyListeners();
  }

  public exportState(): string {
    return JSON.stringify(this.state, null, 2);
  }

  public importState(stateJson: string): boolean {
    try {
      const importedState = JSON.parse(stateJson);
      this.setState(importedState);
      this.notifyListeners();
      return true;
    } catch (error) {
      console.error('Failed to import state:', error);
      return false;
    }
  }

  // Panel-specific shortcuts
  public navigateToChat() {
    this.navigateToPanel('chat');
  }

  public navigateToJournal(action?: string) {
    this.navigateToPanel('journal', 'default', action);
  }

  public navigateToMemories(view = 'default') {
    this.navigateToPanel('memories', view);
  }

  public navigateToExercises() {
    this.navigateToPanel('exercises');
  }

  public navigateToHistory() {
    this.navigateToPanel('history');
  }

  public navigateToProfile() {
    this.navigateToPanel('profile');
  }

  public navigateToSettings() {
    this.navigateToPanel('settings');
  }
}

// Global state manager instance
const stateManager = new StateManager();

// Export for global access
(window as any).stateManager = stateManager;

export default stateManager;
