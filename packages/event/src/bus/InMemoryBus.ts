import { EventBus } from './EventBus';

/**
 * InMemoryBus 是默认的事件总线实现，基于内存事件分发
 */
export class InMemoryBus extends EventBus {
  private running: boolean = false;

  async start(): Promise<void> {
    this.running = true;
    console.log('[FlowLab] ✅ InMemory EventBus started successfully');
  }

  async stop(): Promise<void> {
    this.running = false;
    console.log('[FlowLab] 🛑 InMemory EventBus stopped');
  }

  isRunning(): boolean {
    return this.running;
  }
}