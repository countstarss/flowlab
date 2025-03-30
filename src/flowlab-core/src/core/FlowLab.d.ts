import type { Workflow } from './Workflow';
import type { NodeFunction, NodeMetadata, NodeRegistryEntry } from '../engine/types';

/**
 * FlowLab 是工作流系统的入口类，提供创建与节点注册等核心能力
 */
export declare class FlowLab {
  /**
   * 创建一个新的工作流实例
   * @param name 工作流名称
   */
  static create(name: string): Workflow;

  /**
   * 注册一个节点（名称 + 函数 + 可选描述）
   */
  static registerNode<Input = any, Output = any, Context = any>(
    name: string,
    fn: NodeFunction<Input, Output, Context>,
    description?: string
  ): NodeRegistryEntry<Input, Output, Context>;

  /**
   * 注册一个节点（带 metadata 对象）
   */
  static registerNodeWithMeta<Input = any, Output = any, Context = any>(
    metadata: NodeMetadata,
    fn: NodeFunction<Input, Output, Context>
  ): NodeRegistryEntry<Input, Output, Context>;

  /**
   * 获取所有已注册的节点
   */
  static getAllRegisteredNodes(): NodeRegistryEntry<any, any, any>[];
}