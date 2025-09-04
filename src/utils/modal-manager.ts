/**
 * ModalManager
 * Unifies behavior for all `.confirm-modal` instances:
 * - Portals modals to <body> to avoid transformed ancestors affecting layout
 * - Ensures fullscreen backdrops and centered containers
 * - Manages body scroll locking when any modal is open
 * - Adds optional backdrop and Escape-to-close handling
 *
 * Relaxation modal is intentionally excluded.
 */

type Target = string | HTMLElement;

class ModalManager {
  private openCount = 0;
  private observers = new WeakMap<HTMLElement, MutationObserver>();

  init() {
    // Register existing modals
    const modals = Array.from(document.querySelectorAll<HTMLElement>('.confirm-modal'));
    modals.forEach((modal) => this.register(modal));

    // Optional: observe DOM for dynamically added modals
    const bodyObserver = new MutationObserver((mutations) => {
      for (const m of mutations) {
        m.addedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) return;
          if (node.matches?.('.confirm-modal')) this.register(node);
          node.querySelectorAll?.('.confirm-modal').forEach((el) => this.register(el as HTMLElement));
        });
      }
    });
    bodyObserver.observe(document.body, { childList: true, subtree: true });

    // Global Escape handler closes the topmost modal (if allowed)
    document.addEventListener('keydown', (e) => {
      if (e.key !== 'Escape') return;
      const open = this.getOpenModals();
      const top = open[open.length - 1];
      if (!top) return;
      const allowEscape = top.dataset.closeOnEscape !== 'false';
      if (allowEscape) this.hide(top);
    });
  }

  register(modal: HTMLElement) {
    if (!modal || modal.classList.contains('relaxation-modal')) return; // ignore immersive modal
    if (modal.dataset.modalManaged === 'true') return;

    // Portal to body to avoid transformed ancestors affecting fixed positioning
    if (modal.parentElement !== document.body) {
      document.body.appendChild(modal);
    }

    modal.dataset.modalManaged = 'true';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');

    // Backdrop click-to-close (default true; disable with data-close-on-backdrop="false")
    const backdrop = modal.querySelector<HTMLElement>('.confirm-modal-backdrop');
    if (backdrop && backdrop.dataset.bound !== 'true') {
      backdrop.dataset.bound = 'true';
      backdrop.addEventListener('click', (e) => {
        const allow = modal.dataset.closeOnBackdrop !== 'false';
        if (!allow) return;
        // Only close if clicking the backdrop itself
        if (e.target === backdrop) this.hide(modal);
      });
    }

    // Observe class changes to update scroll lock and aria state
    if (!this.observers.has(modal)) {
      const observer = new MutationObserver(() => this.syncModalState(modal));
      observer.observe(modal, { attributes: true, attributeFilter: ['class'] });
      this.observers.set(modal, observer);
      // Initial sync
      this.syncModalState(modal);
    }
  }

  show(target: Target) {
    const modal = this.resolve(target);
    if (!modal) return;
    if (modal.parentElement !== document.body) document.body.appendChild(modal);
    modal.classList.remove('hidden');
    (modal as HTMLElement).style.display = 'flex';
    requestAnimationFrame(() => modal.classList.add('show'));
  }

  hide(target: Target) {
    const modal = this.resolve(target);
    if (!modal) return;
    modal.classList.remove('show');
    // Allow CSS transition to complete before fully hiding
    setTimeout(() => {
      modal.classList.add('hidden');
      (modal as HTMLElement).style.display = 'none';
    }, 300);
  }

  private resolve(target: Target): HTMLElement | null {
    if (!target) return null;
    if (typeof target === 'string') return document.getElementById(target);
    return target;
  }

  private syncModalState(modal: HTMLElement) {
    const isOpen = modal.classList.contains('show') && !modal.classList.contains('hidden');
    modal.setAttribute('aria-hidden', isOpen ? 'false' : 'true');

    // Manage scroll lock based on number of open modals
    const currentlyOpen = this.getOpenModals().length;
    if (currentlyOpen > 0 && this.openCount === 0) {
      document.body.style.overflow = 'hidden';
    }
    if (currentlyOpen === 0 && this.openCount > 0) {
      document.body.style.overflow = '';
    }
    this.openCount = currentlyOpen;
  }

  private getOpenModals(): HTMLElement[] {
    return Array.from(document.querySelectorAll<HTMLElement>('.confirm-modal.show'))
      .filter((el) => !el.classList.contains('hidden'));
  }
}

// Expose singleton
const manager = new ModalManager();
if (typeof window !== 'undefined') {
  (window as any).modalManager = manager;
  document.addEventListener('DOMContentLoaded', () => manager.init());
}

export default manager;

