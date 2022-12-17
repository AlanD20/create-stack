import { defineConfig } from 'rollup';
import json from '@rollup/plugin-json';
import { uglify } from 'rollup-plugin-uglify';
import commonjs from '@rollup/plugin-commonjs';
import tsConfigPaths from 'rollup-plugin-ts-paths';
import typescript from '@rollup/plugin-typescript';
import { hoistImportDeps } from 'rollup-plugin-hoist-import-deps';
import babel, { getBabelOutputPlugin } from '@rollup/plugin-babel';

const prod = process.env.NODE_ENV === 'production' ? true : false;

export default defineConfig({
  treeshake: prod,
  watch: !prod,
  input: 'src/index.ts',
  output: {
    dir: 'dist',
    format: 'esm',
    plugins: [
      // Go through babel
      getBabelOutputPlugin({
        presets: ['@babel/preset-env'],
      }),
      // Minify output files
      uglify(),
    ],
  },
  plugins: [
    // Acess json as ES Module
    json(),
    // Resolve paths in tsconfig
    tsConfigPaths(),
    // Compile ts files
    typescript(),
    hoistImportDeps(),
    // Convert to cjs
    commonjs({
      extensions: ['.js', '.ts'],
    }),
    // Compile with babel
    babel({
      exclude: ['node_modules', 'test'],
      babelHelpers: 'bundled',
      presets: ['@babel/preset-env'],
    }),
  ],
});
