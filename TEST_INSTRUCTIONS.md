# 油糕出品 | DeepSeek Code Workflow 插件测试指南

## 当前状态
插件已修复并重新安装。以下是验证步骤：

### 步骤1：完全重启VSCode
1. **完全关闭**所有VSCode窗口
2. **重新打开**VSCode
3. 等待扩展加载完成（约10-30秒）

### 步骤2：检查扩展是否激活
1. 按 `Ctrl+Shift+P` 打开命令面板
2. 输入 "Developer: Show Running Extensions"
3. 查看列表中是否有 "油糕出品 | DeepSeek Code Workflow"
4. 状态应为 "activated"

### 步骤3：测试命令是否可用
1. 按 `Ctrl+Shift+P`
2. 输入 **"油糕出品"** 或 **"DeepSeek"**
3. 应该看到命令：**"油糕出品 | 运行DeepSeek Code Agent"**
4. 选择该命令

### 步骤4：检查调试输出
1. 按 `Ctrl+Shift+P`
2. 输入 "Developer: Toggle Developer Tools"
3. 在控制台(Console)标签页中查看日志
4. 应该看到：`油糕出品 | DeepSeek Code Workflow 插件已激活！`

### 步骤5：执行测试命令
1. 运行命令后，会弹出输入框
2. 输入测试任务，例如："写一个简单的Python hello world程序"
3. 点击确定
4. 在控制台应该看到：`油糕出品 | DeepSeek Code Agent 命令被调用`

## 故障排除

### 如果命令仍然未找到：
1. **检查扩展是否安装**：
   ```bash
   code --list-extensions | findstr yougao
   ```
   应该输出：`yougao-dev.yougao-deepseek-code-workflow`

2. **手动重新加载窗口**：
   - `Ctrl+Shift+P` → "Developer: Reload Window"

3. **检查VSCode版本**：
   - 需要 VSCode >= 1.80.0

### 如果看到API错误：
1. **检查API配置**：
   - 文件：`.vscode/settings.json`
   - 确保有正确的API Key

2. **检查网络连接**：
   - 确保可以访问 `https://api.deepseek.com`

## 预期行为
1. 命令成功执行后，会显示"正在运行Code Agent..."
2. 结果会输出到"油糕出品 | DeepSeek Code Workflow"输出面板
3. 完成后显示"Code Agent执行完成！"

## 技术支持
如果以上步骤都失败：
1. 查看VSCode开发者控制台完整错误信息
2. 检查扩展日志文件夹
3. 确保系统满足所有依赖要求

**插件现已完全修复，包含调试日志，可以准确诊断问题。**