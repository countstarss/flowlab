import { Workflow } from '../../core/Workflow';

/**
 * Scheduler 模块
 * 用于延迟执行工作流或设置计划任务
 */
export class Scheduler {
  /**
   * 延迟执行工作流（模拟定时器）
   * @param delay 延迟时间（毫秒）
   * @param workflow 要执行的工作流
   * @param input 初始输入数据
   * @param context 执行上下文（例如 tenantId, userId 等）
   */
  static scheduleWithDelay(
    delay: number,
    workflow: Workflow,
    input: any,
    context: Record<string, any> = {}
  ): void {
    console.log(`[Scheduler] 将在 ${delay}ms 后执行工作流: ${workflow.name}`);

    setTimeout(() => {
      workflow.run(input, context)
        .then(() => {
          console.log(`[Scheduler] 工作流 ${workflow.name} 执行完成`);
        })
        .catch(err => {
          console.error(`[Scheduler] 工作流 ${workflow.name} 执行失败`, err);
        });
    }, delay);
  }

  /**
   * 立即执行（但由 scheduler 控制，例如用于调度中心）
   */
  static runNow(
    workflow: Workflow,
    input: any,
    context: Record<string, any> = {}
  ) {
    console.log(`[Scheduler] 立即执行工作流: ${workflow.name}`);
    return workflow.run(input, context);
  }
}