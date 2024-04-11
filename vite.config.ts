import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  preview: {
    host: true,
    port: 3000
  },
  server: {
    host: true,
    port: 3000,
    watch: {
      usePolling: true
    }
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@css": path.resolve(__dirname, "src/assets/css"),
      "@api2": path.resolve(__dirname, "src/api/v2")
    }
  }
})
