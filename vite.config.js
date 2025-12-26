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
          "https://script.google.com/macros/s/AKfycbw18ZRYPgZM2b8r8DXPGRV6BWyv8J09JqPgBlpY_C1R-kV7FVJYUHYDSONCEbf_5EOM0Q/exec",
        changeOrigin: true,
        secure: false,
        rewrite: () =>
          "https://script.google.com/macros/s/AKfycbw18ZRYPgZM2b8r8DXPGRV6BWyv8J09JqPgBlpY_C1R-kV7FVJYUHYDSONCEbf_5EOM0Q/exec",
      },
    },
  },
});
