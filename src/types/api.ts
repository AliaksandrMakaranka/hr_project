import type { Vacancy } from './vacancy';
import type { City } from './city';
import type { JobCategory } from './jobCategory';

export interface ApiResponse<T> {
  data: T;
  meta?: {
    total: number;
    page: number;
    limit: number;
  };
}

export interface ApiError {
  message: string;
  code: string;
  status: number;
  errors?: Record<string, string[]>;
}

export interface VacancyApplicationData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  resume?: File;
  coverLetter?: string;
  expectedSalary?: string;
  availabilityDate?: string;
}

export interface VacancyFilters {
  city?: string;
  category?: string;
  employmentType?: string;
  salaryFrom?: number;
  salaryTo?: number;
  searchTerm?: string;
  sortBy?: 'date' | 'salary';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export type VacanciesResponse = PaginatedResponse<Vacancy>;
export type CitiesResponse = PaginatedResponse<City>;
export type CategoriesResponse = PaginatedResponse<JobCategory>;

export interface ApiRequestConfig {
  headers?: Record<string, string>;
  params?: Record<string, string | number | boolean>;
  timeout?: number;
}

export type ApiMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export interface ApiRequestOptions extends ApiRequestConfig {
  method: ApiMethod;
  url: string;
  data?: unknown;
} 