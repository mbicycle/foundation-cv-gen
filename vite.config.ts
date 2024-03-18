import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    port: 3001,
  },
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.svg'],
  },
});
