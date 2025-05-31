import { useMemo, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { vacancies } from '../data/vacancies';
import { filterVacancies } from '../utils/filters';
import { logger } from '../utils/logger';

interface VacancyFilters {
  filteredVacancies: typeof vacancies;
  categoryId: number | null;
  cityId: number | null;
}

/**
 * Хук для фильтрации вакансий по параметрам URL
 * @returns Отфильтрованные вакансии и информацию о фильтрах
 */
export const useVacancyFilters = (): VacancyFilters => {
  const { categoryId, cityId, id } = useParams();

  // Поддержка как categoryId, так и id для универсальности
  const categoryIdNum = useMemo(() => {
    try {
      if (categoryId) {
        const parsed = parseInt(categoryId, 10);
        if (isNaN(parsed)) {
          logger.warn('Invalid categoryId in URL', { categoryId });
          return null;
        }
        return parsed;
      }
      if (id) {
        const parsed = parseInt(id, 10);
        if (isNaN(parsed)) {
          logger.warn('Invalid id in URL', { id });
          return null;
        }
        return parsed;
      }
      return null;
    } catch (error) {
      logger.error('Error parsing categoryId', { error, categoryId, id });
      return null;
    }
  }, [categoryId, id]);

  const cityIdNum = useMemo(() => {
    try {
      if (!cityId) return null;
      const parsed = parseInt(cityId, 10);
      if (isNaN(parsed)) {
        logger.warn('Invalid cityId in URL', { cityId });
        return null;
      }
      return parsed;
    } catch (error) {
      logger.error('Error parsing cityId', { error, cityId });
      return null;
    }
  }, [cityId]);

  useEffect(() => {
    logger.debug('URL parameters changed', {
      categoryId,
      cityId,
      id,
      parsedCategoryId: categoryIdNum,
      parsedCityId: cityIdNum
    });
  }, [categoryId, cityId, id, categoryIdNum, cityIdNum]);

  const filteredVacancies = useMemo(() => {
    try {
      const filtered = filterVacancies(vacancies, categoryIdNum, cityIdNum);
      logger.debug('Vacancies filtered', {
        totalVacancies: vacancies.length,
        filteredCount: filtered.length,
        categoryId: categoryIdNum,
        cityId: cityIdNum
      });
      return filtered;
    } catch (error) {
      logger.error('Error filtering vacancies', {
        error,
        categoryId: categoryIdNum,
        cityId: cityIdNum
      });
      return [];
    }
  }, [categoryIdNum, cityIdNum]);

  return {
    filteredVacancies,
    categoryId: categoryIdNum,
    cityId: cityIdNum
  };
}; 