# 油糕出品 | DeepSeek Code Workflow 插件安装指南

## 修复后的插件已打包完成

### 打包文件
- **文件名**：`yougao-deepseek-code-workflow-0.0.1.vsix`
- **位置**：项目根目录
- **大小**：48.2KB
- **包含**：37个文件，包含所有修复

## 安装步骤

### 步骤1：卸载旧版本（如果已安装）
1. 打开VSCode
2. 点击左侧扩展图标（或按Ctrl+Shift+X）
3. 搜索"油糕出品 | DeepSeek Code Workflow"
4. 如果已安装，点击"卸载"按钮
5. 重启VSCode

### 步骤2：安装修复后的插件
#### 方法A：通过VSIX文件安装（推荐）
1. 在VSCode中按`Ctrl+Shift+P`打开命令面板
2. 输入"Extensions: Install from VSIX"
3. 选择`yougao-deepseek-code-workflow-0.0.1.vsix`文件
4. 点击"安装"

#### 方法B：通过命令行安装
```bash
# 在项目目录中执行
code --install-extension yougao-deepseek-code-workflow-0.0.1.vsix
```

### 步骤3：配置API Key
1. 按`Ctrl+,`打开VSCode设置
2. 搜索"yougao-deepseek-code-workflow"
3. 配置以下设置：
   ```json
   {
     "yougao-deepseek-code-workflow.apiKey": "您的火山引擎API Key",
     "yougao-deepseek-code-workflow.model": "deepseek-v3-2-251201",
     "yougao-deepseek-code-workflow.baseUrl": "https://ark.cn-beijing.volces.com/api/v3"
   }
   ```

### 步骤4：重启VSCode
1. 按`Ctrl+Shift+P`打开命令面板
2. 输入"Developer: Reload Window"
3. 点击回车重启VSCode

## 验证安装

### 验证1：检查插件是否激活
1. 按`Ctrl+Shift+P`打开命令面板
2. 输入"油糕出品"
3. 应该看到"油糕出品 | 运行DeepSeek Code Agent"命令

### 验证2：检查扩展列表
1. 点击左侧扩展图标
2. 搜索"油糕出品"
3. 应该看到插件已安装并启用

### 验证3：测试插件功能
1. 按`Ctrl+Shift+P` → 输入"油糕出品" → 选择命令
2. 输入测试任务："编写一个Python的hello world程序"
3. 查看输出面板中的结果

## 故障排除

### 问题1：安装失败
**症状**：无法安装VSIX文件
**解决方案**：
1. 确保VSCode版本 >= 1.80.0
2. 检查文件路径是否正确
3. 尝试以管理员身份运行VSCode

### 问题2：命令找不到
**症状**：Ctrl+Shift+P输入"油糕出品"没有命令
**解决方案**：
1. 重新加载VSCode窗口
2. 检查扩展是否已启用
3. 查看扩展输出日志（Ctrl+Shift+U → 选择"扩展主机"）

### 问题3：API Key无效
**症状**：插件运行但API调用失败
**解决方案**：
1. 确认火山引擎DeepSeek服务已开通
2. 检查API Key是否正确
3. 运行测试脚本验证API连接：
   ```bash
   node test_direct_api.js
   ```

### 问题4：Tools参数错误
**症状**：`400 missing tools.function parameter`
**解决方案**：
- 已在此版本中修复
- 确保安装的是最新打包的版本

## 开发模式测试（可选）

如果您想进一步测试，可以使用开发模式：

### 步骤1：打开项目
```bash
code .
```

### 步骤2：启动调试
1. 按F5启动扩展开发主机
2. 在新的VSCode窗口中测试插件
3. 查看调试控制台输出

### 步骤3：查看日志
- **调试控制台**：查看插件激活和API调用日志
- **输出面板**：查看插件输出结果
- **开发者工具**：Ctrl+Shift+I查看详细错误

## 更新内容

### 修复的问题
1. ✅ 命令未注册问题 - 添加了命令定义
2. ✅ API格式不兼容 - 从Anthropic改为OpenAI格式
3. ✅ Tools参数错误 - 添加了格式转换函数
4. ✅ 配置错误 - 更新了模型名称和API端点

### 新增功能
1. ✅ 完整的错误处理和重试机制
2. ✅ 详细的调试日志
3. ✅ 工具调用建议支持
4. ✅ OpenAI兼容的响应处理

## 技术支持

如果安装后仍有问题：

### 收集信息
1. VSCode版本：帮助 → 关于
2. 错误信息：复制完整的错误消息
3. 日志输出：扩展主机日志

### 测试API连接
```bash
# 运行API测试
node test_direct_api.js
```

### 检查配置
```bash
# 检查settings.json
cat .vscode/settings.json
```

## 总结

**修复后的插件已准备就绪！** 按照上述步骤：

1. ✅ 卸载旧版本（如有）
2. ✅ 安装`yougao-deepseek-code-workflow-0.0.1.vsix`
3. ✅ 配置API Key和模型设置
4. ✅ 重启VSCode
5. ✅ 验证插件功能

安装完成后，您应该可以通过Ctrl+Shift+P找到"油糕出品 | 运行DeepSeek Code Agent"命令，并正常使用DeepSeek大模型服务。