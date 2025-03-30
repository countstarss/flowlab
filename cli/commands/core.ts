export const handleCoreCommands = (command: string) => {
  switch (command) {
    case 'start':
      console.log('Starting FlowLab Core...');
      break;
    case 'status':
      console.log('FlowLab Core status is running.');
      break;
    default:
      console.log(`Unknown command for core module: ${command}`);
      break;
  }
};