// src/api/emitEvent.ts

import { EventPayload } from '../types';
import { getCurrentEventBus } from '../internal/context';

/**
 * 触发事件
 * @param eventName - 事件名称
 * @param payload - 传递的数据
 */
export async function emitEvent(eventName: string, payload: EventPayload): Promise<void> {
  const bus = getCurrentEventBus();
  await bus.emit(eventName, payload);
}
