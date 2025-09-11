import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';
import tailwind from '@astrojs/tailwind';
import AstroPWA from '@vite-pwa/astro';
import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  integrations: [
    preact(),
    tailwind(),
    AstroPWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,webp,mp3,ogg}'],
        navigateFallback: '/',
        runtimeCaching: [{
          urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
          handler: 'CacheFirst',
          options: {
            cacheName: 'google-fonts-cache',
            expiration: {
              maxEntries: 10,
              maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
            }
          }
        }]
      },
      manifest: {
        name: 'Smiley',
        short_name: 'Smile',
        description: 'Chat-first PWA with local open-weight AI models',
        theme_color: '#3b82f6',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  output: 'server',
  adapter: node({
    mode: 'middleware'
  }),
  server: {
    port: 3000
  }
});
