import compress from 'astro-compress'
import { defineConfig } from 'astro/config'

// https://astro.build/config
export default defineConfig({
  integrations: [
    compress({
      css: {
        sourceMap: true,
      },
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
