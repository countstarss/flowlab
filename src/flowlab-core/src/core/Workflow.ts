import { NodeFunction, NodeOptions, Step } from '../engine/types';
import { ConditionNode, SubWorkflowNode, BaseNode } from '../nodes';
import { Runner } from '../engine/runner/Runner';

/**
 * Workflow 类用于组织节点结构，支持顺序、并行、条件、子流程等组合方式
 */
export class Workflow {
  name: string;
  private steps: Step[] = [];

  constructor(name: string) {
    this.name = name;
  }

  /**
   * 添加一个顺序节点
   */
  addStep(name: string, fn: NodeFunction, options?: NodeOptions): this {
    const node = new BaseNode(name, fn, options);
    this.steps.push({ type: 'step', node });
    return this;
  }

  /**
   * 添加并行执行的多个节点
   */
  addParallelStep(steps: { name: string; fn: NodeFunction; options?: NodeOptions }[]): this {
    const nodes = steps.map(s => new BaseNode(s.name, s.fn, s.options));
    this.steps.push({ type: 'parallel', nodes });
    return this;
  }

  /**
   * 添加一个条件分支（根据数据决定流程分支）
   */
  addCondition(
    conditionFn: (data: any) => string | boolean,
    branches: Record<string, Workflow>
  ): this {
    const conditionNode = new ConditionNode('condition', conditionFn, branches);
    this.steps.push({ type: 'condition', node: conditionNode });
    return this;
  }

  /**
   * 添加一个子工作流
   */
  addSubWorkflow(name: string, workflow: Workflow): this {
    const subNode = new SubWorkflowNode(name, workflow);
    this.steps.push({ type: 'subworkflow', node: subNode });
    return this;
  }

  /**
   * 执行工作流
   */
  async run(input: any, context: Record<string, any> = {}) {
    const runner = new Runner(this.steps, this.name, context);
    return await runner.execute(input);
  }
}