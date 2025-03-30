import { emitEvent, bindEvent, unbindEvent } from '../src/index';
import { EventPayload } from '../src/types';

describe('FlowLab Event Module', () => {
  it('should bind and trigger an event', async () => {
    const testPayload: EventPayload = { user: 'luke' };

    let result = '';
    bindEvent('user.signup', async (payload) => {
      result = payload.user;
    });

    await emitEvent('user.signup', testPayload);
    expect(result).toBe('luke');
  });

  it('should unbind an event handler', async () => {
    let count = 0;
    const handler = async () => { count++; };

    bindEvent('order.created', handler);
    unbindEvent('order.created', handler);

    await emitEvent('order.created', {});
    expect(count).toBe(0);
  });
});