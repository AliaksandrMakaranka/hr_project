import { ApiError, ApiRequestOptions, ApiResponse } from '@types/api';
import { ErrorHandler } from '@utils/ErrorHandler';
import { Logger } from '@utils/Logger';

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

  public async request<T>(options: ApiRequestOptions): Promise<ApiResponse<T>> {
    try {
      const { method, url, data, headers = {} } = options;
      this.logger.debug(`Making request to ${url}`, { method, data, headers });
      
      const response = await fetch(`${this.baseUrl}${url}`, {
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
      const error: ApiError = {
        message: `HTTP Error: ${response.status}`,
        status: response.status,
      };

      try {
        const errorData = await response.json();
        error.data = errorData;
      } catch {
        // Ignore JSON parsing errors
      }

      return { error };
    }

    const data = await response.json();
    return { data };
  }

  protected handleError(error: unknown): ApiResponse<never> {
    const apiError: ApiError = {
      message: error instanceof Error ? error.message : 'Unknown error',
      status: 500,
    };

    return { error: apiError };
  }
} 