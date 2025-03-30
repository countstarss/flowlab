/**
 * 错误对象格式
 */
export interface TaskErrorInfo {
  taskName: string;
  message: string;
  raw: unknown;
  timestamp: string;
}

/**
 * 全局错误处理器类型
 */
export type TaskErrorHandler = (errorInfo: TaskErrorInfo) => void;

export interface ErrorHandlerInterface {
  register(handler: TaskErrorHandler): void;
  handleNodeError(taskName: string, error: unknown): void;
}