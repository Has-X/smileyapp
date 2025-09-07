// Onboarding Manager - TypeScript version moved to utils

declare global {
  interface Window {
    smileApp?: {
      setTheme: (theme: string) => void;
      showCustomNotification?: (msg: string, type?: 'success' | 'warning' | 'error' | 'info') => void;
    };
    modalManager?: {
      show: (target: string | HTMLElement) => void;
      hide: (target: string | HTMLElement) => void;
    };
    onboardingManager?: OnboardingManager;
    OllamaHelper?: any;
  }
}

class OnboardingManager {
  private currentStep = 1;
  private totalSteps = 4;

  private progressSteps: NodeListOf<HTMLElement>;
  private stepContents: NodeListOf<HTMLElement>;
  private backBtn: HTMLButtonElement | null;
  private nextBtn: HTMLButtonElement | null;
  private completeBtn: HTMLButtonElement | null;

  constructor() {
    this.progressSteps = document.querySelectorAll<HTMLElement>('.progress-step');
    this.stepContents = document.querySelectorAll<HTMLElement>('.onboarding-step-content');
    this.backBtn = document.getElementById('onboarding-back') as HTMLButtonElement | null;
    this.nextBtn = document.getElementById('onboarding-next') as HTMLButtonElement | null;
    this.completeBtn = document.getElementById('onboarding-complete') as HTMLButtonElement | null;

    this.init();
  }

  private init() {
    this.setupEventListeners();
    this.updateUI();
  }

  private setupEventListeners() {
    this.backBtn?.addEventListener('click', () => this.previousStep());
    this.nextBtn?.addEventListener('click', () => this.nextStep());
    this.completeBtn?.addEventListener('click', () => this.completeOnboarding());

    // Theme selection
    const themeCards = document.querySelectorAll<HTMLElement>('.theme-card');
    themeCards.forEach((card) => {
      card.addEventListener('click', () => {
        themeCards.forEach((c) => c.classList.remove('theme-card-active'));
        card.classList.add('theme-card-active');
        const theme = card.getAttribute('data-theme');
        if (theme && window.smileApp?.setTheme) {
          window.smileApp.setTheme(theme);
        }
      });
    });

    // Progress step clicks
    this.progressSteps.forEach((step, index) => {
      step.addEventListener('click', () => {
        const stepNumber = index + 1;
        const canNavigate = stepNumber <= this.currentStep || this.canNavigateToStep(stepNumber);
        if (canNavigate) this.goToStep(stepNumber);
      });
    });
  }

  private canNavigateToStep(stepNumber: number): boolean {
    switch (stepNumber) {
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
        return true;
      default:
        return false;
    }
  }

  private validateCurrentStep(): boolean {
    switch (this.currentStep) {
      case 1: // Welcome
        return true;
      case 2: // AI Setup
        return true; // Optional for now
      case 3: // Theme Selection
        return document.querySelector('.theme-card-active') !== null;
      case 4: // Security
        return true; // All optional
      case 5: // Profile
        return true; // All optional
      case 6: // Completion
        return true;
      default:
        return false;
    }
  }

  private nextStep() {
    const canAdvance = this.validateCurrentStep() && this.currentStep < this.totalSteps;
    if (canAdvance) {
      this.currentStep++;
      this.updateUI();
    } else if (!this.validateCurrentStep()) {
      this.showValidationError();
    }
  }

  private previousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
      this.updateUI();
    }
  }

  private goToStep(stepNumber: number) {
    if (stepNumber >= 1 && stepNumber <= this.totalSteps) {
      this.currentStep = stepNumber;
      this.updateUI();
    }
  }

  private updateUI() {
    // Update progress indicators
    this.progressSteps.forEach((step, index) => {
      const stepNumber = index + 1;
      step.classList.remove('active', 'completed');
      if (stepNumber === this.currentStep) step.classList.add('active');
      else if (stepNumber < this.currentStep) step.classList.add('completed');
    });

    // Update step content visibility
    this.stepContents.forEach((content, index) => {
      const stepNumber = index + 1;
      content.classList.toggle('active', stepNumber === this.currentStep);
    });

    // Update navigation buttons
    if (this.backBtn) this.backBtn.style.display = this.currentStep > 1 ? 'flex' : 'none';
    if (this.nextBtn) this.nextBtn.style.display = this.currentStep < this.totalSteps ? 'flex' : 'none';
    if (this.completeBtn) this.completeBtn.style.display = this.currentStep === this.totalSteps ? 'flex' : 'none';

    // Setup AI status checker for step 2
    if (this.currentStep === 2) this.setupAIStatusChecker();
    
    // No longer load models automatically - user can configure later
  }

  private setupAIStatusChecker() {
    const checkBtn = document.getElementById('check-ai-engine');
    const statusResult = document.getElementById('ai-setup-status');
    
    if (!checkBtn || !statusResult) return;

    checkBtn.addEventListener('click', async () => {
      const statusIcon = statusResult.querySelector('.status-icon');
      const statusText = statusResult.querySelector('.status-text');
      
      if (!statusIcon || !statusText) return;

      // Update to checking state
      statusIcon.className = 'status-icon checking';
      statusText.innerHTML = `
        <h4>Checking AI Engine Status</h4>
        <p>Verifying Ollama and GPT-OSS model availability...</p>
      `;

      try {
        // Check if Ollama is running
        const response = await fetch('http://localhost:11434/api/tags');
        if (!response.ok) throw new Error('Ollama not running');
        
        const data = await response.json();
        const models = data.models || [];
        const gptOssModel = models.find((m: any) => m.name.includes('gpt-oss'));
        
        if (gptOssModel) {
          // GPT-OSS found and ready
          statusIcon.className = 'status-icon success';
          statusIcon.innerHTML = `
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
            </svg>
          `;
          statusText.innerHTML = `
            <h4 style="color: rgb(var(--md-success));">✓ AI Engine Ready</h4>
            <p>GPT-OSS model found and ready for conversations!</p>
          `;
        } else {
          // Ollama running but no GPT-OSS
          statusIcon.className = 'status-icon warning';
          statusIcon.innerHTML = `
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"/>
            </svg>
          `;
          statusText.innerHTML = `
            <h4 style="color: rgb(var(--md-warning));">⚠ GPT-OSS Model Missing</h4>
            <p>Ollama is running but GPT-OSS model not found. Please run: <code>ollama pull gpt-oss:20b</code></p>
          `;
        }
      } catch (error) {
        // Ollama not running or accessible
        statusIcon.className = 'status-icon error';
        statusIcon.innerHTML = `
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        `;
        statusText.innerHTML = `
          <h4 style="color: rgb(var(--md-error));">✗ Ollama Not Found</h4>
          <p>Please install and start Ollama, then download the GPT-OSS model using the commands above.</p>
        `;
      }
    });

    // Setup copy button handlers
    const copyBtns = document.querySelectorAll('.copy-btn');
    copyBtns.forEach(btn => {
      btn.addEventListener('click', async () => {
        const command = btn.getAttribute('data-copy');
        if (command) {
          try {
            await navigator.clipboard.writeText(command);
            btn.innerHTML = `
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
            `;
            setTimeout(() => {
              btn.innerHTML = `
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                </svg>
              `;
            }, 1500);
          } catch (error) {
            console.error('Failed to copy command:', error);
          }
        }
      });
    });
  }

  private showValidationError() {
    let message = 'Please complete the current step before continuing.';
    if (this.currentStep === 3) message = 'Please select a theme to continue.';
    window.smileApp?.showCustomNotification?.(message, 'warning');
  }

  private collectOnboardingData() {
    const selectedTheme = document.querySelector<HTMLElement>('.theme-card-active')?.getAttribute('data-theme') || 'smile';
    const encryptionEnabled = (document.getElementById('onboarding-encryption') as HTMLInputElement | null)?.checked || false;
    
    // Profile data
    const profileName = (document.getElementById('profile-name') as HTMLInputElement | null)?.value || '';
    const ageRange = (document.getElementById('profile-age-range') as HTMLSelectElement | null)?.value || '';
    
    // Wellness goals
    const goalCheckboxes = document.querySelectorAll<HTMLInputElement>('.goal-option input:checked');
    const wellnessGoals = Array.from(goalCheckboxes).map(cb => cb.value);
    
    return {
      theme: selectedTheme,
      encryption: encryptionEnabled,
      profile: {
        name: profileName,
        ageRange: ageRange,
        wellnessGoals: wellnessGoals
      },
      completedAt: new Date().toISOString(),
    };
  }

  private initializeAppWithPreferences(data: ReturnType<OnboardingManager['collectOnboardingData']>) {
    if (data.theme && window.smileApp?.setTheme) window.smileApp.setTheme(data.theme);
    if (data.encryption) localStorage.setItem('smile-encryption-enabled', String(data.encryption));
    if (data.profile.name) localStorage.setItem('smile-user-name', data.profile.name);
    if (data.profile.ageRange) localStorage.setItem('smile-user-age-range', data.profile.ageRange);
    if (data.profile.wellnessGoals.length > 0) {
      localStorage.setItem('smile-wellness-goals', JSON.stringify(data.profile.wellnessGoals));
    }
  }

  private completeOnboarding() {
    if (!this.validateCurrentStep()) {
      this.showValidationError();
      return;
    }
    const onboardingData = this.collectOnboardingData();
    try {
      // Persist
      localStorage.setItem('smile-onboarding', 'complete');
      localStorage.setItem('smile-onboarding-data', JSON.stringify(onboardingData));
      // Close onboarding modal (support both confirm-modal and global-modal)
      const modal = document.getElementById('onboarding-modal');
      if (modal) {
        if (modal.classList.contains('confirm-modal')) {
          window.modalManager?.hide(modal);
        } else {
          modal.classList.remove('show');
          setTimeout(() => {
            (modal as HTMLElement).style.display = 'none';
          }, 300);
        }
      }
      // Notify + initialize
      window.smileApp?.showCustomNotification?.('Welcome to Smile AI! Your setup is complete.', 'success');
      this.initializeAppWithPreferences(onboardingData);
    } catch (err) {
      console.error('Failed to complete onboarding:', err);
      window.smileApp?.showCustomNotification?.('Failed to save settings. Please try again.', 'error');
    }
  }
}

// Initialize onboarding on DOM ready and expose for debugging
const bootstrapOnboarding = () => {
  const manager = new OnboardingManager();
  window.onboardingManager = manager;
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrapOnboarding);
} else {
  bootstrapOnboarding();
}

export default OnboardingManager;
