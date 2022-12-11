import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  outDir: 'dist',
  format: 'cjs',
  splitting: true,
  treeshake: true,
  sourcemap: true,
  clean: true,
  minify: true,
  esbuildPlugins: [],
  esbuildOptions(options, context) {},
});
