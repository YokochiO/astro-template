import compress from 'astro-compress'
import { defineConfig } from 'astro/config'

// https://astro.build/config
export default defineConfig({
  integrations: [
    compress({
      // css, jsの圧縮は自前でやる
      css: false,
      js: false,
      // svgはviewBoxを勝手に削除しないように
      svg: {
        plugins: [
          {
            name: 'preset-default',
            params: {
              overrides: {
                removeViewBox: false,
              },
            },
          },
        ],
      },
      // htmlの属性値は常にクオートする
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
    server: {
      watch: {
        usePolling: true,
      },
    },
  },
})
