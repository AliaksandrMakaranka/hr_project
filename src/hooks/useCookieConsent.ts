import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

/**
 * Константы для имен cookie в приложении
 * @constant
 */
export const COOKIE_NAMES = {
  CONSENT: 'cookie_consent',
  LANGUAGE: 'language',
  FILTERS: 'vacancy_filters'
} as const;

/**
 * Интерфейс для фильтров вакансий
 * @interface VacancyFilters
 * @property {string} [city] - ID города для фильтрации
 * @property {string} [category] - ID категории для фильтрации
 */
export interface VacancyFilters {
  city?: string;
  category?: string;
}

/**
 * Интерфейс для настроек согласия на использование cookie
 * @interface CookieSettings
 * @property {boolean} analytics - Согласие на аналитические cookie
 * @property {boolean} functional - Согласие на функциональные cookie
 * @property {boolean} marketing - Согласие на маркетинговые cookie
 */
export interface CookieSettings {
  analytics: boolean;
  functional: boolean;
  marketing: boolean;
}

/**
 * Хук для управления согласием на использование cookie и связанными настройками.
 * Предоставляет функционал для управления согласием, языком и фильтрами вакансий.
 * 
 * @returns {Object} Объект с методами и состоянием для управления cookie
 * @property {boolean} hasConsent - Наличие согласия на использование cookie
 * @property {CookieSettings} settings - Текущие настройки согласия
 * @property {Function} setConsent - Метод для установки согласия
 * @property {Function} revokeConsent - Метод для отзыва согласия
 * @property {Function} setLanguage - Метод для установки языка
 * @property {Function} getLanguage - Метод для получения текущего языка
 * @property {Function} setFilters - Метод для сохранения фильтров
 * @property {Function} getFilters - Метод для получения сохраненных фильтров
 * 
 * @example
 * ```tsx
 * const {
 *   hasConsent,
 *   settings,
 *   setConsent,
 *   setLanguage
 * } = useCookieConsent();
 * 
 * // Установка согласия
 * setConsent({
 *   analytics: true,
 *   functional: true,
 *   marketing: false
 * });
 * 
 * // Установка языка
 * setLanguage('en');
 * ```
 * 
 * @remarks
 * - Cookie согласия хранятся 365 дней
 * - Фильтры хранятся 7 дней
 * - Язык по умолчанию - 'ru'
 */
export const useCookieConsent = () => {
  const [hasConsent, setHasConsent] = useState<boolean>(false);
  const [settings, setSettings] = useState<CookieSettings>({
    analytics: false,
    functional: false,
    marketing: false
  });

  // Проверяем наличие согласия при инициализации
  useEffect(() => {
    const consent = Cookies.get(COOKIE_NAMES.CONSENT);
    if (consent) {
      setHasConsent(true);
      setSettings(JSON.parse(consent));
    }
  }, []);

  /**
   * Устанавливает согласие на использование cookie
   * @param {CookieSettings} newSettings - Новые настройки согласия
   */
  const setConsent = (newSettings: CookieSettings) => {
    Cookies.set(COOKIE_NAMES.CONSENT, JSON.stringify(newSettings), { expires: 365 });
    setHasConsent(true);
    setSettings(newSettings);
  };

  /**
   * Отзывает согласие на использование cookie
   */
  const revokeConsent = () => {
    Cookies.remove(COOKIE_NAMES.CONSENT);
    setHasConsent(false);
    setSettings({
      analytics: false,
      functional: false,
      marketing: false
    });
  };

  /**
   * Устанавливает язык приложения
   * @param {string} language - Код языка (например, 'ru', 'en')
   */
  const setLanguage = (language: string) => {
    if (hasConsent) {
      Cookies.set(COOKIE_NAMES.LANGUAGE, language, { expires: 365 });
    }
  };

  /**
   * Получает текущий язык приложения
   * @returns {string} Код языка
   */
  const getLanguage = () => {
    return Cookies.get(COOKIE_NAMES.LANGUAGE) || 'ru';
  };

  /**
   * Сохраняет фильтры вакансий
   * @param {VacancyFilters} filters - Объект с фильтрами
   */
  const setFilters = (filters: VacancyFilters) => {
    if (hasConsent) {
      Cookies.set(COOKIE_NAMES.FILTERS, JSON.stringify(filters), { expires: 7 });
    }
  };

  /**
   * Получает сохраненные фильтры вакансий
   * @returns {VacancyFilters} Объект с фильтрами
   */
  const getFilters = (): VacancyFilters => {
    const filters = Cookies.get(COOKIE_NAMES.FILTERS);
    return filters ? JSON.parse(filters) : {};
  };

  return {
    hasConsent,
    settings,
    setConsent,
    revokeConsent,
    setLanguage,
    getLanguage,
    setFilters,
    getFilters
  };
}; 