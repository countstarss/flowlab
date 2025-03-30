// src/api/emitEvent.ts

import { EventBus } from '../bus/EventBus';

export async function emitEvent(event: string, payload: any, bus: EventBus ) {
  await bus.emit(event, payload);
}