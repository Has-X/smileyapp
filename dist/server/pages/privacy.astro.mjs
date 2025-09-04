/* empty css                                 */
import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_BTqpNUbh.mjs';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_DUjdDrjv.mjs';
export { renderers } from '../renderers.mjs';

const $$Privacy = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Privacy Policy - Smile AI" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="min-h-screen bg-base-100"> <div class="container mx-auto px-4 py-8 max-w-4xl"> <div class="prose prose-lg max-w-none"> <h1 class="text-4xl font-bold text-center mb-8">Privacy Policy</h1> <div class="bg-base-200 p-6 rounded-lg mb-8"> <h2 class="text-2xl font-semibold mb-4">Privacy by Design</h2> <p class="text-lg">
Smile AI is built with privacy as a core principle. Your conversations and data never leave your device.
</p> </div> <h2>Data Storage</h2> <ul> <li><strong>Local Only:</strong> All chat messages and preferences are stored locally in your browser using IndexedDB and localStorage.</li> <li><strong>No Cloud Sync:</strong> Your data is never uploaded to any cloud service or external server.</li> <li><strong>No Analytics:</strong> We don't track, collect, or analyze your usage patterns.</li> </ul> <h2>AI Processing</h2> <ul> <li><strong>Local Models:</strong> All AI processing happens locally using Ollama running on your machine.</li> <li><strong>No External APIs:</strong> Your conversations never leave your local network.</li> <li><strong>Open Source:</strong> We only support open-weight models that you can inspect and audit.</li> </ul> <h2>Data You Control</h2> <ul> <li><strong>Chat History:</strong> Stored locally, can be cleared anytime from settings.</li> <li><strong>Preferences:</strong> Theme, model selection, and app settings stored in localStorage.</li> <li><strong>Journal Entries:</strong> If used, stored locally in IndexedDB.</li> </ul> <h2>Third Parties</h2> <p>
Smile AI operates entirely offline after the initial load. No third-party services have access to your data.
          The only external connection is to download the app and updates through your browser.
</p> <h2>Data Deletion</h2> <p>
You can clear all your data at any time by:
</p> <ol> <li>Using the "Clear All Data" option in Settings</li> <li>Clearing your browser's local storage for this site</li> <li>Uninstalling the PWA from your device</li> </ol> <div class="bg-accent/10 p-6 rounded-lg mt-8"> <h3 class="text-xl font-semibold mb-2">Questions?</h3> <p>
If you have any questions about this privacy policy or how Smile AI handles your data,
            please review our open-source code or contact us through our GitHub repository.
</p> </div> <div class="text-center mt-8"> <a href="/" class="btn btn-primary">Return to Chat</a> </div> </div> </div> </div> ` })}`;
}, "/workspaces/smileyapp/src/pages/privacy.astro", void 0);

const $$file = "/workspaces/smileyapp/src/pages/privacy.astro";
const $$url = "/privacy";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Privacy,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
