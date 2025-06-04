/**
 * Базовый интерфейс для всех сущностей
 */
export interface BaseEntity {
  id: number;
  createdAt?: Date;
  updatedAt?: Date;
}

/**
 * Базовый интерфейс для репозиториев
 */
export interface IBaseRepository<T extends BaseEntity> {
  getAll(): Promise<T[]>;
  getById(id: number): Promise<T | null>;
  create(data: Omit<T, 'id'>): Promise<T>;
  update(id: number, data: Partial<T>): Promise<T>;
  delete(id: number): Promise<boolean>;
}

/**
 * Интерфейс для поиска
 */
export interface ISearchable<T> {
  search(query: string): Promise<T[]>;
  getByFilters(filters: Record<string, unknown>): Promise<T[]>;
}

/**
 * Интерфейс для пагинации
 */
export interface IPaginated<T> {
  getPage(page: number, limit: number): Promise<{
    items: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }>;
} 