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


export interface EventContext {
  // 事件的执行状态与数据
  state?: string;    // 当前任务的状态，成功/失败等
  data?: any;        // 传递的事件数据

  // 事件的控制方法
  emit: (event: string, payload: any) => Promise<void>;  // 触发下一个事件
  abort?: () => void; // 中止事件流

  // 其他上下文信息
  [key: string]: any;
}