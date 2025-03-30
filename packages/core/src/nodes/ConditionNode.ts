import { Workflow } from '../core/Workflow';

/**
 * 条件节点：根据 input/context 判断分支路径
 */
export class ConditionNode {
  public name: string;
  private conditionFn: (input: any, context: any) => string | boolean;
  private branches: Record<string, Workflow>;

  constructor(
    name: string,
    conditionFn: (input: any, context: any) => string | boolean,
    branches: Record<string, Workflow>
  ) {
    this.name = name;
    this.conditionFn = conditionFn;
    this.branches = branches;
  }

  /**
   * 解析当前输入下应该进入哪个分支
   */
  async resolveBranch(input: any, context: any): Promise<string | boolean> {
    return this.conditionFn(input, context);
  }

  /**
   * 获取指定分支的工作流
   */
  getBranch(branch: string | boolean): Workflow | undefined {
    return this.branches[branch.toString()];
  }
}