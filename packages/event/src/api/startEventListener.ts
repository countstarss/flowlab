import { getCurrentEventBus } from '../internal/context';

/**
 * 启动事件监听器（如果是内存实现则为 noop）
 */
export async function startEventListener(): Promise<void> {
  await getCurrentEventBus().start();
}