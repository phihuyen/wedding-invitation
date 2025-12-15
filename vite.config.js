import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  base: "/my-wedding/",
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "/api": {
        target:
          "https://script.google.com/macros/s/AKfycbxX8xqyU5LSt7LFaMtF46mrSPxz6BD7k7BLcd9JKTa0hL3qXuP7EiSN0URrklBrCHWXUQ/exec",
        changeOrigin: true,
        secure: false,
        rewrite: () =>
          "https://script.google.com/macros/s/AKfycbxX8xqyU5LSt7LFaMtF46mrSPxz6BD7k7BLcd9JKTa0hL3qXuP7EiSN0URrklBrCHWXUQ/exec",
      },
    },
  },
});
