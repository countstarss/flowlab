import { emitEvent } from '../../src/index';

const [,, command, ...args] = process.argv;

if (command === 'emit') {
  const [eventName, payloadRaw] = args;

  if (!eventName) {
    console.error('❌ 请输入事件名称');
    process.exit(1);
  }

  const payload = payloadRaw ? JSON.parse(payloadRaw) : {};
  emitEvent(eventName, payload)
    .then(() => console.log(`✅ 已触发事件 ${eventName}`))
    .catch(err => console.error('❗️ 触发失败:', err));
} else {
  console.log('使用方法:');
  console.log('  flowlab-event emit <eventName> <payload>');
}