import { Workflow } from '@flowlab/core';
import { bindEvent } from './bindEvent';

/**
 * 将一个工作流绑定到事件上
 * @param eventName 事件名称
 * @param workflow 要运行的工作流实例
 */
export function registerWorkflow(eventName: string, workflow: Workflow): void {
  bindEvent(eventName, async (payload) => {
    await workflow.run(payload);
  });
}