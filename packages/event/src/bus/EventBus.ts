import { IEventBus, EventHandler, EventPayload } from '../types';

/**
 * EventBus 抽象基类，提供 emit/on/off 的基础能力
 */
export abstract class EventBus implements IEventBus {
  protected handlers: Map<string, Set<EventHandler>> = new Map();

  /**
   * 触发事件
   * @param eventName - 事件名称
   * @param payload - 事件数据
   */
  async emit(eventName: string, payload: EventPayload): Promise<void> {
    const handlers = this.handlers.get(eventName);
    if (handlers) {
      for (const handler of handlers) {
        try {
          await handler(payload);
        } catch (err) {
          console.error(`[FlowLab EventBus] Error handling event ${eventName}`, err);
        }
      }
    }
  }

  /**
   * 绑定事件处理器
   * @param eventName - 事件名称
   * @param handler - 事件处理函数
   */
  on(eventName: string, handler: EventHandler): void {
    if (!this.handlers.has(eventName)) {
      this.handlers.set(eventName, new Set());
    }
    this.handlers.get(eventName)?.add(handler);
  }

  /**
   * 解绑事件处理器
   * @param eventName - 事件名称
   * @param handler - 事件处理函数
   */
  off(eventName: string, handler: EventHandler): void {
    this.handlers.get(eventName)?.delete(handler);
  }

  /**
   * 启动事件监听（由子类实现）
   */
  abstract start(): Promise<void>;

  /**
   * 停止事件监听（由子类实现）
   */
  abstract stop(): Promise<void>;
}
