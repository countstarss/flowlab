import { getCurrentEventBus } from '../internal/context';

/**
 * 停止事件监听器
 */
export async function stopEventListener(): Promise<void> {
  await getCurrentEventBus().stop();
}