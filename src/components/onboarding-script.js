class OnboardingManager {
  constructor() {
    this.currentStep = 1;
    this.totalSteps = 4;
    this.progressSteps = document.querySelectorAll('.progress-step');
    this.stepContents = document.querySelectorAll('.onboarding-step-content');
    this.backBtn = document.getElementById('onboarding-back');
    this.nextBtn = document.getElementById('onboarding-next');
    this.completeBtn = document.getElementById('onboarding-complete');

    this.init();
  }

  init() {
    this.setupEventListeners();
    this.loadOllamaHelper();
    this.updateUI();
  }

  setupEventListeners() {
    if (this.backBtn) {
      this.backBtn.addEventListener('click', () => this.previousStep());
    }
    
    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', () => this.nextStep());
    }
    
    if (this.completeBtn) {
      this.completeBtn.addEventListener('click', () => this.completeOnboarding());
    }

    // Theme selection
    const themeCards = document.querySelectorAll('.theme-card');
    themeCards.forEach(card => {
      card.addEventListener('click', () => {
        themeCards.forEach(c => c.classList.remove('theme-card-active'));
        card.classList.add('theme-card-active');
        
        const theme = card.getAttribute('data-theme');
        if (theme && window.smileApp) {
          window.smileApp.setTheme(theme);
        }
      });
    });

    // Progress step clicks
    this.progressSteps.forEach((step, index) => {
      step.addEventListener('click', () => {
        const stepNumber = index + 1;
        const canNavigate = stepNumber <= this.currentStep || this.canNavigateToStep(stepNumber);
        if (canNavigate) {
          this.goToStep(stepNumber);
        }
      });
    });
  }

  async loadOllamaHelper() {
    const ollamaContainer = document.getElementById('ollama-setup-content');
    if (ollamaContainer) {
      // Create a placeholder div for the Ollama helper
      const helperDiv = document.createElement('div');
      helperDiv.id = 'ollama-helper-embedded';
      ollamaContainer.appendChild(helperDiv);
      
      // Dynamically import and initialize the Ollama helper
      try {
        const ollamaHelperContent = await this.loadOllamaHelperContent();
        helperDiv.innerHTML = ollamaHelperContent;
        
        // Initialize the helper
        if (window.OllamaHelper) {
          // Helper is initialized globally
        }
      } catch (error) {
        console.error('Failed to load Ollama helper:', error);
        helperDiv.innerHTML = `
          <div class="error-message">
            <p>Unable to load Ollama setup helper. Please ensure Ollama is installed and running.</p>
            <button class="material-button btn-outlined" onclick="location.reload()">Retry</button>
          </div>
        `;
      }
    }
  }

  async loadOllamaHelperContent() {
    // In a real implementation, this would load the Ollama helper component
    // For now, we'll create a simplified version
    return `
      <div class="ollama-helper">
        <div class="ollama-status-check">
          <button id="check-ollama-btn" class="material-button btn-primary">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
            </svg>
            Check Ollama Connection
          </button>
          <div id="ollama-status-result" style="margin-top: 1rem;"></div>
        </div>
        
        <div class="ollama-quick-setup" style="margin-top: 1.5rem;">
          <h4>Quick Setup Guide</h4>
          <ol style="margin-left: 1rem; color: rgb(var(--md-on-surface-variant));">
            <li>Download Ollama from <a href="https://ollama.ai" target="_blank">ollama.ai</a></li>
            <li>Install and start the application</li>
            <li>Run <code>ollama pull llama3.2</code> in your terminal</li>
            <li>Click "Check Connection" above</li>
          </ol>
        </div>
      </div>
    `;
  }

  canNavigateToStep(stepNumber) {
    // Add validation logic for each step
    switch (stepNumber) {
      case 2: // Ollama setup
        return true; // Allow navigation to setup step
      case 3: // Theme selection
        return true; // Allow theme selection without Ollama requirement
      case 4: // Preferences
        return true; // Allow preferences setup
      default:
        return false;
    }
  }

  validateCurrentStep() {
    switch (this.currentStep) {
      case 1: // Welcome
        return true;
      case 2: // Ollama setup
        // Optional validation - user can skip Ollama setup
        return true;
      case 3: // Theme selection
        return document.querySelector('.theme-card-active') !== null;
      case 4: // Preferences
        return true;
      default:
        return false;
    }
  }

  nextStep() {
    const canAdvance = this.validateCurrentStep() && this.currentStep < this.totalSteps;
    if (canAdvance) {
      this.currentStep++;
      this.updateUI();
    } else if (!this.validateCurrentStep()) {
      this.showValidationError();
    }
  }

  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
      this.updateUI();
    }
  }

  goToStep(stepNumber) {
    if (stepNumber >= 1 && stepNumber <= this.totalSteps) {
      this.currentStep = stepNumber;
      this.updateUI();
    }
  }

  updateUI() {
    // Update progress indicators
    this.progressSteps.forEach((step, index) => {
      const stepNumber = index + 1;
      step.classList.remove('active', 'completed');
      
      if (stepNumber === this.currentStep) {
        step.classList.add('active');
      } else if (stepNumber < this.currentStep) {
        step.classList.add('completed');
      }
    });

    // Update step content visibility
    this.stepContents.forEach((content, index) => {
      const stepNumber = index + 1;
      content.classList.toggle('active', stepNumber === this.currentStep);
    });

    // Update navigation buttons
    if (this.backBtn) {
      this.backBtn.style.display = this.currentStep > 1 ? 'flex' : 'none';
    }
    
    if (this.nextBtn) {
      this.nextBtn.style.display = this.currentStep < this.totalSteps ? 'flex' : 'none';
    }
    
    if (this.completeBtn) {
      this.completeBtn.style.display = this.currentStep === this.totalSteps ? 'flex' : 'none';
    }

    // Load models for step 4
    if (this.currentStep === 4) {
      this.loadAvailableModels();
    }
  }

  async loadAvailableModels() {
    const modelSelect = document.getElementById('onboarding-model-select');
    if (!modelSelect) return;

    try {
      const response = await fetch('http://localhost:11434/api/tags');
      if (response.ok) {
        const data = await response.json();
        const models = data.models || [];
        
        modelSelect.innerHTML = '';
        
        if (models.length === 0) {
          modelSelect.innerHTML = '<option>No models found - Please install a model first</option>';
        } else {
          models.forEach((model) => {
            const option = document.createElement('option');
            option.value = model.name;
            option.textContent = model.name;
            modelSelect.appendChild(option);
          });
          
          // Select the first model by default
          if (models.length > 0) {
            modelSelect.value = models[0].name;
          }
        }
      } else {
        throw new Error('Failed to fetch models');
      }
    } catch (error) {
      modelSelect.innerHTML = '<option>Ollama not available - You can configure this later</option>';
    }
  }

  showValidationError() {
    let message = 'Please complete the current step before continuing.';
    
    switch (this.currentStep) {
      case 3:
        message = 'Please select a theme to continue.';
        break;
    }
    
    if (window.smileApp) {
      window.smileApp.showCustomNotification(message, 'warning');
    }
  }

  completeOnboarding() {
    if (!this.validateCurrentStep()) {
      this.showValidationError();
      return;
    }

    // Collect onboarding data
    const onboardingData = this.collectOnboardingData();
    
    try {
      // Save onboarding completion
      localStorage.setItem('smile_onboarding_completed', 'true');
      localStorage.setItem('smile_onboarding_data', JSON.stringify(onboardingData));
      
      // Close onboarding modal
      const modal = document.getElementById('onboarding-modal');
      if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
          modal.style.display = 'none';
        }, 300);
      }
      
      // Show completion notification
      if (window.smileApp) {
        window.smileApp.showCustomNotification('Welcome to Smile AI! Your setup is complete.', 'success');
      }
      
      // Initialize the app with user preferences
      this.initializeAppWithPreferences(onboardingData);
      
    } catch (error) {
      console.error('Failed to complete onboarding:', error);
      if (window.smileApp) {
        window.smileApp.showCustomNotification('Failed to save settings. Please try again.', 'error');
      }
    }
  }

  collectOnboardingData() {
    const selectedTheme = document.querySelector('.theme-card-active')?.getAttribute('data-theme') || 'smile';
    const voiceEnabled = document.getElementById('onboarding-tts')?.checked || false;
    const encryptionEnabled = document.getElementById('onboarding-encryption')?.checked || false;
    const selectedModel = document.getElementById('onboarding-model-select')?.value || '';

    return {
      theme: selectedTheme,
      voice: voiceEnabled,
      encryption: encryptionEnabled,
      model: selectedModel,
      completedAt: new Date().toISOString()
    };
  }

  initializeAppWithPreferences(data) {
    // Apply theme
    if (window.smileApp && data.theme) {
      window.smileApp.setTheme(data.theme);
    }
    
    // Configure voice if enabled
    if (data.voice) {
      // Voice configuration would go here
    }
    
    // Configure encryption if enabled
    if (data.encryption) {
      // Encryption setup would go here
    }
    
    // Set selected model
    if (data.model) {
      localStorage.setItem('smile_selected_model', data.model);
    }
  }
}

// Initialize onboarding when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const onboardingManager = new OnboardingManager();
  window.onboardingManager = onboardingManager;
  
  // Add Ollama check functionality
  setTimeout(() => {
    const checkBtn = document.getElementById('check-ollama-btn');
    if (checkBtn) {
      checkBtn.addEventListener('click', async () => {
        const resultDiv = document.getElementById('ollama-status-result');
        if (!resultDiv) return;
        
        resultDiv.innerHTML = '<p style="color: rgb(var(--md-on-surface-variant));">Checking connection...</p>';
        
        try {
          const response = await fetch('http://localhost:11434/api/tags');
          if (response.ok) {
            const data = await response.json();
            const modelCount = data.models?.length || 0;
            resultDiv.innerHTML = `
              <div style="color: rgb(var(--md-success)); font-weight: 500;">
                ✓ Ollama connected! Found ${modelCount} models.
              </div>
            `;
          } else {
            throw new Error('Connection failed');
          }
        } catch (error) {
          resultDiv.innerHTML = `
            <div style="color: rgb(var(--md-error)); font-weight: 500;">
              ✗ Ollama not found. Please install and start Ollama.
            </div>
          `;
        }
      });
    }
  }, 1000);
});
