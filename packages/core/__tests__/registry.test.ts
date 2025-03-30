import { FlowLab } from '../src/core/FlowLab';

describe('Node Registry', () => {
  it('should register and retrieve node', () => {
    FlowLab.registerNode('sum', async (input: { a: number; b: number }) => input.a + input.b);

    const nodes = FlowLab.getAllRegisteredNodes();
    const sumNode = nodes.find(n => n.metadata.name === 'sum');

    expect(sumNode).toBeDefined();
    expect(typeof sumNode?.nodeFunction).toBe('function');
  });
});