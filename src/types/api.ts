import type { Vacancy } from './vacancy';
import type { City } from './city';
import type { JobCategory } from './jobCategory';

export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

export interface ApiError {
  status: number;
  message: string;
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