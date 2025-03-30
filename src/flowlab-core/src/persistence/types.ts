export type TaskState = 'PENDING' | 'RUNNING' | 'COMPLETED' | 'FAILED';

export interface WorkflowSnapshot {
  workflowId: string;
  name: string;
  data: any;
  states: Record<string, TaskState>;
  updatedAt: string;
}

export interface PersistenceEngine {
  save(workflowId: string, snapshot: WorkflowSnapshot): Promise<void>;
  load(workflowId: string): Promise<WorkflowSnapshot | null>;
  updateStatus(workflowId: string, nodeId: string, status: TaskState): Promise<void>;
  clear(workflowId: string): Promise<void>;
}