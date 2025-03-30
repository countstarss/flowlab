import { BaseNode } from '../nodes/BaseNode';
import { ConditionNode } from '../nodes/ConditionNode';
import { SubWorkflowNode } from '../nodes/SubWorkflowNode';
import { NodeFunction, NodeOptions, Step, WorkflowContext } from '../engine/types';
import { StatusTracker } from '../engine/statusTracker/StatusTracker';
import { ErrorHandler } from '../engine/errorHandler/ErrorHandler';

/**
 * Workflow 是链式定义的工作流任务流实例
 */
export class Workflow {
  private name: string;
  private steps: Step[] = [];
  private context: WorkflowContext = {};
  private statusTracker: StatusTracker;

  constructor(name: string) {
    this.name = name;
    this.statusTracker = new StatusTracker(name);
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
    const nodes = steps.map(step => new BaseNode(step.name, step.fn, step.options));
    this.steps.push({ type: 'parallel', nodes });
    return this;
  }
  /**
   * 添加一个条件分支（根据数据决定流程分支）
   */
  addCondition(
    condition: (input: any, context: WorkflowContext) => string | boolean,
    branches: Record<string, Workflow>
  ): this {
    const node = new ConditionNode('condition', condition, branches);
    this.steps.push({ type: 'condition', node });
    return this;
  }
  /**
   * 添加一个子工作流节点（嵌套执行另一个工作流）
   */
  addSubWorkflow(name: string, workflow: Workflow): this {
    const node = new SubWorkflowNode(name, workflow);
    this.steps.push({ type: 'subworkflow', node });
    return this;
  }

  /**
   * 执行整个工作流
   */
  async run(input: any, context?: WorkflowContext): Promise<any> {
    let current = input;
    this.context = context || {};

    for (const step of this.steps) {
      try {
        switch (step.type) {
          case 'step': {
            this.statusTracker.update(step.node.name, 'RUNNING');
            current = await step.node.execute(current, this.context);
            this.statusTracker.update(step.node.name, 'COMPLETED');
            break;
          }

          case 'parallel': {
            const results = await Promise.all(
              step.nodes.map(n => n.execute(current, this.context))
            );
            current = results[0]; // 默认保留第一个结果，可扩展为合并
            break;
          }

          case 'condition': {
            const branchKey = await step.node.resolveBranch(current, this.context);
            const branchFlow = step.node.getBranch(branchKey);
            if (branchFlow) {
              await branchFlow.run(current, this.context);
            } else {
              console.warn(`⚠️ 未找到条件分支: ${String(branchKey)}`);
            }
            break;
          }

          case 'subworkflow': {
            await step.node.run(current, this.context);
            break;
          }
        }
      } catch (err) {
        this.statusTracker.update(
          (step as any)?.node?.name || 'unknown',
          'FAILED'
        );
        ErrorHandler.handleNodeError((step as any)?.node?.name || 'unknown', err);
        throw err;
      }
    }

    return current;
  }
}