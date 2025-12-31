# 油糕出品 | DeepSeek Code Workflow 插件使用指南

## 问题解决总结

您最初遇到的问题："插件显示未激活，CTRL+ALT+P输入yougao或deepseek找不到命令" 已经通过以下步骤解决：

### 1. 根本问题分析
- **命令未注册**：package.json缺少`contributes.commands`配置
- **API格式错误**：插件使用Anthropic格式，但火山引擎DeepSeek API使用OpenAI兼容格式
- **配置错误**：模型名称和API端点配置不正确

### 2. 修复步骤
1. **添加命令定义**：在package.json中添加`yougao-deepseek-code-workflow.runAgent`命令
2. **更新API客户端**：从`@anthropic-ai/sdk`改为`openai`包
3. **修正API格式**：使用OpenAI兼容的`/chat/completions`端点
4. **更新配置**：使用正确的模型名称`deepseek-v3-2-251201`
5. **添加调试日志**：便于问题诊断

## 当前工作版本配置

### 核心文件更新

#### 1. package.json
```json
{
  "dependencies": {
    "openai": "^4.0.0"  // 替换了原来的@anthropic-ai/sdk
  },
  "contributes": {
    "commands": [
      {
        "command": "yougao-deepseek-code-workflow.runAgent",
        "title": "油糕出品 | DeepSeek Code Agent"
      }
    ]
  }
}
```

#### 2. src/api/client.ts
- 使用OpenAI客户端初始化
- 正确的火山引擎API端点：`https://ark.cn-beijing.volces.com/api/v3`
- 正确的模型名称：`deepseek-v3-2-251201`

#### 3. .vscode/settings.json
```json
{
  "yougao-deepseek-code-workflow.apiKey": "您的API Key",
  "yougao-deepseek-code-workflow.model": "deepseek-v3-2-251201",
  "yougao-deepseek-code-workflow.baseUrl": "https://ark.cn-beijing.volces.com/api/v3"
}
```

## 使用方法

### 第一步：配置API Key
1. 打开VSCode设置（Ctrl+,）
2. 搜索"yougao-deepseek-code-workflow"
3. 设置以下配置：
   - `apiKey`: 您的火山引擎API Key
   - `model`: `deepseek-v3-2-251201`
   - `baseUrl`: `https://ark.cn-beijing.volces.com/api/v3`

### 第二步：激活插件
1. 重新加载VSCode窗口（Ctrl+Shift+P → "Developer: Reload Window"）
2. 插件会自动激活

### 第三步：使用插件
1. 按 **Ctrl+Shift+P** 打开命令面板
2. 输入 **"油糕出品"** 或 **"DeepSeek"**
3. 选择 **"油糕出品 | DeepSeek Code Agent"**
4. 输入任务描述（例如："编写一个Python的hello world程序"）
5. 查看输出面板中的结果

## 故障排除

### 常见问题

#### 1. 命令仍然找不到
- 检查package.json中的命令定义
- 重新编译插件：`npm run compile`
- 重新加载VSCode窗口

#### 2. API Key无效
- 确认火山引擎DeepSeek大模型服务已开通
- 检查API Key是否正确
- 测试API连接：使用提供的test_api.ps1脚本

#### 3. 响应超时
- 检查网络连接
- 确认API端点可访问
- 调整超时设置（默认30秒）

### 调试方法
1. 按F5启动扩展开发主机
2. 查看调试控制台输出
3. 检查"Developer Tools"（Ctrl+Shift+I）中的控制台

## API测试脚本

已创建测试脚本验证API连接：

```powershell
# test_api.ps1
$apiKey = "您的API Key"
$response = Invoke-RestMethod -Uri "https://ark.cn-beijing.volces.com/api/v3/chat/completions" `
    -Method Post `
    -Headers @{ "Authorization" = "Bearer $apiKey" } `
    -ContentType "application/json" `
    -Body '{
        "model": "deepseek-v3-2-251201",
        "messages": [{"role": "user", "content": "Hello"}],
        "max_tokens": 100
    }'
Write-Output $response.choices[0].message.content
```

## 技术架构

### 插件结构
```
src/
├── extension.ts          # 插件入口，命令注册
├── api/
│   └── client.ts        # 火山引擎DeepSeek客户端
└── utils/
    └── retry.ts         # 指数退避重试策略
```

### 数据流
1. 用户触发命令 → 2. 显示输入框 → 3. 调用DeepSeek API → 4. 显示结果

### 错误处理
- 指数退避重试（3次）
- 详细的调试日志
- 用户友好的错误提示

## 后续改进建议

1. **UI优化**：添加进度指示器
2. **功能扩展**：支持更多工具（文件读取、代码分析等）
3. **配置界面**：图形化配置界面
4. **缓存机制**：缓存API响应提高性能
5. **多模型支持**：支持更多火山引擎模型

## 联系支持

如果问题仍然存在，请提供：
1. VSCode版本信息
2. 插件版本
3. 错误日志（从调试控制台）
4. API Key测试结果

---

**插件现已修复并可以正常使用！** 按上述步骤配置后，您应该可以通过Ctrl+Shift+P找到"油糕出品 | DeepSeek Code Agent"命令并正常使用。