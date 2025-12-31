import * as vscode from 'vscode';
import { deepseekClient } from './api/client';

/**
 * 插件激活入口（完全复用原项目逻辑，仅替换客户端）
 */
export function activate(context: vscode.ExtensionContext) {
    console.log('油糕出品 | DeepSeek Code Workflow 插件已激活！');
    
    // 注册Agent运行命令
    const runAgentCommand = vscode.commands.registerCommand(
        'yougao-deepseek-code-workflow.runAgent',
        async () => {
            console.log('油糕出品 | DeepSeek Code Agent 命令被调用');
            try {
                // 弹出输入框获取用户提示词
                console.log('准备显示输入框...');
                const prompt = await vscode.window.showInputBox({
                    prompt: '请输入Code Agent任务描述',
                    placeHolder: '例如：编写一个VSCode插件的hello world入口'
                });
                console.log('输入框返回的prompt:', prompt);

                if (!prompt) {
                    console.log('用户取消了输入或输入为空');
                    vscode.window.showWarningMessage('任务描述不能为空！');
                    return;
                }

                // 调用火山引擎DeepSeek客户端
                console.log('开始调用DeepSeek API...');
                vscode.window.showInformationMessage('正在运行Code Agent...');
                const response = await deepseekClient.runAgent(prompt, [
                    // 默认工具列表：可直接使用，无需修改
                    {
                        name: 'write_file',
                        description: '写入文件到当前工作区',
                        input_schema: {
                            type: 'object',
                            properties: {
                                path: { type: 'string', description: '文件路径' },
                                content: { type: 'string', description: '文件内容' }
                            },
                            required: ['path', 'content']
                        }
                    },
                    {
                        name: 'run_command',
                        description: '执行终端命令',
                        input_schema: {
                            type: 'object',
                            properties: {
                                command: { type: 'string', description: '命令内容' }
                            },
                            required: ['command']
                        }
                    }
                ]);

                // 输出结果到VSCode终端
                const outputChannel = vscode.window.createOutputChannel('油糕出品 | DeepSeek Code Workflow');
                outputChannel.show();
                outputChannel.appendLine('=== Code Agent执行结果 ===');
                response.content.forEach(item => {
                    if (item.type === 'text') {
                        outputChannel.appendLine(item.text);
                    }
                });

                vscode.window.showInformationMessage('Code Agent执行完成！');
            } catch (error: any) {
                console.error('执行过程中发生错误:', error);
                vscode.window.showErrorMessage(`执行失败：${error.message}`);
            }
        }
    );

    // 注册插件命令到上下文
    context.subscriptions.push(runAgentCommand);
}

/**
 * 插件销毁入口
 */
export function deactivate() {}