import type { ChatMessage } from '../types/index.js';

export interface Conversation {
  id: string;
  title: string;
  icon: string;
  preview: string;
  lastActivity: number;
  messages: ChatMessage[];
  createdAt: number;
  updatedAt: number;
}

// Predefined icon pool for AI selection
export const CONVERSATION_ICONS = [
  'lightbulb',   // Ideas, insights, problem-solving
  'heart',       // Emotional support, love, relationships
  'sun',         // Motivation, energy, positivity
  'moon',        // Sleep, night thoughts, dreams
  'brain',       // Mental health, psychology, thoughts
  'book',        // Learning, education, self-help
  'music',       // Relaxation, therapy, creativity
  'fitness',     // Health, exercise, wellness
  'meditation',  // Mindfulness, peace, calm
  'sleep',       // Rest, bedtime, insomnia
  'energy',      // Vitality, productivity, focus
  'stress',      // Anxiety, pressure, overwhelm
  'calm',        // Peace, serenity, balance
  'focus',       // Concentration, attention, clarity
  'gratitude',   // Thankfulness, appreciation, positivity
  'confidence',  // Self-esteem, empowerment, strength
  'creativity',  // Art, innovation, imagination
  'growth',      // Development, progress, improvement
  'balance',     // Harmony, equilibrium, stability
  'healing',     // Recovery, therapy, wellness
] as const;

// Keywords mapping for automatic icon selection
export const ICON_KEYWORDS: Record<string, string[]> = {
  lightbulb: ['idea', 'solution', 'problem', 'think', 'insight', 'breakthrough', 'understand'],
  heart: ['love', 'relationship', 'emotion', 'feel', 'care', 'support', 'empathy'],
  sun: ['morning', 'positive', 'happy', 'energy', 'bright', 'optimistic', 'motivation'],
  moon: ['sleep', 'night', 'dream', 'tired', 'rest', 'evening', 'insomnia'],
  brain: ['mental', 'psychology', 'think', 'memory', 'cognitive', 'mind', 'thought'],
  book: ['learn', 'education', 'study', 'knowledge', 'read', 'skill', 'development'],
  music: ['relax', 'creative', 'art', 'therapy', 'calm', 'soothing', 'peaceful'],
  fitness: ['exercise', 'health', 'body', 'physical', 'workout', 'strong', 'active'],
  meditation: ['mindful', 'meditate', 'peace', 'zen', 'breathe', 'present', 'aware'],
  sleep: ['tired', 'sleepy', 'bed', 'rest', 'insomnia', 'fatigue', 'drowsy'],
  energy: ['productive', 'focus', 'vitality', 'power', 'strength', 'active', 'alert'],
  stress: ['anxious', 'worry', 'pressure', 'overwhelm', 'tension', 'nervous', 'panic'],
  calm: ['peaceful', 'serene', 'tranquil', 'quiet', 'still', 'composed', 'relaxed'],
  focus: ['concentrate', 'attention', 'clarity', 'sharp', 'clear', 'focused', 'alert'],
  gratitude: ['thankful', 'grateful', 'appreciate', 'blessing', 'positive', 'thankfulness'],
  confidence: ['confident', 'strong', 'empowered', 'self-esteem', 'brave', 'courage'],
  creativity: ['creative', 'artistic', 'imagination', 'innovative', 'inspire', 'original'],
  growth: ['grow', 'develop', 'progress', 'improve', 'advance', 'evolve', 'better'],
  balance: ['harmony', 'equilibrium', 'stable', 'centered', 'balanced', 'even'],
  healing: ['heal', 'recovery', 'therapy', 'wellness', 'restore', 'mend', 'cure'],
};

export class ConversationManager {
  private static STORAGE_KEY = 'smile-conversations';
  private static MAX_CONVERSATIONS = 50;

  static getAll(): Conversation[] {
    if (typeof window === 'undefined') return [];
    
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Failed to load conversations:', error);
      return [];
    }
  }

  static save(conversations: Conversation[]): void {
    if (typeof window === 'undefined') return;
    
    try {
      // Keep only the most recent conversations
      const sorted = conversations
        .sort((a, b) => b.lastActivity - a.lastActivity)
        .slice(0, this.MAX_CONVERSATIONS);
      
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(sorted));
    } catch (error) {
      console.error('Failed to save conversations:', error);
    }
  }

  static create(firstMessage: string): Conversation {
    const id = `conv-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const now = Date.now();
    
    const title = this.generateTitle(firstMessage);
    const icon = this.selectIcon(firstMessage);
    const preview = firstMessage.slice(0, 100);

    return {
      id,
      title,
      icon,
      preview,
      lastActivity: now,
      messages: [],
      createdAt: now,
      updatedAt: now,
    };
  }

  static update(conversation: Conversation, newMessage?: ChatMessage): Conversation {
    const updated = {
      ...conversation,
      lastActivity: Date.now(),
      updatedAt: Date.now(),
    };

    if (newMessage) {
      updated.messages = [...conversation.messages, newMessage];
      
      // Update preview with the latest user message
      if (newMessage.role === 'user') {
        updated.preview = newMessage.content.slice(0, 100);
      }
    }

    return updated;
  }

  static delete(id: string): void {
    const conversations = this.getAll().filter(conv => conv.id !== id);
    this.save(conversations);
  }

  static generateTitle(firstMessage: string): string {
    // Simple AI-like title generation based on content analysis
    const message = firstMessage.toLowerCase();
    
    // Common patterns and their corresponding titles
    const patterns = [
      { keywords: ['feel', 'feeling', 'emotion'], title: 'Emotional Check-in' },
      { keywords: ['anxious', 'anxiety', 'worry', 'stress'], title: 'Anxiety Support Session' },
      { keywords: ['sleep', 'tired', 'insomnia'], title: 'Sleep Troubles Discussion' },
      { keywords: ['morning', 'start', 'day', 'motivat'], title: 'Morning Motivation' },
      { keywords: ['help', 'support', 'need'], title: 'Support & Guidance' },
      { keywords: ['meditat', 'mindful', 'breath'], title: 'Mindfulness Practice' },
      { keywords: ['relationship', 'friend', 'family'], title: 'Relationship Guidance' },
      { keywords: ['work', 'job', 'career'], title: 'Career & Work Chat' },
      { keywords: ['goal', 'achieve', 'success'], title: 'Goal Setting Session' },
      { keywords: ['creative', 'art', 'music'], title: 'Creative Expression' },
      { keywords: ['learn', 'understand', 'know'], title: 'Learning & Growth' },
      { keywords: ['energy', 'productive', 'focus'], title: 'Energy & Productivity Tips' },
      { keywords: ['health', 'wellness', 'body'], title: 'Health & Wellness' },
      { keywords: ['sad', 'depressed', 'down'], title: 'Emotional Support' },
      { keywords: ['happy', 'joy', 'grateful'], title: 'Gratitude & Joy' },
      { keywords: ['decision', 'choose', 'advice'], title: 'Decision Making Help' },
      { keywords: ['future', 'plan', 'dream'], title: 'Future Planning' },
      { keywords: ['past', 'memory', 'regret'], title: 'Reflection & Processing' },
      { keywords: ['confidence', 'self-esteem'], title: 'Confidence Building' },
      { keywords: ['habit', 'routine', 'change'], title: 'Habit Formation' },
    ];

    // Find matching pattern
    for (const pattern of patterns) {
      if (pattern.keywords.some(keyword => message.includes(keyword))) {
        return pattern.title;
      }
    }

    // Fallback to time-based or generic titles
    const hour = new Date().getHours();
    if (hour < 12) return 'Morning Chat';
    if (hour < 17) return 'Afternoon Conversation';
    if (hour < 21) return 'Evening Discussion';
    return 'Late Night Talk';
  }

  static selectIcon(content: string): string {
    const message = content.toLowerCase();
    
    // Find the best matching icon based on keywords
    for (const [icon, keywords] of Object.entries(ICON_KEYWORDS)) {
      const matches = keywords.filter(keyword => message.includes(keyword)).length;
      if (matches > 0) {
        return icon;
      }
    }

    // Fallback icons based on time or random selection
    const hour = new Date().getHours();
    if (hour < 12) return 'sun';
    if (hour < 17) return 'lightbulb';
    if (hour < 21) return 'heart';
    return 'moon';
  }

  static addConversation(conversation: Conversation): void {
    const conversations = this.getAll();
    conversations.unshift(conversation); // Add to beginning
    this.save(conversations);
  }

  static updateConversation(updated: Conversation): void {
    const conversations = this.getAll();
    const index = conversations.findIndex(conv => conv.id === updated.id);
    
    if (index >= 0) {
      conversations[index] = updated;
      this.save(conversations);
    }
  }

  static getById(id: string): Conversation | null {
    return this.getAll().find(conv => conv.id === id) || null;
  }

  static search(query: string): Conversation[] {
    if (!query.trim()) return this.getAll();
    
    const searchTerm = query.toLowerCase();
    return this.getAll().filter(conv => 
      conv.title.toLowerCase().includes(searchTerm) ||
      conv.preview.toLowerCase().includes(searchTerm)
    );
  }

  static clear(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(this.STORAGE_KEY);
    }
  }
}
