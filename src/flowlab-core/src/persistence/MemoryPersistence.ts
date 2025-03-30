import { PersistenceEngine, WorkflowSnapshot, TaskState } from './types';

/**
 * MemoryPersistence 是默认实现，适用于本地开发、测试场景
 */
export class MemoryPersistence implements PersistenceEngine {
  private store: Map<string, WorkflowSnapshot> = new Map();

  async save(workflowId: string, snapshot: WorkflowSnapshot): Promise<void> {
    this.store.set(workflowId, snapshot);
  }

  async load(workflowId: string): Promise<WorkflowSnapshot | null> {
    return this.store.get(workflowId) || null;
  }

  async updateStatus(workflowId: string, nodeId: string, status: TaskState): Promise<void> {
    const snap = this.store.get(workflowId);
    if (snap) {
      snap.states[nodeId] = status;
      snap.updatedAt = new Date().toISOString();
      this.store.set(workflowId, snap);
    }
  }

  async clear(workflowId: string): Promise<void> {
    this.store.delete(workflowId);
  }
}