import { defineConfig } from 'tsup';

// 这里定义了 tsup 配置
export default defineConfig({
  entry: ['cli/flowlab.ts'], // 入口文件，可以根据需要调整
  format: ['cjs', 'esm'],                      // 输出格式：CommonJS 和 ESM
  dts: true,                                   // 生成 d.ts 类型定义文件
  outDir: 'dist',                              // 输出目录
  external: ['fs'],                            // 排除掉 Node.js 内置模块，如 fs，不需要打包
  splitting: true,                             // 分割文件，按需加载
  clean: true,
  banner: {
    js: '#!/usr/bin/env node'
  }                                 // 构建前清理输出文件夹
});