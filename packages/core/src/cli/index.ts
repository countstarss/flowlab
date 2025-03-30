#!/usr/bin/env node

import { Command } from 'commander';
import { listNodes } from './commands/list-nodes';
import { runDemoWorkflow } from './commands/run-demo';

const program = new Command();

program
  .name('flowlab')
  .description('FlowLab CLI: 工作流开发与测试工具')
  .version('0.1.0');

program
  .command('list')
  .description('列出所有注册节点')
  .action(listNodes);

program
  .command('run')
  .description('运行示例工作流')
  .action(runDemoWorkflow);

program.parse(process.argv);