# 油糕出品 | DeepSeek Code Workflow 插件调试步骤

## 问题诊断
插件已安装但命令未找到，可能原因：
1. 扩展未正确激活
2. VSCode扩展主机缓存未更新
3. 命令注册失败

## 解决方案步骤

### 步骤1：完全重启VSCode
1. 完全关闭VSCode（所有窗口）
2. 重新打开VSCode
3. 等待扩展加载完成

### 步骤2：检查扩展是否激活
1. 按 `Ctrl+Shift+P` 打开命令面板
2. 输入 "Developer: Show Running Extensions"
3. 查看 "油糕出品 | DeepSeek Code Workflow" 是否在列表中
4. 检查状态是否为 "activated"

### 步骤3：手动重新加载窗口
1. 按 `Ctrl+Shift+P`
2. 输入 "Developer: Reload Window"
3. 按回车执行

### 步骤4：验证命令是否可用
1. 按 `Ctrl+Shift+P`
2. 输入 "油糕出品" 或 "DeepSeek"
3. 应该看到 "油糕出品 | 运行DeepSeek Code Agent"

### 步骤5：如果仍然不可用，尝试开发模式
1. 在终端中运行：`code --disable-extensions`
2. 关闭VSCode
3. 重新正常打开VSCode（启用扩展）

### 步骤6：检查扩展日志
1. 按 `Ctrl+Shift+P`
2. 输入 "Developer: Open Extension Logs Folder"
3. 查看相关日志文件

## 技术细节
- 扩展ID: `yougao-dev.yougao-deepseek-code-workflow`
- 命令ID: `yougao-deepseek-code-workflow.runAgent`
- 激活事件: `onStartupFinished`
- 配置文件: `.vscode/settings.json`

## 配置验证
确保 `.vscode/settings.json` 包含：
```json
{
    "yougao-deepseek-code-workflow.apiKey": "您的API Key",
    "yougao-deepseek-code-workflow.model": "deepseek-chat"
}
```

## 备用方案
如果以上步骤都失败：
1. 卸载扩展：`code --uninstall-extension yougao-dev.yougao-deepseek-code-workflow`
2. 重新安装：`code --install-extension yougao-deepseek-code-workflow-0.0.1.vsix`
3. 完全重启VSCode

## 联系支持
如果问题仍然存在，请检查：
1. VSCode版本是否 >= 1.80.0
2. 系统是否有网络连接（用于API调用）
3. API Key是否有效