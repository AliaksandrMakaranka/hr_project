import type { City } from '../types';
import { cities as mockCities } from '../data/cities';
import { vacancies } from '../data/vacancies';
import { updateCitiesWithVacancyCounts } from '@utils/filters';
import { logger } from '@utils/logger';

/**
 * Получает список городов с количеством вакансий
 * @returns Promise с массивом городов
 * @throws Error если не удалось получить данные
 */
export const getCities = async (): Promise<City[]> => {
  logger.debug('Fetching cities', {
    mockCitiesCount: mockCities.length,
    vacanciesCount: vacancies.length
  });

  try {
    // В реальном приложении здесь был бы запрос к API
    // const response = await fetch('/api/cities');
    // if (!response.ok) {
    //   throw new Error(`HTTP error! status: ${response.status}`);
    // }
    // const data = await response.json();
    // return data;

    // Для демонстрации используем моковые данные
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const citiesWithCounts = updateCitiesWithVacancyCounts(mockCities, vacancies);
          logger.debug('Cities fetched successfully', {
            count: citiesWithCounts.length
          });
          resolve(citiesWithCounts);
        } catch (error) {
          logger.error('Error processing cities data', {
            error,
            message: error instanceof Error ? error.message : 'Unknown error'
          });
          reject(error);
        }
      }, 500); // Имитируем задержку сети
    });
  } catch (error) {
    logger.error('Error fetching cities', {
      error,
      message: error instanceof Error ? error.message : 'Unknown error'
    });
    throw error;
  }
}; 