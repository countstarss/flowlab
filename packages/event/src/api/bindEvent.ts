import { EventHandler } from '../types';
import { getCurrentEventBus } from '../internal/context';

/**
 * 绑定一个事件处理函数到指定事件
 * @param eventName 事件名
 * @param handler 处理函数
 */
export function bindEvent(eventName: string, handler: EventHandler): void {
  getCurrentEventBus().on(eventName, handler);
}