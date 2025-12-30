import { ClientOptions, Anthropic } from '@anthropic-ai/sdk';
import * as vscode from 'vscode';
import { exponentialBackoffRetry } from '../utils/retry';

/**
 * 火山引擎DeepSeek客户端（兼容Anthropic接口）
 */
export class VolcDeepSeekClient {
    private client: Anthropic;
    private config: vscode.WorkspaceConfiguration;

    constructor() {
        this.config = vscode.workspace.getConfiguration('yougao-deepseek-code-workflow');
        this.client = this.initClient();
    }

    /**
     * 初始化火山引擎DeepSeek客户端
     */
    private initClient(): Anthropic {
        const apiKey = this.config.get<string>('apiKey') || process.env.VOLC_API_KEY;
        const baseURL = this.config.get<string>('baseUrl') || 'https://api.deepseek.com/anthropic';
        const model = this.config.get<string>('model') || 'deepseek-reasoner';

        if (!apiKey) {
            vscode.window.showErrorMessage('油糕出品 | 请配置火山引擎API Key！');
            throw new Error('Yougao DeepSeek API Key not configured');
        }

        const options: ClientOptions = {
            apiKey,
            baseURL,
            defaultHeaders: {
                'x-volc-engine-access': 'true',
                'User-Agent': 'Yougao-DeepSeek-Code-Workflow-VSCode-Extension'
            },
            timeout: 15000 // 火山引擎推荐超时时间
        };

        return new Anthropic(options);
    }

    /**
     * 运行Agent任务（带火山引擎重试策略）
     * @param prompt 任务提示词
     * @param tools 工具列表
     */
    async runAgent(prompt: string, tools: any[] = []) {
        const requestFn = async () => {
            // 火山引擎DeepSeek API扩展了标准Anthropic API，支持tools参数
            // 使用类型断言绕过SDK类型检查
            const params: any = {
                model: this.config.get<string>('model') || 'deepseek-reasoner',
                max_tokens: 4096,
                messages: [{ role: 'user', content: prompt }]
            };
            
            // 只有在有工具时才添加tools参数
            if (tools && tools.length > 0) {
                params.tools = tools;
                params.tool_choice = 'auto';
            }
            
            return await this.client.messages.create(params);
        };

        // 火山引擎稳定性加固：指数退避重试
        return await exponentialBackoffRetry(requestFn, {
            maxRetries: 3,
            initialDelay: 1000
        });
    }
}

// 导出单例客户端
export const deepseekClient = new VolcDeepSeekClient();