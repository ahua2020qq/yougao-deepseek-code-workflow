import OpenAI from 'openai';
import * as vscode from 'vscode';
import { exponentialBackoffRetry } from '../utils/retry';

/**
 * 火山引擎DeepSeek客户端（使用OpenAI兼容接口）
 */
export class VolcDeepSeekClient {
    private client: OpenAI;
    private config: vscode.WorkspaceConfiguration;

    constructor() {
        this.config = vscode.workspace.getConfiguration('yougao-deepseek-code-workflow');
        this.client = this.initClient();
    }

    /**
     * 初始化火山引擎DeepSeek客户端
     */
    private initClient(): OpenAI {
        const apiKey = this.config.get<string>('apiKey') || process.env.ARK_API_KEY;
        const baseURL = this.config.get<string>('baseUrl') || 'https://ark.cn-beijing.volces.com/api/v3';
        const model = this.config.get<string>('model') || 'deepseek-v3-2-251201';

        if (!apiKey) {
            vscode.window.showErrorMessage('油糕出品 | 请配置火山引擎API Key！');
            throw new Error('Yougao DeepSeek API Key not configured');
        }

        console.log('DeepSeek客户端: 初始化OpenAI客户端');
        console.log('DeepSeek客户端: BaseURL:', baseURL);
        console.log('DeepSeek客户端: 模型:', model);

        return new OpenAI({
            apiKey,
            baseURL,
            defaultHeaders: {
                'User-Agent': 'Yougao-DeepSeek-Code-Workflow-VSCode-Extension'
            },
            timeout: 30000 // 30秒超时
        });
    }

    /**
     * 转换工具格式为OpenAI兼容格式
     * @param tools 原始工具列表
     */
    private convertToolsToOpenAIFormat(tools: any[]): any[] {
        return tools.map(tool => ({
            type: 'function',
            function: {
                name: tool.name,
                description: tool.description,
                parameters: tool.input_schema
            }
        }));
    }

    /**
     * 运行Agent任务（带火山引擎重试策略）
     * @param prompt 任务提示词
     * @param tools 工具列表
     */
    async runAgent(prompt: string, tools: any[] = []) {
        console.log('DeepSeek客户端: 开始运行Agent，prompt长度:', prompt.length);
        console.log('DeepSeek客户端: 使用模型:', this.config.get<string>('model') || 'deepseek-v3-2-251201');
        
        const requestFn = async () => {
            // 构建OpenAI兼容的请求参数
            const params: any = {
                model: this.config.get<string>('model') || 'deepseek-v3-2-251201',
                max_tokens: 4096,
                messages: [
                    {
                        role: 'system',
                        content: '你是一个专业的代码助手，可以帮助用户编写、调试和优化代码。请根据用户的需求生成高质量的代码。'
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                stream: false
            };
            
            // 只有在有工具时才添加tools参数
            if (tools && tools.length > 0) {
                const openAITools = this.convertToolsToOpenAIFormat(tools);
                params.tools = openAITools;
                params.tool_choice = 'auto';
                console.log('DeepSeek客户端: 使用工具数量:', tools.length);
                console.log('DeepSeek客户端: 转换后的工具格式:', JSON.stringify(openAITools, null, 2));
            }
            
            console.log('DeepSeek客户端: 调用API...');
            console.log('DeepSeek客户端: 请求参数:', JSON.stringify({
                model: params.model,
                messages: params.messages,
                hasTools: tools.length > 0,
                toolsCount: tools.length
            }, null, 2));
            
            return await this.client.chat.completions.create(params);
        };

        // 火山引擎稳定性加固：指数退避重试
        console.log('DeepSeek客户端: 开始执行请求...');
        try {
            const result = await exponentialBackoffRetry(requestFn, {
                maxRetries: 3,
                initialDelay: 1000
            });
            console.log('DeepSeek客户端: 请求成功完成');
            console.log('DeepSeek客户端: 响应使用量:', result.usage);
            return result;
        } catch (error) {
            console.error('DeepSeek客户端: 请求失败:', error);
            throw error;
        }
    }
}

// 导出单例客户端
export const deepseekClient = new VolcDeepSeekClient();