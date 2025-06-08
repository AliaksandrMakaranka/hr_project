import { Vacancy } from '../types';
import { ErrorHandler } from '../utils/ErrorHandler';
import { Logger } from '../utils/Logger';
import { ApiRequestOptions, ApiResponse } from './types/api';

export type { ApiRequestOptions, ApiResponse } from './types/api';

class ApiClient {
  private static instance: ApiClient;
  private logger: Logger;
  private errorHandler: ErrorHandler;
  private baseUrl: string;

  constructor() {
    this.logger = Logger.getInstance();
    this.errorHandler = ErrorHandler.getInstance();
    this.baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
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
      let errorMessage = `HTTP Error: ${response.status}`;
      let errorData = null;

      try {
        const errorResponse = await response.json();
        errorMessage = errorResponse.message || errorMessage;
        errorData = errorResponse;
      } catch {
        // If we can't parse the error response as JSON, we'll just use the status
      }

      const error = {
        message: errorMessage,
        code: `HTTP_${response.status}`,
        status: response.status,
        data: errorData
      };

      this.errorHandler.handleError({
        error: new Error(error.message),
        context: { status: response.status, data: errorData },
      });

      throw error;
    }

    const data = await response.json();
    return { data };
  }

  protected handleError(error: unknown): never {
    const apiError = this.errorHandler.handleError(error);
    throw apiError;
  }

  // API Methods
  async getVacancies(): Promise<ApiResponse<Vacancy[]>> {
    return this.request<Vacancy[]>({
      method: 'GET',
      url: '/vacancies',
    });
  }

  async getVacancyById(id: number): Promise<ApiResponse<Vacancy>> {
    return this.request<Vacancy>({
      method: 'GET',
      url: `/vacancies/${id}`,
    });
  }

  async createVacancy(data: Partial<Vacancy>): Promise<ApiResponse<Vacancy>> {
    return this.request<Vacancy>({
      method: 'POST',
      url: '/vacancies',
      data,
    });
  }

  async updateVacancy(id: number, data: Partial<Vacancy>): Promise<ApiResponse<Vacancy>> {
    return this.request<Vacancy>({
      method: 'PUT',
      url: `/vacancies/${id}`,
      data,
    });
  }

  async deleteVacancy(id: number): Promise<ApiResponse<void>> {
    return this.request<void>({
      method: 'DELETE',
      url: `/vacancies/${id}`,
    });
  }

  async get<T>(url: string): Promise<T> {
    const response = await fetch(`${this.baseUrl}${url}`);
    if (!response.ok) {
      let errorText = `HTTP error! Status: ${response.status}`;
      try {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const errorJson = await response.json();
          errorText = errorJson.message || JSON.stringify(errorJson);
        } else {
          errorText = await response.text();
        }
      } catch (e) {
        // Fallback to generic error if response body cannot be read
      }
      throw new Error(`Failed to fetch ${url}: ${errorText}`);
    }

    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return response.json();
    } else {
      const text = await response.text();
      throw new Error(`Expected JSON for ${url}, but received non-JSON: ${text.slice(0, 200)}`);
    }
  }

  async post<T>(url: string, body?: unknown): Promise<T> {
    const response = await fetch(`${this.baseUrl}${url}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: body ? JSON.stringify(body) : undefined,
    });
    if (!response.ok) {
      let errorText = `HTTP error! Status: ${response.status}`;
      try {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const errorJson = await response.json();
          errorText = errorJson.message || JSON.stringify(errorJson);
        } else {
          errorText = await response.text();
        }
      } catch (e) {
        // Fallback to generic error if response body cannot be read
      }
      throw new Error(`Failed to post to ${url}: ${errorText}`);
    }
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return response.json();
    } else {
      const text = await response.text();
      throw new Error(`Expected JSON for ${url}, but received non-JSON: ${text.slice(0, 200)}`);
    }
  }

  async put<T>(url: string, body?: unknown): Promise<T> {
    const response = await fetch(`${this.baseUrl}${url}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: body ? JSON.stringify(body) : undefined,
    });
    if (!response.ok) {
      let errorText = `HTTP error! Status: ${response.status}`;
      try {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const errorJson = await response.json();
          errorText = errorJson.message || JSON.stringify(errorJson);
        } else {
          errorText = await response.text();
        }
      } catch (e) {
        // Fallback to generic error if response body cannot be read
      }
      throw new Error(`Failed to put to ${url}: ${errorText}`);
    }
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return response.json();
    } else {
      const text = await response.text();
      throw new Error(`Expected JSON for ${url}, but received non-JSON: ${text.slice(0, 200)}`);
    }
  }

  async delete<T>(url: string): Promise<T> {
    const response = await fetch(`${this.baseUrl}${url}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      let errorText = `HTTP error! Status: ${response.status}`;
      try {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const errorJson = await response.json();
          errorText = errorJson.message || JSON.stringify(errorJson);
        } else {
          errorText = await response.text();
        }
      } catch (e) {
        // Fallback to generic error if response body cannot be read
      }
      throw new Error(`Failed to delete ${url}: ${errorText}`);
    }
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return response.json();
    } else {
      const text = await response.text();
      throw new Error(`Expected JSON for ${url}, but received non-JSON: ${text.slice(0, 200)}`);
    }
  }
}

export const apiClient = new ApiClient(); 