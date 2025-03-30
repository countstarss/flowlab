import { EventBus } from '../src/bus/EventBus';
import { bindWorkflowToEvent } from '../src/api/registerWorkflow';
import { emitEvent } from '../src/api/emitEvents';
import { EventContext } from '../src/internal/context';

describe('🧪 FlowLab Event DEMO 测试', () => {
  const bus = new EventBus();

  beforeAll(() => {
    // 模拟绑定 user.signup → 注册用户 → 触发欢迎/通知事件
    bindWorkflowToEvent('user.signup', async (payload: { name: string; email: string }, ctx: EventContext) => {
      console.log('👤 注册用户:', payload.email);

      if (payload.email.endsWith('@company.com')) {
        await ctx.emit('user.sendWelcome', { name: payload.name });
        await ctx.emit('user.notifyAdmin', { user: payload });
      } else {
        console.log('⚠️ 非企业邮箱，跳过后续事件');
      }
    }, { bus });

    // 监听欢迎邮件
    bindWorkflowToEvent('user.sendWelcome', async (payload: { name: string }) => {
      console.log(`📨 欢迎 ${payload.name} 加入我们！`);
    }, { bus });

    // 监听管理员通知
    bindWorkflowToEvent('user.notifyAdmin', async (payload: { user: { name: string } }) => {
      console.log(`📢 管理员通知：${payload.user.name} 刚刚注册`);
    }, { bus });
  });

  it('should trigger all events correctly', async () => {
    await emitEvent('user.signup', {
      name: 'Luke',
      email: 'luke@company.com'
    }, bus);

    // 输出验证（手动观察）
    // 👤 注册用户: luke@company.com
    // 📨 欢迎 Luke 加入我们！
    // 📢 管理员通知：Luke 刚刚注册
  });

  it('should skip non-company email', async () => {
    await emitEvent('user.signup', {
      name: 'John',
      email: 'john@gmail.com'
    }, bus);

    // 👤 注册用户: john@gmail.com
    // ⚠️ 非企业邮箱，跳过后续事件
  });
});