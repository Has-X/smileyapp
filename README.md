# 🌟 Smiley — Wellbeing

![Smiley Banner](public/smileyback-min.png)

**Smiley** is a privacy-first AI companion designed to support your emotional wellbeing. Running fully offline with open-source AI models, Smiley gives you a safe space to reflect, chat, and practice mindfulness — without exposing your private thoughts to servers or third parties.

---

## 🌱 Why Smiley?

Smiley was created to make wellbeing more accessible for everyone.

For many people, professional support like a coach or psychologist is out of reach — whether due to cost, availability, or the difficulty of sharing sensitive details with someone else. Smiley bridges that gap by offering a private, offline-first space for reflection and support.

With Smiley, you can explore your thoughts, practice mindfulness, and build habits for resilience — all while knowing your data stays with you, on your device.

---

## 🎯 Fine-Tuned Model: GPT-Smiley

Smiley is powered by **GPT-Smiley**, our custom fine-tuned version of GPT-OSS. This fine-tune is optimized specifically for:

* **Emotional Support Conversations** — refined to respond with warmth, empathy, and clarity.
* **Mindfulness Guidance** — trained to deliver step-by-step calming and breathing exercises.
* **Privacy-First Context** — shaped to avoid unnecessary data requests and respect boundaries.

This fine-tuned model is what makes Smiley different: it is not just any general-purpose AI, but one carefully adapted to act as a wellbeing companion that runs fully offline.

## 💻 Self-Hosting (Offline Setup)

Prefer full independence? Run Smiley locally on your own machine.

### Prerequisites

* **Ollama** running locally (`ollama serve`)
* **Node.js (20+)** and **pnpm** installed

### Step 1: Pull the model

```bash
ollama pull hasx/gpt-smiley:20b
```

### Step 2: Clone the repo

```bash
git clone https://github.com/Has-X/smileyapp.git
cd smileyapp
pnpm install
```

### Step 3: Build and serve

```bash
pnpm dev
```

Open the app locally at `http://localhost:3000`.

---

## ✨ Features

### 🚪 Onboarding

Smiley guides you through setup in a clear and supportive way — helping you pick your theme, enable encryption, adjust model settings, and personalize your profile.

### 💬 Private Chat

Conversations with Smiley feel natural and supportive. Everything runs locally, with no external servers or tracking.

### 🧘 Mindfulness Studio

Smiley includes guided exercises for calm and focus — from quick breathing sessions to longer mindfulness routines — always ready, even offline.

### 📖 Journal

Your thoughts matter. Smiley offers a private, safe place to capture reflections, tag entries, and revisit them whenever you need. A digital sanctuary that belongs only to you.

### 👤 Profile

Customize what Smiley knows about you: your name, goals, tone, or what brings you comfort. This makes every interaction more meaningful and personal.

### 🔐 Security

Protect your data with password-based encryption. Your chat history, journal entries, and profile are fully encrypted and stored only on your device.

---

## 🛠️ How It Works

* **Astro + Preact** power the responsive, lightweight interface.
* **Tailwind + DaisyUI** provide an accessible, polished design.
* **Ollama** handles offline AI interactions with GPT-Smiley.
* **IndexedDB + localStorage** securely store your data on your device.
* **PWA support** makes Smiley installable and available offline.

---

## 🌍 Real-World Impact

Smiley empowers individuals to take care of their mental wellbeing without needing internet access or giving up privacy. It’s especially valuable in low-connectivity areas or for those who prefer to keep sensitive reflections completely private.

---

✨ **Smiley** is more than an app. It’s a trusted companion, built with care to protect your privacy while supporting your everyday wellbeing.

License: AGPL