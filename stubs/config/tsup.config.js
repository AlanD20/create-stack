import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  outDir: 'dist',
  format: 'esm',
  splitting: true,
  treeshake: true,
  sourcemap: true,
  clean: true,
  minify: true,
  esbuildPlugins: [],
  esbuildOptions(options, context) {},
});
