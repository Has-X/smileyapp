/* empty css                                 */
import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_BTqpNUbh.mjs';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_CzJVywaj.mjs';
import { $ as $$AppShell } from '../chunks/AppShell_ZX9gyKU4.mjs';
export { renderers } from '../renderers.mjs';

const $$Privacy = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Privacy Policy - Smile AI" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "AppShell", $$AppShell, {})}  ${maybeRenderHead()}<div id="panel-privacy" class="flex-1 flex flex-col app-panel" style="display: flex;"> <div class="p-6 max-w-4xl mx-auto w-full"> <!-- Panel Header --> <div class="panel-section-header"> <div class="header-left-section"> <div class="section-title"> <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path> </svg>
Privacy Policy
</div> </div> </div> <!-- Privacy Promise Section --> <div class="setting-group mb-6"> <div class="privacy-status"> <div class="privacy-status-icon"> <svg class="w-6 h-6 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 24 24"> <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path> </svg> </div> <div class="flex-1"> <div class="privacy-status-title">Privacy by Design</div> <div class="privacy-status-subtitle">Smile AI is built with privacy as a core principle. Your conversations and data never leave your device.</div> </div> </div> </div> <!-- Privacy Content --> <div class="space-y-6"> <!-- Data Storage --> <div class="setting-group"> <div class="setting-header"> <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"></path> </svg>
Data Storage
</div> <p class="setting-description">
All your data stays on your device and never leaves it.
</p> <div class="setting-item"> <div class="setting-item-info"> <div class="setting-item-title">Local Only</div> <div class="setting-item-description">All chat messages and preferences are stored locally in your browser using IndexedDB and localStorage.</div> </div> </div> <div class="setting-item"> <div class="setting-item-info"> <div class="setting-item-title">No Cloud Sync</div> <div class="setting-item-description">Your data is never uploaded to any cloud service or external server.</div> </div> </div> <div class="setting-item"> <div class="setting-item-info"> <div class="setting-item-title">No Analytics</div> <div class="setting-item-description">We don't track, collect, or analyze your usage patterns.</div> </div> </div> </div> <!-- AI Processing --> <div class="setting-group"> <div class="setting-header"> <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path> </svg>
AI Processing
</div> <p class="setting-description">
All AI processing happens locally using open-source models.
</p> <div class="setting-item"> <div class="setting-item-info"> <div class="setting-item-title">Local Models</div> <div class="setting-item-description">All AI processing happens locally using Ollama running on your machine.</div> </div> </div> <div class="setting-item"> <div class="setting-item-info"> <div class="setting-item-title">No External APIs</div> <div class="setting-item-description">Your conversations never leave your local network.</div> </div> </div> <div class="setting-item"> <div class="setting-item-info"> <div class="setting-item-title">Open Source</div> <div class="setting-item-description">We only support open-weight models that you can inspect and audit.</div> </div> </div> </div> <!-- Data You Control --> <div class="setting-group"> <div class="setting-header"> <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path> </svg>
Data You Control
</div> <p class="setting-description">
You have complete control over all your data.
</p> <div class="setting-item"> <div class="setting-item-info"> <div class="setting-item-title">Chat History</div> <div class="setting-item-description">Stored locally, can be cleared anytime from settings.</div> </div> </div> <div class="setting-item"> <div class="setting-item-info"> <div class="setting-item-title">Preferences</div> <div class="setting-item-description">Theme, model selection, and app settings stored in localStorage.</div> </div> </div> <div class="setting-item"> <div class="setting-item-info"> <div class="setting-item-title">Journal Entries</div> <div class="setting-item-description">If used, stored locally in IndexedDB.</div> </div> </div> </div> <!-- Third Parties --> <div class="setting-group"> <div class="setting-header"> <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"></path> </svg>
Third Parties
</div> <p class="setting-description">
Smile AI operates entirely offline after the initial load. No third-party services have access to your data.
            The only external connection is to download the app and updates through your browser.
</p> </div> <!-- Data Deletion --> <div class="setting-group"> <div class="setting-header"> <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path> </svg>
Data Deletion
</div> <p class="setting-description">
You can clear all your data at any time by:
</p> <div class="setting-item"> <div class="setting-item-info"> <div class="setting-item-title">Clear All Data Option</div> <div class="setting-item-description">Use the "Clear All Data" option in Settings or Trust Centre.</div> </div> </div> <div class="setting-item"> <div class="setting-item-info"> <div class="setting-item-title">Browser Storage</div> <div class="setting-item-description">Clear your browser's local storage for this site.</div> </div> </div> <div class="setting-item"> <div class="setting-item-info"> <div class="setting-item-title">PWA Uninstall</div> <div class="setting-item-description">Uninstall the PWA from your device.</div> </div> </div> </div> <!-- Questions Section --> <div class="setting-group"> <div class="setting-header"> <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path> </svg>
Questions?
</div> <p class="setting-description">
If you have any questions about this privacy policy or how Smile AI handles your data,
            please review our open-source code or contact us through our GitHub repository.
</p> <div class="setting-item"> <div class="setting-item-actions"> <a href="/" class="setting-action-btn">Return to Chat</a> </div> </div> </div> </div> </div> </div> ` })}`;
}, "E:/smileyapp/src/pages/privacy.astro", void 0);

const $$file = "E:/smileyapp/src/pages/privacy.astro";
const $$url = "/privacy";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Privacy,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
