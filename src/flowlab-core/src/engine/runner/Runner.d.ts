import type { Step } from '../types';

/**
 * Runner 模块类型定义
 */
export interface RunnerInterface {
  /**
   * 初始化执行器
   * @param steps 工作流步骤数组
   * @param workflowName 工作流名称
   * @param context 执行上下文（租户ID、用户角色等）
   */
  new (steps: Step[], workflowName: string, context: Record<string, any>): RunnerInterface;

  /**
   * 执行完整工作流
   * @param input 初始输入数据
   * @returns 最终输出
   */
  execute(input: any): Promise<any>;
}