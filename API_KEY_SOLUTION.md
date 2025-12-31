# 火山引擎DeepSeek API Key解决方案

## 问题诊断
从错误日志可见：
```
Authentication Fails, Your api key: ****78ec is invalid
```

当前配置的API Key `6f74ca74-20c9-417f-9697-3a86383f78ec` 被火山引擎DeepSeek API认为是无效的。

## 扩展状态确认
✅ **好消息**：扩展本身完全正常工作！
- ✅ 扩展成功激活
- ✅ 命令正常调用
- ✅ 输入框正常显示
- ✅ API客户端正常初始化
- ❌ 仅API Key无效

## 获取正确的API Key

### 步骤1：访问火山引擎控制台
1. 打开 [火山引擎控制台](https://console.volcengine.com/)
2. 登录您的账户
3. 进入 **AI开发平台** → **DeepSeek**

### 步骤2：创建API Key
1. 在DeepSeek服务页面，找到 **"API密钥管理"**
2. 点击 **"创建密钥"**
3. 复制生成的API Key（通常以 `sk-` 开头）

### 步骤3：验证API Key格式
正确的DeepSeek API Key通常类似：
- `sk-1234567890abcdef1234567890abcdef`
- 长度：约40-50个字符
- 以 `sk-` 开头

## 更新配置

### 方法A：修改settings.json
编辑 `.vscode/settings.json`：
```json
{
    "yougao-deepseek-code-workflow.apiKey": "sk-您的正确API Key",
    "yougao-deepseek-code-workflow.model": "deepseek-chat",
    "yougao-deepseek-code-workflow.baseUrl": "https://api.deepseek.com"
}
```

### 方法B：使用环境变量
1. 设置环境变量：
   ```bash
   # Windows PowerShell
   $env:VOLC_API_KEY="sk-您的正确API Key"
   
   # Windows CMD
   set VOLC_API_KEY=sk-您的正确API Key
   
   # Linux/Mac
   export VOLC_API_KEY="sk-您的正确API Key"
   ```

2. 重启VSCode

## 测试API Key有效性

### 使用curl测试
```bash
curl https://api.deepseek.com/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer sk-您的API Key" \
  -d '{
    "model": "deepseek-chat",
    "messages": [
      {"role": "user", "content": "Hello"}
    ]
  }'
```

### 预期响应
如果API Key有效，应该返回类似：
```json
{
  "id": "chat-123",
  "object": "chat.completion",
  "created": 1677652288,
  "model": "deepseek-chat",
  "choices": [...]
}
```

## 常见问题解决

### 1. API Key仍然无效
- 确认账户有足够的余额/配额
- 检查API Key是否已启用
- 确认服务区域是否正确

### 2. 网络连接问题
- 确保可以访问 `https://api.deepseek.com`
- 检查防火墙设置
- 尝试使用代理（如果需要）

### 3. 模型不可用
- 尝试切换模型：`deepseek-chat` 或 `deepseek-reasoner`
- 检查模型是否在您的区域可用

## 备用方案

### 使用其他DeepSeek端点
如果火山引擎API有问题，可以尝试：
1. **官方DeepSeek API**：`https://api.deepseek.com`
2. **更新baseUrl配置**：
   ```json
   "yougao-deepseek-code-workflow.baseUrl": "https://api.deepseek.com"
   ```

### 测试配置
创建测试文件 `test-api.js`：
```javascript
const Anthropic = require('@anthropic-ai/sdk');

const client = new Anthropic({
  apiKey: 'sk-您的API Key',
  baseURL: 'https://api.deepseek.com'
});

async function test() {
  try {
    const response = await client.messages.create({
      model: 'deepseek-chat',
      max_tokens: 100,
      messages: [{ role: 'user', content: 'Hello' }]
    });
    console.log('API测试成功:', response);
  } catch (error) {
    console.error('API测试失败:', error.message);
  }
}

test();
```

## 扩展工作流程
一旦API Key配置正确，扩展将正常工作：
1. 用户输入任务描述
2. 扩展调用DeepSeek API
3. API返回代码生成结果
4. 结果显示在VSCode输出面板

**扩展代码完全正常，只需配置有效的API Key即可使用。**