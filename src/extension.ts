import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { deepseekClient } from './api/client';

/**
 * 工具执行器
 */
class ToolExecutor {
    /**
     * 执行工具调用
     * @param toolName 工具名称
     * @param toolArgs 工具参数
     * @param outputChannel 输出通道
     */
    async executeTool(toolName: string, toolArgs: any, outputChannel: vscode.OutputChannel): Promise<void> {
        console.log(`执行工具: ${toolName}`, toolArgs);
        
        switch (toolName) {
            case 'write_file':
                await this.executeWriteFile(toolArgs, outputChannel);
                break;
            case 'run_command':
                await this.executeRunCommand(toolArgs, outputChannel);
                break;
            default:
                throw new Error(`未知的工具: ${toolName}`);
        }
    }

    /**
     * 执行写入文件工具
     * @param args 工具参数 {path: string, content: string}
     * @param outputChannel 输出通道
     */
    private async executeWriteFile(args: { path: string; content: string }, outputChannel: vscode.OutputChannel): Promise<void> {
        const { path: filePath, content } = args;
        
        if (!filePath || !content) {
            throw new Error('write_file工具需要path和content参数');
        }

        // 获取当前工作区根目录
        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (!workspaceFolders) {
            throw new Error('请先打开一个工作区再执行文件写入任务！');
        }

        const workspaceRoot = workspaceFolders[0].uri.fsPath;
        const fullFilePath = path.join(workspaceRoot, filePath);
        
        // 确保目录存在
        const dirPath = path.dirname(fullFilePath);
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
            outputChannel.appendLine(`创建目录: ${dirPath}`);
        }

        try {
            // 写入文件
            fs.writeFileSync(fullFilePath, content, 'utf-8');
            outputChannel.appendLine(`✅ 文件创建成功: ${fullFilePath}`);
            outputChannel.appendLine(`文件大小: ${content.length} 字符`);
            
            // 显示成功消息
            vscode.window.showInformationMessage(`文件创建成功: ${filePath}`);
            
            // 自动在VSCode中打开文件
            const fileUri = vscode.Uri.file(fullFilePath);
            const document = await vscode.workspace.openTextDocument(fileUri);
            await vscode.window.showTextDocument(document);
            
        } catch (error: any) {
            outputChannel.appendLine(`❌ 文件创建失败: ${error.message}`);
            throw new Error(`文件创建失败: ${error.message}`);
        }
    }

    /**
     * 执行运行命令工具
     * @param args 工具参数 {command: string}
     * @param outputChannel 输出通道
     */
    private async executeRunCommand(args: { command: string }, outputChannel: vscode.OutputChannel): Promise<void> {
        const { command } = args;
        
        if (!command) {
            throw new Error('run_command工具需要command参数');
        }

        outputChannel.appendLine(`执行命令: ${command}`);
        
        // 创建终端并执行命令
        const terminal = vscode.window.createTerminal('油糕出品 | 命令执行');
        terminal.show();
        terminal.sendText(command);
        
        outputChannel.appendLine(`✅ 命令已发送到终端执行`);
        vscode.window.showInformationMessage(`命令已发送到终端执行: ${command}`);
    }
}

/**
 * 插件激活入口
 */
export function activate(context: vscode.ExtensionContext) {
    console.log('油糕出品 | DeepSeek Code Workflow 插件已激活！');
    
    const toolExecutor = new ToolExecutor();
    
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
                    // 默认工具列表
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
                
                // OpenAI格式响应处理
                if (response.choices && response.choices.length > 0) {
                    const message = response.choices[0].message;
                    if (message.content) {
                        outputChannel.appendLine(message.content);
                    }
                    if (message.tool_calls && message.tool_calls.length > 0) {
                        outputChannel.appendLine('\n=== 工具调用执行 ===');
                        for (const toolCall of message.tool_calls) {
                            const toolName = toolCall.function.name;
                            const toolArgs = JSON.parse(toolCall.function.arguments);
                            
                            outputChannel.appendLine(`\n执行工具: ${toolName}`);
                            outputChannel.appendLine(`参数: ${JSON.stringify(toolArgs, null, 2)}`);
                            
                            // 执行工具调用
                            try {
                                await toolExecutor.executeTool(toolName, toolArgs, outputChannel);
                            } catch (error: any) {
                                outputChannel.appendLine(`❌ 工具执行失败: ${error.message}`);
                                vscode.window.showErrorMessage(`工具执行失败: ${error.message}`);
                            }
                        }
                    }
                } else {
                    outputChannel.appendLine('未收到有效响应');
                }

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