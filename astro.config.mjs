import { defineConfig } from 'astro/config'

// https://astro.build/config
export default defineConfig({
  trailingSlash: 'always',
  build: {
    format: 'directory',
  },
  vite: {
    css: {
      devSourcemap: true,
    },
  },
})
