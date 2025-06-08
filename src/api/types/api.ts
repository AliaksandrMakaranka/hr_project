export interface ApiError {
    message: string;
    code?: string;
    status?: number;
    errors?: Record<string, string[]>;
}

export interface ApiRequestOptions {
    method: string;
    url: string;
    data?: unknown;
    headers?: Record<string, string>;
    params?: Record<string, string | number | boolean>;
}

export interface ApiResponse<T> {
    data?: T;
    error?: string;
}

export interface PaginatedResponse<T> {
    items: T[];
    total: number;
    currentPage: number;
    limit: number;
    totalPages: number;
}

export interface VacancyFilters {
    cityId?: number;
    categoryId?: number;
    employmentType?: string;
    salaryFrom?: number;
    salaryTo?: number;
    searchTerm?: string;
    sortBy?: 'date' | 'salary';
    sortOrder?: 'asc' | 'desc';
    page?: number;
} 