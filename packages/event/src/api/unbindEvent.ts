import { EventHandler } from '../types';
import { getCurrentEventBus } from '../internal/context';

/**
 * 从事件中解绑一个处理器（或所有）
 * @param eventName 事件名
 * @param handler 可选的具体处理器
 */
export function unbindEvent(eventName: string, handler?: EventHandler): void {
  if (handler) {
    getCurrentEventBus().off(eventName, handler);
  }
}