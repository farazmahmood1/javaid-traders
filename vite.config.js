import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // The catalogue rarely changes together with app code — cache it apart.
          if (id.includes('src/data/products.json')) return 'catalog'
          if (id.includes('node_modules/swiper')) return 'swiper'
          if (id.includes('node_modules/react')) return 'vendor'
          return undefined
        },
      },
    },
  },
})
