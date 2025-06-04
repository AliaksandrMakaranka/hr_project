import { BASE_CONFIG, BaseConfig } from './base';
import { UI_CONFIG, UIConfig } from './ui';
import { ROUTES_CONFIG, RoutesConfig } from './routes';
import { API_CONFIG, ApiConfig } from './api';

export const config = {
  ...BASE_CONFIG,
  ui: UI_CONFIG,
  routes: ROUTES_CONFIG,
  api: API_CONFIG,
} as const;

export type Config = typeof config;

export type {
  BaseConfig,
  UIConfig,
  RoutesConfig,
  ApiConfig,
};

// Вспомогательные функции для работы с конфигурацией
export const isFeatur 