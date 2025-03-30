/**
 * Persistence 模块入口，允许开发者注入持久化引擎
 */
import { PersistenceEngine } from './types';
import { MemoryPersistence } from './MemoryPersistence';

let engine: PersistenceEngine = new MemoryPersistence(); // 默认使用内存

export const Persistence = {
  use(p: PersistenceEngine) {
    engine = p;
  },
  current(): PersistenceEngine {
    return engine;
  }
};