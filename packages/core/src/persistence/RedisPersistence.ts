import IORedis from 'ioredis';
import { PersistenceEngine, TaskState, WorkflowSnapshot } from './types';

/**
 * 基于 ioredis 的 Redis 持久化实现
 * 适用于分布式状态共享、工作流恢复等场景
 */
export class RedisPersistence implements PersistenceEngine {
  private redis: IORedis;
  private readonly keyPrefix: string = 'flowlab:workflow:';

  constructor(redisUrl = 'redis://localhost:6379') {
    this.redis = new IORedis(redisUrl);
  }

  /**
   * 保存工作流快照（完整数据）
   */
  async save(workflowId: string, snapshot: WorkflowSnapshot): Promise<void> {
    const key = this._getKey(workflowId);
    await this.redis.set(key, JSON.stringify(snapshot));
  }

  /**
   * 加载工作流快照（用于恢复状态）
   */
  async load(workflowId: string): Promise<WorkflowSnapshot | null> {
    const key = this._getKey(workflowId);
    const raw = await this.redis.get(key);
    return raw ? JSON.parse(raw) : null;
  }

  /**
   * 更新某个节点的状态
   */
  async updateStatus(workflowId: string, nodeId: string, status: TaskState): Promise<void> {
    const snap = await this.load(workflowId);
    if (!snap) return;

    snap.states[nodeId] = status;
    snap.updatedAt = new Date().toISOString();

    await this.save(workflowId, snap);
  }

  /**
   * 清除指定工作流快照
   */
  async clear(workflowId: string): Promise<void> {
    const key = this._getKey(workflowId);
    await this.redis.del(key);
  }

  /**
   * 生成 Redis 存储 key
   */
  private _getKey(workflowId: string): string {
    return `${this.keyPrefix}${workflowId}`;
  }
}