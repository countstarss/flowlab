import { Workflow } from './Workflow';
import { NodeFunction, NodeMetadata } from '../engine/types';
import { NodeRegistry } from '../engine/registry/NodeRegistry';

/**
 * FlowLab 提供开发者创建工作流的主入口
 * 支持链式调用：create → addStep → run 等
 * 同时作为全局 API 聚合器，支持注册节点、查看注册信息等
 */
export class FlowLab {
  /**
   * 创建一个新的工作流
   * @param name 工作流名称
   * @returns Workflow 实例
   */
  static create(name: string): Workflow {
    return new Workflow(name);
  }

  /**
   * 注册一个节点（支持名称 + 函数）
   */
  static registerNode<Input = any, Output = any, Context = any>(
    name: string,
    fn: NodeFunction<Input, Output, Context>,
    description?: string
  ) {
    return NodeRegistry.register(name, fn, description);
  }

  /**
   * 注册一个节点（支持 metadata + 函数）
   */
  static registerNodeWithMeta<Input = any, Output = any, Context = any>(
    metadata: NodeMetadata,
    fn: NodeFunction<Input, Output, Context>
  ) {
    return NodeRegistry.register(metadata, fn);
  }

  /**
   * 获取所有注册的节点
   */
  static getAllRegisteredNodes() {
    return NodeRegistry.getAllNodes();
  }
}