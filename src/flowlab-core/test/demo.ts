import { FlowLab } from '../src/core/FlowLab';
import { WorkflowContext } from '../src/engine/types';

// ✅ 声明输入/输出/上下文类型
interface UserInput {
  name: string;
}

interface EnrichedUser extends UserInput {
  greeted?: boolean;
  emailSent?: boolean;
  time?: string;
}

// ✅ 注册节点（推荐类型参数明确）
FlowLab.registerNode<UserInput, EnrichedUser>('greet', async (input) => {
  console.log(`👋 Hello, ${input.name}`);
  return { ...input, greeted: true };
});

FlowLab.registerNode<EnrichedUser>('logTime', async (input) => {
  const time = new Date().toISOString();
  console.log(`📅 当前时间: ${time}`);
  return { ...input, time };
});

FlowLab.registerNode<EnrichedUser>('sendEmail', async (input) => {
  console.log(`📧 模拟发送邮件给 ${input.name} ...`);
  return { ...input, emailSent: true };
});

// ✅ 创建子流程
const followUpFlow = FlowLab.create('FollowUpFlow')
  .addStep('sendEmail', async (input: EnrichedUser) => {
    console.log(`📨 后续邮件已发送给 ${input.name}`);
    return input;
  });

// ✅ 主流程（含类型声明）
const mainFlow = FlowLab.create('UserOnboarding')
  .addStep('greet', async (input: UserInput): Promise<EnrichedUser> => {
    return { ...input, greeted: true };
  })
  .addParallelStep([
    {
      name: 'logTime',
      fn: async (input: EnrichedUser): Promise<EnrichedUser> => {
        console.log(`[并行] 打印时间`);
        return { ...input, time: new Date().toISOString() };
      },
    },
    {
      name: 'backgroundProcess',
      fn: async (input: EnrichedUser) => {
        console.log(`[并行] 模拟数据处理`);
        return input;
      },
    },
  ])
  .addCondition(
    (input: EnrichedUser, context: WorkflowContext) => input.name === 'Alice',
    {
      true: followUpFlow,
      false: FlowLab.create('SkipFlow').addStep('logSkip', async () => {
        console.log('❌ 不满足条件，跳过后续邮件流程');
      }),
    }
  )
  .addSubWorkflow('finalize', followUpFlow);

// ✅ 运行流程（带入初始 input 和上下文）
(async () => {
  const input: UserInput = { name: 'Alice' };
  const context: WorkflowContext = { tenantId: 't1', userId: 'u1' };

  const result = await mainFlow.run(input, context);
  console.log('✅ 执行结果：', result);
})();
