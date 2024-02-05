import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import EnvironmentPlugin from "vite-plugin-environment";

export default defineConfig({
  plugins: [react(), EnvironmentPlugin("all")],
  server: {
    host: true,
    proxy: {
      "/api/web": {
        target: "https://afyaiii-qa.rasxp.com",
        changeOrigin: true,
        configure: (_proxy, _options) => {},
      },

      "^/fallback/.*": {
        target: "https://afyaiii-qa.rasxp.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/fallback/, ""),
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
