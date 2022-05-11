import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { chunkSplitPlugin } from "vite-plugin-chunk-split";
import legacy from "@vitejs/plugin-legacy"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    chunkSplitPlugin({
      // 抽取react、react-dom
      customSplitting: {
        "react-vendor": ["react", "react-dom"]
      }
    }),
    legacy({
      // 设置目标浏览器，browserslist 配置语法
      targets: ["ie >= 11"]
    })],
  server: {
    port: 8080
  }
})
