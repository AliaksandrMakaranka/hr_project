/**
 * Базовые настройки приложения
 */
export const BASE_CONFIG = {
  app: {
    name: 'HR Company',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development',
    isDevelopment: process.env.NODE_ENV === 'development',
    isProduction: process.env.NODE_ENV === 'production',
  },
  api: {
    baseUrl: process.env.REACT_APP_API_URL || 'http://localhost:3000',
    timeout: 5000,
    retryAttempts: 3,
    endpoints: {
      vacancies: '/vacancies',
      cities: '/cities',
      categories: '/categories',
      contact: '/contact',
    },
  },
  pagination: {
    defaultPageSize: 10,
    maxPageSize: 100,
    pageSizeOptions: [10, 20, 50, 100],
  },
  validation: {
    maxStringLength: 255,
    minPasswordLength: 8,
    maxFileSize: 5 * 1024 * 1024, // 5MB
    allowedFileTypes: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
  },
  features: {
    enableAnalytics: process.env.REACT_APP_ENABLE_ANALYTICS === 'true',
    enableNotifications: process.env.REACT_APP_ENABLE_NOTIFICATIONS === 'true',
    enableDarkMode: process.env.REACT_APP_ENABLE_DARK_MODE === 'true',
  },
} as const;

export type BaseConfig = typeof BASE_CONFIG; 