import { TaskStatusMap, TaskStatus } from '../types';

/**
 * StatusTracker 状态追踪器
 * 每个工作流执行都会创建一份状态记录表
 */
export class StatusTracker {
  private workflowName: string;
  private statusMap: TaskStatusMap;

  constructor(workflowName: string) {
    this.workflowName = workflowName;
    this.statusMap = {};
  }

  /**
   * 更新某个任务节点的状态
   * @param nodeName 节点名称
   * @param status 状态值
   */
  public update(nodeName: string, status: TaskStatus) {
    this.statusMap[nodeName] = status;
    console.log(`[${this.workflowName}] 任务 ${nodeName} 状态更新为 ${status}`);
  }

  /**
   * 获取某个任务的当前状态
   * @param nodeName 节点名称
   */
  public getStatus(nodeName: string): TaskStatus | undefined {
    return this.statusMap[nodeName];
  }

  /**
   * 获取当前整个工作流的状态快照
   */
  public getAll(): TaskStatusMap {
    return this.statusMap;
  }

  /**
   * 重置状态（用于回放或清理）
   */
  public reset() {
    this.statusMap = {};
  }
}