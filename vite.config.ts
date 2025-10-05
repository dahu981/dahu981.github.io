import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: '/',  // ← Jetzt Root statt Subpfad!
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icon-192.png', 'icon-512.png'],
      manifest: {
        name: 'MedStudy Planner',
        short_name: 'MedPlanner',
        description: 'Studienplaner für Medizinstudenten',
        theme_color: '#b5967d',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/',  // ← Root!
        scope: '/',      // ← Root!
        icons: [
          {
            src: '/icon-192.png',  // ← Keine Subpfade mehr!
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/icon-512.png',  // ← Keine Subpfade mehr!
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}']
      }
    })
  ]
})