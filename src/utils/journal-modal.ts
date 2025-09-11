/**
 * Journal Entry Modal Handler
 * Manages the creation and editing of journal entries with Material Design 3 styling
 */

interface JournalEntry {
  id: string;
  title: string;
  content: string;
  mood: string;
  privacy: 'private' | 'shared';
  date: string;
  time: string;
}

class JournalModal {
  private modal: HTMLElement | null = null;
  private form: HTMLFormElement | null = null;
  private isEditMode: boolean = false;
  private currentEntryId: string | null = null;

  constructor() {
    this.init();
    // Load existing journal entries when the modal system is ready
    document.addEventListener('DOMContentLoaded', () => {
      this.loadExistingEntries();
    });
  }

  private init() {
    // Prevent double initialization if component script + DOMContentLoaded both run
    if (typeof window !== 'undefined' && (window as any).__journalModalInit) {
      return;
    }
    if (typeof window !== 'undefined') {
      (window as any).__journalModalInit = true;
    }
    // If multiple elements share the same ID (legacy duplicates), keep the first and remove the rest
    const allModals = Array.from(document.querySelectorAll('#journal-modal')) as HTMLElement[];
    if (allModals.length > 1) {
      allModals.slice(1).forEach((el) => {
        el.parentElement?.removeChild(el);
      });
      console.warn('[JournalModal] Removed duplicate modal instances:', allModals.length - 1);
    }

    this.modal = allModals[0] || document.getElementById('journal-modal');
    this.form = document.getElementById('journal-entry-form') as HTMLFormElement;
    
    if (!this.modal || !this.form) return;

    // Ensure modal is a direct child of <body> for proper stacking above sidebar
    if (this.modal.parentElement !== document.body) {
      document.body.appendChild(this.modal);
    }

    // Add a portal class for any CSS overrides
    this.modal.classList.add('journal-modal-portal');

    this.bindEvents();
    this.setupCharacterCounter();
  }

  private bindEvents() {
    // New Entry Button
    const newEntryBtn = document.getElementById('new-journal-btn');
    newEntryBtn?.addEventListener('click', () => this.openModal());

    // Listen for custom edit events
    document.addEventListener('open-journal-modal', (e: any) => {
      const entryId = e.detail?.entryId;
      if (entryId) {
        this.openModal(entryId);
      }
    });

    // Edit Buttons (Journal and Memory)
    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (target.closest('.journal-edit-btn')) {
        const entryId = target.closest('.journal-edit-btn')?.getAttribute('data-journal-id');
        if (entryId) this.openModal(entryId);
      }
      if (target.closest('.memory-edit-btn')) {
        const memoryId = target.closest('.memory-edit-btn')?.getAttribute('data-memory-id');
        if (memoryId) this.openModalForMemory(memoryId);
      }
    });

    // Cancel Button
    const cancelBtn = document.getElementById('journal-cancel');
  cancelBtn?.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      this.closeModal();
    });

    // Save Button
    const saveBtn = document.getElementById('journal-save');
    saveBtn?.addEventListener('click', (e) => {
      e.preventDefault();
      this.saveEntry();
    });



    // Close on backdrop click (only when clicking directly on backdrop)
    const backdrop = this.modal?.querySelector('.confirm-modal-backdrop');
    backdrop?.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.closeModal();
    });

    // Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.modal?.classList.contains('show')) {
        this.closeModal();
      }
    });
  }

  private setupCharacterCounter() {
    const contentTextarea = document.getElementById('journal-content') as HTMLTextAreaElement;
    const charCounter = document.getElementById('journal-char-count');
    
    if (!contentTextarea || !charCounter) return;

    const updateCounter = () => {
      if (!contentTextarea || !contentTextarea.value) return;
      const count = contentTextarea.value.length;
      charCounter.textContent = count.toString();
      
      // Color coding for character limit
      if (count > 1800) {
        charCounter.style.color = 'rgb(var(--md-error))';
      } else if (count > 1500) {
        charCounter.style.color = 'rgb(var(--md-warning))';
      } else {
        charCounter.style.color = 'rgb(var(--on-surface-variant))';
      }
    };

    contentTextarea.addEventListener('input', updateCounter);
    updateCounter(); // Initial count
  }

  public openModal(entryId?: string) {
    if (!this.modal) return;

    this.isEditMode = !!entryId;
    this.currentEntryId = entryId || null;

    // Update modal title and button text
    const titleElement = document.getElementById('journal-modal-title');
    const saveButton = document.getElementById('journal-save-text');
    
    if (titleElement && saveButton) {
      if (this.isEditMode) {
        titleElement.textContent = 'Edit Journal Entry';
        saveButton.textContent = 'Update Entry';
      } else {
        titleElement.textContent = 'New Journal Entry';
        saveButton.textContent = 'Save Entry';
      }
    }

    // Load entry data if editing
    if (this.isEditMode && entryId) {
      this.loadEntryDataFromStorage(entryId);
    } else {
      this.resetForm();
    }

    // Show modal with animation using confirm modal classes
  this.modal.style.display = 'flex';
  this.modal.classList.remove('hidden');
  void this.modal.offsetWidth; // Trigger reflow
  this.modal.classList.add('show');
  this.modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Focus first input
    setTimeout(() => {
      const titleInput = document.getElementById('journal-title') as HTMLInputElement;
      titleInput?.focus();
    }, 150);
  }

  public openModalForMemory(memoryId: string) {
    if (!this.modal) return;

    this.isEditMode = true;

    // Update modal title for memory editing
    const titleElement = document.getElementById('journal-modal-title');
    const saveButton = document.getElementById('journal-save-text');
    
    if (titleElement && saveButton) {
      titleElement.textContent = 'Edit Memory';
      saveButton.textContent = 'Update Memory';
    }

    // Load memory data
    this.loadMemoryData(memoryId);

    // Show modal
    this.modal.classList.remove('hidden');
    void this.modal.offsetWidth;
    this.modal.classList.add('show');
    document.body.style.overflow = 'hidden';

    // Focus first input
    setTimeout(() => {
      const titleInput = document.getElementById('journal-title') as HTMLInputElement;
      titleInput?.focus();
    }, 150);
  }

  public closeModal() {
    if (!this.modal) return;
  this.modal.classList.remove('show');
  this.modal.setAttribute('aria-hidden', 'true');
  // Immediate fallback hide to guarantee closure
  this.modal.classList.add('hidden');
  this.modal.style.display = 'none';
  document.body.style.overflow = '';
  this.resetForm();
  }



  private loadMemoryData(memoryId: string) {
    // Load memory data from the DOM
    const memoryCard = document.querySelector(`[data-memory-id="${memoryId}"]`)?.closest('.memory-card');
    
    if (!memoryCard) return;

    const excerpt = memoryCard.querySelector('.memory-excerpt')?.textContent?.trim() || '';
    const date = memoryCard.querySelector('.memory-date')?.textContent?.trim() || '';

    // Populate form with memory data
    (document.getElementById('journal-title') as HTMLInputElement).value = `Memory from ${date}`;
    (document.getElementById('journal-content') as HTMLTextAreaElement).value = excerpt;
    (document.getElementById('journal-mood') as HTMLSelectElement).value = '🤔'; // Default for memories
    (document.getElementById('journal-privacy') as HTMLSelectElement).value = 'private'; // Memories are private by default

    // Update character counter
    const event = new Event('input');
    document.getElementById('journal-content')?.dispatchEvent(event);
  }

  private resetForm() {
    if (!this.form) return;

    this.form.reset();
    this.isEditMode = false;

    // Reset character counter
    const charCounter = document.getElementById('journal-char-count');
    if (charCounter) charCounter.textContent = '0';
  }

  private async saveEntry() {
    if (!this.form) return;

    const formData = new FormData(this.form);
    const entry: Partial<JournalEntry> = {
      title: formData.get('journal-title') as string,
      content: formData.get('journal-content') as string,
      mood: formData.get('journal-mood') as string,
      privacy: 'private', // Always private since privacy field was removed
    };

    // Validate required fields
    if (!entry.title?.trim() || !entry.content?.trim()) {
      this.showNotification('Please fill in all required fields', 'error');
      return;
    }

    try {
      // Show loading state
      const saveBtn = document.getElementById('journal-save');
      const originalText = saveBtn?.textContent;
      if (saveBtn) saveBtn.textContent = 'Saving...';

      // Create complete journal entry
      const completeEntry: JournalEntry = {
        id: this.isEditMode ? this.getCurrentEntryId() : `journal-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`,
        title: entry.title!,
        content: entry.content!,
        mood: entry.mood || '',
        privacy: entry.privacy || 'private',
        date: new Date().toISOString(),
        time: new Date().toLocaleTimeString()
      };

      // Save to secure storage
      await this.saveToSecureStorage(completeEntry);

      if (this.isEditMode) {
        this.showNotification('Entry updated successfully!', 'success');
      } else {
        this.showNotification('Entry saved successfully!', 'success');
      }

      this.closeModal();
      
      // Refresh journal display
      this.refreshJournalDisplay();

      // Reset button text
      if (saveBtn && originalText) saveBtn.textContent = originalText;

    } catch (error) {
      console.error('Failed to save journal entry:', error);
      this.showNotification('Failed to save entry. Please try again.', 'error');
    }
  }



  private showNotification(message: string, type: 'success' | 'error' | 'info') {
    // Create a simple notification
    const notification = document.createElement('div');
    notification.className = `journal-notification journal-notification-${type}`;
    notification.textContent = message;

    // Style the notification
    Object.assign(notification.style, {
      position: 'fixed',
      top: '2rem',
      right: '2rem',
      padding: '1rem 1.5rem',
      borderRadius: '0.75rem',
      background: type === 'success' ? 'rgba(34, 197, 94, 0.9)' : 
                 type === 'error' ? 'rgba(239, 68, 68, 0.9)' : 
                 'rgba(59, 130, 246, 0.9)',
      color: 'white',
      fontWeight: '500',
      fontSize: '0.875rem',
      zIndex: '9999',
      backdropFilter: 'blur(8px)',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
      transform: 'translateX(100%)',
      transition: 'transform 0.3s ease'
    });

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 100);

    // Remove after 3 seconds
    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  }

  private getCurrentEntryId(): string {
    return this.currentEntryId || `journal-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
  }
  
  private async loadEntryDataFromStorage(entryId: string): Promise<void> {
    try {
      const { default: SecureStorage } = await import('./secure-storage.ts');
      const storage = SecureStorage.getInstance();
      const entries = await storage.getItem('journal-entries') || [];
      
      const entry = entries.find((e: JournalEntry) => e.id === entryId);
      if (entry) {
        // Populate form with entry data
        (document.getElementById('journal-title') as HTMLInputElement).value = entry.title;
        (document.getElementById('journal-content') as HTMLTextAreaElement).value = entry.content;
        (document.getElementById('journal-mood') as HTMLSelectElement).value = entry.mood;
        // Privacy field removed - entries are always private
        
        // Update character counter
        const event = new Event('input');
        document.getElementById('journal-content')?.dispatchEvent(event);
      }
    } catch (error) {
      console.error('Failed to load entry data:', error);
      this.showNotification('Failed to load entry data', 'error');
    }
  }
  
  private async loadExistingEntries(): Promise<void> {
    // Load and display existing journal entries
    (window as any).loadJournalEntries();
  }
  
  private async saveToSecureStorage(entry: JournalEntry): Promise<void> {
    try {
      const { default: SecureStorage } = await import('./secure-storage.ts');
      const storage = SecureStorage.getInstance();
      
      // Get existing entries
      let entries: JournalEntry[] = [];
      try {
        entries = await storage.getItem('journal-entries') || [];
      } catch (error) {
        console.warn('No existing journal entries found or failed to decrypt:', error);
        entries = [];
      }
      
      if (this.isEditMode) {
        // Update existing entry
        const index = entries.findIndex(e => e.id === entry.id);
        if (index !== -1) {
          entries[index] = entry;
        } else {
          entries.unshift(entry); // Add as new if not found
        }
      } else {
        // Add new entry at the beginning
        entries.unshift(entry);
      }
      
      // Save back to secure storage
      await storage.setItem('journal-entries', entries);
      
    } catch (error) {
      console.error('Failed to save to secure storage:', error);
      throw error;
    }
  }
  
  private refreshJournalDisplay(): void {
    // Trigger a refresh of the journal panel display
    const event = new CustomEvent('journal-updated');
    document.dispatchEvent(event);
  }
  

}

// Initialize when DOM is loaded
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    new JournalModal();
  });
}

// Global functions for journal management
(window as any).loadJournalEntries = async function() {
  try {
    const { default: SecureStorage } = await import('./secure-storage.ts');
    const storage = SecureStorage.getInstance();
    const entries = await storage.getItem('journal-entries') || [];
    
    const container = document.getElementById('journal-entries');
    const emptyState = document.getElementById('journal-empty-state');
    
    if (!container) return;
    
    if (entries.length === 0) {
      if (emptyState) emptyState.style.display = 'block';
      container.style.display = 'none';
    } else {
      if (emptyState) emptyState.style.display = 'none';
      container.style.display = 'block';
      // Remove inline styles to let view toggle system control layout
      container.style.gap = '';
      container.style.flexDirection = '';
      container.style.gridTemplateColumns = '';
      // Ensure the container has proper class for view toggle
      if (!container.classList.contains('journal-entries-container')) {
        container.classList.add('journal-entries-container');
      }
      
      // Render entries
      container.innerHTML = entries.map((entry: JournalEntry) => `
        <div class="journal-entry-card-enhanced group relative" data-entry-id="${entry.id}">
          <div class="journal-entry-actions">
            <button class="journal-edit-btn" onclick="editJournalEntry('${entry.id}')" title="Edit entry">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2v-5m-1.414-9.414a2 2 0 1 1 2.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
              </svg>
            </button>
            <button class="journal-delete-btn" onclick="deleteJournalEntry('${entry.id}')" title="Delete entry">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0 1 16.138 21H7.862a2 2 0 0 1-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v3M4 7h16"/>
              </svg>
            </button>
          </div>
          <div class="journal-entry-header">
            <div class="journal-entry-date-bg">
              <div class="journal-date-day">${new Date(entry.date).getDate()}</div>
              <div class="journal-date-month">${new Date(entry.date).toLocaleDateString('en', { month: 'short' })}</div>
            </div>
            <div class="journal-entry-meta">
              <h4 class="journal-entry-title">${entry.title}</h4>
              <div class="journal-entry-info">
                <span class="journal-entry-time">${new Date(entry.date).toLocaleTimeString('en', { hour: '2-digit', minute: '2-digit' })}</span>
                ${entry.mood ? `<span class="journal-entry-mood">${entry.mood}</span>` : ''}
                <span class="journal-entry-privacy">${entry.privacy}</span>
              </div>
            </div>
          </div>
          <div class="journal-entry-content">${entry.content}</div>
        </div>
      `).join('');
    }
    
    // Update count
    const countElement = document.getElementById('journal-count');
    if (countElement) countElement.textContent = entries.length.toString();
    
  } catch (error) {
    console.error('Failed to load journal entries:', error);
  }
};

(window as any).editJournalEntry = async function(entryId: string) {
  try {
    // Get the journal modal instance and open it for editing
    const modal = document.getElementById('journal-modal');
    if (modal) {
      // Trigger the modal opening with the entry ID
      const event = new CustomEvent('open-journal-modal', { detail: { entryId } });
      document.dispatchEvent(event);
    }
  } catch (error) {
    console.error('Failed to edit journal entry:', error);
  }
};

(window as any).deleteJournalEntry = async function(entryId: string) {
  try {
    const { default: SecureStorage } = await import('./secure-storage.ts');
    const storage = SecureStorage.getInstance();
    
    let entries = await storage.getItem('journal-entries') || [];
    entries = entries.filter((entry: JournalEntry) => entry.id !== entryId);
    
    await storage.setItem('journal-entries', entries);
    
    // Refresh display
    (window as any).loadJournalEntries();
    
  } catch (error) {
    console.error('Failed to delete journal entry:', error);
  }
};

// Listen for journal updates
document.addEventListener('journal-updated', () => {
  (window as any).loadJournalEntries();
});

export default JournalModal;
