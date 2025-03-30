import { NodeFunction, NodeMetadata, NodeRegistryEntry } from '../types';

/**
 * 节点注册中心（全局单例）
 * 负责注册与查找系统中所有可用的节点函数
 */
export class NodeRegistry {
  /** 已注册节点的内部映射表（节点名称 → 节点实现与元信息） */
  private static _nodes: Map<string, NodeRegistryEntry<any, any, any>> = new Map();

  /**
   * 注册一个新的节点函数
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

  static register<Input, Output, Context>(
    nameOrMetadata: string | NodeMetadata,
    fn: NodeFunction<Input, Output, Context>,
    description?: string
  ): NodeRegistryEntry<Input, Output, Context> {
    const metadata: NodeMetadata = typeof nameOrMetadata === 'string'
      ? { name: nameOrMetadata, description }
      : nameOrMetadata;

    this._validate(metadata, fn);

    const entry: NodeRegistryEntry<Input, Output, Context> = {
      metadata,
      nodeFunction: fn
    };

    this._nodes.set(metadata.name, entry);
    return entry;
  }

  /**
   * 获取指定名称的节点函数
   */
  static getNodeFunction(name: string): NodeFunction | undefined {
    return this._nodes.get(name)?.nodeFunction;
  }

  /**
   * 获取指定名称的节点元数据
   */
  static getNodeMetadata(name: string): NodeMetadata | undefined {
    return this._nodes.get(name)?.metadata;
  }

  /**
   * 获取所有已注册的节点条目
   */
  static getAllNodes(): NodeRegistryEntry<any, any, any>[] {
    return Array.from(this._nodes.values());
  }

  /**
   * 检查节点是否已存在
   */
  static exists(name: string): boolean {
    return this._nodes.has(name);
  }

  /**
   * 内部验证
   */
  private static _validate(
    metadata: NodeMetadata,
    fn: NodeFunction<any, any, any>
  ) {
    const name = metadata.name;
    if (!name || typeof name !== 'string' || name.trim() === '') {
      throw new Error('节点名称必须是非空字符串');
    }
    if (this._nodes.has(name)) {
      throw new Error(`节点 "${name}" 已被注册`);
    }
    if (typeof fn !== 'function') {
      throw new Error(`节点 "${name}" 的实现必须是函数`);
    }
  }
}