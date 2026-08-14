import path from 'path';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  // Deployed to the custom domain https://webcraftservices.online/ (see
  // public/CNAME) via GitHub Pages, so the site is served from the
  // domain root — base stays '/'. Every built asset URL and the Wouter
  // router base (see src/App.tsx, which reads import.meta.env.BASE_URL)
  // resolve relative to this. If the custom domain is ever removed and
  // the site falls back to the default
  // https://webcraftservices.github.io/ project URL, this can stay '/'
  // too, since that URL also serves from its own root.
  base: '/',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, 'src'),
    },
    dedupe: ['react', 'react-dom'],
  },
  root: path.resolve(import.meta.dirname),
  publicDir: path.resolve(import.meta.dirname, 'public'),
  build: {
    outDir: path.resolve(import.meta.dirname, 'dist'),
    emptyOutDir: true,
    chunkSizeWarningLimit: 700,
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: false,
  },
  preview: {
    host: '0.0.0.0',
    port: 4173,
  },
});
