import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/requiem-web-view/',
  build: {
    outDir: 'dist'
  }
})
