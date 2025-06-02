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

async function handleResponse<T>(response: Response): Promise<ApiResult<T>> {
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

    return { error };
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

export async function apiRequest<T>(
  url: string,
  options: RequestInit = {}
): Promise<ApiResult<T>> {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    return handleResponse<T>(response);
  } catch (error) {
    const apiError = errorHandler.handleApiError(error);
    return { error: apiError };
  }
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