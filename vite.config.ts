import { resolve } from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from '@honkhonk/vite-plugin-svgr'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

export default defineConfig(({ command, mode }) => {
  return {
    base: mode === 'development' ? '/' : '/react-admin-template-vite/',
    plugins: [
      svgr(),
      react(),
      createSvgIconsPlugin({
        iconDirs: [resolve(process.cwd(), 'src/assets/svg')],
        symbolId: 'icon-[dir]-[name]',
      }),
    ],
    resolve: {
      alias: {
        configs: resolve(__dirname, './src/configs'),
        components: resolve(__dirname, './src/components'),
        hooks: resolve(__dirname, './src/hooks'),
        assets: resolve(__dirname, './src/assets'),
        views: resolve(__dirname, './src/views'),
        router: resolve(__dirname, './src/router'),
        layouts: resolve(__dirname, './src/layouts'),
        store: resolve(__dirname, './src/store'),
        utils: resolve(__dirname, './src/utils'),
      },
    },

    // vite2.x
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
        },
      },
    },

    build: {
      cssCodeSplit: false,
    },

    server: {
      host: '0.0.0.0',
      port: 1970,
      open: true,
      proxy: {},
    },
  }
})
