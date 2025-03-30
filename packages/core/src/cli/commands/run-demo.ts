import { demo } from '../../../test/demo';

export async function runDemoWorkflow() {
  console.log('🚀 运行 FlowLab 示例工作流...');
  await demo(); // 你可以导出 test/demo.ts 中的 demo() 函数
}