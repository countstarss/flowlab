import { EventBus } from './EventBus';
import Redis from 'ioredis';

/**
 * RedisBus 是通过 Redis Pub/Sub 实现的事件总线
 * 注意：你需要先安装 ioredis：npm i ioredis
 */
export class RedisBus extends EventBus {
  private pub: Redis;
  private sub: Redis;
  private readonly channelPrefix: string = 'flowlab:event:';

  constructor(redisUrl: string) {
    super();
    this.pub = new Redis(redisUrl);
    this.sub = new Redis(redisUrl);
  }

  async start(): Promise<void> {
    this.sub.on('message', async (channel, message) => {
      const eventName = channel.replace(this.channelPrefix, '');
      const payload = JSON.parse(message);
      const handlers = this.handlers.get(eventName);
      if (handlers) {
        for (const handler of handlers) {
          await handler(payload);
        }
      }
    });

    // 订阅所有已注册事件
    for (const eventName of this.handlers.keys()) {
      await this.sub.subscribe(this.channelPrefix + eventName);
    }

    console.log('[FlowLab] ✅ Redis EventBus started successfully');
  }

  async emit(eventName: string, payload: any): Promise<void> {
    const message = JSON.stringify(payload);
    await this.pub.publish(this.channelPrefix + eventName, message);
  }

  async stop(): Promise<void> {
    await this.sub.quit();
    await this.pub.quit();
    console.log('[FlowLab] 🛑 Redis EventBus stopped');
  }
}

// MARK: 使用示例

/*
* import { useEventBus } from '@flowlab/event';
* import { RedisBus } from '@flowlab/event/dist/bus/RedisBus';
* 
* useEventBus(new RedisBus('redis://localhost:6379'));
*/
