import type { Workflow } from '../../core/Workflow';

/**
 * Scheduler 模块类型定义
 */

export interface SchedulerInterface {
  /**
   * 延迟执行工作流
   * @param delay 延迟时间（毫秒）
   * @param workflow 要执行的工作流实例
   * @param input 初始输入数据
   * @param context 上下文（例如 tenantId、userId 等）
   */
  scheduleWithDelay(
    delay: number,
    workflow: Workflow,
    input: any,
    context?: Record<string, any>
  ): void;

  /**
   * 立即执行工作流（模拟调度中心直接触发）
   */
  runNow(
    workflow: Workflow,
    input: any,
    context?: Record<string, any>
  ): Promise<any>;
}