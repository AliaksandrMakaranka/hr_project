export type City = 'Варшава' | 'Краков' | 'Вроцлав' | 'Познань' | 'Гданьск' | 'Лодзь';

export type JobCategory = 
  | 'Строительство'
  | 'Металлообработка'
  | 'Деревообработка'
  | 'Электрика'
  | 'Сантехника'
  | 'Отделочные работы'
  | 'Кровельные работы'
  | 'Монтажные работы'
  | 'Инженерия'
  | 'Техника'
  | 'Безопасность'
  | 'Управление';

// Базовые типы для всех сущностей
export interface BaseEntity {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

// Типы для пагинации
export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Типы для фильтрации
export interface BaseFilter {
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

// Типы для ответов API
export interface ApiSuccess<T> {
  data: T;
  status: number;
  message?: string;
}

export interface ApiFailure {
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
  status: number;
}

export type ApiResult<T> = ApiSuccess<T> | ApiFailure; 