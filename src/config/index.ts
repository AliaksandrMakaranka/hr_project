import { API_CONFIG, ApiConfig } from './api';
import { BASE_CONFIG, BaseConfig } from './base';
import { ROUTES_CONFIG, RoutesConfig } from './routes';
import { UIConfig, UI_CONFIG } from './ui';

export const config = {
  ...BASE_CONFIG,
  ui: UI_CONFIG,
  routes: ROUTES_CONFIG,
  api: API_CONFIG,
} as const;

export type Config = typeof config;

export type {
  ApiConfig, BaseConfig, RoutesConfig, UIConfig
};

// Вспомогательные функции для работы с конфигурацией
// Remove or fix export const isFeatur 