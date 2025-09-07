// app.ts - Main application controller

class SmileApp {
  private models: string[] = [];
  private selectedModel: string = '';
  private isOnboardingComplete: boolean = false;

  constructor() {
    this.init();
  }

  private async init() {
    // Initialize theme
    this.initTheme();
    
    // Load user preferences
    await this.loadPreferences();
    
    // Check if onboarding is complete
    this.isOnboardingComplete = localStorage.getItem('smile-onboarding') === 'complete';
    
    // Setup event listeners
    this.setupEventListeners();
    
    // Initialize ambient background interactions
    this.initAmbientBackground();
    
    // Load models
    await this.loadModels();
    
    // Show onboarding if needed
    if (!this.isOnboardingComplete) {
      this.showOnboarding();
    }

    // Initialize panels
    this.switchPanel('chat');
  }

  private initTheme() {
    // Initialize theme system with separated mode and accent color
    // Default to light on first run to avoid surprising dark takeover during onboarding
    const savedMode = localStorage.getItem('smile-theme-mode') || 'light';
    const savedAccent = localStorage.getItem('smile-accent-color') || 'smile';

    // Apply initial theme name
    this.setTheme(this.resolveThemeName(savedMode, savedAccent));

    // Listen for system theme changes (when mode is auto)
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      const currentMode = localStorage.getItem('smile-theme-mode');
      if (currentMode === 'auto') {
        const accentColor = localStorage.getItem('smile-accent-color') || 'smile';
        const nextMode = e.matches ? 'dark' : 'light';
        this.setTheme(this.resolveThemeName(nextMode, accentColor));
      }
    });
  }

  private resolveThemeName(mode: string, accent: string): string {
    // Normalize inputs
    const normalizedMode = ['dark', 'light', 'auto'].includes(mode) ? mode : 'auto';
    const normalizedAccent = accent || 'smile';

    if (normalizedMode === 'dark') return `${normalizedAccent}-dark`;
    if (normalizedMode === 'auto') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      return prefersDark ? `${normalizedAccent}-dark` : normalizedAccent;
    }
    // light
    return normalizedAccent;
  }

  private setTheme(theme: string) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('smile-theme', theme);
    
    // Update theme select if it exists
    const themeSelect = document.getElementById('theme-select') as HTMLSelectElement;
    if (themeSelect) {
      themeSelect.value = theme;
    }
  }

  private async loadPreferences() {
    const savedModel = localStorage.getItem('smile-selected-model');
    if (savedModel) {
      this.selectedModel = savedModel;
    }

    const ttsEnabled = localStorage.getItem('smile-tts-enabled') === 'true';
    const ttsCheckbox = document.getElementById('tts-enabled') as HTMLInputElement;
    if (ttsCheckbox) {
      ttsCheckbox.checked = ttsEnabled;
    }
  }

  private setupEventListeners() {
  // Navigation buttons (only top-level sidebar buttons)
  const navButtons = document.querySelectorAll('.nav-button[data-panel]');
    
    navButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const target = e.currentTarget as HTMLElement;
        const panelId = target.getAttribute('data-panel');
        if (panelId) {
          this.switchPanel(panelId);
        }
      });
    });

    // Initialize view toggles
    this.initViewToggles();

    // Message input
    const messageInput = document.getElementById('message-input') as HTMLTextAreaElement;
    const sendBtn = document.getElementById('send-btn') as HTMLButtonElement;
    
    if (messageInput && sendBtn) {
      // Auto-resize textarea
      messageInput.addEventListener('input', () => {
        this.autoResizeTextarea(messageInput);
      });

      // Send on Enter (but not Shift+Enter)
      messageInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          this.sendMessage();
        }
      });

      sendBtn.addEventListener('click', () => {
        this.sendMessage();
      });
    }

    // Settings event listeners
    this.setupSettingsListeners();

    // Onboarding event listeners
    this.setupOnboardingListeners();

    // History search functionality
    this.initHistorySearch();
  }

  private setupSettingsListeners() {
    // Tab navigation
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(button => {
      button.addEventListener('click', () => {
        const tabId = button.getAttribute('data-tab');
        this.switchSettingsTab(tabId!);
      });
    });

    // Color theme selection
    const colorThemeCards = document.querySelectorAll('.color-theme-card');
    colorThemeCards.forEach(card => {
      card.addEventListener('click', () => {
        const theme = card.getAttribute('data-theme');
        if (theme) {
          this.setAccentColor(theme);
        }
      });
    });

    // Theme mode selection (light/dark/auto)
    const themeModeSelect = document.getElementById('theme-mode-select') as HTMLSelectElement;
    if (themeModeSelect) {
      const savedMode = localStorage.getItem('smile-theme-mode') || 'auto';
      themeModeSelect.value = savedMode;
      
      themeModeSelect.addEventListener('change', (e) => {
        const target = e.target as HTMLSelectElement;
        this.setThemeMode(target.value);
      });
    }

    // Model selection
    const modelSelect = document.getElementById('model-select') as HTMLSelectElement;
    if (modelSelect) {
      modelSelect.addEventListener('change', (e) => {
        const target = e.target as HTMLSelectElement;
        this.selectedModel = target.value;
        localStorage.setItem('smile-selected-model', this.selectedModel);
      });
    }

    // Response style selection
    const responseStyleSelect = document.getElementById('response-style') as HTMLSelectElement;
    if (responseStyleSelect) {
      const savedStyle = localStorage.getItem('smile-response-style') || 'supportive';
      responseStyleSelect.value = savedStyle;
      responseStyleSelect.addEventListener('change', (e) => {
        const target = e.target as HTMLSelectElement;
        localStorage.setItem('smile-response-style', target.value);
      });
    }

    // Theme selection (legacy - keeping for compatibility)
    const themeSelect = document.getElementById('theme-select') as HTMLSelectElement;
    if (themeSelect) {
      themeSelect.addEventListener('change', (e) => {
        const target = e.target as HTMLSelectElement;
        this.setTheme(target.value);
      });
    }

    // TTS toggle
    const ttsToggle = document.getElementById('tts-enabled') as HTMLInputElement;
    if (ttsToggle) {
      ttsToggle.addEventListener('change', (e) => {
        const target = e.target as HTMLInputElement;
        localStorage.setItem('smile-tts-enabled', target.checked.toString());
      });
    }

    // Clear data button
    const clearDataBtn = document.getElementById('clear-data-btn') as HTMLButtonElement;
    if (clearDataBtn) {
      clearDataBtn.addEventListener('click', () => {
        this.showClearDataModal();
      });
    }

    // Security Settings
    this.setupSecurityListeners();
  }

  private setupSecurityListeners() {
    // Encryption toggle
    const encryptionToggle = document.getElementById('encryption-enabled') as HTMLInputElement;
    if (encryptionToggle) {
      encryptionToggle.addEventListener('change', (e) => {
        const target = e.target as HTMLInputElement;
        this.toggleEncryption(target.checked);
      });
    }

    // Auto-lock select
    const autoLockSelect = document.getElementById('auto-lock-select') as HTMLSelectElement;
    if (autoLockSelect) {
      autoLockSelect.addEventListener('change', (e) => {
        const target = e.target as HTMLSelectElement;
        this.updateAutoLock(parseInt(target.value));
      });
    }

    // Set Password button
    const setPasswordBtn = document.getElementById('set-password-btn') as HTMLButtonElement;
    if (setPasswordBtn) {
      setPasswordBtn.addEventListener('click', () => {
        this.showPasswordModal();
      });
    }

    // Change Password button
    const changePasswordBtn = document.getElementById('change-password-btn') as HTMLButtonElement;
    if (changePasswordBtn) {
      changePasswordBtn.addEventListener('click', () => {
        this.showPasswordModal('change');
      });
    }

    // Test Unlock button
    const testUnlockBtn = document.getElementById('test-unlock-btn') as HTMLButtonElement;
    if (testUnlockBtn) {
      testUnlockBtn.addEventListener('click', () => {
        this.testUnlock();
      });
    }

    // Initialize security UI from current storage state
    import('./secure-storage.ts').then(module => {
      const storage = module.default.getInstance();
      const settings = storage.getSecuritySettings();
      if (encryptionToggle) encryptionToggle.checked = !!settings.encryptionEnabled;
      if (autoLockSelect) autoLockSelect.value = String(settings.autoLockInterval ?? 30);
      if (setPasswordBtn) setPasswordBtn.style.display = settings.encryptionEnabled ? 'none' : '';
      if (changePasswordBtn) changePasswordBtn.style.display = settings.encryptionEnabled ? '' : 'none';
      if (testUnlockBtn) testUnlockBtn.style.display = settings.encryptionEnabled ? '' : 'none';
    }).catch(() => {/* ignore */});
  }

  private setupOnboardingListeners() {
    // Theme selection in onboarding
    const themeCards = document.querySelectorAll('.theme-card');
    themeCards.forEach(card => {
      card.addEventListener('click', (e) => {
        const target = e.currentTarget as HTMLElement;
        const theme = target.getAttribute('data-theme');
        if (theme) {
          // Remove active class from all cards
          themeCards.forEach(c => c.classList.remove('theme-card-active'));
          // Add active class to clicked card
          target.classList.add('theme-card-active');
          // Persist accent and preview in light mode for clarity during onboarding
          this.setAccentColor(theme);
          this.setThemeMode('light');
        }
      });
    });

    // Complete onboarding
    const completeBtn = document.getElementById('onboarding-complete') as HTMLButtonElement;
    if (completeBtn) {
      completeBtn.addEventListener('click', () => {
        this.completeOnboarding();
      });
    }
  }

  private showOnboarding() {
    const modal = document.getElementById('onboarding-modal');
    if (modal) {
      // Show depending on modal system in use
      if (modal.classList.contains('confirm-modal')) {
        (window as any).modalManager?.show(modal);
      } else {
        // global-modal behavior
        (modal as HTMLElement).style.display = 'flex';
        setTimeout(() => modal.classList.add('show'), 10);
      }

      // Load models in onboarding select
      const onboardingModelSelect = document.getElementById('onboarding-model-select') as HTMLSelectElement;
      if (onboardingModelSelect && this.models.length > 0) {
        onboardingModelSelect.innerHTML = this.models.map(model => 
          `<option value="${model}">${model}</option>`
        ).join('');
        
        if (this.selectedModel) {
          onboardingModelSelect.value = this.selectedModel;
        } else if (this.models.length > 0) {
          onboardingModelSelect.value = this.models[0];
          this.selectedModel = this.models[0];
        }
      } else if (onboardingModelSelect) {
        // Show placeholder for no models
        onboardingModelSelect.innerHTML = '<option>No models available - Install Ollama first</option>';
      }
    }
  }

  private completeOnboarding() {
    // Save onboarding model selection
    const onboardingModelSelect = document.getElementById('onboarding-model-select') as HTMLSelectElement;
    if (onboardingModelSelect) {
      this.selectedModel = onboardingModelSelect.value;
      localStorage.setItem('smile-selected-model', this.selectedModel);
    }

    // Save TTS preference
    const onboardingTts = document.getElementById('onboarding-tts') as HTMLInputElement;
    if (onboardingTts) {
      localStorage.setItem('smile-tts-enabled', onboardingTts.checked.toString());
    }

    // Mark onboarding as complete
    localStorage.setItem('smile-onboarding', 'complete');
    this.isOnboardingComplete = true;

    // Hide modal with animation via modal manager
    const modal = document.getElementById('onboarding-modal');
    if (modal) {
      if (modal.classList.contains('confirm-modal')) {
        (window as any).modalManager?.hide(modal);
      } else {
        modal.classList.remove('show');
        setTimeout(() => {
          (modal as HTMLElement).style.display = 'none';
        }, 300);
      }
    }

    // Update main selects
    this.updateModelSelects();
    
    // Show success notification
    this.showCustomNotification('Welcome to Smile AI! 🎉', 'success');
  }

  private showClearDataModal() {
  const clearAll = () => {
      // Clear all localStorage data
      const keysToRemove = Object.keys(localStorage).filter(key => key.startsWith('smile-'));
      keysToRemove.forEach(key => localStorage.removeItem(key));
      
      // Clear messages
      this.clearMessages();
      
      // Reset to onboarding
      this.isOnboardingComplete = false;
      this.showOnboarding();
    };

  // Prefer app confirm modal, fallback to native via helper
  (window as any).showAppConfirm('Clear All Data', 'Are you sure you want to clear all data? This will remove all chat history and preferences.', clearAll);
  }

  private initViewToggles() {
    try {
      // Initialize all view toggles
  const toggles = document.querySelectorAll('.view-toggle');
      
      toggles.forEach(toggle => {
  // Use data-panel-id to avoid collision with nav buttons' data-panel attr
  const panelId = toggle.getAttribute('data-panel-id');
        if (panelId) {
          this.initializeViewToggle(toggle as HTMLElement, panelId);
        }
      });
    } catch (error) {
      console.warn('Error initializing view toggles:', error);
    }
  }

  private initializeViewToggle(toggle: HTMLElement, panelId: string) {
    try {
      const buttons = toggle.querySelectorAll('.view-toggle-btn');
      const panel = document.getElementById(panelId);
      
      if (!panel) {
        console.warn(`Panel not found: ${panelId}`);
        return;
      }
      
      // Load saved preference or default to tiles
      const savedView = localStorage.getItem(`view-${panelId}`) || 'tiles';

      // Direct initialization - set styles immediately
      this.setView(panel, savedView, buttons);
      
      // Remove existing event listeners to prevent duplicates
      buttons.forEach(btn => {
        const newBtn = btn.cloneNode(true);
        btn.parentNode?.replaceChild(newBtn, btn);
      });
      
      // Add click handlers to the new buttons
      const newButtons = toggle.querySelectorAll('.view-toggle-btn');
      newButtons.forEach(btn => {
        btn.addEventListener('click', () => {
          const view = btn.getAttribute('data-view');
          if (view) {
            this.setView(panel, view, newButtons);
            localStorage.setItem(`view-${panelId}`, view);
          }
        });
      });
    } catch (error) {
      console.warn(`Error initializing view toggle for panel ${panelId}:`, error);
    }
  }

  private setView(panel: HTMLElement, view: string, buttons: NodeListOf<Element>) {
    try {
      console.log('=== VIEW TOGGLE DEBUG ===');
      console.log('Setting view:', view, 'on panel:', panel.id);

      // Find all possible content containers that support view switching
      const contentSelectors = [
        '.memory-grid',
        '.journal-entries-container', 
        '.exercise-grid',
        '.history-container',
        '.content-grid',
        '.entries-container'
      ];
      
      let targetContainer: HTMLElement | null = null;
      
      // Find the first available container
      for (const selector of contentSelectors) {
        const container = panel.querySelector(selector) as HTMLElement;
        if (container) {
          targetContainer = container;
          console.log('Found target container:', selector);
          break;
        }
      }

      // Fallback: look for any container with data-view-container attribute
      if (!targetContainer) {
        targetContainer = panel.querySelector('[data-view-container]') as HTMLElement;
        if (targetContainer) {
          console.log('Found fallback container with data-view-container');
        }
      }

      // Apply smooth transition animation
      this.animateViewTransition(targetContainer, () => {
        // Apply layout changes to the found container
        if (targetContainer) {
          this.applyViewLayout(targetContainer, view);
        }
      });

      // Update button states with transition
      buttons.forEach(btn => {
        const btnView = btn.getAttribute('data-view');
        btn.classList.toggle('active', btnView === view);
      });

      // Save the view preference to localStorage
      const panelId = panel.getAttribute('id');
      if (panelId) {
        localStorage.setItem(`view-${panelId}`, view);
      }

      console.log('=== VIEW TOGGLE COMPLETE ===');
    } catch (error) {
      console.error('Error setting view:', error);
      if (error instanceof Error) {
        console.error('Stack trace:', error.stack);
      }
    }
  }

  private applyViewLayout(container: HTMLElement, view: string) {
    if (view === 'tiles') {
      // Tiles view: vertical stack layout
      container.style.display = 'flex';
      container.style.flexDirection = 'column';
      container.style.gap = '1.25rem';
      container.style.gridTemplateColumns = '';
    } else {
      // Grid view: responsive grid layout  
      container.style.display = 'grid';
      container.style.gridTemplateColumns = 'repeat(auto-fill, minmax(280px, 1fr))';
      container.style.gap = '1rem';
      container.style.flexDirection = '';
    }
    console.log('Applied', view, 'layout to container:', container.className);
  }

  private animateViewTransition(container: HTMLElement | null, layoutChange: () => void) {
    if (!container) {
      layoutChange();
      return;
    }

    // Add transition class for smooth animation
    container.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    container.style.opacity = '0.6';
    container.style.transform = 'translateY(8px) scale(0.98)';

    // Apply layout changes after a short delay
    setTimeout(() => {
      layoutChange();
      
      // Animate back to normal state
      requestAnimationFrame(() => {
        container.style.opacity = '1';
        container.style.transform = 'translateY(0) scale(1)';
        
        // Remove transition styles after animation completes
        setTimeout(() => {
          container.style.transition = '';
          container.style.transform = '';
        }, 300);
      });
    }, 50);
  }

  private switchPanel(panelId: string) {
  console.log('[switchPanel] switching to', panelId);
    // Hide all panels
    const panels = document.querySelectorAll('[id^="panel-"]');
    
    panels.forEach(panel => {
      panel.classList.add('hidden');
    });

    // Show selected panel
    const targetPanel = document.getElementById(`panel-${panelId}`);
    
    if (targetPanel) {
      targetPanel.classList.remove('hidden');
      console.log('[switchPanel] showed', targetPanel.id);
    } else {
      console.warn('[switchPanel] target panel not found', panelId);
    }

    // Safety: if somehow all panels remain hidden, show chat
    const anyVisible = Array.from(panels).some(p => !p.classList.contains('hidden'));
    if (!anyVisible) {
      const fallback = document.getElementById('panel-chat');
      if (fallback) {
        fallback.classList.remove('hidden');
        console.warn('[switchPanel] all panels hidden; forcing chat visible');
      }
    }

    // Update navigation buttons
  // Only affect actual navigation buttons
  const navButtons = document.querySelectorAll('.nav-button[data-panel]');
    navButtons.forEach(button => {
      button.classList.remove('nav-button-active');
      const buttonPanelId = button.getAttribute('data-panel');
      if (buttonPanelId === panelId) {
        button.classList.add('nav-button-active');
      }
    });

    // Initialize memories panel if it's being opened
    if (panelId === 'memories') {
      this.initMemoriesPanel();
    }

    // Initialize history panel if it's being opened
    if (panelId === 'history') {
      this.initHistoryPanel();
    }

    // Initialize journal panel if it's being opened
    if (panelId === 'journal') {
      this.initJournalPanel();
    }

    // Initialize profile panel if it's being opened
    if (panelId === 'profile') {
      this.initProfilePanel();
    }

    // Reinitialize view toggles for the current panel
    this.initViewToggles();
  }

  private switchSettingsTab(tabId: string) {
    // Hide all tab contents
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => {
      content.classList.remove('active');
    });

    // Show selected tab content
    const targetContent = document.querySelector(`[data-tab-content="${tabId}"]`);
    if (targetContent) {
      targetContent.classList.add('active');
    }

    // Update tab buttons
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(button => {
      button.classList.remove('active');
    });

    const targetButton = document.querySelector(`[data-tab="${tabId}"]`);
    if (targetButton) {
      targetButton.classList.add('active');
    }
  }

  private setThemeMode(mode: string) {
    localStorage.setItem('smile-theme-mode', mode);
    
    const accentColor = localStorage.getItem('smile-accent-color') || 'smile';
    this.setTheme(this.resolveThemeName(mode, accentColor));
  }

  private setAccentColor(accentColor: string) {
    localStorage.setItem('smile-accent-color', accentColor);
    
    // Update color theme cards
    const colorCards = document.querySelectorAll('.color-theme-card');
    colorCards.forEach(card => {
      card.classList.remove('active');
    });
    
    const activeCard = document.querySelector(`[data-theme="${accentColor}"]`);
    if (activeCard) {
      activeCard.classList.add('active');
    }

    // Apply theme based on current mode + new accent
    const themeMode = localStorage.getItem('smile-theme-mode') || 'auto';
    this.setTheme(this.resolveThemeName(themeMode, accentColor));
  }

  private autoResizeTextarea(textarea: HTMLTextAreaElement) {
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea.scrollHeight, 128) + 'px';
  }

  private async loadModels() {
    try {
      const response = await fetch('/api/ollama-health');
      if (response.ok) {
        const data = await response.json();
        if (data.available && data.models) {
          this.models = data.models;
          this.updateModelSelects();
        } else {
          this.models = [];
          this.updateModelSelects();
        }
      }
    } catch (error) {
      console.log('Ollama not available:', error);
      this.models = [];
      this.updateModelSelects();
    }
  }

  private updateModelSelects() {
    const modelSelects = document.querySelectorAll('#model-select, #onboarding-model-select') as NodeListOf<HTMLSelectElement>;
    
    modelSelects.forEach(select => {
      if (this.models.length > 0) {
        select.innerHTML = this.models.map(model => 
          `<option value="${model}">${model}</option>`
        ).join('');
        
        if (this.selectedModel && this.models.includes(this.selectedModel)) {
          select.value = this.selectedModel;
        } else if (this.models.length > 0) {
          select.value = this.models[0];
          this.selectedModel = this.models[0];
          localStorage.setItem('smile-selected-model', this.selectedModel);
        }
      } else {
        select.innerHTML = '<option>No models available</option>';
      }
    });
  }

  private async sendMessage() {
    const messageInput = document.getElementById('message-input') as HTMLTextAreaElement;
    if (!messageInput) return;

    const message = messageInput.value.trim();
    if (!message) return;

    if (!this.selectedModel) {
      this.showCustomNotification('Please select a model first', 'error');
      return;
    }

    // Clear input and reset height
    messageInput.value = '';
    messageInput.style.height = 'auto';

    // Hide empty state
    const emptyState = document.getElementById('empty-state');
    if (emptyState) {
      emptyState.style.display = 'none';
    }

    // Add user message to UI
    this.addMessage('user', message);

    // Add assistant placeholder
    const assistantMessageId = this.addMessage('assistant', '');

    try {
      const response = await fetch('/api/ollama', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
          model: this.selectedModel,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let assistantMessage = '';

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          const lines = chunk.split('\n');

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              try {
                const data = JSON.parse(line.slice(6));
                if (data.content) {
                  assistantMessage += data.content;
                  this.updateMessage(assistantMessageId, assistantMessage);
                }
              } catch (e) {
                // Ignore JSON parse errors
              }
            }
          }
        }
      }
    } catch (error) {
      console.error('Error sending message:', error);
      this.updateMessage(assistantMessageId, 'Sorry, I encountered an error. Please make sure Ollama is running and try again.');
      this.showCustomNotification('Connection error. Check if Ollama is running.', 'error');
    }
  }

  private addMessage(role: 'user' | 'assistant', content: string): string {
    const messagesContainer = document.getElementById('messages-container');
    if (!messagesContainer) return '';

    const messageId = `message-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    const messageDiv = document.createElement('div');
    messageDiv.id = messageId;
    messageDiv.className = `message ${role === 'user' ? 'message-user' : ''}`;

    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.style.backgroundColor = role === 'user' ? 'rgb(var(--md-primary))' : 'rgb(var(--md-surface-variant))';
    avatar.style.color = role === 'user' ? 'rgb(var(--md-on-primary))' : 'rgb(var(--md-on-surface-variant))';
    avatar.textContent = role === 'user' ? 'U' : 'A';

    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';

    const bubble = document.createElement('div');
    bubble.className = `message-bubble ${role === 'user' ? 'message-bubble-user' : 'message-bubble-assistant'}`;
    bubble.textContent = content;

    const time = document.createElement('div');
    time.className = 'message-time';
    time.textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    contentDiv.appendChild(bubble);
    contentDiv.appendChild(time);

    messageDiv.appendChild(avatar);
    messageDiv.appendChild(contentDiv);

    messagesContainer.appendChild(messageDiv);

    // Scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    return messageId;
  }

  private updateMessage(messageId: string, content: string) {
    const messageElement = document.getElementById(messageId);
    if (messageElement) {
      const bubble = messageElement.querySelector('.message-bubble');
      if (bubble) {
        bubble.textContent = content;
        
        // Scroll to bottom
        const messagesContainer = document.getElementById('messages-container');
        if (messagesContainer) {
          messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
      }
    }
  }

  private clearMessages() {
    const messagesContainer = document.getElementById('messages-container');
    if (messagesContainer) {
      // Remove all messages except empty state
      const messages = messagesContainer.querySelectorAll('.message');
      messages.forEach(message => message.remove());
      
      // Show empty state
      const emptyState = document.getElementById('empty-state');
      if (emptyState) {
        emptyState.style.display = 'flex';
      }
    }
  }

  private showCustomNotification(message: string, type: 'info' | 'error' | 'success' = 'info') {
    // Create a Material Design snackbar-style notification
    const notification = document.createElement('div');
    notification.className = 'custom-notification';
    notification.style.cssText = `
      position: fixed;
      bottom: 2rem;
      left: 50%;
      transform: translateX(-50%);
      background-color: ${type === 'error' ? 'rgb(var(--md-error))' : 'rgb(var(--md-surface-variant))'};
      color: ${type === 'error' ? 'rgb(var(--md-on-error))' : 'rgb(var(--md-on-surface-variant))'};
      padding: 1rem 1.5rem;
      border-radius: 0.5rem;
      box-shadow: var(--md-elevation-3);
  z-index: 13000;
      max-width: 90vw;
      text-align: center;
      font-weight: 500;
      animation: slideUpFadeIn 0.3s ease-out;
    `;
    notification.textContent = message;

    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
      @keyframes slideUpFadeIn {
        from {
          opacity: 0;
          transform: translateX(-50%) translateY(100%);
        }
        to {
          opacity: 1;
          transform: translateX(-50%) translateY(0);
        }
      }
    `;
    document.head.appendChild(style);

    document.body.appendChild(notification);

    // Remove after 4 seconds
    setTimeout(() => {
      notification.style.animation = 'slideUpFadeIn 0.3s ease-out reverse';
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
        if (style.parentNode) {
          style.parentNode.removeChild(style);
        }
      }, 300);
    }, 4000);
  }

  private initAmbientBackground() {
    let mouseX = 0;
    let mouseY = 0;
    let isInteracting = false;

    // Create dynamic CSS custom properties for interactive background
    const updateBackgroundPosition = () => {
      const xPercent = (mouseX / window.innerWidth) * 100;
      const yPercent = (mouseY / window.innerHeight) * 100;
      
      document.documentElement.style.setProperty('--mouse-x', `${xPercent}%`);
      document.documentElement.style.setProperty('--mouse-y', `${yPercent}%`);
      document.documentElement.style.setProperty('--interaction-intensity', isInteracting ? '1' : '0');
    };

    // Smooth mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      mouseX += (e.clientX - mouseX) * 0.1;
      mouseY += (e.clientY - mouseY) * 0.1;
      updateBackgroundPosition();
    };

    // Mouse interaction states
    const handleMouseDown = () => {
      isInteracting = true;
      updateBackgroundPosition();
    };

    const handleMouseUp = () => {
      isInteracting = false;
      updateBackgroundPosition();
    };

    // Touch interactions for mobile
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseX = e.touches[0].clientX;
        mouseY = e.touches[0].clientY;
        isInteracting = true;
        updateBackgroundPosition();
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseX += (e.touches[0].clientX - mouseX) * 0.15;
        mouseY += (e.touches[0].clientY - mouseY) * 0.15;
        updateBackgroundPosition();
      }
    };

    const handleTouchEnd = () => {
      isInteracting = false;
      updateBackgroundPosition();
    };

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchmove', handleTouchMove, { passive: true });
    document.addEventListener('touchend', handleTouchEnd);

    // Ambient pulse on window focus/blur
    const handleFocus = () => {
      document.body.style.setProperty('--ambient-focus', '1');
    };

    const handleBlur = () => {
      document.body.style.setProperty('--ambient-focus', '0.7');
    };

    window.addEventListener('focus', handleFocus);
    window.addEventListener('blur', handleBlur);

    // Initialize
    updateBackgroundPosition();
    handleFocus();

    // Debug: Add global function to reset onboarding for testing
    (window as any).resetOnboarding = () => {
      localStorage.removeItem('smile-onboarding');
      location.reload();
    };
  }

  // Memories Panel Management
  private initMemoriesPanel() {
    this.setupMemoryFilters();
    this.setupMemorySearch();
    this.setupMemoryActions();
    this.loadMemoriesData();
  }

  private setupMemoryFilters() {
    const filterButtons = document.querySelectorAll('.memory-filter-btn');
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('memory-filter-active'));
        // Add active class to clicked button
        button.classList.add('memory-filter-active');
        
        const filter = button.getAttribute('data-filter');
        this.filterMemories(filter || 'all');
      });
    });
  }

  private setupMemorySearch() {
    const searchInput = document.getElementById('memory-search') as HTMLInputElement;
    if (!searchInput) return;

    let searchTimeout: NodeJS.Timeout;
    
    searchInput.addEventListener('input', (e) => {
      clearTimeout(searchTimeout);
      const query = (e.target as HTMLInputElement).value.toLowerCase().trim();
      
      searchTimeout = setTimeout(() => {
        this.searchMemories(query);
      }, 300);
    });
  }

  private setupMemoryActions() {
    // Add memory button
    const addMemoryBtn = document.getElementById('add-memory-btn');
    if (addMemoryBtn) {
      addMemoryBtn.addEventListener('click', () => {
        this.addMemoryEntry();
      });
    }

    // Export memories action
    const exportBtn = document.getElementById('export-memories');
    if (exportBtn) {
      exportBtn.addEventListener('click', () => {
        this.exportMemories();
      });
    }

    // Generate insights action
    const generateBtn = document.getElementById('generate-insights');
    if (generateBtn) {
      generateBtn.addEventListener('click', () => {
        this.generateInsights();
      });
    }

    // Memory card click handlers
    this.setupMemoryCardClickHandlers();
  }

  private addMemoryEntry() {
    const typeSelect = document.getElementById('entry-type') as HTMLSelectElement;
    const contentTextarea = document.getElementById('entry-content') as HTMLTextAreaElement;
    
    if (!typeSelect?.value) {
      this.showCustomNotification('Please select a memory type', 'error');
      return;
    }
    
    if (!contentTextarea?.value.trim()) {
      this.showCustomNotification('Please enter some content for your memory', 'error');
      return;
    }

    const newMemory = {
      id: Date.now().toString(),
      type: typeSelect.value,
      content: contentTextarea.value.trim(),
      date: new Date().toISOString(),
      timestamp: Date.now()
    };

    // Save to localStorage
    let memories = JSON.parse(localStorage.getItem('memories') || '[]');
    memories.unshift(newMemory);
    localStorage.setItem('memories', JSON.stringify(memories));

    // Clear form
    typeSelect.value = '';
    contentTextarea.value = '';

    // Show success message
    this.showCustomNotification('Memory saved successfully!', 'success');
    
    // Reload memories display
    this.loadMemoriesData();
  }

  private setupMemoryCardClickHandlers() {
    const memoryCards = document.querySelectorAll('.memory-card');
    memoryCards.forEach(card => {
      card.addEventListener('click', (e) => {
        const target = e.currentTarget as HTMLElement;
        this.handleMemoryCardClick(target);
      });
    });
  }

  private handleMemoryCardClick(card: HTMLElement) {
    const conversationId = card.dataset.conversationId;
    
    if (conversationId) {
      // Switch to chat panel and load conversation
      this.switchPanel('chat');
      this.showCustomNotification('Loading conversation...', 'info');
    } else if (card.classList.contains('insight-memory')) {
      // Show insight details
      const title = card.querySelector('.memory-title')?.textContent || 'Insight';
      this.showCustomNotification(`Viewing insight: ${title}`, 'info');
    } else if (card.classList.contains('moment-memory')) {
      // Show moment details
      const title = card.querySelector('.moment-title')?.textContent || 'Moment';
      this.showCustomNotification(`Viewing moment: ${title}`, 'info');
    }
  }

  private exportMemories() {
    // Export memories to JSON
    const memories = {
      conversations: this.getConversationMemories(),
      insights: this.getInsightMemories(),
      moments: this.getMomentMemories(),
      exportDate: new Date().toISOString(),
      version: '1.0'
    };
    
    const dataStr = JSON.stringify(memories, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `smile-memories-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    URL.revokeObjectURL(url);
    this.showCustomNotification('Memories exported successfully! 📁', 'success');
  }

  private getConversationMemories() {
    // In a real app, this would get conversation data from storage
    return [];
  }

  private getInsightMemories() {
    // In a real app, this would get insight data from storage
    return [];
  }

  private getMomentMemories() {
    // In a real app, this would get moment data from storage
    return [];
  }

  private searchMemories(query: string) {
    const memoryCards = document.querySelectorAll('.memory-card');
    const sections = document.querySelectorAll('.memory-section');
    
    if (!query) {
      // Show all cards and sections if no search query
      memoryCards.forEach(card => {
        (card as HTMLElement).style.display = 'block';
      });
      sections.forEach(section => {
        (section as HTMLElement).style.display = 'block';
      });
      return;
    }

    let hasVisibleCards = false;

    memoryCards.forEach(card => {
      const cardElement = card as HTMLElement;
      const title = cardElement.querySelector('.memory-title')?.textContent?.toLowerCase() || '';
      const excerpt = cardElement.querySelector('.memory-excerpt, .moment-description')?.textContent?.toLowerCase() || '';
      const tags = Array.from(cardElement.querySelectorAll('.memory-tag'))
        .map(tag => tag.textContent?.toLowerCase() || '')
        .join(' ');
      
      const searchableText = `${title} ${excerpt} ${tags}`;
      const shouldShow = searchableText.includes(query);
      
      cardElement.style.display = shouldShow ? 'block' : 'none';
      if (shouldShow) hasVisibleCards = true;
    });

    // Show/hide sections based on visible cards
    sections.forEach(section => {
      const sectionElement = section as HTMLElement;
      const visibleCards = sectionElement.querySelectorAll('.memory-card[style*="block"]');
      sectionElement.style.display = visibleCards.length > 0 ? 'block' : 'none';
    });

    // Show message if no results
    if (!hasVisibleCards && query) {
      this.showCustomNotification(`No memories found for "${query}"`, 'info');
    }
  }

  private filterMemories(filterType: string) {
    const memoryCards = document.querySelectorAll('.memory-card');
    const sections = document.querySelectorAll('.memory-section');
    
    memoryCards.forEach(card => {
      const cardElement = card as HTMLElement;
      let shouldShow = false;
      
      switch (filterType) {
        case 'all':
          shouldShow = true;
          break;
        case 'chats':
          shouldShow = cardElement.classList.contains('conversation-memory');
          break;
        case 'insights':
          shouldShow = cardElement.classList.contains('insight-memory');
          break;
        case 'moments':
          shouldShow = cardElement.classList.contains('moment-memory');
          break;
      }
      
      cardElement.style.display = shouldShow ? 'block' : 'none';
      if (shouldShow) {
        cardElement.style.animation = 'fadeIn 0.3s ease';
      }
    });

    // Show/hide sections based on filter
    sections.forEach(section => {
      const sectionElement = section as HTMLElement;
      const visibleCards = sectionElement.querySelectorAll('.memory-card[style*="block"], .memory-card:not([style*="display: none"])');
      sectionElement.style.display = visibleCards.length > 0 ? 'block' : 'none';
    });
  }

  private loadMemoriesData() {
    // Update memory counts in filter buttons
    const counters = {
      all: 42,
      chats: 28,
      insights: 8,
      moments: 6
    };

    Object.entries(counters).forEach(([filter, count]) => {
      const filterBtn = document.querySelector(`[data-filter="${filter}"] .filter-count`);
      if (filterBtn) {
        filterBtn.textContent = count.toString();
      }
    });

    // Update total count in header
    const totalCount = document.getElementById('memories-count');
    if (totalCount) {
      totalCount.textContent = counters.all.toString();
    }

    // In a real implementation, this would:
    // 1. Load conversation history from localStorage
    // 2. Generate AI insights based on conversation patterns
    // 3. Create special moments from meaningful interactions
    // 4. Dynamically render memory cards with actual data
    
    console.log('Memories data loaded with counts:', counters);
  }

  private generateInsights() {
    this.showCustomNotification('Generating new AI insights...', 'info');
    
    // Simulate AI insight generation with realistic delay
    setTimeout(() => {
      const insights = [
        'You show increased emotional resilience during evening conversations',
        'Your problem-solving approach has become more structured over time',
        'Morning sessions tend to focus on goal-setting and motivation',
        'You demonstrate strong self-awareness in your communication patterns',
        'Your mindfulness practice has improved your stress response'
      ];
      
      const randomInsight = insights[Math.floor(Math.random() * insights.length)];
      this.showCustomNotification(`💡 New insight: ${randomInsight}`, 'success');
      
      // In a real implementation, this would:
      // 1. Analyze conversation history patterns
      // 2. Generate personalized insights
      // 3. Add new insight cards to the memories panel
      // 4. Update insight counts and statistics
      
    }, 2000);
  }

  // History Panel Management
  private initHistoryPanel() {
    this.setupHistorySearch();
    this.setupHistoryFilters();
    this.setupHistoryActions();
    this.loadConversationHistory();
  }

  private setupHistorySearch() {
    const searchInput = document.getElementById('history-search') as HTMLInputElement;
    if (!searchInput) return;

    let searchTimeout: NodeJS.Timeout;
    
    searchInput.addEventListener('input', (e) => {
      clearTimeout(searchTimeout);
      const query = (e.target as HTMLInputElement).value.toLowerCase().trim();
      
      searchTimeout = setTimeout(() => {
        this.searchHistory(query);
      }, 300);
    });
  }

  private setupHistoryFilters() {
    const filterSelect = document.getElementById('history-filter') as HTMLSelectElement;
    if (!filterSelect) return;

    filterSelect.addEventListener('change', () => {
      this.filterHistory(filterSelect.value);
    });
  }

  private setupHistoryActions() {
    // Clear all history button
    const clearBtn = document.getElementById('clear-history');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        this.clearHistory();
      });
    }

    // Export history button
    const exportBtn = document.getElementById('export-history');
    if (exportBtn) {
      exportBtn.addEventListener('click', () => {
        this.exportHistory();
      });
    }

    // Sort dropdown
    const sortSelect = document.getElementById('history-sort') as HTMLSelectElement;
    if (sortSelect) {
      sortSelect.addEventListener('change', () => {
        this.sortHistory(sortSelect.value);
      });
    }

    // Setup conversation item click handlers
    this.setupConversationClickHandlers();
  }

  private setupConversationClickHandlers() {
    const conversationItems = document.querySelectorAll('.conversation-item');
    conversationItems.forEach(item => {
      // Resume conversation button
      const resumeBtn = item.querySelector('[title="Resume conversation"]');
      if (resumeBtn) {
        resumeBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          const conversationId = (item as HTMLElement).dataset.conversationId;
          this.resumeConversation(conversationId);
        });
      }

      // View conversation button
      const viewBtn = item.querySelector('[title="View conversation"]');
      if (viewBtn) {
        viewBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          const conversationId = (item as HTMLElement).dataset.conversationId;
          this.viewConversation(conversationId);
        });
      }

      // Delete conversation button
      const deleteBtn = item.querySelector('[title="Delete conversation"]');
      if (deleteBtn) {
        deleteBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          const conversationId = (item as HTMLElement).dataset.conversationId;
          this.deleteConversation(conversationId);
        });
      }
    });
  }

  private searchHistory(query: string) {
    const conversationItems = document.querySelectorAll('.conversation-item');
    let visibleCount = 0;
    
    conversationItems.forEach(item => {
      const itemElement = item as HTMLElement;
      const preview = itemElement.querySelector('p')?.textContent?.toLowerCase() || '';
      const keywords = itemElement.dataset.keywords?.toLowerCase() || '';
      const searchableText = `${preview} ${keywords}`;
      
      if (!query || searchableText.includes(query.toLowerCase())) {
        itemElement.style.display = 'block';
        visibleCount++;
      } else {
        itemElement.style.display = 'none';
      }
    });

    // Show/hide empty state
    const emptyState = document.getElementById('history-empty');
    if (emptyState) {
      emptyState.style.display = visibleCount === 0 ? 'block' : 'none';
    }
  }

  private sortHistory(sortType: string) {
    const container = document.getElementById('history-container');
    if (!container) return;

    const items = Array.from(container.querySelectorAll('.conversation-item')) as HTMLElement[];
    
    items.sort((a, b) => {
      const dateA = new Date(a.dataset.date || '');
      const dateB = new Date(b.dataset.date || '');
      
      switch (sortType) {
        case 'oldest':
          return dateA.getTime() - dateB.getTime();
        case 'longest':
          const messagesA = parseInt(a.querySelector('.px-2')?.textContent?.match(/\d+/)?.[0] || '0');
          const messagesB = parseInt(b.querySelector('.px-2')?.textContent?.match(/\d+/)?.[0] || '0');
          return messagesB - messagesA;
        case 'shortest':
          const messagesA2 = parseInt(a.querySelector('.px-2')?.textContent?.match(/\d+/)?.[0] || '0');
          const messagesB2 = parseInt(b.querySelector('.px-2')?.textContent?.match(/\d+/)?.[0] || '0');
          return messagesA2 - messagesB2;
        case 'newest':
        default:
          return dateB.getTime() - dateA.getTime();
      }
    });

    // Reorder DOM elements
    items.forEach(item => {
      container.appendChild(item);
    });
  }

  private exportHistory() {
    // Export conversation history to JSON
    const conversations = Array.from(document.querySelectorAll('.conversation-item')).map(item => {
      const element = item as HTMLElement;
      return {
        date: element.dataset.date,
        keywords: element.dataset.keywords,
        preview: element.querySelector('p')?.textContent,
        messageCount: element.querySelector('.px-2')?.textContent,
        duration: element.querySelectorAll('.px-2')[1]?.textContent,
      };
    });
    
    const exportData = {
      conversations,
      exportDate: new Date().toISOString(),
      version: '1.0'
    };
    
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `smile-conversation-history-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    URL.revokeObjectURL(url);
    this.showCustomNotification('Conversation history exported successfully!', 'success');
  }

  private viewConversation(conversationId?: string) {
    if (!conversationId) {
      this.showCustomNotification('Unable to view conversation', 'error');
      return;
    }

    // In a real implementation, this would open a modal or detailed view
    this.showCustomNotification('Conversation details view coming soon', 'info');
  }

  private filterHistory(filter: string) {
    const conversationItems = document.querySelectorAll('.conversation-item');
    const now = new Date();
    
    conversationItems.forEach(item => {
      const itemElement = item as HTMLElement;
      const dateStr = itemElement.dataset.date;
      
      if (!dateStr) {
        itemElement.style.display = 'none';
        return;
      }
      
      const itemDate = new Date(dateStr);
      let shouldShow = false;
      
      switch (filter) {
        case 'all':
          shouldShow = true;
          break;
        case 'today':
          shouldShow = this.isSameDay(itemDate, now);
          break;
        case 'week':
          const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          shouldShow = itemDate >= weekAgo;
          break;
        case 'month':
          const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
          shouldShow = itemDate >= monthAgo;
          break;
      }
      
      itemElement.style.display = shouldShow ? 'block' : 'none';
    });
  }

  private isSameDay(date1: Date, date2: Date): boolean {
    return date1.getDate() === date2.getDate() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getFullYear() === date2.getFullYear();
  }

  private loadConversationHistory() {
    // Update history count in header
    const historyCount = document.getElementById('history-count');
    if (historyCount) {
      historyCount.textContent = '0'; // Start with 0, will be updated as conversations are saved
    }

    // In a real implementation, this would:
    // 1. Load conversation history from localStorage
    // 2. Generate conversation preview text
    // 3. Display conversation items with dates and message counts
    // 4. Update the history count
    
    console.log('Conversation history loaded');
  }

  private resumeConversation(conversationId?: string) {
    if (!conversationId) {
      this.showCustomNotification('Unable to resume conversation', 'error');
      return;
    }

    // Switch to chat panel and load conversation
    this.switchPanel('chat');
    this.showCustomNotification('Resuming conversation...', 'info');
    
    // In a real implementation, this would:
    // 1. Load conversation messages from storage
    // 2. Populate the chat interface with previous messages
    // 3. Set the input focus for continuing the conversation
  }

  private deleteConversation(conversationId?: string) {
    if (!conversationId) {
      this.showCustomNotification('Unable to delete conversation', 'error');
      return;
    }

    // Show confirmation dialog
  const doDelete = () => {
      // In a real implementation, this would:
      // 1. Remove conversation from localStorage
      // 2. Remove the conversation item from the DOM
      // 3. Update the history count
      
      this.showCustomNotification('Conversation deleted', 'success');
    };

  (window as any).showAppConfirm('Delete Conversation', 'Are you sure you want to delete this conversation? This action cannot be undone.', doDelete);
  }

  private clearHistory() {
    // Show confirmation dialog
  const doClearHistory = () => {
      const historyCount = document.getElementById('history-count');
      if (historyCount) {
        historyCount.textContent = '0';
      }
      this.showCustomNotification('All conversation history cleared', 'success');
    };

  (window as any).showAppConfirm('Clear Conversation History', 'Are you sure you want to clear all conversation history? This action cannot be undone.', doClearHistory);
  }

  // Journal Panel Management
  private initJournalPanel() {
    this.setupJournalActions();
    this.setupJournalSearch();
    this.loadJournalEntries();
  }

  private setupJournalActions() {
    // New entry button
    const newEntryBtn = document.getElementById('new-entry-btn');
    if (newEntryBtn) {
      newEntryBtn.addEventListener('click', () => {
        this.showNewEntryForm();
      });
    }

    // Cancel entry button
    const cancelBtn = document.getElementById('cancel-entry-btn');
    if (cancelBtn) {
      cancelBtn.addEventListener('click', () => {
        this.hideNewEntryForm();
      });
    }

    // Save entry button
    const saveBtn = document.getElementById('save-entry-btn');
    if (saveBtn) {
      saveBtn.addEventListener('click', () => {
        this.saveJournalEntry();
      });
    }

    // Save draft button
    const saveDraftBtn = document.getElementById('save-draft-btn');
    if (saveDraftBtn) {
      saveDraftBtn.addEventListener('click', () => {
        this.saveJournalDraft();
      });
    }

    // Entry action buttons (edit/delete)
    this.setupEntryActionButtons();
  }

  private setupJournalSearch() {
    const searchInput = document.getElementById('journal-search') as HTMLInputElement;
    const filterSelect = document.getElementById('journal-filter') as HTMLSelectElement;

    if (searchInput) {
      let searchTimeout: NodeJS.Timeout;
      searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        const query = (e.target as HTMLInputElement).value.toLowerCase().trim();
        
        searchTimeout = setTimeout(() => {
          this.searchJournalEntries(query);
        }, 300);
      });
    }

    if (filterSelect) {
      filterSelect.addEventListener('change', (e) => {
        const filter = (e.target as HTMLSelectElement).value;
        this.filterJournalEntries(filter);
      });
    }
  }

  private setupEntryActionButtons() {
    const entryCards = document.querySelectorAll('.journal-entry-card');
    entryCards.forEach(card => {
      const editBtn = card.querySelector('.journal-entry-action[title="Edit"]');
      const deleteBtn = card.querySelector('.journal-entry-action[title="Delete"]');

      if (editBtn) {
        editBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          this.editJournalEntry(card as HTMLElement);
        });
      }

      if (deleteBtn) {
        deleteBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          this.deleteJournalEntry(card as HTMLElement);
        });
      }
    });
  }

  private showNewEntryForm() {
    const form = document.getElementById('new-entry-form');
    if (form) {
      form.classList.remove('hidden');
      
      // Focus on title input
      const titleInput = document.getElementById('entry-title') as HTMLInputElement;
      if (titleInput) {
        titleInput.focus();
      }
    }
  }

  private hideNewEntryForm() {
    const form = document.getElementById('new-entry-form');
    if (form) {
      form.classList.add('hidden');
      this.clearEntryForm();
    }
  }

  private clearEntryForm() {
    const titleInput = document.getElementById('entry-title') as HTMLInputElement;
    const contentTextarea = document.getElementById('entry-content') as HTMLTextAreaElement;
    const moodSelect = document.getElementById('entry-mood') as HTMLSelectElement;

    if (titleInput) titleInput.value = '';
    if (contentTextarea) contentTextarea.value = '';
    if (moodSelect) moodSelect.value = '';
  }

  private saveJournalEntry() {
    const titleInput = document.getElementById('entry-title') as HTMLInputElement;
    const contentTextarea = document.getElementById('entry-content') as HTMLTextAreaElement;
    const moodSelect = document.getElementById('entry-mood') as HTMLSelectElement;

    if (!contentTextarea?.value.trim()) {
      this.showCustomNotification('Please write something in your journal entry', 'error');
      return;
    }

    const entry = {
      id: `entry-${Date.now()}`,
      title: titleInput?.value.trim() || 'Untitled Entry',
      content: contentTextarea.value.trim(),
      mood: moodSelect?.value || '',
      date: new Date(),
      isDraft: false
    };

    // In a real app, save to localStorage or API
    this.addJournalEntryToDOM(entry);
    this.hideNewEntryForm();
    this.showCustomNotification('Journal entry saved! 📝', 'success');
    
    // Update entry count
    this.updateJournalEntryCount();
  }

  private saveJournalDraft() {
    const contentTextarea = document.getElementById('entry-content') as HTMLTextAreaElement;

    if (!contentTextarea?.value.trim()) {
      this.showCustomNotification('Please write something to save as draft', 'error');
      return;
    }

    // Save draft to localStorage
    localStorage.setItem('journalDraft', contentTextarea.value);
    this.showCustomNotification('Draft saved! 💾', 'info');
  }

  private addJournalEntryToDOM(entry: any) {
    const container = document.getElementById('journal-entries');
    if (!container) return;

    const entryElement = this.createJournalEntryElement(entry);
    container.insertBefore(entryElement, container.firstChild);
  }

  private createJournalEntryElement(entry: any): HTMLElement {
    const entryDiv = document.createElement('div');
    entryDiv.className = 'journal-entry-card';
    entryDiv.dataset.date = entry.date.toISOString().split('T')[0];

    const moodEmoji = this.getMoodEmoji(entry.mood);
    const formattedDate = this.formatJournalDate(entry.date);

    entryDiv.innerHTML = `
      <div class="journal-entry-header">
        <div class="journal-entry-date">
          <div class="journal-date-day">${entry.date.getDate()}</div>
          <div class="journal-date-month">${entry.date.toLocaleDateString('en', { month: 'short' })}</div>
        </div>
        <div class="journal-entry-meta">
          <h3 class="journal-entry-title">${entry.title}</h3>
          <div class="journal-entry-info">
            <span class="journal-entry-time">${formattedDate}</span>
            ${entry.mood ? `<span class="journal-entry-mood">${moodEmoji}</span>` : ''}
          </div>
        </div>
        <div class="journal-entry-actions">
          <button class="journal-entry-action" title="Edit">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
            </svg>
          </button>
          <button class="journal-entry-action" title="Delete">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
            </svg>
          </button>
        </div>
      </div>
      <div class="journal-entry-content">
        <p>${entry.content}</p>
      </div>
    `;

    // Add event listeners to the new entry
    this.setupSingleEntryActions(entryDiv);
    
    return entryDiv;
  }

  private setupSingleEntryActions(entryElement: HTMLElement) {
    const editBtn = entryElement.querySelector('.journal-entry-action[title="Edit"]');
    const deleteBtn = entryElement.querySelector('.journal-entry-action[title="Delete"]');

    if (editBtn) {
      editBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.editJournalEntry(entryElement);
      });
    }

    if (deleteBtn) {
      deleteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.deleteJournalEntry(entryElement);
      });
    }
  }

  private getMoodEmoji(mood: string): string {
    const moodMap: Record<string, string> = {
      'great': '😊',
      'good': '🙂',
      'okay': '😐',
      'down': '😔',
      'anxious': '😰'
    };
    return moodMap[mood] || '😐';
  }

  private formatJournalDate(date: Date): string {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return `Today, ${date.toLocaleTimeString('en', { hour: 'numeric', minute: '2-digit' })}`;
    } else if (diffDays === 1) {
      return `Yesterday, ${date.toLocaleTimeString('en', { hour: 'numeric', minute: '2-digit' })}`;
    } else {
      return `${diffDays} days ago, ${date.toLocaleTimeString('en', { hour: 'numeric', minute: '2-digit' })}`;
    }
  }

  private editJournalEntry(entryElement: HTMLElement) {
    const title = entryElement.querySelector('.journal-entry-title')?.textContent || '';
    const content = entryElement.querySelector('.journal-entry-content p')?.textContent || '';
    
    this.showCustomNotification(`Editing: ${title}`, 'info');
    this.showNewEntryForm();
    
    // Populate form with existing data
    const titleInput = document.getElementById('entry-title') as HTMLInputElement;
    const contentTextarea = document.getElementById('entry-content') as HTMLTextAreaElement;
    
    if (titleInput) titleInput.value = title;
    if (contentTextarea) contentTextarea.value = content;
  }

  private deleteJournalEntry(entryElement: HTMLElement) {
    const title = entryElement.querySelector('.journal-entry-title')?.textContent || 'this entry';
    
  const doDeleteJournal = () => {
      entryElement.remove();
      this.showCustomNotification('Journal entry deleted', 'info');
      this.updateJournalEntryCount();
    };

  (window as any).showAppConfirm('Delete Journal Entry', `Are you sure you want to delete "${title}"?`, doDeleteJournal);
  }

  private searchJournalEntries(query: string) {
    const entries = document.querySelectorAll('.journal-entry-card');
    
    entries.forEach(entry => {
      const entryElement = entry as HTMLElement;
      const title = entryElement.querySelector('.journal-entry-title')?.textContent?.toLowerCase() || '';
      const content = entryElement.querySelector('.journal-entry-content')?.textContent?.toLowerCase() || '';
      
      const shouldShow = !query || title.includes(query) || content.includes(query);
      entryElement.style.display = shouldShow ? 'block' : 'none';
    });
  }

  private filterJournalEntries(filter: string) {
    const entries = document.querySelectorAll('.journal-entry-card');
    const now = new Date();
    
    entries.forEach(entry => {
      const entryElement = entry as HTMLElement;
      const entryDate = new Date(entryElement.dataset.date || '');
      let shouldShow = true;
      
      switch (filter) {
        case 'today':
          shouldShow = entryDate.toDateString() === now.toDateString();
          break;
        case 'week':
          const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          shouldShow = entryDate >= weekAgo;
          break;
        case 'month':
          const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
          shouldShow = entryDate >= monthAgo;
          break;
        case 'all':
        default:
          shouldShow = true;
          break;
      }
      
      entryElement.style.display = shouldShow ? 'block' : 'none';
    });
  }

  private loadJournalEntries() {
    // In a real app, this would load from localStorage or API
    // For now, we use the sample entries in the HTML
    this.updateJournalEntryCount();
  }

  private updateJournalEntryCount() {
    const entries = document.querySelectorAll('.journal-entry-card:not([style*="display: none"])');
    const countElement = document.getElementById('journal-entries-count');
    if (countElement) {
      countElement.textContent = entries.length.toString();
    }
  }

  // Profile Panel Management
  private initProfilePanel() {
    this.loadProfileData();
    this.setupProfileActions();
  }

  private loadProfileData() {
    // Load profile data from localStorage
    const profileData = JSON.parse(localStorage.getItem('smile-profile-data') || '{}');
    
    // Populate form fields
    const fields = [
      'profile-name',
      'profile-pronouns', 
      'profile-age-range',
      'profile-challenges',
      'profile-triggers',
      'profile-coping',
      'profile-goals',
      'profile-communication',
      'profile-reminders'
    ];

    fields.forEach(fieldId => {
      const element = document.getElementById(fieldId) as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
      if (element && profileData[fieldId]) {
        element.value = profileData[fieldId];
      }
    });

    console.log('Profile data loaded');
  }

  private setupProfileActions() {
    // Save profile button
    const saveBtn = document.getElementById('save-profile');
    if (saveBtn) {
      saveBtn.addEventListener('click', () => {
        this.saveProfileData();
      });
    }

    // Auto-save on field changes (debounced)
    const fields = document.querySelectorAll('#panel-profile input, #panel-profile textarea, #panel-profile select');
    let saveTimeout: NodeJS.Timeout;

    fields.forEach(field => {
      field.addEventListener('input', () => {
        clearTimeout(saveTimeout);
        saveTimeout = setTimeout(() => {
          this.saveProfileData(true); // Silent save
        }, 2000); // Auto-save after 2 seconds of no typing
      });
    });
  }

  private saveProfileData(silent = false) {
    const profileData: Record<string, string> = {};
    
    // Collect all form data
    const fields = [
      'profile-name',
      'profile-pronouns', 
      'profile-age-range',
      'profile-challenges',
      'profile-triggers',
      'profile-coping',
      'profile-goals',
      'profile-communication',
      'profile-reminders'
    ];

    fields.forEach(fieldId => {
      const element = document.getElementById(fieldId) as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
      if (element) {
        profileData[fieldId] = element.value.trim();
      }
    });

    // Save to localStorage
    localStorage.setItem('smile-profile-data', JSON.stringify(profileData));
    
    if (!silent) {
      this.showCustomNotification('Profile saved successfully!', 'success');
    }

    // Update any UI elements that might use profile data
    this.updateProfileDependentUI();

    console.log('Profile data saved:', profileData);
  }

  private updateProfileDependentUI() {
    // Update greeting in chat or other areas if name is provided
    const profileData = JSON.parse(localStorage.getItem('smile-profile-data') || '{}');
    const userName = profileData['profile-name'];
    
    // Example: Update a greeting element if it exists
    const greetingElement = document.getElementById('user-greeting');
    if (greetingElement && userName) {
      greetingElement.textContent = `Hello, ${userName}!`;
    }

    // Could also update other personalized elements based on profile data
  }

  private initHistorySearch() {
    const searchInput = document.getElementById('history-search') as HTMLInputElement;
    const clearButton = document.getElementById('clear-search') as HTMLButtonElement;
    const historyContainer = document.getElementById('history-container') as HTMLElement;

    if (!searchInput || !clearButton || !historyContainer) {
      return;
    }

    // Search functionality
    const performSearch = (query: string) => {
      const conversations = historyContainer.querySelectorAll('.conversation-item');
      let visibleCount = 0;

      conversations.forEach(conversation => {
        const element = conversation as HTMLElement;
        const title = element.querySelector('.journal-entry-title')?.textContent?.toLowerCase() || '';
        const content = element.querySelector('.journal-entry-content')?.textContent?.toLowerCase() || '';
        const keywords = element.getAttribute('data-keywords')?.toLowerCase() || '';
        const chips = Array.from(element.querySelectorAll('.filter-chip'))
          .map(chip => chip.textContent?.toLowerCase() || '')
          .join(' ');

        const searchText = `${title} ${content} ${keywords} ${chips}`;
        const isMatch = query === '' || searchText.includes(query.toLowerCase());

        if (isMatch) {
          element.style.display = 'block';
          visibleCount++;
          
          // Highlight search terms if query exists
          if (query) {
            this.highlightSearchTerms(element, query);
          } else {
            this.removeHighlights(element);
          }
        } else {
          element.style.display = 'none';
        }
      });

      // Update results count
      const countElement = document.querySelector('#panel-history .section-count');
      if (countElement) {
        countElement.textContent = visibleCount.toString();
      }

      // Show/hide clear button
      clearButton.classList.toggle('hidden', query === '');
    };

    // Event listeners
    searchInput.addEventListener('input', (e) => {
      const query = (e.target as HTMLInputElement).value.trim();
      performSearch(query);
    });

    clearButton.addEventListener('click', () => {
      searchInput.value = '';
      performSearch('');
      searchInput.focus();
    });

    // Clear search when switching panels
    document.addEventListener('panelSwitch', () => {
      if (searchInput.value) {
        searchInput.value = '';
        performSearch('');
      }
    });
  }

  private highlightSearchTerms(element: HTMLElement, query: string) {
    // Remove existing highlights
    this.removeHighlights(element);

    const terms = query.toLowerCase().split(/\s+/).filter(term => term.length > 0);
    if (terms.length === 0) return;

    const textNodes = this.getTextNodes(element);
    
    textNodes.forEach(node => {
      const text = node.textContent || '';
      let newText = text;
      
      terms.forEach(term => {
        const regex = new RegExp(`(${this.escapeRegExp(term)})`, 'gi');
        newText = newText.replace(regex, '<mark class="search-highlight">$1</mark>');
      });

      if (newText !== text) {
        const wrapper = document.createElement('span');
        wrapper.innerHTML = newText;
        node.parentNode?.replaceChild(wrapper, node);
      }
    });
  }

  private removeHighlights(element: HTMLElement) {
    const highlights = element.querySelectorAll('.search-highlight');
    highlights.forEach(highlight => {
      const parent = highlight.parentNode;
      if (parent) {
        parent.replaceChild(document.createTextNode(highlight.textContent || ''), highlight);
        parent.normalize();
      }
    });
  }

  private getTextNodes(element: HTMLElement): Text[] {
    const textNodes: Text[] = [];
    const walker = document.createTreeWalker(
      element,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: (node) => {
          // Skip highlighting inside input elements, buttons, etc.
          const parent = node.parentElement;
          if (parent && (parent.tagName === 'INPUT' || parent.tagName === 'BUTTON' || parent.tagName === 'SCRIPT')) {
            return NodeFilter.FILTER_REJECT;
          }
          return node.textContent?.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
        }
      }
    );

    let node;
    while (node = walker.nextNode()) {
      textNodes.push(node as Text);
    }
    return textNodes;
  }

  private escapeRegExp(string: string): string {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  // Security Settings Methods
  private toggleEncryption(enabled: boolean) {
    if (enabled) {
      this.showPasswordModal('set');
    } else {
      // Confirm disabling and decrypting any secure data
      (window as any).showAppConfirm(
        'Disable Encryption?',
        'This will turn off encryption for local data. You may need to enter your password to proceed.',
        async () => {
          try {
            const SecureStorageModule = await import('./secure-storage.ts');
            const secureStorage = SecureStorageModule.default.getInstance();

            const proceedDisable = async () => {
              const ok = await secureStorage.disableEncryption();
              if (ok) {
                // Reflect UI state
                const setBtn = document.getElementById('set-password-btn') as HTMLButtonElement;
                const changeBtn = document.getElementById('change-password-btn') as HTMLButtonElement;
                const testBtn = document.getElementById('test-unlock-btn') as HTMLButtonElement;
                if (setBtn) setBtn.style.display = '';
                if (changeBtn) changeBtn.style.display = 'none';
                if (testBtn) testBtn.style.display = 'none';
                this.showCustomNotification('Encryption disabled', 'info');
              } else {
                this.showCustomNotification('Failed to disable encryption', 'error');
                const encToggle = document.getElementById('encryption-enabled') as HTMLInputElement;
                if (encToggle) encToggle.checked = true; // revert
              }
            };

            if (!secureStorage.isStorageUnlocked() && secureStorage.isEncryptionEnabled()) {
              const unlockModal = (window as any).securityUnlockModal;
              if (unlockModal && unlockModal.show) {
                unlockModal.show(async () => {
                  await proceedDisable();
                });
              } else {
                this.showCustomNotification('Unlock UI not ready yet', 'error');
                const encToggle = document.getElementById('encryption-enabled') as HTMLInputElement;
                if (encToggle) encToggle.checked = true; // revert
              }
            } else {
              await proceedDisable();
            }
          } catch (err) {
            console.error('disableEncryption error', err);
            this.showCustomNotification('An error occurred disabling encryption', 'error');
            const encToggle = document.getElementById('encryption-enabled') as HTMLInputElement;
            if (encToggle) encToggle.checked = true; // revert
          }
        }
      );
    }
  }

  private updateAutoLock(minutes: number) {
    import('./secure-storage.ts').then(module => {
      const storage = module.default.getInstance();
      storage.updateSecuritySettings({ autoLockInterval: minutes });
    }).finally(() => {
      this.showCustomNotification(`Auto-lock set to ${minutes === 0 ? 'never' : minutes + ' minutes'}`, 'success');
    });
  }

  private showPasswordModal(mode: 'set' | 'change' = 'set') {
    const modal = document.getElementById('password-setup-modal');
    if (modal) {
      // Update modal title based on mode
      const title = modal.querySelector('.confirm-modal-title');
      if (title) title.textContent = mode === 'set' ? 'Set Encryption Password' : 'Change Encryption Password';
      // Update modal mode attributes and fields
      (modal as HTMLElement).setAttribute('data-mode', mode);
      const currentField = document.getElementById('current-password-field') as HTMLElement;
      const submitLabel = document.getElementById('password-submit-label') as HTMLElement;
      if (currentField) currentField.style.display = mode === 'change' ? '' : 'none';
      if (submitLabel) submitLabel.textContent = mode === 'change' ? 'Change Password' : 'Set Password';
      // Show via unified manager
      (window as any).modalManager?.show(modal);
    }
  }

  private testUnlock() {
    import('./secure-storage.ts').then(module => {
      const storage = module.default.getInstance();
      if (!storage.isEncryptionAvailable()) {
        this.showCustomNotification('Encryption not available in this browser', 'error');
        return;
      }
      if (!storage.isEncryptionEnabled()) {
        this.showCustomNotification('Encryption is disabled. Enable it first.', 'info');
        return;
      }
      if (storage.isStorageUnlocked()) {
        this.showCustomNotification('Storage is already unlocked', 'success');
        return;
      }
      const unlockModal = (window as any).securityUnlockModal;
      if (unlockModal && unlockModal.show) {
        unlockModal.show(() => {
          this.showCustomNotification('Unlock successful ✔', 'success');
        });
      } else {
        this.showCustomNotification('Unlock UI not ready yet', 'error');
      }
    });
  }
}

// Global functions for Security Modal
(window as any).closePasswordModal = function() {
  const modal = document.getElementById('password-setup-modal');
  (window as any).modalManager?.hide(modal);
};

// Global confirm helper that prefers the app confirm modal but falls back
// to the native confirm after a short polling period. This avoids native
// confirms being hidden behind custom modal layers.
(window as any).showAppConfirm = function(title: string, message: string, onConfirm: () => void) {
  try {
    const cm = (window as any).confirmModal;
    if (cm && cm.show) {
      cm.show({ title, message, onConfirm });
      return;
    }

    // Poll for the confirm modal to become available for up to ~1s
    let attempts = 0;
    const id = setInterval(() => {
      attempts++;
      const cm2 = (window as any).confirmModal;
      if (cm2 && cm2.show) {
        clearInterval(id);
        cm2.show({ title, message, onConfirm });
        return;
      }
      if (attempts > 9) {
        clearInterval(id);
        // Final fallback to native confirm
        if (window.confirm(message)) {
          try { onConfirm(); } catch (err) { console.error(err); }
        }
      }
    }, 100);
  } catch (err) {
    console.error('showAppConfirm error', err);
    if (window.confirm(message)) {
      try { onConfirm(); } catch (e) { console.error(e); }
    }
  }
};

(window as any).savePassword = async function() {
  const modal = document.getElementById('password-setup-modal');
  const mode = modal?.getAttribute('data-mode') === 'change' ? 'change' : 'set';
  const currentPassword = (document.getElementById('current-password') as HTMLInputElement)?.value;
  const newPassword = (document.getElementById('new-password') as HTMLInputElement)?.value;
  const confirmPassword = (document.getElementById('confirm-password') as HTMLInputElement)?.value;
  
  if (!newPassword || !confirmPassword || (mode === 'change' && !currentPassword)) {
    if ((window as any).smileApp && typeof (window as any).smileApp.showCustomNotification === 'function') {
      (window as any).smileApp.showCustomNotification(mode === 'change' ? 'Please fill in all password fields' : 'Please fill in both password fields', 'error');
    } else {
      console.warn(mode === 'change' ? 'Please fill in all password fields' : 'Please fill in both password fields');
    }
    return;
  }

  if (newPassword !== confirmPassword) {
    if ((window as any).smileApp && typeof (window as any).smileApp.showCustomNotification === 'function') {
      (window as any).smileApp.showCustomNotification('Passwords do not match', 'error');
    } else {
      console.warn('Passwords do not match');
    }
    return;
  }

  if (newPassword.length < 6) {
    if ((window as any).smileApp && typeof (window as any).smileApp.showCustomNotification === 'function') {
      (window as any).smileApp.showCustomNotification('Password must be at least 6 characters', 'error');
    } else {
      console.warn('Password must be at least 6 characters');
    }
    return;
  }
  try {
    // Dynamically import and enable encryption via secure storage
    const SecureStorageModule = await import('./secure-storage.ts');
    const secureStorage = SecureStorageModule.default.getInstance();
    let ok = false;
    if (mode === 'change') {
      ok = await secureStorage.changePassword(currentPassword!, newPassword);
    } else {
      ok = await secureStorage.enableEncryption(newPassword);
    }

    if (!ok) {
      if ((window as any).smileApp && typeof (window as any).smileApp.showCustomNotification === 'function') {
        (window as any).smileApp.showCustomNotification('Failed to enable encryption. Please try again.', 'error');
      } else {
        console.error('Failed to enable encryption. Please try again.');
      }
      return;
    }

    // Reflect UI: enable toggle and swap buttons
    const encryptionToggle = document.getElementById('encryption-enabled') as HTMLInputElement;
    if (encryptionToggle) encryptionToggle.checked = true;

    const setBtn = document.getElementById('set-password-btn') as HTMLButtonElement;
    const changeBtn = document.getElementById('change-password-btn') as HTMLButtonElement;
    const testBtn = document.getElementById('test-unlock-btn') as HTMLButtonElement;
    if (setBtn) setBtn.style.display = 'none';
    if (changeBtn) changeBtn.style.display = '';
    if (testBtn) testBtn.style.display = '';

    // Close modal
    (window as any).closePasswordModal();

    // Success notification
    const app = (window as any).smileApp;
    if (app && app.showCustomNotification) {
      const msg = mode === 'change' ? 'Password changed successfully 🔒' : 'Encryption password set successfully! 🔒';
      app.showCustomNotification(msg, 'success');
    }
  } catch (err) {
    console.error('Error handling password modal:', err);
    if ((window as any).smileApp && typeof (window as any).smileApp.showCustomNotification === 'function') {
      const msg = mode === 'change' ? 'Error changing password. Please try again.' : 'Error enabling encryption. Please try again.';
      (window as any).smileApp.showCustomNotification(msg, 'error');
    } else {
      console.error('Error in password handling.');
    }
  }
};

// Initialize the app when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    const app = new SmileApp();
    (window as any).smileApp = app;
  });
} else {
  const app = new SmileApp();
  (window as any).smileApp = app;
}
