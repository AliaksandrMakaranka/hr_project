import type { ApiResponse, CitiesResponse } from '../types/api';
import { cities as mockCities } from '../data/cities';
import { vacancies } from '../data/vacancies';
import { updateCitiesWithVacancyCounts } from '@utils/filters';
import { logger } from '@utils/logger';

/**
 * Получает список городов с количеством вакансий
 * @param page Номер страницы
 * @param limit Количество элементов на странице
 * @returns Promise с пагинированным ответом городов
 * @throws Error если не удалось получить данные
 */
export const getCities = async (page: number = 1, limit: number = 10): Promise<ApiResponse<CitiesResponse>> => {
  logger.debug('Fetching cities', {
    page,
    limit,
    mockCitiesCount: mockCities.length,
    vacanciesCount: vacancies.length
  });

  try {
    // В реальном приложении здесь был бы запрос к API
    // const response = await fetch(`/api/cities?page=${page}&limit=${limit}`);
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
          const total = citiesWithCounts.length;
          const items = citiesWithCounts.slice((page - 1) * limit, page * limit);

          logger.debug('Cities fetched successfully', {
            count: items.length,
            total,
            page,
            limit
          });

          resolve({
            data: {
              items,
              total,
              page,
              limit,
              totalPages: Math.ceil(total / limit)
            },
            status: 200
          });
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