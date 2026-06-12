import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'assets/logoAPP.png', 'assets/logo.jpeg'],
      manifest: {
        name: 'ÍXA · Pueblos Mágicos de Isla Mujeres',
        short_name: 'ÍXA',
        description:
          'Algoritmo de recomendación de experiencias turísticas auténticas y sostenibles en Isla Mujeres.',
        theme_color: '#0F3D2E',
        background_color: '#0F3D2E',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/',
        icons: [
          { src: '/assets/logoAPP.png', sizes: '192x192', type: 'image/png', purpose: 'any maskable' },
          { src: '/assets/logoAPP.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,jpg,jpeg,svg,woff2,mp4}'],
        maximumFileSizeToCacheInBytes: 6 * 1024 * 1024,
        runtimeCaching: [
          {
            urlPattern: ({ url }) => url.pathname.startsWith('/api'),
            handler: 'NetworkFirst',
            options: {
              cacheName: 'ixa-api-cache',
              expiration: { maxEntries: 80, maxAgeSeconds: 86400 },
            },
          },
        ],
      },
    }),
  ],
  server: {
    port: 5173,
    proxy: {
      '/api': 'http://localhost:8000',
    },
  },
})
