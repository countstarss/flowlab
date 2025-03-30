import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  splitting: false,
  sourcemap: true,
  dts: true, // 关键：生成 index.d.ts
  clean: true,
  target: 'esnext',
  outDir: 'dist',
  banner: {
    js: '#!/usr/bin/env node'
  },
  shims: false
});