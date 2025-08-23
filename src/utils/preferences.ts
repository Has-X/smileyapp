import type { AppPreferences } from '@/types';

const STORAGE_KEYS = {
  THEME: 'smile-theme',
  MODEL: 'smile-model',
  ONBOARDED: 'smile-onboarded',
  TTS_ENABLED: 'smile-tts-enabled',
  TTS_VOICE: 'smile-tts-voice',
} as const;

const DEFAULT_PREFERENCES: AppPreferences = {
  theme: 'smile',
  selectedModel: 'gpt-oss:20b',
  onboarded: false,
  ttsEnabled: false,
};

export class PreferencesStore {
  static get(): AppPreferences {
    if (typeof window === 'undefined') return DEFAULT_PREFERENCES;
    
    return {
      theme: (localStorage.getItem(STORAGE_KEYS.THEME) as AppPreferences['theme']) || DEFAULT_PREFERENCES.theme,
      selectedModel: localStorage.getItem(STORAGE_KEYS.MODEL) || DEFAULT_PREFERENCES.selectedModel,
      onboarded: localStorage.getItem(STORAGE_KEYS.ONBOARDED) === 'true',
      ttsEnabled: localStorage.getItem(STORAGE_KEYS.TTS_ENABLED) === 'true',
      ttsVoice: localStorage.getItem(STORAGE_KEYS.TTS_VOICE) || undefined,
    };
  }

  static set(preferences: Partial<AppPreferences>): void {
    if (typeof window === 'undefined') return;
    
    const current = this.get();
    const updated = { ...current, ...preferences };

    if (preferences.theme !== undefined) {
      localStorage.setItem(STORAGE_KEYS.THEME, preferences.theme);
      document.documentElement.setAttribute('data-theme', preferences.theme);
    }

    if (preferences.selectedModel !== undefined) {
      localStorage.setItem(STORAGE_KEYS.MODEL, preferences.selectedModel);
    }

    if (preferences.onboarded !== undefined) {
      localStorage.setItem(STORAGE_KEYS.ONBOARDED, String(preferences.onboarded));
    }

    if (preferences.ttsEnabled !== undefined) {
      localStorage.setItem(STORAGE_KEYS.TTS_ENABLED, String(preferences.ttsEnabled));
    }

    if (preferences.ttsVoice !== undefined) {
      localStorage.setItem(STORAGE_KEYS.TTS_VOICE, preferences.ttsVoice);
    }

    // Dispatch custom event for reactivity
    window.dispatchEvent(new CustomEvent('smile:preferences-changed', {
      detail: updated
    }));
  }

  static clear(): void {
    if (typeof window === 'undefined') return;
    
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
  }
}
