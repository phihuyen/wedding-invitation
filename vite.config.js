import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
    base: '/my-wedding/',
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    server: {
        proxy: {
          '/api': {
                target: 'https://script.google.com/macros/s/AKfycbx3GP6TIo5plNswZybfWm25YwQtx6G7D3k5Qp8kLpxShdJVzXUNVg7Em9YA7c1rwOsT/exec',
                changeOrigin: true,
                secure: false,
                rewrite: () => 'https://script.google.com/macros/s/AKfycbx3GP6TIo5plNswZybfWm25YwQtx6G7D3k5Qp8kLpxShdJVzXUNVg7Em9YA7c1rwOsT/exec',
          }
        },
      },
});