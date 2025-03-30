import { IEventBus } from '../types';
import { InMemoryBus } from '../bus/InMemoryBus';

/**
 * 当前事件总线实例（默认使用内存实现）
 */
let currentEventBus: IEventBus = new InMemoryBus();

/**
 * 获取当前事件总线实例
 */
export function getCurrentEventBus(): IEventBus {
  return currentEventBus;
}

/**
 * 替换当前使用的事件总线（可用于 Redis/Kafka）
 * @param bus 自定义实现的事件总线
 */
export function useEventBus(bus: IEventBus): void {
  currentEventBus = bus;
}