import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    proxy: {
      // 代理规则示例：将所有 /api 开头的请求转发到目标服务器
      '/api': {
        target: 'http://localhost:3001', // 后端地址
        changeOrigin: true, // 修改请求头中的 Origin 为目标地址
      },
    },
  },
  css: {
     preprocessorOptions: {
      scss: {
        additionalData: ``, // 不处理 SCSS
      },
    },
  }
})
