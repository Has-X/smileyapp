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

  constructor() {
    this.init();
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

    // Save Draft Button
    const saveDraftBtn = document.getElementById('journal-save-draft');
    saveDraftBtn?.addEventListener('click', (e) => {
      e.preventDefault();
      this.saveDraft();
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
      this.loadEntryData(entryId);
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

  private loadEntryData(entryId: string) {
    // In a real app, this would fetch from a database or API
    // For now, we'll extract data from the DOM
    const entryCard = document.querySelector(`[data-journal-id="${entryId}"]`)?.closest('.journal-entry-card-enhanced');
    
    if (!entryCard) return;

    const title = entryCard.querySelector('.journal-entry-title')?.textContent?.trim() || '';
    const content = entryCard.querySelector('.journal-entry-content')?.textContent?.trim() || '';
    const mood = entryCard.querySelector('.journal-entry-mood')?.textContent?.trim() || '😊';
    const privacyElement = entryCard.querySelector('.journal-entry-privacy');
    const privacy = privacyElement?.classList.contains('private') ? 'private' : 'shared';

    // Populate form
    (document.getElementById('journal-title') as HTMLInputElement).value = title;
    (document.getElementById('journal-content') as HTMLTextAreaElement).value = content;
    (document.getElementById('journal-mood') as HTMLSelectElement).value = mood;
    (document.getElementById('journal-privacy') as HTMLSelectElement).value = privacy;

    // Update character counter
    const event = new Event('input');
    document.getElementById('journal-content')?.dispatchEvent(event);
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
      privacy: formData.get('journal-privacy') as 'private' | 'shared',
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

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (this.isEditMode) {
        this.showNotification('Entry updated successfully!', 'success');
      } else {
        this.showNotification('Entry saved successfully!', 'success');
      }

      this.closeModal();

      // Reset button text
      if (saveBtn && originalText) saveBtn.textContent = originalText;

    } catch (error) {
      this.showNotification('Failed to save entry. Please try again.', 'error');
    }
  }

  private async saveDraft() {
    // Implement draft saving logic
    this.showNotification('Draft saved locally', 'info');
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
}

// Initialize when DOM is loaded
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    new JournalModal();
  });
}

export default JournalModal;
