import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_BjBG35g0.mjs';
import { manifest } from './manifest_BY23wCPV.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/api/ollama.astro.mjs');
const _page2 = () => import('./pages/api/ollama-health.astro.mjs');
const _page3 = () => import('./pages/privacy.astro.mjs');
const _page4 = () => import('./pages/setup.astro.mjs');
const _page5 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/.pnpm/astro@5.13.2_@types+node@22.17.2_jiti@1.21.7_rollup@2.79.2_terser@5.43.1_typescript@5.9.2_yaml@2.8.1/node_modules/astro/dist/assets/endpoint/node.js", _page0],
    ["src/pages/api/ollama.ts", _page1],
    ["src/pages/api/ollama-health.ts", _page2],
    ["src/pages/privacy.astro", _page3],
    ["src/pages/setup.astro", _page4],
    ["src/pages/index.astro", _page5]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./_noop-actions.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "mode": "middleware",
    "client": "file:///workspaces/smileyapp/dist/client/",
    "server": "file:///workspaces/smileyapp/dist/server/",
    "host": false,
    "port": 3000,
    "assets": "_astro",
    "experimentalStaticHeaders": false
};
const _exports = createExports(_manifest, _args);
const handler = _exports['handler'];
const startServer = _exports['startServer'];
const options = _exports['options'];
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { handler, options, pageMap, startServer };
