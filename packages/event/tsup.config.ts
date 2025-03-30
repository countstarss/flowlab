import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts', 'src/cli/index.ts'], // ✅ 这两个必须都存在
  format: ['esm', 'cjs'],
  splitting: false,
  sourcemap: true,
  dts: true, // 只会对 src/index.ts 生成类型
  clean: true,
  target: 'esnext',
  outDir: 'dist',
  banner: {
    js: '#!/usr/bin/env node'
  }
});