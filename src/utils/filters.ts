import type { Vacancy } from '../types/vacancy';
import type { City } from '../types/city';
import type { JobCategory } from '../types/jobCategory';
import { logger } from './logger';

/**
 * Фильтрует вакансии по категории и городу
 * @param vacancies - Массив вакансий
 * @param categoryId - ID категории (опционально)
 * @param cityId - ID города (опционально)
 * @returns Отфильтрованный массив вакансий
 */
export const filterVacancies = (
  vacancies: Vacancy[],
  categoryId?: number | null,
  cityId?: number | null
): Vacancy[] => {
  if (!Array.isArray(vacancies)) {
    logger.error('Invalid vacancies array provided', { vacancies });
    return [];
  }
  logger.debug('Filtering vacancies', { 
    totalVacancies: vacancies.length,
    categoryId, 
    cityId 
  });

  return vacancies.filter(vacancy => {
    try {
      if (!vacancy?.category?.id || !vacancy?.city?.id) {
        logger.warn('Invalid vacancy data', { vacancyId: vacancy?.id });
        return false;
      }

      if (categoryId && cityId) {
        const matches = vacancy.category.id === categoryId && vacancy.city.id === cityId;
        logger.debug('Filtering by category and city', {
          vacancyId: vacancy.id,
          matches,
          vacancyCategoryId: vacancy.category.id,
          vacancyCityId: vacancy.city.id,
          filterCategoryId: categoryId,
          filterCityId: cityId
        });
        return matches;
      }

      if (categoryId) {
        const matches = vacancy.category.id === categoryId;
        logger.debug('Filtering by category', {
          vacancyId: vacancy.id,
          matches,
          vacancyCategoryId: vacancy.category.id,
          filterCategoryId: categoryId
        });
        return matches;
      }

      if (cityId) {
        const matches = vacancy.city.id === cityId;
        logger.debug('Filtering by city', {
          vacancyId: vacancy.id,
          matches,
          vacancyCityId: vacancy.city.id,
          filterCityId: cityId
        });
        return matches;
      }

      return true;
    } catch (error) {
      logger.error('Error filtering vacancy', { 
        error, 
        vacancyId: vacancy?.id 
      });
      return false;
    }
  });
};

/**
 * Подсчитывает количество вакансий для категории
 * @param vacancies - Массив вакансий
 * @param categoryId - ID категории
 * @returns Количество вакансий
 */
export const countVacanciesByCategory = (
  vacancies: Vacancy[],
  categoryId: number
): number => {
  if (!Array.isArray(vacancies) || typeof categoryId !== 'number') {
    logger.error('Invalid parameters for countVacanciesByCategory', { 
      vacancies, 
      categoryId 
    });
    return 0;
  }

  const count = vacancies.filter(v => v?.category?.id === categoryId).length;
  logger.debug('Counted vacancies by category', { categoryId, count });
  return count;
};

/**
 * Подсчитывает количество вакансий для города
 * @param vacancies - Массив вакансий
 * @param cityId - ID города
 * @returns Количество вакансий
 */
export const countVacanciesByCity = (
  vacancies: Vacancy[],
  cityId: number
): number => {
  if (!Array.isArray(vacancies) || typeof cityId !== 'number') {
    logger.error('Invalid parameters for countVacanciesByCity', { 
      vacancies, 
      cityId 
    });
    return 0;
  }

  const count = vacancies.filter(v => v?.city?.id === cityId).length;
  logger.debug('Counted vacancies by city', { cityId, count });
  return count;
};

/**
 * Обновляет количество вакансий для массива категорий
 * @param categories - Массив категорий
 * @param vacancies - Массив вакансий
 * @returns Массив категорий с обновленным количеством вакансий
 */
export const updateCategoriesWithVacancyCounts = (
  categories: JobCategory[],
  vacancies: Vacancy[]
): JobCategory[] => {
  if (!Array.isArray(categories) || !Array.isArray(vacancies)) {
    logger.error('Invalid parameters for updateCategoriesWithVacancyCounts', {
      categories,
      vacancies
    });
    return [];
  }

  const updatedCategories = categories.map(category => {
    const count = vacancies.filter(v => v?.category?.id === category.id).length;
    logger.debug('Updated category vacancy count', {
      categoryId: category.id,
      count
    });
    return {
      ...category,
      vacanciesCount: count
    };
  });

  return updatedCategories;
};

/**
 * Обновляет количество вакансий для массива городов
 * @param cities - Массив городов
 * @param vacancies - Массив вакансий
 * @returns Массив городов с обновленным количеством вакансий
 */
export const updateCitiesWithVacancyCounts = (
  cities: City[],
  vacancies: Vacancy[]
): City[] => {
  if (!Array.isArray(cities) || !Array.isArray(vacancies)) {
    logger.error('Invalid parameters for updateCitiesWithVacancyCounts', {
      cities,
      vacancies
    });
    return [];
  }

  const updatedCities = cities.map(city => {
    const cityVacancies = vacancies.filter(v => v?.city?.id === city.id);
    logger.debug('Updated city vacancy count', {
      cityId: city.id,
      count: cityVacancies.length
    });
    return {
      ...city,
      vacanciesCount: cityVacancies.length,
      vacancies: cityVacancies
    };
  });

  return updatedCities;
}; 