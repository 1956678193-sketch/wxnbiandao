import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const MATERIAL_ROOT = 'C:/Users/HP/Desktop/制作网站资料'

export default defineConfig({
  plugins: [react()],
  // GitHub Pages：仓库名是「用户名.github.io」时网址就在根目录，用 '/'
  // 如果是普通项目仓库（网址带 /仓库名/），把这里改成 '/仓库名/'
  base: '/',
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
