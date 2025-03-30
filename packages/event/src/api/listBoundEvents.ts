import { getCurrentEventBus } from '../internal/context';

/**
 * 列出当前绑定的所有事件名（仅限内存实现）
 */
export function listBoundEvents(): string[] {
  const bus: any = getCurrentEventBus();
  return bus.handlers ? Array.from(bus.handlers.keys()) : [];
}