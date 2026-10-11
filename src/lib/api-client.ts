/**
 * Centralized API client with error handling and type safety
 */

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

interface ApiResponse<T> {
  data: T;
  status: number;
  error?: string;
}

interface ApiRequestConfig {
  method?: HttpMethod;
  headers?: Record<string, string>;
  body?: any;
}

class ApiClient {
  private baseUrl = '/api';
  private defaultHeaders = {
    'Content-Type': 'application/json',
  };

  async request<T>(
    endpoint: string,
    config: ApiRequestConfig = {}
  ): Promise<T> {
    const { method = 'GET', headers = {}, body } = config;

    const url = `${this.baseUrl}${endpoint}`;
    const options: RequestInit = {
      method,
      headers: { ...this.defaultHeaders, ...headers },
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API Request Error:', error);
      throw error;
    }
  }

  get<T>(endpoint: string) {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  post<T>(endpoint: string, body: any) {
    return this.request<T>(endpoint, { method: 'POST', body });
  }

  put<T>(endpoint: string, body: any) {
    return this.request<T>(endpoint, { method: 'PUT', body });
  }

  delete<T>(endpoint: string) {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }

  patch<T>(endpoint: string, body: any) {
    return this.request<T>(endpoint, { method: 'PATCH', body });
  }
}

export const apiClient = new ApiClient();
export type { ApiRequestConfig, ApiResponse };
