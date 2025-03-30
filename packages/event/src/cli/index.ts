import { emitEvent } from '../../src/index';
import { cac } from 'cac';
import colors from 'picocolors';
import packageJson from '../../package.json' assert { type: 'json' };
import pc from 'picocolors';

const cli = cac('flowlab-event');

cli
  .version(packageJson.version)
  .help()

// emit 命令
cli
  .command('emit <event> [data]', '触发一个事件（JSON 字符串或文件）')
  .option('--pretty', '美化输出')
  .action(async (eventName, data, options) => {
    console.log(colors.cyan(`\n🚀 正在触发事件: ${colors.bold(eventName)}\n`));

    let parsed: any = {};
    try {
      parsed = JSON.parse(data);
    } catch (e) {
      console.warn(colors.yellow('⚠️ 参数不是有效 JSON，使用空对象替代'));
    }

    try {
      await emitEvent(eventName, parsed, options);
      console.log(colors.green(`✅ 已成功触发事件 ${eventName}`));
    } catch (err) {
      console.error(colors.red(`❌ 触发失败: ${(err as Error).message}`));
      process.exit(1);
    }
  });

cli
  .command('welcome', '显示欢迎信息')
  .action(() => {
    console.log('\n' + pc.bold(pc.cyan('🎉 欢迎使用 FlowLab CLI - 事件引擎模块')));
    console.log(pc.dim('--------------------------------------------'));
    console.log(pc.blue(`📦 模块名: ${packageJson.name}`));
    console.log(pc.green(`🔧 版本号: v${packageJson.version}`));
    console.log(pc.yellow('👤 作者: Luke'));
    console.log(pc.magenta('📘 文档: https://github.com/countstarss/flowlab'));
    console.log(pc.dim('--------------------------------------------'));
    console.log('\n');
  });

cli.parse();