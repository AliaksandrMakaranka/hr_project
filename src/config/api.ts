import { BASE_CONFIG } from './base';

/**
 * Конфигурация API
 */
export const API_CONFIG = {
  baseUrl: BASE_CONFIG.api.baseUrl,
  timeout: BASE_CONFIG.api.timeout,
  retryAttempts: BASE_CONFIG.api.retryAttempts,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  endpoints: {
    vacancies: {
      list: '/vacancies',
      details: (id: number) => `/vacancies/${id}`,
      apply: (id: number) => `/vacancies/${id}/apply`,
      search: '/vacancies/search',
    },
    cities: {
      list: '/cities',
      details: (id: number) => `/cities/${id}`,
      popular: '/cities/popular',
    },
    categories: {
      list: '/categories',
      details: (id: number) => `/categories/${id}`,
      popular: '/categories/popular',
    },
    contact: {
      send: '/contact',
    },
  },
  errorMessages: {
    networkError: 'Ошибка сети. Пожалуйста, проверьте подключение.',
    serverError: 'Ошибка сервера. Пожалуйста, попробуйте позже.',
    notFound: 'Ресурс не найден.',
    unauthorized: 'Требуется авторизация.',
    forbidden: 'Доступ запрещен.',
  },
} as const;

export type ApiConfig = typeof API_CONFIG; 