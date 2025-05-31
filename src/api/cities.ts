import type { City } from '../types/city';
import { cities as mockCities } from '../data/cities';
import { vacancies } from '../data/vacancies';
import { updateCitiesWithVacancyCounts } from '../utils/filters';

/**
 * Получает список городов с количеством вакансий
 * @returns Promise с массивом городов
 */
export const getCities = async (): Promise<City[]> => {
  // В реальном приложении здесь был бы запрос к API
  // return fetch('/api/cities').then(res => res.json());
  
  // Для демонстрации используем моковые данные
  return new Promise((resolve) => {
    setTimeout(() => {
      const citiesWithCounts = updateCitiesWithVacancyCounts(mockCities, vacancies);
      resolve(citiesWithCounts);
    }, 500); // Имитируем задержку сети
  });
}; 