import { svelte } from '@sveltejs/vite-plugin-svelte';
// import { fileURLToPath } from 'node:url';
// import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';
// import tsconfigPaths from 'vite-tsconfig-paths';

import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';

export default defineConfig({
  cacheDir: '../../node_modules/.vite/svelte',

  plugins: [
    svelte(),
    nxViteTsPaths(),
  ],

  server: {
    port: 4200,
    host: 'localhost',
    fs: {
      allow: [process.cwd()],
    },
  },

  preview: {
    port: 4300,
    host: 'localhost',
  },

  // resolve: {
  //   alias: {
  //     '@redish/counter': fileURLToPath(
  //       new URL('/libs/counter/src/index.ts', import.meta.url)
  //     ),
  //   },
  // },
});
