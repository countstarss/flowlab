// ==========================
// 🧠 Node 类型定义
// ==========================

/**
 * 节点执行函数类型
 * @template Input 节点输入类型
 * @template Output 节点输出类型
 * @template Context 上下文类型
 */
export type NodeFunction<Input = any, Output = any, Context = any> = (
  input: Input,
  context: Context
) => Promise<Output>;

/**
 * 节点元信息（用于注册描述）
 */
export interface NodeMetadata {
  name: string;
  description?: string;
}

/**
 * 节点注册条目
 */
export interface NodeRegistryEntry<Input = any, Output = any, Context = any> {
  metadata: NodeMetadata;
  nodeFunction: NodeFunction<Input, Output, Context>;
}

/**
 * 节点执行参数（可选）
 */
export interface NodeOptions {
  retries?: number;
  timeout?: number;
  condition?: (input: any, context?: any) => boolean;
}

// ==========================
// 🧱 Step 类型（用于工作流运行器）
// ==========================

/**
 * 单步任务节点结构
 */
export type Step =
  | { type: 'step'; node: any }
  | { type: 'parallel'; nodes: any[] }
  | { type: 'condition'; node: any }
  | { type: 'subworkflow'; node: any };

// ==========================
// ⚙️ Scheduler 类型（轻量，无需单独接口）
// ==========================

export interface SchedulerOptions {
  delay?: number;
  repeat?: boolean;
  cron?: string;
}

// ==========================
// 🛑 Error Handler 类型
// ==========================

export interface TaskErrorInfo {
  taskName: string;
  message: string;
  raw: unknown;
  timestamp: string;
}

export type TaskErrorHandler = (errorInfo: TaskErrorInfo) => void;

// ==========================
// 📊 Status Tracker 类型
// ==========================

export type TaskStatus = 'PENDING' | 'RUNNING' | 'COMPLETED' | 'FAILED' | 'SKIPPED';

export interface TaskStatusMap {
  [nodeName: string]: TaskStatus;
}

// ==========================
// 📦 Persistence（引用外部模块）
// ==========================

export { TaskState, WorkflowSnapshot, PersistenceEngine } from '../persistence/types';

// ==========================
// 🌐 工作流上下文类型
// ==========================

/**
 * Workflow 执行上下文
 */
export interface WorkflowContext {
  tenantId?: string;
  userId?: string;
  userRole?: string;
  traceId?: string;
  locale?: string;
  [key: string]: any;
}