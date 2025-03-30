import type { NodeFunction, NodeOptions, WorkflowContext } from '../engine/types';

/**
 * Workflow 是工作流的实例类
 * 支持通过链式调用添加步骤、分支、并行节点、子流程等
 */
export declare class Workflow {
  constructor(name: string);

  /**
   * 添加一个串行任务步骤
   * @param name 节点名称
   * @param fn 节点函数
   * @param options 可选配置项（超时、重试、条件等）
   */
  addStep(
    name: string,
    fn: NodeFunction,
    options?: NodeOptions
  ): this;

  /**
   * 添加多个并行步骤（会同时执行）
   * @param steps 节点列表（包含名称、函数、配置）
   */
  addParallelStep(
    steps: {
      name: string;
      fn: NodeFunction;
      options?: NodeOptions;
    }[]
  ): this;

  /**
   * 添加一个条件节点（动态控制后续执行路径）
   * @param condition 条件函数，返回布尔值或字符串分支
   * @param branches 分支对应的子工作流集合
   */
  addCondition(
    condition: (input: any, context: WorkflowContext) => string | boolean,
    branches: Record<string, Workflow>
  ): this;

  /**
   * 添加一个嵌套子工作流节点
   * @param name 节点名称
   * @param workflow 子工作流实例
   */
  addSubWorkflow(
    name: string,
    workflow: Workflow
  ): this;

  /**
   * 执行整个工作流
   * @param input 初始输入数据
   * @param context 上下文（如租户、用户信息等）
   */
  run(
    input: any,
    context?: WorkflowContext
  ): Promise<any>;
}