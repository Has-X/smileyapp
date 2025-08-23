# Smile AI

A privacy-first chat application that runs powerful open-weight AI models locally using Ollama. Built with Astro, Preact, Tailwind CSS, and daisyUI as a Progressive Web App.

## ✨ Features

- **Chat-first PWA**: The homepage IS the chat interface - no marketing pages
- **100% Local**: All AI processing happens on your machine via Ollama
- **Privacy by Design**: No cloud APIs, no data collection, no analytics
- **Open Models Only**: Supports GPT-OSS and other open-weight models
- **Offline Capable**: Works offline after initial install (except AI calls)
- **Accessible**: Keyboard navigation, screen reader support, focus management
- **Lightweight**: Minimal JavaScript bundle, CSS animations over JS

## 🤖 Supported Models

### GPT-OSS 20B (Recommended)
- **Parameters**: ~21 billion
- **VRAM**: ~16GB recommended
- **Context**: 131,072 tokens
- **Features**: Strong reasoning, tool calling, excellent for daily tasks

### GPT-OSS 120B (Advanced)
- **Parameters**: ~117-120 billion  
- **VRAM**: 80GB+ (single GPU like NVIDIA H100)
- **Context**: 131,072 tokens
- **Features**: Superior reasoning, research-grade performance

## 🚀 Quick Start

### Prerequisites
- Node.js ≥ 20.0.0
- pnpm (recommended) or npm

### Installation

1. **Clone and install dependencies**:
   ```bash
   git clone <repository-url> smile-ai
   cd smile-ai
   pnpm install
   ```

2. **Install and setup Ollama**:
   ```bash
   # Install Ollama from https://ollama.com
   # Then pull the GPT-OSS model:
   ollama pull gpt-oss:20b
   
   # Start Ollama service (usually auto-starts)
   ollama serve
   ```

3. **Start development server**:
   ```bash
   pnpm dev
   ```

4. **Open in browser**: http://localhost:3000

### Production Build

```bash
pnpm build
pnpm preview
```

## 🏗️ Architecture

### Tech Stack
- **Framework**: Astro 5.0+ with SSR
- **UI**: Preact islands for interactivity
- **Styling**: Tailwind CSS + daisyUI (Material-ish theme)
- **PWA**: @vite-pwa/astro with Workbox
- **Storage**: localStorage + IndexedDB (via idb)
- **Validation**: Zod schemas
- **Utilities**: class-variance-authority for component variants

### Project Structure
```
src/
├── components/          # Reusable UI components
├── layouts/            # Page layouts
├── pages/              # Routes and API endpoints
│   ├── api/           # Ollama proxy endpoints
│   ├── index.astro    # Main chat interface
│   ├── privacy.astro  # Privacy policy
│   └── setup.astro    # Ollama setup guide
├── types/             # TypeScript definitions
└── utils/             # Helper functions and stores
```

### Key Components
- **AppShell**: Main layout with dock navigation
- **Chat**: Message rendering and streaming
- **SmileAvatar**: Animated empty state
- **OnboardingModal**: First-run setup
- **UI Kit**: IconButton, Modal, form controls

## 🔌 API Endpoints

### `/api/ollama` (POST)
Streams chat responses from local Ollama instance.

**Request**:
```json
{
  "model": "gpt-oss:20b",
  "messages": [
    {"role": "user", "content": "Hello!"}
  ]
}
```

**Response**: NDJSON stream of Ollama chat chunks

### `/api/ollama-health` (GET)
Health check and model discovery.

**Response**:
```json
{
  "healthy": true,
  "models": [...],
  "modelCount": 2
}
```

## 🎨 Theming

Smile AI includes three built-in themes:
- **Smile**: Custom Material-inspired theme (default)
- **Light**: Clean light theme
- **Dark**: Dark mode

Theme switching is instant and persists across sessions.

## 🔐 Privacy & Security

- **No telemetry**: Zero analytics or tracking
- **Local storage**: All data stays on your device
- **No cloud APIs**: Direct connection to local Ollama only
- **Open source**: Fully auditable codebase
- **Offline capable**: Core functionality works without internet

## ⚡ Performance

- **Lighthouse Score**: 90+ on desktop for first load
- **Bundle Size**: <100KB initial JavaScript
- **PWA**: Offline caching for static assets
- **Streaming**: Real-time AI response rendering
- **Accessibility**: WCAG 2.1 AA compliant

## 🛠️ Development

### Commands
```bash
pnpm dev          # Start dev server
pnpm build        # Production build
pnpm preview      # Preview production build  
pnpm check        # TypeScript check
```

### Environment
- **Node**: ≥20.0.0 required
- **Ollama**: Must be running on localhost:11434
- **Models**: Pull gpt-oss:20b or other compatible models

## 🙏 Credits

Powered by open models. Thanks to:
- **NVIDIA** for providing GPUs for AI research
- **OpenAI** for releasing GPT-OSS open-weight models  
- **Ollama** for making local AI accessible
- **Astro**, **Preact**, and the open source community

---

*Smile AI runs local-only. Your conversations never leave your device.*
