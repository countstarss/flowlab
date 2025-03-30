import type { NodeFunction, NodeMetadata, NodeRegistryEntry } from '../types';

/**
 * 节点注册中心类型声明文件
 * 提供全局节点注册、查询、获取等功能
 */
export declare class NodeRegistry {
  /**
   * 注册一个新的节点函数
   * @param nameOrMetadata 节点名称或包含元数据的对象
   * @param fn 节点执行函数
   * @param description 可选描述（仅在第一个参数为 string 时使用）
   */
  static register<Input = any, Output = any, Context = any>(
    name: string,
    fn: NodeFunction<Input, Output, Context>,
    description?: string
  ): NodeRegistryEntry<Input, Output, Context>;

  static register<Input = any, Output = any, Context = any>(
    metadata: NodeMetadata,
    fn: NodeFunction<Input, Output, Context>
  ): NodeRegistryEntry<Input, Output, Context>;

  /**
   * 获取节点执行函数
   * @param name 节点名称
   * @returns 节点函数（或 undefined）
   */
  static getNodeFunction(name: string): NodeFunction | undefined;

  /**
   * 获取节点元数据
   * @param name 节点名称
   * @returns 节点描述信息
   */
  static getNodeMetadata(name: string): NodeMetadata | undefined;

  /**
   * 获取所有已注册的节点
   */
  static getAllNodes(): NodeRegistryEntry<any, any, any>[];

  /**
   * 检查节点是否存在
   * @param name 节点名称
   */
  static exists(name: string): boolean;
}