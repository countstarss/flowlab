import { handleCoreCommands } from './commands/core'; // 引入 core 模块命令
import { handleEventCommands } from './commands/event'; // 引入 event 模块命令

// 获取命令行参数
const args = process.argv.slice(2);

// 打印帮助信息
const printHelp = () => {
  console.log(`

    Usage:
      flowlab core <command>    Manage flowlab core module
      flowlab event <command>   Manage flowlab event system

    Commands:
      core start     Start the core service
      core status    Check the core service status
      event emit     Emit an event
      event listen   Listen for events
  `);
};

// 判断并执行相应的命令
const handleCommand = () => {
  if (args.length === 0 || args[0] === 'help') {
    printHelp();
    return;
  }

  const command = args[0];
  const subCommand = args[1];

  switch (command) {
    case 'core':
      handleCoreCommands(subCommand);  // 调用 core 模块命令
      break;
    case 'event':
      handleEventCommands(subCommand);  // 调用 event 模块命令
      break;
    default:
      console.log(`Unknown command: ${command}`);
      printHelp();
      break;
  }
};

// 执行命令
handleCommand();