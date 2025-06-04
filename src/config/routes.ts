/**
 * Конфигурация маршрутов приложения
 */
export const ROUTES_CONFIG = {
  paths: {
    home: '/',
    vacancies: '/vacancies',
    cities: '/cities',
    categories: '/categories',
    about: '/about',
    contact: '/contact',
    privacyPolicy: '/privacy-policy',
    termsOfUse: '/terms-of-use',
    cookiePolicy: '/cookie-policy',
  },
  params: {
    categoryId: 'categoryId',
    cityId: 'cityId',
    vacancyId: 'vacancyId',
    page: 'page',
    limit: 'limit',
    search: 'search',
  },
  getCategoryPath: (id: string | number) => `/categories/${id}`,
  getVacancyPath: (id: string | number) => `/vacancies/${id}`,
  getCityPath: (id: string | number) => `/cities/${id}`,
  getVacanciesWithFilters: (filters: Record<string, string | number>) => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.append(key, String(value));
    });
    return `/vacancies?${params.toString()}`;
  },
} as const;

export type RoutesConfig = typeof ROUTES_CONFIG; 