import { apiClient } from '../api/client';

export abstract class BaseRepository<T> {
  protected api: typeof apiClient;
  protected baseUrl: string;

  constructor(baseUrl: string) {
    this.api = apiClient;
    this.baseUrl = baseUrl;
  }

  protected async get<R>(url: string): Promise<R> {
    return this.api.get<R>(`${this.baseUrl}${url}`);
  }

  protected async post<R>(url: string, data: unknown): Promise<R> {
    return this.api.post<R>(`${this.baseUrl}${url}`, data);
  }

  protected async put<R>(url: string, data: unknown): Promise<R> {
    return this.api.put<R>(`${this.baseUrl}${url}`, data);
  }

  public async delete<R>(url: string): Promise<R> {
    return this.api.delete<R>(`${this.baseUrl}${url}`);
  }

  public async getAll(): Promise<T[]> {
    return this.get<T[]>('');
  }

  public async getById(id: number): Promise<T> {
    return this.get<T>(`/${id}`);
  }

  public async create(data: Partial<T>): Promise<T> {
    return this.post<T>('', data);
  }

  public async update(id: number, data: Partial<T>): Promise<T> {
    return this.put<T>(`/${id}`, data);
  }
} 