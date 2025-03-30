import { Step } from '../types';
import { ErrorHandler } from '../errorHandler/ErrorHandler';
import { StatusTracker } from '../statusTracker/StatusTracker';
import { BaseNode } from '../../nodes';

/**
 * Runner 负责执行一组工作流步骤（顺序、并行、条件、子流程）
 */
export class Runner {
  private steps: Step[];
  private workflowName: string;
  private context: Record<string, any>;
  private tracker: StatusTracker;

  constructor(steps: Step[], workflowName: string, context: Record<string, any>) {
    this.steps = steps;
    this.workflowName = workflowName;
    this.context = context;
    this.tracker = new StatusTracker(workflowName);
  }

  /**
   * 执行完整的工作流
   * @param input 初始数据
   */
  async execute(input: any): Promise<any> {
    let current = input;

    for (const step of this.steps) {
      try {
        switch (step.type) {
          case 'step':
            current = await step.node.execute(current, this.context);
            this.tracker.update(step.node.name, 'COMPLETED');
            break;

          case 'parallel':
            await Promise.all(
              step.nodes.map((node: BaseNode) =>
                node.execute(current, this.context).then(() => {
                  this.tracker.update(node.name, 'COMPLETED');
                }).catch(err => {
                  this.tracker.update(node.name, 'FAILED');
                  throw err;
                })
              )
            );
            break;

          case 'condition':
            const result = await step.node.resolveBranch(current, this.context);
            if (result) {
              const nextFlow = step.node.getBranch(result);
              if (nextFlow) {
                await nextFlow.run(current, this.context);
              }
            }
            break;

          case 'subworkflow':
            await step.node.run(current, this.context);
            break;
        }
      } catch (err) {
        this.tracker.update(step.type === 'step' ? step.node.name : 'unknown', 'FAILED');
        ErrorHandler.handleNodeError(this.workflowName, err);
        throw err;
      }
    }

    return current;
  }
}