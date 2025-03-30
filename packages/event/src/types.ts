// src/types.ts

export type EventPayload = any;

/**
 * 事件处理器函数类型
 */
export type EventHandler = (payload: EventPayload) => Promise<void>;

/**
 * EventBus 接口定义，支持 emit/on/off/start/stop 等
 */
export interface IEventBus {
  emit(eventName: string, payload: EventPayload): Promise<void>;
  on(eventName: string, handler: EventHandler): void;
  off(eventName: string, handler: EventHandler): void;
  start(): Promise<void>;
  stop(): Promise<void>;
}

/**
 * 事件总线选项
 */
export interface EventBusOptions {
  persistence?: boolean; // 是否持久化
  redisUrl?: string; // Redis 连接 URL
}

/**
 * 事件注册信息
 */
export interface EventRegistryEntry {
  eventName: string;
  handler: EventHandler;
}
