import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'; 
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
    allowedHosts: ["14b5-2001-e68-692c-f00-4108-44ee-4b1f-f160.ngrok-free.app"],
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    // 将 CSS 注入 JS：彻底消除那 460ms 的外部 CSS 加载等待时间
    cssInjectedByJsPlugin(), 
    ViteImageOptimizer({
      test: /\.(jpe?g|png|gif|tiff|webp|svg)$/i,
      includePublic: true,
      logStats: true,
      svg: {
        multipass: true,
        plugins: [
          // 删除了 removeViewBox，确保 SVG 图标在任何尺寸下都清晰且比例正确
          { name: 'sortAttrs' },
          { name: 'removeDimensions' }, // 移除固定宽高，让 CSS 更好控制尺寸
        ],
      },
      png: { quality: 80 },
      jpeg: { quality: 75, mozjpeg: true },
      jpg: { quality: 75, mozjpeg: true },
      webp: { quality: 80 }, // 高质量 WebP，保护建筑摄影的线条细节
      avif: { quality: 70 },
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // 32KB 阈值：配合 CSS 内联插件，确保小资源不产生额外请求
    assetsInlineLimit: 32768, 
    cssMinify: true,
    reportCompressedSize: false, // 略微加快构建速度
    rollupOptions: {
      output: {
        // 强制不分包：减少 HTTP 请求往返，提升 LCP 发现速度
        manualChunks: undefined, 
      },
    },
  },
}));