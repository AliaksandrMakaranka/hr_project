/**
 * Константы маршрутов приложения
 */
export const ROUTES = {
  HOME: '/',
  VACANCIES: '/vacancies',
  CITIES: '/cities',
  CATEGORIES: '/categories',
  CATEGORY: (id: string | number) => `/categories/${id}`,
  VACANCY: (id: string | number) => `/vacancies/${id}`,
  CITY: (id: string | number) => `/cities/${id}`,
  ABOUT: '/about',
  CONTACT: '/contact',
  PRIVACY_POLICY: '/privacy-policy',
  TERMS_OF_USE: '/terms-of-use'
} as const;

/**
 * Константы для навигации
 */
export const NAVIGATION = {
  BACK: '← Назад',
  SEARCH_BY_CITIES: 'Поиск по городам',
  ALL_VACANCIES: 'Все вакансии',
  VIEW_VACANCIES: 'Смотреть вакансии',
  MORE_DETAILS: 'Подробнее'
} as const; 