import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

// Константы для имен cookie
export const COOKIE_NAMES = {
  CONSENT: 'cookie_consent',
  LANGUAGE: 'language',
  FILTERS: 'vacancy_filters'
} as const;

// Типы для фильтров
export interface VacancyFilters {
  city?: string;
  category?: string;
}

// Типы для настроек cookie
export interface CookieSettings {
  analytics: boolean;
  functional: boolean;
  marketing: boolean;
}

// Хук для управления согласием на использование cookie
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

  // Метод для установки согласия
  const setConsent = (newSettings: CookieSettings) => {
    Cookies.set(COOKIE_NAMES.CONSENT, JSON.stringify(newSettings), { expires: 365 });
    setHasConsent(true);
    setSettings(newSettings);
  };

  // Метод для отзыва согласия
  const revokeConsent = () => {
    Cookies.remove(COOKIE_NAMES.CONSENT);
    setHasConsent(false);
    setSettings({
      analytics: false,
      functional: false,
      marketing: false
    });
  };

  // Метод для установки языка
  const setLanguage = (language: string) => {
    if (hasConsent) {
      Cookies.set(COOKIE_NAMES.LANGUAGE, language, { expires: 365 });
    }
  };

  // Метод для получения языка
  const getLanguage = () => {
    return Cookies.get(COOKIE_NAMES.LANGUAGE) || 'ru';
  };

  // Метод для установки фильтров
  const setFilters = (filters: VacancyFilters) => {
    if (hasConsent) {
      Cookies.set(COOKIE_NAMES.FILTERS, JSON.stringify(filters), { expires: 7 });
    }
  };

  // Метод для получения фильтров
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