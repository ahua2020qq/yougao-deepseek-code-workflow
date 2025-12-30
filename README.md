# 🍘 油糕出品 | DeepSeek Code Workflow（火山引擎版）

**🔥 让技术更有烟火气 | 可视化AI编程Agent编排工具**

> 油糕（Yougao）出品，专注打造有温度、易上手的开发者工具。我们学习优秀开源项目的核心能力，进行实用化改造，让更多开发者能轻松用上好工具。

## 🎯 关于工具

本工具基于 Claude Code Workflow 改造，适配 DeepSeek 大模型 + 火山引擎部署，保留原项目可视化编排核心设计，无版权风险，可直接发布到社区。

### 核心特性
1. **保留原项目可视化编排核心能力** - 拖拽配置Agent任务，一键生成命令/工作流
2. **适配火山引擎DeepSeek API** - 企业级稳定性（故障迁移+自动重试）
3. **支持双模型切换** - `deepseek-chat` / `deepseek-reasoner` 灵活选择
4. **智能重试机制** - 指数退避重试+超时控制，解决大模型调用不稳定问题

## 🍘 关于油糕

油糕（Yougao）是一个专注于开发者体验的工具品牌，我们相信技术不应该冰冷晦涩。
就像街边小摊的油糕，外表朴实，内里温暖，能实实在在解决你的问题。
我们复刻优秀开源项目的核心能力，进行实用化改造，让更多开发者能轻松用上好工具。

### 品牌价值观
- **实用主义**：不搞花架子，只做真正能解决问题的工具
- **开源精神**：尊重原项目，明确衍生声明，推动社区共享
- **用户体验**：降低使用门槛，让技术小白也能轻松上手
- **持续迭代**：根据用户反馈不断优化，保持工具生命力

## 🚀 安装指南

### 1. 克隆仓库
```bash
git clone https://github.com/ahua2020qq/yougao-deepseek-code-workflow.git
cd yougao-deepseek-code-workflow
```

### 2. 安装依赖
```bash
npm install
```

### 3. 编译打包
```bash
npm run package
```

### 4. VSCode安装
- 打开VSCode
- 进入扩展面板（快捷键 `Ctrl+Shift+X`）
- 点击"..."菜单，选择"从VSIX安装"
- 选择生成的 `.vsix` 文件：`yougao-deepseek-code-workflow-0.0.1.vsix`

## ⚙️ 配置步骤

### 1. 获取API密钥
- 访问火山方舟控制台（https://console.volcengine.com/ark/）
- 创建应用并获取API Key

### 2. 配置插件
1. 打开VSCode设置（快捷键 `Ctrl+,`）
2. 搜索 `DeepSeek Code Workflow`
3. 填写以下配置：
   - **火山引擎API Key**：从控制台获取的密钥
   - **Base URL**：保持默认 `https://api.deepseek.com/anthropic`
   - **模型选择**：`deepseek-reasoner`（推荐）或 `deepseek-chat`

### 3. 开始使用
- 按 `Ctrl+Shift+P` 打开命令面板
- 输入 `DeepSeek Code Workflow: Run Agent`
- 输入任务描述，如："编写一个VSCode插件的hello world入口"

## 📁 项目结构

```
yougao-deepseek-code-workflow/
├── src/
│   ├── api/
│   │   └── client.ts           # 火山引擎API适配核心文件
│   ├── common/
│   │   ├── brand.js           # 油糕品牌文案常量
│   │   └── api-base.js        # 通用API封装（油糕模板）
│   ├── utils/
│   │   └── retry.ts           # 指数退避重试工具
│   └── extension.ts           # 插件入口
├── package.json               # 插件配置+依赖（油糕品牌化）
├── LICENSE                   # MIT协议 + 油糕品牌标识
├── README.md                 # 本文件
└── tsconfig.json             # TypeScript配置
```

## 🔧 开发指南

### 编译项目
```bash
npm run compile
```

### 开发模式（监听文件变化）
```bash
npm run watch
```

### 打包发布
```bash
npm run package
```

## 📄 版本日志

### v0.0.1 (2025-12-30)
- ✅ 初始版本发布
- ✅ 适配火山引擎DeepSeek API
- ✅ 实现指数退避重试机制
- ✅ 支持双模型切换
- ✅ 油糕品牌化改造完成

## 📜 开源协议

本项目基于 Claude Code Workflow（MIT协议）修改，遵循以下协议：

1. **MIT许可证**：保留原项目MIT协议，可自由使用、修改、分发
2. **衍生声明**：明确标注基于Claude Code Workflow改造
3. **品牌标识**：保留油糕（Yougao）品牌标识，可自由使用、修改、分发
4. **商标声明**：非官方版本，不涉及Anthropic/Claude商标使用

## 🤝 反馈与建议

油糕工具持续迭代中，欢迎反馈和建议：

- **GitHub Issues**：[ahua2020qq/yougao-tools-collection](https://github.com/ahua2020qq/yougao-tools-collection)
- **油糕工具合集**：更多实用工具请访问我们的工具合集仓库

## 🌟 油糕工具合集

油糕工具合集（Yougao Tools Collection）是一个持续更新的开发者工具仓库，
包含各种复刻改造的实用工具，全部遵循 MIT 协议，可自由使用、修改、分发。

**访问地址**：https://github.com/ahua2020qq/yougao-tools-collection

---

**油糕出品，让编码更有烟火气** 🍘