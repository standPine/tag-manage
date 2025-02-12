import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // hmr: {
    //   overlay: true, // 启用：开发服务器错误的屏蔽；这个与vite-plugin-eslint插件配合，形成 发现eslint错误会在项目界面显示错误
    // },
  },
  modules: {
    hashPrefix: 'prefix',
    generateScopedName: '[name]__[local]__[hash:base64:5]',
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true, // 支持内联 JavaScript
        modifyVars: { // 更改主题
        },
      },
    },
  },
})
