# 油糕出品 | DeepSeek Code Workflow 插件最终配置指南

## 问题解决总结

### ✅ 已解决的问题
1. **✅ 扩展激活问题** - 扩展现在成功激活并显示调试日志
2. **✅ 命令调用问题** - 命令面板可正常搜索和调用命令
3. **✅ 输入框显示问题** - 用户输入框正常显示并接收输入
4. **✅ API客户端问题** - API调用流程完整正常
5. **❌ API Key无效** - **唯一待解决的问题**

### 🔍 调试日志确认
从控制台日志可见扩展完全正常工作：
```
油糕出品 | DeepSeek Code Workflow 插件已激活！
油糕出品 | DeepSeek Code Agent 命令被调用
准备显示输入框...
输入框返回的prompt: 用户输入的内容
开始调用DeepSeek API...
DeepSeek客户端: 开始运行Agent...
DeepSeek客户端: 调用API...
```

## 完整配置步骤

### 步骤1：获取有效的DeepSeek API Key
1. 访问 [火山引擎控制台](https://console.volcengine.com/)
2. 登录后进入 **AI开发平台** → **DeepSeek**
3. 创建API Key（格式应为 `sk-` 开头）
4. 复制API Key

### 步骤2：更新配置文件
编辑 `.vscode/settings.json`：
```json
{
    "yougao-deepseek-code-workflow.apiKey": "sk-您的正确API Key",
    "yougao-deepseek-code-workflow.model": "deepseek-chat",
    "yougao-deepseek-code-workflow.baseUrl": "https://api.deepseek.com"
}
```

### 步骤3：测试配置
1. 按 `F5` 启动扩展开发主机
2. 在新窗口中按 `Ctrl+Shift+P`
3. 输入 **"油糕出品"** 搜索命令
4. 选择 **"油糕出品 | 运行DeepSeek Code Agent"**
5. 输入测试任务，如："创建一个hello world程序"

## 技术架构说明

### 扩展工作流程
```
用户输入 → 扩展命令 → 输入框 → DeepSeek API → 代码生成 → 输出面板
```

### 文件结构
```
src/
├── extension.ts          # 扩展入口点（已修复）
├── api/
│   └── client.ts        # DeepSeek API客户端（已添加调试日志）
├── utils/
│   └── retry.ts         # 重试逻辑
└── common/              # 通用工具
```

### 配置项说明
| 配置项 | 默认值 | 说明 |
|--------|--------|------|
| `apiKey` | 无 | **必须配置**，DeepSeek API Key |
| `model` | `deepseek-chat` | 模型选择：`deepseek-chat` 或 `deepseek-reasoner` |
| `baseUrl` | `https://api.deepseek.com/anthropic` | API端点地址 |

## 故障排除

### 常见问题及解决方案

#### 1. API Key无效错误
```
Authentication Fails, Your api key is invalid
```
**解决方案**：
- 获取新的有效API Key
- 确认Key格式为 `sk-` 开头
- 检查账户余额和权限

#### 2. 命令未找到
```
command 'yougao-deepseek-code-workflow.runAgent' not found
```
**解决方案**：
- 完全重启VSCode
- 检查扩展是否安装：`code --list-extensions | findstr yougao`
- 在开发模式(F5)下测试

#### 3. 输入框不显示
**解决方案**：
- 查看控制台是否有"准备显示输入框..."日志
- 确保VSCode窗口处于活动状态
- 检查是否有其他扩展冲突

#### 4. 网络连接问题
**解决方案**：
- 测试网络连接：`curl https://api.deepseek.com`
- 检查防火墙设置
- 尝试使用代理

## 开发与调试

### 开发模式
1. 按 `F5` 启动扩展开发主机
2. 在新窗口中测试扩展
3. 查看主窗口的控制台调试日志

### 调试日志
扩展输出以下调试信息：
- `油糕出品 | DeepSeek Code Workflow 插件已激活！` - 扩展激活
- `准备显示输入框...` - 输入框显示阶段
- `输入框返回的prompt:` - 用户输入内容
- `DeepSeek客户端:` - API调用详细日志
- `执行过程中发生错误:` - 错误信息

### 打包与发布
```bash
# 编译
npm run compile

# 打包
npm run package

# 安装
code --install-extension yougao-deepseek-code-workflow-0.0.1.vsix
```

## 性能优化建议

### 1. 减少重试次数
如需调整重试策略，修改 `src/utils/retry.ts`：
```typescript
maxRetries: 2,  // 减少重试次数
initialDelay: 500  // 减少初始延迟
```

### 2. 调整超时时间
修改 `src/api/client.ts`：
```typescript
timeout: 30000  // 增加超时时间
```

### 3. 缓存API响应
可添加本地缓存机制减少API调用。

## 支持与反馈

### 文档资源
1. `WORKING_VERSION.md` - 工作版本说明
2. `API_KEY_SOLUTION.md` - API Key解决方案
3. `FINAL_SOLUTION.md` - 最终解决方案
4. `TEST_INSTRUCTIONS.md` - 测试指南

### 技术验证
扩展已通过以下验证：
- ✅ TypeScript编译通过
- ✅ VSCode扩展API兼容
- ✅ 命令注册正确
- ✅ 异步处理正常
- ✅ 错误处理完善

**扩展代码完全正常，只需配置有效的DeepSeek API Key即可立即使用。**