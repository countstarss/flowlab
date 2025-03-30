import { FlowLab } from '../../src/core/FlowLab';

export function listNodes() {
  const nodes = FlowLab.getAllRegisteredNodes();
  if (!nodes.length) {
    console.log('⚠️ 暂无注册节点');
    return;
  }

  console.log('✅ 已注册节点:');
  nodes.forEach(node => {
    console.log(`- ${node.metadata.name}: ${node.metadata.description || '无描述'}`);
  });
}