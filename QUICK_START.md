# 油糕出品 | DeepSeek Code Workflow 快速使用指南

## 问题已解决！

您遇到的"插件未激活，命令找不到"问题已经修复。以下是快速使用步骤：

## 🚀 3步快速开始

### 第1步：配置API Key
1. 打开 `.vscode/settings.json`
2. 确保配置如下：
```json
{
  "yougao-deepseek-code-workflow.apiKey": "您的火山引擎API Key",
  "yougao-deepseek-code-workflow.model": "deepseek-v3-2-251201",
  "yougao-deepseek-code-workflow.baseUrl": "https://ark.cn-beijing.volces.com/api/v3"
}
```

### 第2步：重新加载插件
1. **Ctrl+Shift+P** → 输入 "Developer: Reload Window"
2. 点击回车重新加载VSCode

### 第3步：使用插件
1. **Ctrl+Shift+P** → 输入 "油糕出品"
2. 选择 **"油糕出品 | DeepSeek Code Agent"**
3. 输入您的代码任务描述
4. 查看输出面板中的结果

## ✅ 验证插件工作

如果一切正常，您应该：
1. 能在命令面板中找到"油糕出品"命令
2. 输入任务后能看到"正在运行Code Agent..."提示
3. 在"油糕出品 | DeepSeek Code Workflow"输出面板看到结果

## 🔧 如果仍有问题

### 检查1：命令是否注册
运行测试命令：
```bash
npm run compile
```

### 检查2：API是否连通
运行测试脚本：
```powershell
.\test_api.ps1
```

### 检查3：查看调试信息
按F5启动扩展开发主机，查看控制台日志

## 📞 技术支持

如果问题仍然存在，请提供：
1. VSCode版本
2. 错误截图
3. 调试控制台输出

---

**插件现已修复完成！** 按照上述步骤即可正常使用油糕出品的DeepSeek Code Workflow插件。