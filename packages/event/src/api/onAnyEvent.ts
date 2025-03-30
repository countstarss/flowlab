import { EventPayload, EventHandler } from '../types';
import { getCurrentEventBus } from '../internal/context';

/**
 * 全局监听所有事件（仅支持 InMemory 实现）
 * @param callback (eventName, payload) => void
 */
export function onAnyEvent(callback: (eventName: string, payload: EventPayload) => void): void {
  const bus: any = getCurrentEventBus();
  const originalEmit = bus.emit.bind(bus);

  // 重写 emit 方法用于 hook
  bus.emit = async (eventName: string, payload: EventPayload) => {
    callback(eventName, payload);
    return originalEmit(eventName, payload);
  };
}