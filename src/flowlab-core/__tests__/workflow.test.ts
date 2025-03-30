import { FlowLab } from '../src/core/FlowLab';

describe('FlowLab Workflow', () => {
  it('should execute basic steps', async () => {
    FlowLab.registerNode('hello', async (input) => {
      return { ...input, greeted: true };
    });

    const flow = FlowLab.create('testFlow')
      .addStep('hello', async (input) => {
        return { ...input, greeting: 'Hi' };
      });

    const result = await flow.run({ name: 'test' });

    expect(result).toHaveProperty('greeting', 'Hi');
  });
});