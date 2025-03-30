import { TaskErrorHandler } from '../types';

/**
 * ErrorHandler 用于统一处理节点执行中的异常
 */
export class ErrorHandler {
  private static globalHandler: TaskErrorHandler | null = null;

  /**
   * 设置全局错误处理函数（可用于监控系统、日志平台）
   */
  static register(handler: TaskErrorHandler) {
    ErrorHandler.globalHandler = handler;
  }

  /**
   * 处理节点异常
   * @param taskName 当前节点/工作流名称
   * @param error 异常对象
   */
  static handleNodeError(taskName: string, error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    const timestamp = new Date().toISOString();

    console.error(`❗ [ErrorHandler] 节点 "${taskName}" 执行失败`);
    console.error(`[${timestamp}] ${message}`);

    // 触发用户自定义处理器（如 Sentry、Slack、LogRocket）
    if (ErrorHandler.globalHandler) {
      ErrorHandler.globalHandler({
        taskName,
        message,
        raw: error,
        timestamp
      });
    }
  }
}