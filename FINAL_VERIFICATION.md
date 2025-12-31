# 油糕出品 | DeepSeek Code Workflow 插件最终验证步骤

## 当前状态
✅ **所有前提条件已满足**：
1. ✅ DeepSeek大模型服务已开通
2. ✅ API Key有效且已配置
3. ✅ 正确的baseUrl已设置：`https://ark.cn-beijing.volces.com/api/v3`
4. ✅ 扩展代码已完全修复
5. ✅ 调试日志系统已就绪

## 最终验证步骤

### 步骤1：重启VSCode扩展主机
由于配置已更改，需要重新加载扩展：
1. 按 `Ctrl+Shift+P`
2. 输入 **"Developer: Reload Window"**
3. 按回车执行

### 步骤2：在开发模式下测试
1. 按 **`F5`** 启动扩展开发主机
2. 等待新窗口打开
3. 在新窗口中按 `Ctrl+Shift+P`
4. 输入 **"油糕出品"** 搜索命令
5. 选择 **"油糕出品 | 运行DeepSeek Code Agent"**

### 步骤3：监控调试日志
在主VSCode窗口查看控制台日志：
1. 按 `Ctrl+Shift+P`
2. 输入 **"Developer: Toggle Developer Tools"**
3. 切换到 **Console** 标签页

### 步骤4：验证成功标志
应该看到以下成功日志序列：
```
油糕出品 | DeepSeek Code Workflow 插件已激活！
油糕出品 | DeepSeek Code Agent 命令被调用
准备显示输入框...
输入框返回的prompt: [您的任务描述]
开始调用DeepSeek API...
DeepSeek客户端: 开始运行Agent，prompt长度: XX
DeepSeek客户端: 使用模型: deepseek-chat
DeepSeek客户端: 开始执行请求...
DeepSeek客户端: 调用API...
DeepSeek客户端: 请求成功完成
```

### 步骤5：检查输出结果
成功执行后：
1. VSCode会显示 **"正在运行Code Agent..."** 通知
2. 结果会输出到 **"油糕出品 | DeepSeek Code Workflow"** 输出面板
3. 最后显示 **"Code Agent执行完成！"** 通知

## 配置验证

### 当前配置
检查 `.vscode/settings.json`：
```json
{
    "yougao-deepseek-code-workflow.apiKey": "6f74ca74-20c9-417f-9697-3a86383f78ec",
    "yougao-deepseek-code-workflow.model": "deepseek-chat",
    "yougao-deepseek-code-workflow.baseUrl": "https://ark.cn-beijing.volces.com/api/v3"
}
```

### 配置说明
| 配置项 | 值 | 说明 |
|--------|-----|------|
| `apiKey` | `6f74ca74-20c9-417f-9697-3a86383f78ec` | 您的火山引擎API Key |
| `model` | `deepseek-chat` | DeepSeek聊天模型 |
| `baseUrl` | `https://ark.cn-beijing.volces.com/api/v3` | 火山引擎API端点 |

## 故障排除

### 如果仍然遇到401错误
```
Authentication Fails, Your api key is invalid
```

**解决方案**：
1. 确认DeepSeek大模型服务**确实已开通**
2. 检查账户是否有足够的余额/配额
3. 验证API Key在火山控制台的状态
4. 尝试在火山控制台测试API调用

### 如果遇到其他错误

#### 网络连接错误
```
无法连接到API端点
```
**解决方案**：
- 测试网络连接：`curl https://ark.cn-beijing.volces.com`
- 检查防火墙设置
- 确认API端点地址正确

#### 模型不可用错误
```
模型不存在或不可用
```
**解决方案**：
- 尝试切换模型：修改`model`为`deepseek-reasoner`
- 确认模型在您的区域可用

#### 速率限制错误
```
请求过于频繁
```
**解决方案**：
- 等待一段时间后重试
- 检查账户的API调用限制

## 成功后的使用

### 典型工作流程
1. **触发命令**：`Ctrl+Shift+P` → 输入"油糕出品"
2. **输入任务**：在输入框中描述编码任务
3. **AI生成**：扩展调用DeepSeek API生成代码
4. **查看结果**：在输出面板查看生成的代码

### 示例任务
- "创建一个React组件显示用户列表"
- "编写Python函数处理CSV文件"
- "实现一个简单的登录页面"
- "修复JavaScript中的语法错误"

## 性能优化建议

### 减少等待时间
如果API响应较慢：
1. 调整超时时间（当前：15秒）
2. 减少重试次数（当前：3次）
3. 使用更简单的任务描述

### 提高成功率
1. 提供清晰、具体的任务描述
2. 分步骤请求复杂任务
3. 使用英文提示词可能获得更好结果

## 技术支持

### 调试信息收集
如果遇到问题，请提供：
1. 完整的控制台日志
2. 错误消息截图
3. 任务描述内容
4. VSCode版本信息

### 文档参考
已创建的完整文档：
1. `FINAL_CONFIG_GUIDE.md` - 最终配置指南
2. `API_KEY_SOLUTION.md` - API Key解决方案
3. `WORKING_VERSION.md` - 工作版本说明

**扩展现已完全配置就绪，DeepSeek大模型已开通，应该可以正常工作了！**