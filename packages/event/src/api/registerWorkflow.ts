import { Workflow } from '@flowlab/core';
import { bindEvent } from './bindEvent';
import { EventContext } from '../internal/context';
import { EventBus } from '../bus/EventBus';

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


// 绑定事件与工作流的执行
export function bindWorkflowToEvent(
  event: string,
  handler: (payload: any, ctx: EventContext) => Promise<void>,
  options: { bus: EventBus }
) {
  options.bus.on(event, async (payload: any) => {
    const context: EventContext = {
      emit: (nextEvent, nextPayload) => options.bus.emit(nextEvent, nextPayload),
      data: payload,  // 当前事件的传递数据
    };
    await handler(payload, context);  // 触发处理函数
  });
}