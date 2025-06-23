import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      proxy: {
        "/api": {
          target: "https://hml-loyalty.bulls.games",
          changeOrigin: true,
          secure: false,
        },
      },
      port: parseInt(env.VITE_APP_PORT) || 3002,
    },
    preview: {
      port: parseInt(env.VITE_APP_PORT) || 4173,
    },
    test: {
      environment: 'jsdom',
    },
  };
});
