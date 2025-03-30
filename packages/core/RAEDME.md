# FlowLab · ⚡️ Modern Workflow Automation Engine

> 轻量 · 模块化 · 可编排 · 可嵌套的现代工作流引擎，支持 CLI + Node.js + SaaS 拓展

---

## ✨ 特性亮点

- 🧱 模块化任务节点注册与执行
- 🔀 条件分支与动态路径调度
- ⛓ 子工作流嵌套 + 并行任务支持
- ⏱ 自动重试 / 超时 / 回滚机制
- 💬 CLI 命令支持快速调试工作流
- ☁️ 可与 FlowLab Studio / SaaS 拓展联动

---

## 📦 安装

```bash
npm install flowlab

或全局安装 CLI：

npm install -g flowlab


⸻

🧠 快速开始
```typescript
import { FlowLab } from 'flowlab';

const flow = FlowLab.create('demoFlow')
  .addStep('hello', async (input) => {
    console.log('👋 Hello from node!');
    return { ...input, greeted: true };
  })
  .addStep('logTime', async (input) => {
    console.log('🕒 Time:', new Date().toISOString());
    return input;
  });

flow.run({ userId: '123' });
```

⸻

🧩 CLI 工具

``` bash
flowlab list          # 查看已注册节点
flowlab run           # 执行 demo 示例工作流
```

⸻

🧪 单元测试（使用 Jest）

``` bash
npm run test
```

⸻

🔧 构建 / 链接

``` bash
npm run build     # 编译生成 dist/
npm link          # 注册为全局命令
flowlab list      # 执行 CLI 命令
```

🧙‍♂️ 作者

Luke - @countstarss

⸻

📄 License

MIT

---


✅ 说明：
```
命令	功能
npm run build	构建项目到 dist/
npm run link	本地构建并注册为全局 CLI
npm run test	运行 Jest 测试
npm run release	构建并发布到 npm
npm run dev	开发模式自动构建（可选）
```