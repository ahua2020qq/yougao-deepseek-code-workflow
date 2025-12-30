/**
 * 指数退避重试函数（适配火山引擎接口）
 * @param fn 待重试的异步函数
 * @param options 重试配置
 */
export async function exponentialBackoffRetry<T>(
    fn: () => Promise<T>,
    options: { maxRetries: number; initialDelay: number }
): Promise<T> {
    let retries = 0;
    while (true) {
        try {
            return await fn();
        } catch (error: any) {
            retries++;
            if (retries > options.maxRetries) {
                throw new Error(`重试${options.maxRetries}次失败: ${error.message}`);
            }
            // 指数退避延迟
            const delay = options.initialDelay * Math.pow(2, retries - 1);
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
}