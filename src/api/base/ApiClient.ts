import { ErrorHandler } from '../../utils/ErrorHandler';
import { Logger } from '../../utils/Logger';
import { ApiRequestOptions, ApiResponse } from '../types/api';

export class ApiClient {
  private static instance: ApiClient;
  private logger: Logger;
  private errorHandler: ErrorHandler;
  private baseUrl: string;

  private constructor() {
    this.logger = Logger.getInstance();
    this.errorHandler = ErrorHandler.getInstance();
    this.baseUrl = import.meta.env.VITE_API_URL || 'https://api.example.com';
  }

  public static getInstance(): ApiClient {
    if (!ApiClient.instance) {
      ApiClient.instance = new ApiClient();
    }
    return ApiClient.instance;
  }

  public async get<T>(url: string, options?: Omit<ApiRequestOptions, 'method' | 'url'>): Promise<ApiResponse<T>> {
    return this.request<T>({ method: 'GET', url, ...options });
  }

  public async post<T>(url: string, data?: unknown, options?: Omit<ApiRequestOptions, 'method' | 'url' | 'data'>): Promise<ApiResponse<T>> {
    return this.request<T>({ method: 'POST', url, data, ...options });
  }

  public async put<T>(url: string, data?: unknown, options?: Omit<ApiRequestOptions, 'method' | 'url' | 'data'>): Promise<ApiResponse<T>> {
    return this.request<T>({ method: 'PUT', url, data, ...options });
  }

  public async delete<T>(url: string, options?: Omit<ApiRequestOptions, 'method' | 'url'>): Promise<ApiResponse<T>> {
    return this.request<T>({ method: 'DELETE', url, ...options });
  }

  public async request<T>(options: ApiRequestOptions): Promise<ApiResponse<T>> {
    try {
      const { method, url, data, headers = {}, params } = options;
      const queryString = params ? `?${new URLSearchParams(params as Record<string, string>).toString()}` : '';
      const fullUrl = `${this.baseUrl}${url}${queryString}`;

      this.logger.debug(`Making request to ${fullUrl}`, { method, data, headers });

      const response = await fetch(fullUrl, {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
        body: data ? JSON.stringify(data) : undefined,
      });

      return this.handleResponse<T>(response);
    } catch (error) {
      return this.handleError(error);
    }
  }

  protected async handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
    if (!response.ok) {
      const error = {
        message: `HTTP Error: ${response.status}`,
        code: `HTTP_${response.status}`,
        status: response.status,
      };

      try {
        const errorData = await response.json();
        return { error: errorData.message || error.message };
      } catch {
        return { error: error.message };
      }
    }

    const data = await response.json();
    return { data };
  }

  protected handleError(error: unknown): never {
    this.errorHandler.handleError(error);
    throw error;
  }
} 