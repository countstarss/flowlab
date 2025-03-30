const { build } = require('esbuild');

build({
  entryPoints: ['src/index.ts', 'src/cli/index.ts'],
  outdir: 'dist',
  bundle: true,
  platform: 'node',
  target: 'node18',
  format: 'cjs', // ✅ 改成 CommonJS
  sourcemap: true,
  minify: false,
  banner: {
    js: '#!/usr/bin/env node'
  },
  outExtension: {
    '.js': '.cjs' // ✅ 输出为 .cjs 文件
  }
}).catch(() => process.exit(1));