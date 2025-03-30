/**
 * 状态类型枚举
 */
export type TaskStatus = 'PENDING' | 'COMPLETED' | 'FAILED' | 'SKIPPED';

export interface TaskStatusMap {
  [nodeName: string]: TaskStatus;
}

export interface StatusTrackerInterface {
  update(nodeName: string, status: TaskStatus): void;
  getStatus(nodeName: string): TaskStatus | undefined;
  getAll(): TaskStatusMap;
  reset(): void;
}