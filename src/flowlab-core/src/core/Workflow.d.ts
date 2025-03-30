import type { NodeFunction, NodeOptions, WorkflowContext } from '../engine/types';

/**
 * Workflow 是链式定义的工作流任务流实例
 */
export declare class Workflow {
  constructor(name: string);

  addStep(
    name: string,
    fn: NodeFunction,
    options?: NodeOptions
  ): this;

  addParallelStep(
    steps: {
      name: string;
      fn: NodeFunction;
      options?: NodeOptions;
    }[]
  ): this;

  addCondition(
    condition: (input: any, context: WorkflowContext) => string | boolean,
    branches: Record<string, Workflow>
  ): this;

  addSubWorkflow(name: string, workflow: Workflow): this;

  run(input: any, context?: WorkflowContext): Promise<any>;
}