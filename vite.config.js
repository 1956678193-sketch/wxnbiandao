import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const MATERIAL_ROOT = 'C:/Users/HP/Desktop/制作网站资料'

export default defineConfig({
  plugins: [react()],
  // 本地开发用 '/'；打包上线时因为仓库名是 wxnbiandao，
  // 网址是 https://1956678193-sketch.github.io/wxnbiandao/，所以要加这个前缀
  base: process.env.GITHUB_PAGES === '1' ? '/wxnbiandao/' : '/',
  build: {
    // Pages 直接从 main 分支的 docs 目录托管，不用额外配 Actions
    outDir: 'docs',
    emptyOutDir: true,
  },
  server: {
    // 0.0.0.0 = 同一 WiFi 下的手机、平板、别人电脑也能用局域网 IP 打开
    host: '0.0.0.0',
    port: 5175,
    strictPort: true,
    fs: {
      allow: [MATERIAL_ROOT],
    },
  },
})
