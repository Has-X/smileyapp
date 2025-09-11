// Enhanced Journal State Management
// Handles journal form state preservation and auto-save functionality

interface JournalEntry {
  id: string;
  title: string;
  content: string;
  mood: string;
  privacy: string;
  date: string;
  timestamp: number;
  tags?: string[];
  location?: string;
}

interface JournalDraft {
  title: string;
  content: string;
  mood: string;
  privacy: string;
  lastSaved: number;
}

class JournalStateManager {
  private readonly STORAGE_KEY = 'smile-journal-entries';
  private readonly DRAFT_KEY = 'smile-journal-draft';
  private readonly AUTO_SAVE_INTERVAL = 30000; // 30 seconds
  private autoSaveTimer: number | null = null;
  private entries: JournalEntry[] = [];

  constructor() {
    this.loadEntries();
    this.setupFormAutoSave();
    this.setupPageVisibilityHandling();
  }

  private loadEntries() {
    try {
      const saved = localStorage.getItem(this.STORAGE_KEY);
      if (saved) {
        this.entries = JSON.parse(saved);
      }
    } catch (error) {
      console.warn('Failed to load journal entries:', error);
      this.entries = [];
    }
  }

  private saveEntries() {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.entries));
    } catch (error) {
      console.warn('Failed to save journal entries:', error);
    }
  }

  private setupFormAutoSave() {
    // Monitor journal form inputs for changes
    const observeFormChanges = () => {
      const formInputs = document.querySelectorAll('.journal-form input, .journal-form textarea, .journal-form select');
      
      formInputs.forEach(input => {
        input.addEventListener('input', () => {
          this.scheduleAutoSave();
        });
      });
    };

    // Set up observer for dynamically added forms
    const observer = new MutationObserver((mutations) => {
      mutations.forEach(mutation => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach(node => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              const element = node as Element;
              if (element.classList.contains('journal-form') || element.querySelector('.journal-form')) {
                observeFormChanges();
              }
            }
          });
        }
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    // Initial setup
    observeFormChanges();
  }

  private setupPageVisibilityHandling() {
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        this.saveDraft();
      }
    });

    window.addEventListener('beforeunload', () => {
      this.saveDraft();
    });
  }

  private scheduleAutoSave() {
    if (this.autoSaveTimer) {
      clearTimeout(this.autoSaveTimer);
    }

    this.autoSaveTimer = window.setTimeout(() => {
      this.saveDraft();
    }, this.AUTO_SAVE_INTERVAL);
  }

  public saveDraft() {
    const form = document.querySelector('.journal-form') as HTMLFormElement;
    if (!form) return;

    const formData = new FormData(form);
    const draft: JournalDraft = {
      title: formData.get('title') as string || '',
      content: formData.get('content') as string || '',
      mood: formData.get('mood') as string || '',
      privacy: formData.get('privacy') as string || 'private',
      lastSaved: Date.now()
    };

    // Only save if there's actual content
    if (draft.title.trim() || draft.content.trim()) {
      try {
        localStorage.setItem(this.DRAFT_KEY, JSON.stringify(draft));
        this.showAutoSaveIndicator();
      } catch (error) {
        console.warn('Failed to save journal draft:', error);
      }
    }
  }

  public loadDraft(): JournalDraft | null {
    try {
      const saved = localStorage.getItem(this.DRAFT_KEY);
      if (saved) {
        const draft = JSON.parse(saved);
        // Check if draft is not too old (24 hours)
        if (Date.now() - draft.lastSaved < 24 * 60 * 60 * 1000) {
          return draft;
        }
      }
    } catch (error) {
      console.warn('Failed to load journal draft:', error);
    }
    return null;
  }

  public clearDraft() {
    localStorage.removeItem(this.DRAFT_KEY);
  }

  public saveEntry(entry: Omit<JournalEntry, 'id' | 'timestamp'>): JournalEntry {
    const newEntry: JournalEntry = {
      ...entry,
      id: `entry_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: Date.now()
    };

    this.entries.unshift(newEntry); // Add to beginning
    this.saveEntries();
    this.clearDraft(); // Clear draft after successful save

    // Update state manager
    const stateManager = (window as any).stateManager;
    if (stateManager) {
      stateManager.addJournalEntry(newEntry);
    }

    return newEntry;
  }

  public updateEntry(id: string, updates: Partial<JournalEntry>): boolean {
    const index = this.entries.findIndex(entry => entry.id === id);
    if (index !== -1) {
      this.entries[index] = { ...this.entries[index], ...updates };
      this.saveEntries();

      // Update state manager
      const stateManager = (window as any).stateManager;
      if (stateManager) {
        stateManager.updateJournalEntries(this.entries);
      }

      return true;
    }
    return false;
  }

  public deleteEntry(id: string): boolean {
    const index = this.entries.findIndex(entry => entry.id === id);
    if (index !== -1) {
      this.entries.splice(index, 1);
      this.saveEntries();

      // Update state manager
      const stateManager = (window as any).stateManager;
      if (stateManager) {
        stateManager.updateJournalEntries(this.entries);
      }

      return true;
    }
    return false;
  }

  public getEntry(id: string): JournalEntry | null {
    return this.entries.find(entry => entry.id === id) || null;
  }

  public getAllEntries(): JournalEntry[] {
    return [...this.entries];
  }

  public searchEntries(query: string): JournalEntry[] {
    const lowercaseQuery = query.toLowerCase();
    return this.entries.filter(entry =>
      entry.title.toLowerCase().includes(lowercaseQuery) ||
      entry.content.toLowerCase().includes(lowercaseQuery) ||
      (entry.tags && entry.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)))
    );
  }

  public getEntriesByMood(mood: string): JournalEntry[] {
    return this.entries.filter(entry => entry.mood === mood);
  }

  public getEntriesByDateRange(startDate: Date, endDate: Date): JournalEntry[] {
    const startTime = startDate.getTime();
    const endTime = endDate.getTime();
    return this.entries.filter(entry => 
      entry.timestamp >= startTime && entry.timestamp <= endTime
    );
  }

  public exportEntries(): string {
    return JSON.stringify(this.entries, null, 2);
  }

  public importEntries(entriesJson: string): boolean {
    try {
      const importedEntries = JSON.parse(entriesJson);
      if (Array.isArray(importedEntries)) {
        this.entries = [...this.entries, ...importedEntries];
        this.saveEntries();

        // Update state manager
        const stateManager = (window as any).stateManager;
        if (stateManager) {
          stateManager.updateJournalEntries(this.entries);
        }

        return true;
      }
    } catch (error) {
      console.error('Failed to import journal entries:', error);
    }
    return false;
  }

  private showAutoSaveIndicator() {
    // Show a subtle indicator that draft was saved
    const indicator = document.querySelector('.auto-save-indicator');
    if (indicator) {
      indicator.textContent = 'Draft saved';
      indicator.classList.add('visible');
      
      setTimeout(() => {
        indicator.classList.remove('visible');
      }, 2000);
    }
  }

  // Restore form data from draft
  public restoreFormFromDraft() {
    const draft = this.loadDraft();
    if (draft) {
      const form = document.querySelector('.journal-form') as HTMLFormElement;
      if (form) {
        const titleInput = form.querySelector('[name="title"]') as HTMLInputElement;
        const contentTextarea = form.querySelector('[name="content"]') as HTMLTextAreaElement;
        const moodSelect = form.querySelector('[name="mood"]') as HTMLSelectElement;
        const privacySelect = form.querySelector('[name="privacy"]') as HTMLSelectElement;

        if (titleInput) titleInput.value = draft.title;
        if (contentTextarea) contentTextarea.value = draft.content;
        if (moodSelect) moodSelect.value = draft.mood;
        if (privacySelect) privacySelect.value = draft.privacy;

        // Show restoration indicator
        const indicator = document.querySelector('.draft-restored-indicator');
        if (indicator) {
          indicator.classList.add('visible');
          setTimeout(() => {
            indicator.classList.remove('visible');
          }, 3000);
        }
      }
    }
  }
}

// Global instance
const journalStateManager = new JournalStateManager();

// Export for global access
(window as any).journalStateManager = journalStateManager;

export default journalStateManager;
