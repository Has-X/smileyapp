import { e as createComponent, f as createAstro, r as renderTemplate, l as renderScript, n as renderSlot, o as renderHead, h as addAttribute } from './astro/server_BTqpNUbh.mjs';
/* empty css                         */

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro();
const $$BaseLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$BaseLayout;
  const { title = "Smile AI" } = Astro2.props;
  return renderTemplate(_a || (_a = __template([`<html lang="en"> <head><script>
      (function(){
        try {
          var mode = localStorage.getItem('smile-theme-mode') || 'auto';
          var accent = localStorage.getItem('smile-accent-color') || 'smile';
          var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
          var theme = (mode === 'dark' || (mode === 'auto' && prefersDark)) ? (accent + '-dark') : accent;
          document.documentElement.setAttribute('data-theme', theme);
          localStorage.setItem('smile-theme', theme);
        } catch (e) {}
      })();
    <\/script><style>
      @media (prefers-color-scheme: dark) {
        :root { color-scheme: dark; }
        html { background-color: #0f1115; }
      }
      @media (prefers-color-scheme: light) {
        :root { color-scheme: light; }
      }
    </style><meta charset="UTF-8"><meta name="description" content="Smile AI - Chat with local open-weight AI models"><meta name="viewport" content="width=device-width, initial-scale=1.0"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"`, "><title>", '</title><!-- PWA meta tags --><meta name="theme-color" content="#3b82f6"><meta name="mobile-web-app-capable" content="yes"><meta name="apple-mobile-web-app-capable" content="yes"><meta name="apple-mobile-web-app-status-bar-style" content="default"><meta name="apple-mobile-web-app-title" content="Smile AI"><!-- Font preload --><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">', '</head> <body> <div class="breath-indicator"></div> <div class="ambient-particles"></div> ', ' <!-- Subtle Privacy Badge --> <div class="fixed bottom-4 right-4 z-40"> <div class="privacy-badge"> <div class="flex items-center gap-2 px-3 py-2 bg-surface-variant/80 backdrop-blur-md text-on-surface-variant rounded-full shadow-lg border border-outline-variant/20 hover:bg-surface-variant/90 transition-all duration-200"> <svg class="w-3 h-3 text-primary" fill="currentColor" viewBox="0 0 24 24"> <path d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1M10 17L6 13L7.41 11.59L10 14.17L16.59 7.58L18 9L10 17Z"></path> </svg> <span class="text-xs font-medium">100% Private</span> </div> </div> </div> ', " </body> </html>"])), addAttribute(Astro2.generator, "content"), title, renderHead(), renderSlot($$result, $$slots["default"]), renderScript($$result, "E:/smileyapp/src/layouts/BaseLayout.astro?astro&type=script&index=0&lang.ts"));
}, "E:/smileyapp/src/layouts/BaseLayout.astro", void 0);

export { $$BaseLayout as $ };
