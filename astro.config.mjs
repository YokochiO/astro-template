import compress from 'astro-compress'
import { defineConfig } from 'astro/config'

// https://astro.build/config
export default defineConfig({
  integrations: [
    compress({
      css: false,
      img: false,
      svg: false,
      html: {
        removeAttributeQuotes: false,
      },
    }),
  ],
  vite: {
    build: {
      cssCodeSplit: false,
      cssMinify: false,
    },
  },
})
