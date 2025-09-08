import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [preact(), tailwindcss()],
  server: {
    host: true,                 // listen on 0.0.0.0
    allowedHosts: ['frontend'], // allow Docker service name
  },
})
