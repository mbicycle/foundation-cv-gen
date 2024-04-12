import react from '@vitejs/plugin-react';
import { defineConfig, splitVendorChunkPlugin } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import checker from "vite-plugin-checker";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    splitVendorChunkPlugin(),
    checker({
      typescript: true,
    }),
    VitePWA({
      injectRegister: 'auto',
      registerType: 'autoUpdate',
      workbox: {
        sourcemap: true,
      },
    }),
  ],
  server: {
    port: 3001,
  },
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.svg'],
  },
});
