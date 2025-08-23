import type { OllamaModelsResponse, OllamaChatRequest, OllamaChatResponse } from '../types';

const OLLAMA_BASE_URL = 'http://localhost:11434';

export class OllamaClient {
  static async getModels(): Promise<OllamaModelsResponse> {
    try {
      const response = await fetch(`${OLLAMA_BASE_URL}/api/tags`);
      if (!response.ok) {
        throw new Error(`Ollama API error: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Failed to fetch Ollama models:', error);
      throw new Error('Could not connect to Ollama. Make sure it\'s running on localhost:11434');
    }
  }

  static async checkHealth(): Promise<boolean> {
    try {
      const response = await fetch(`${OLLAMA_BASE_URL}/api/tags`);
      return response.ok;
    } catch {
      return false;
    }
  }

  static async* streamChat(request: OllamaChatRequest): AsyncGenerator<OllamaChatResponse, void, unknown> {
    const response = await fetch(`${OLLAMA_BASE_URL}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...request,
        stream: true,
      }),
    });

    if (!response.ok) {
      throw new Error(`Ollama chat error: ${response.status}`);
    }

    const reader = response.body?.getReader();
    if (!reader) {
      throw new Error('Failed to read response stream');
    }

    const decoder = new TextDecoder();
    let buffer = '';

    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (line.trim()) {
            try {
              const parsed = JSON.parse(line) as OllamaChatResponse;
              yield parsed;
              
              if (parsed.done) {
                return;
              }
            } catch (error) {
              console.warn('Failed to parse Ollama response line:', line, error);
            }
          }
        }
      }
    } finally {
      reader.releaseLock();
    }
  }
}

// Speech synthesis utility
export class SpeechSynthesis {
  private static synthesis = typeof window !== 'undefined' ? window.speechSynthesis : null;

  static getVoices(): SpeechSynthesisVoice[] {
    if (!this.synthesis) return [];
    return this.synthesis.getVoices();
  }

  static speak(text: string, voiceName?: string): void {
    if (!this.synthesis || !text.trim()) return;

    const utterance = new SpeechSynthesisUtterance(text);
    
    if (voiceName) {
      const voice = this.getVoices().find(v => v.name === voiceName);
      if (voice) {
        utterance.voice = voice;
      }
    }

    // Configure speech
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 0.8;

    this.synthesis.speak(utterance);
  }

  static stop(): void {
    if (this.synthesis) {
      this.synthesis.cancel();
    }
  }
}
