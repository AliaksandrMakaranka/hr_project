import { ErrorHandler } from '../utils/ErrorHandler';

export interface ApiError {
  message: string;
  status?: number;
  data?: unknown;
}

export interface ApiResponse<T> {
  data: T;
  error?: never;
}

export interface ApiErrorResponse {
  data?: never;
  error: ApiError;
}

export type ApiResult<T> = ApiResponse<T> | ApiErrorResponse;

const errorHandler = ErrorHandler.getInstance();

export class BaseApiClient {
  protected constructor(
    protected readonly baseUrl: string,
    protected readonly headers: Record<string, string> = {}
  ) { }

  protected async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResult<T>> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...this.headers,
          ...options.headers,
        },
      });

      return this.handleResponse<T>(response);
    } catch (error) {
      return this.handleError(error);
    }
  }

  protected handleResponse<T>(response: Response): Promise<ApiResult<T>> {
    if (!response.ok) {
      const error: ApiError = {
        message: `HTTP Error: ${response.status}`,
        status: response.status,
      };

      try {
        const errorData = await response.json();
        error.data = errorData;
      } catch {
        // If we can't parse the error response as JSON, we'll just use the status
      }

      errorHandler.handleError({
        error: new Error(error.message),
        context: { status: response.status, data: error.data },
      });

      return Promise.resolve({ error });
    }

    try {
      const data = await response.json();
      return { data };
    } catch (error) {
      const apiError: ApiError = {
        message: 'Failed to parse response',
      };

      errorHandler.handleError({
        error: error instanceof Error ? error : new Error('Failed to parse response'),
      });

      return { error: apiError };
    }
  }

  protected handleError(error: unknown): ApiResult<never> {
    const apiError = errorHandler.handleApiError(error);
    return { error: apiError };
  }
}

export class VacancyApiClient extends BaseApiClient {
  constructor(baseUrl: string, headers?: Record<string, string>) {
    super(baseUrl, headers);
  }

  async getVacancies(_filters: VacancyFilters): Promise<ApiResult<Vacancy[]>> {
    return this.request<Vacancy[]>('/vacancies', {
      method: 'GET',
      // Добавить параметры фильтрации
    });
  }

  // Другие методы для работы с вакансиями
}

export const apiClient = {
  get: <T>(url: string, options: RequestInit = {}) =>
    apiRequest<T>(url, { ...options, method: 'GET' }),

  post: <T>(url: string, data: unknown, options: RequestInit = {}) =>
    apiRequest<T>(url, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data),
    }),

  put: <T>(url: string, data: unknown, options: RequestInit = {}) =>
    apiRequest<T>(url, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  delete: <T>(url: string, options: RequestInit = {}) =>
    apiRequest<T>(url, { ...options, method: 'DELETE' }),
}; 