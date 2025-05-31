/**
 * Константы маршрутов приложения
 */
export const ROUTES = {
  HOME: '/',
  CITIES: '/cities',
  CITY: (id: string | number) => `/city/${id}`,
  CATEGORY: (id: string | number) => `/category/${id}`,
  VACANCY: (id: string | number) => `/vacancy/${id}`,
  ABOUT: '/about'
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