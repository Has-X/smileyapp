// Demo Streamer Module - Easily removable debug tool for UI testing
// This module simulates AI streaming responses for testing the chat panel UI
// Remove this file and related code when no longer needed

class DemoStreamer {
  private static instance: DemoStreamer;
  private isStreaming = false;

  static getInstance(): DemoStreamer {
    if (!DemoStreamer.instance) {
      DemoStreamer.instance = new DemoStreamer();
    }
    return DemoStreamer.instance;
  }

  async streamResponse(message: string, onChunk: (chunk: string) => void, onComplete: () => void): Promise<void> {
    if (this.isStreaming) {
      console.warn('DemoStreamer: Already streaming, ignoring new request');
      return;
    }

    this.isStreaming = true;

    try {
      // Simulate different response types based on input
      const responses = this.getDemoResponses(message);
      const selectedResponse = responses[Math.floor(Math.random() * responses.length)];

      // Simulate typing delay
      await this.delay(500);

      // Stream the response word by word
      const words = selectedResponse.split(' ');
      let currentText = '';

      for (let i = 0; i < words.length; i++) {
        const word = words[i];
        const chunk = (i === 0 ? '' : ' ') + word;

        currentText += chunk;
        onChunk(currentText);

        // Simulate realistic typing speed with some variation
        const delay = Math.random() * 100 + 50; // 50-150ms between words
        await this.delay(delay);
      }

      // Final delay before completion
      await this.delay(200);
      onComplete();

    } catch (error) {
      console.error('DemoStreamer error:', error);
      onComplete();
    } finally {
      this.isStreaming = false;
    }
  }

  private getDemoResponses(message: string): string[] {
    const lowerMessage = message.toLowerCase();

    // Context-aware responses
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      return [
        "Hello! I'm Smile AI, your wellness-focused companion. How are you feeling today?",
        "Hi there! Welcome to our conversation. I'm here to listen and support you.",
        "Greetings! I'm excited to chat with you. What's on your mind?"
      ];
    }

    if (lowerMessage.includes('stress') || lowerMessage.includes('anxious')) {
      return [
        "I understand that stress can feel overwhelming. Let's take a moment to breathe together. Would you like me to guide you through a simple breathing exercise?",
        "It's completely normal to feel anxious sometimes. Remember that you're not alone in this. What specific thoughts are causing you the most concern right now?",
        "Stress is our body's natural response to challenges. Let's explore some gentle ways to help you feel more grounded and present."
      ];
    }

    if (lowerMessage.includes('happy') || lowerMessage.includes('good')) {
      return [
        "That's wonderful to hear! Celebrating positive moments is so important for our well-being. What made you feel this way?",
        "I'm glad you're feeling good! Let's savor this positive energy. Is there something specific you'd like to share about what's going well?",
        "Wonderful! Positive emotions are worth acknowledging. How can we help you maintain or build on this good feeling?"
      ];
    }

    if (lowerMessage.includes('help') || lowerMessage.includes('support')) {
      return [
        "I'm here to support you in whatever way you need. Whether you want to talk through your thoughts, practice mindfulness, or just have someone listen, I'm here for you.",
        "Support is available whenever you need it. You don't have to face challenges alone. What kind of support would be most helpful for you right now?",
        "Thank you for reaching out. Asking for help is a sign of strength. Let's explore what would be most supportive for you in this moment."
      ];
    }

    // Default responses
    return [
      "Thank you for sharing that with me. I can sense there's more depth to this experience. Would you like to explore your thoughts and feelings a bit more?",
      "I appreciate you opening up about this. Your feelings are valid and important. How are you feeling about sharing this with me?",
      "That's an interesting perspective. Our thoughts and emotions often have layers worth exploring. What stands out to you most about this situation?",
      "I hear you, and I want to acknowledge how you're feeling. Sometimes just being heard can make a difference. Is there anything specific you'd like to focus on?",
      "Your experience matters, and I'm grateful you chose to share it. Let's take a moment to sit with these feelings. What emotions are you noticing right now?"
    ];
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  stopStreaming(): void {
    this.isStreaming = false;
  }

  isCurrentlyStreaming(): boolean {
    return this.isStreaming;
  }
}

// Make available globally for easy access
(window as any).DemoStreamer = DemoStreamer;

// Export for potential module usage
export default DemoStreamer;
