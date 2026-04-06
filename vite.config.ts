import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import vitePrerender from "vite-plugin-prerender";

const projectRoutes = [
  "/project/ritz-carlton",
  "/project/rabbit-hole",
  "/project/courtyard-house",
  "/project/eco-sanctuary",
  "/project/east-meets-west",
  "/project/iconic-terrace",
  "/project/sutera-terrace",
  "/project/indah-putra",
  "/project/horizon-hills",
  "/project/chicha-san-chen",
  "/project/winter-pavillion",
  "/project/founders-penang",
  "/project/aor-house",
  "/project/langkawi-kitchen",
  "/project/beach-grill",
];

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    mode === "production" &&
      vitePrerender({
        staticDir: path.join(__dirname, "dist"),
        routes: ["/", "/about", "/services", "/contact", ...projectRoutes],
      }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
