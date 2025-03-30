import { getCurrentEventBus } from '../internal/context';

/**
 * 判断某个事件是否已绑定处理器
 * @param eventName 事件名
 */
export function isEventBound(eventName: string): boolean {
  const bus: any = getCurrentEventBus();
  return bus.handlers?.has(eventName) ?? false;
}