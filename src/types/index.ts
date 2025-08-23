// Chat message types
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

// Ollama API types
export interface OllamaModel {
  name: string;
  modified_at: string;
  size: number;
  digest: string;
  details?: {
    format: string;
    family: string;
    families: string[];
    parameter_size: string;
    quantization_level: string;
  };
}

export interface OllamaModelsResponse {
  models: OllamaModel[];
}

export interface OllamaChatRequest {
  model: string;
  messages: Array<{
    role: 'user' | 'assistant' | 'system';
    content: string;
  }>;
  stream?: boolean;
  options?: {
    temperature?: number;
    top_p?: number;
    max_tokens?: number;
  };
}

export interface OllamaChatResponse {
  model: string;
  created_at: string;
  message: {
    role: 'assistant';
    content: string;
  };
  done: boolean;
  total_duration?: number;
  load_duration?: number;
  prompt_eval_count?: number;
  prompt_eval_duration?: number;
  eval_count?: number;
  eval_duration?: number;
}

// App preferences
export interface AppPreferences {
  theme: 'smile' | 'dark' | 'light';
  selectedModel: string;
  onboarded: boolean;
  ttsEnabled: boolean;
  ttsVoice?: string;
}

// Panel types for dock navigation
export type PanelType = 'chat' | 'memories' | 'journal' | 'exercises' | 'settings';

// Quick action types for right dock
export type QuickActionType = 'breath' | 'soundscapes' | 'theme';
