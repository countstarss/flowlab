import { Workflow } from '../core/Workflow';

/**
 * 子工作流节点：嵌套执行一个完整工作流
 */
export class SubWorkflowNode {
  public name: string;
  private workflow: Workflow;

  constructor(name: string, workflow: Workflow) {
    this.name = name;
    this.workflow = workflow;
  }

  /**
   * 执行子工作流
   */
  async run(input: any, context: any): Promise<void> {
    console.log(`▶️ 执行子工作流节点：${this.name}`);
    await this.workflow.run(input, context);
  }
}