import { BaseEntity, IBaseRepository } from '../types/base';
import { Logger } from '../utils/Logger';

export abstract class BaseRepository<T extends BaseEntity> implements IBaseRepository<T> {
  protected constructor(
    protected readonly apiClient: BaseApiClient,
    protected readonly logger: Logger
  ) { }

  public async getAll(): Promise<T[]> {
    const result = await this.apiClient.request<T[]>('/');
    if ('error' in result) {
      throw new Error(result.error.message);
    }
    return result.data;
  }

  public async getById(id: number): Promise<T | null> {
    const result = await this.apiClient.request<T>(`/${id}`);
    if ('error' in result) {
      if (result.error.status === 404) {
        return null;
      }
      throw new Error(result.error.message);
    }
    return result.data;
  }

  public async create(data: Omit<T, 'id'>): Promise<T> {
    const result = await this.apiClient.request<T>('/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    if ('error' in result) {
      throw new Error(result.error.message);
    }
    return result.data;
  }

  public async update(id: number, data: Partial<T>): Promise<T> {
    const result = await this.apiClient.request<T>(`/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
    if ('error' in result) {
      throw new Error(result.error.message);
    }
    return result.data;
  }

  public async delete(id: number): Promise<boolean> {
    const result = await this.apiClient.request<void>(`/${id}`, {
      method: 'DELETE',
    });
    return !('error' in result);
  }
} 