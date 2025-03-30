import { NodeFunction, NodeOptions } from '../engine/types';

/**
 * BaseNode 是最基本的执行节点，包含函数、重试、超时、条件控制
 */
export class BaseNode {
  public name: string;
  private fn: NodeFunction;
  private options?: NodeOptions;

  constructor(name: string, fn: NodeFunction, options?: NodeOptions) {
    this.name = name;
    this.fn = fn;
    this.options = options;
  }

  /**
   * 执行节点函数（支持重试、条件跳过、超时控制）
   */
  async execute(input: any, context: any): Promise<any> {
    if (this.options?.condition && !this.options.condition(input, context)) {
      console.log(`⏩ 跳过节点 ${this.name}，条件未通过`);
      return input;
    }

    let retries = this.options?.retries ?? 1;
    const timeout = this.options?.timeout ?? 10000;

    while (retries > 0) {
      try {
        const result = await this._runWithTimeout(input, context, timeout);
        return result;
      } catch (err) {
        retries--;
        console.warn(`❗️节点 ${this.name} 执行失败，重试剩余：${retries}`);
        if (retries <= 0) throw err;
      }
    }

    throw new Error(`🚨 节点 ${this.name} 执行失败（无可用重试）`);
  }

  private _runWithTimeout(input: any, context: any, timeout: number): Promise<any> {
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        reject(new Error(`节点 ${this.name} 超时（>${timeout}ms）`));
      }, timeout);

      this.fn(input, context)
        .then(result => {
          clearTimeout(timer);
          resolve(result);
        })
        .catch(err => {
          clearTimeout(timer);
          reject(err);
        });
    });
  }
}