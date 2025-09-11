// Router utility for Smiley PWA
// Handles URL routing and deep linking

interface Route {
  path: string;
  panel: string;
  view?: string;
  action?: string;
  handler?: () => void;
}

class Router {
  private routes: Route[] = [];
  private currentRoute: Route | null = null;

  constructor() {
    this.setupRoutes();
    this.init();
  }

  private setupRoutes() {
    this.routes = [
      // Main panels
      { path: '/', panel: 'chat' },
      { path: '/chat', panel: 'chat' },
      { path: '/journal', panel: 'journal' },
      { path: '/memories', panel: 'memories' },
      { path: '/exercises', panel: 'exercises' },
      { path: '/history', panel: 'history' },
      { path: '/profile', panel: 'profile' },
      { path: '/settings', panel: 'settings' },

      // Journal actions
      { 
        path: '/journal/new', 
        panel: 'journal', 
        action: 'new',
        handler: () => this.handleNewJournalEntry()
      },
      { 
        path: '/journal/edit/:id', 
        panel: 'journal', 
        action: 'edit',
        handler: () => this.handleEditJournalEntry()
      },

      // Memory views
      { path: '/memories/insights', panel: 'memories', view: 'insights' },
      { path: '/memories/moments', panel: 'memories', view: 'moments' },
      { path: '/memories/conversations', panel: 'memories', view: 'conversations' },

      // Exercise types
      { path: '/exercises/breathing', panel: 'exercises', view: 'breathing' },
      { path: '/exercises/relaxation', panel: 'exercises', view: 'relaxation' },
      { path: '/exercises/mindfulness', panel: 'exercises', view: 'mindfulness' },

      // Settings tabs
      { path: '/settings/appearance', panel: 'settings', view: 'appearance' },
      { path: '/settings/privacy', panel: 'settings', view: 'privacy' },
      { path: '/settings/data', panel: 'settings', view: 'data' },
      { path: '/settings/about', panel: 'settings', view: 'about' },

      // Special routes
      { path: '/setup', panel: 'settings', view: 'setup' },
      { path: '/privacy', panel: 'settings', view: 'privacy' },

      // PWA shortcuts
      { path: '/?panel=chat', panel: 'chat' },
      { path: '/?panel=journal&action=new', panel: 'journal', action: 'new' },
      { path: '/?panel=exercises', panel: 'exercises' },
      { path: '/?panel=memories', panel: 'memories' }
    ];
  }

  private init() {
    // Handle initial route
    this.handleCurrentRoute();

    // Listen for popstate events (back/forward buttons)
    window.addEventListener('popstate', () => {
      this.handleCurrentRoute();
    });
  }

  private handleCurrentRoute() {
    const route = this.matchCurrentRoute();
    if (route) {
      this.currentRoute = route;
      this.executeRoute(route);
    }
  }

  private matchCurrentRoute(): Route | null {
    const path = window.location.pathname;
    const search = window.location.search;
    const fullPath = path + search;

    // First try to match exact paths
    let route = this.routes.find(r => r.path === fullPath || r.path === path);

    // If no exact match, try URL parameters
    if (!route && search) {
      const params = new URLSearchParams(search);
      const panel = params.get('panel');
      const view = params.get('view');
      const action = params.get('action');

      if (panel) {
        route = this.routes.find(r => 
          r.panel === panel && 
          (!view || r.view === view) && 
          (!action || r.action === action)
        );
      }
    }

    // Default route
    if (!route) {
      route = this.routes.find(r => r.path === '/');
    }

    return route || null;
  }

  private executeRoute(route: Route) {
    // Import state manager
    const stateManager = (window as any).stateManager;
    
    if (stateManager) {
      // Update state manager
      stateManager.navigateToPanel(
        route.panel,
        route.view || 'default',
        route.action
      );
    }

    // Execute route handler if available
    if (route.handler) {
      try {
        route.handler();
      } catch (error) {
        console.error('Route handler error:', error);
      }
    }

    // Update document title
    this.updateTitle(route);

    // Update meta description
    this.updateMetaDescription(route);
  }

  private updateTitle(route: Route) {
    const titles: Record<string, string> = {
      'chat': 'Chat - Smiley',
      'journal': 'Journal - Smiley',
      'memories': 'Memories - Smiley',
      'exercises': 'Mindfulness Exercises - Smiley',
      'history': 'Chat History - Smiley',
      'profile': 'Profile - Smiley',
      'settings': 'Settings - Smiley'
    };

    const baseTitle = titles[route.panel] || 'Smiley';
    
    let fullTitle = baseTitle;
    if (route.view && route.view !== 'default') {
      fullTitle = `${route.view.charAt(0).toUpperCase() + route.view.slice(1)} - ${baseTitle}`;
    }
    if (route.action) {
      fullTitle = `${route.action.charAt(0).toUpperCase() + route.action.slice(1)} - ${baseTitle}`;
    }

    document.title = fullTitle;
  }

  private updateMetaDescription(route: Route) {
    const descriptions: Record<string, string> = {
      'chat': 'Chat with your AI companion for mental wellbeing support and guidance.',
      'journal': 'Record your thoughts and feelings in your private digital journal.',
      'memories': 'Browse your personal memories, insights, and meaningful moments.',
      'exercises': 'Practice mindfulness, breathing exercises, and relaxation techniques.',
      'history': 'View your conversation history and past AI interactions.',
      'profile': 'Manage your personal profile and preferences.',
      'settings': 'Customize your Smiley experience and privacy settings.'
    };

    const description = descriptions[route.panel] || 'Your mental wellbeing companion powered by local AI models.';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    }
  }

  // Route handlers
  private handleNewJournalEntry() {
    // Wait for DOM to be ready
    setTimeout(() => {
      const journalModal = (window as any).showJournalModal;
      if (journalModal) {
        journalModal();
      }
    }, 100);
  }

  private handleEditJournalEntry() {
    const params = new URLSearchParams(window.location.search);
    const entryId = params.get('id');
    
    if (entryId) {
      setTimeout(() => {
        const editEntry = (window as any).editJournalEntry;
        if (editEntry) {
          editEntry(entryId);
        }
      }, 100);
    }
  }

  // Public API
  public navigate(path: string, pushState = true) {
    if (pushState) {
      history.pushState(null, '', path);
    }
    this.handleCurrentRoute();
  }

  public navigateToPanel(panel: string, view?: string, action?: string) {
    let path = `/${panel}`;
    
    if (view && view !== 'default') {
      path += `/${view}`;
    }

    const params = new URLSearchParams();
    if (action) {
      params.set('action', action);
    }

    if (params.toString()) {
      path += `?${params.toString()}`;
    }

    this.navigate(path);
  }

  public getCurrentRoute(): Route | null {
    return this.currentRoute;
  }

  public getRoutes(): Route[] {
    return [...this.routes];
  }

  public addRoute(route: Route) {
    this.routes.push(route);
  }

  public removeRoute(path: string) {
    this.routes = this.routes.filter(r => r.path !== path);
  }
}

// Initialize router
const router = new Router();

// Export for global access
(window as any).router = router;

export default router;
