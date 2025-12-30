/**
 * 油糕（Yougao）通用 API 基础封装
 * 提供统一的 API 调用、错误处理和日志记录
 */

const brand = require('./brand.js');

class YougaoApiBase {
  constructor(config = {}) {
    this.config = {
      baseURL: config.baseURL || '',
      timeout: config.timeout || 15000,
      retryCount: config.retryCount || 3,
      ...config
    };
    
    this.logger = {
      info: (msg, data) => console.log(`[${brand.BRAND_NAME}] INFO: ${msg}`, data || ''),
      error: (msg, error) => console.error(`[${brand.BRAND_NAME}] ERROR: ${msg}`, error || ''),
      warn: (msg, data) => console.warn(`[${brand.BRAND_NAME}] WARN: ${msg}`, data || '')
    };
  }

  /**
   * 统一的 API 请求方法
   * @param {string} endpoint API 端点
   * @param {Object} options 请求选项
   * @returns {Promise<any>} 响应数据
   */
  async request(endpoint, options = {}) {
    const { method = 'GET', data, headers = {} } = options;
    
    const requestOptions = {
      method,
      headers: {
        'User-Agent': `${brand.BRAND_NAME} API Client`,
        'Content-Type': 'application/json',
        ...headers
      },
      timeout: this.config.timeout
    };

    if (data) {
      requestOptions.body = JSON.stringify(data);
    }

    let lastError;
    for (let i = 0; i < this.config.retryCount; i++) {
      try {
        const url = `${this.config.baseURL}${endpoint}`;
        this.logger.info(`API Request: ${method} ${url}`);
        
        const response = await fetch(url, requestOptions);
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const result = await response.json();
        this.logger.info(`API Response: ${method} ${endpoint}`, { status: response.status });
        return result;
      } catch (error) {
        lastError = error;
        this.logger.warn(`API Request failed (attempt ${i + 1}/${this.config.retryCount})`, error.message);
        
        if (i < this.config.retryCount - 1) {
          // 指数退避延迟
          const delay = 1000 * Math.pow(2, i);
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }
    }
    
    throw new Error(`API request failed after ${this.config.retryCount} attempts: ${lastError?.message}`);
  }

  /**
   * GET 请求
   */
  async get(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: 'GET' });
  }

  /**
   * POST 请求
   */
  async post(endpoint, data, options = {}) {
    return this.request(endpoint, { ...options, method: 'POST', data });
  }

  /**
   * PUT 请求
   */
  async put(endpoint, data, options = {}) {
    return this.request(endpoint, { ...options, method: 'PUT', data });
  }

  /**
   * DELETE 请求
   */
  async delete(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: 'DELETE' });
  }

  /**
   * 设置认证令牌
   */
  setAuthToken(token) {
    this.config.authToken = token;
    return this;
  }

  /**
   * 获取当前配置
   */
  getConfig() {
    return { ...this.config };
  }
}

module.exports = YougaoApiBase;