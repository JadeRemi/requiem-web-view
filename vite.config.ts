import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  // Use '/' for dev, '/requiem-web-view/' for production (GitHub Pages)
  base: mode === 'production' ? '/requiem-web-view/' : '/',
  build: {
    outDir: 'dist'
  }
}))
