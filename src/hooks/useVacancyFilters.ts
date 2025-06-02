import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { vacancies } from '../data/vacancies';
import { filterVacancies } from '@utils/filters';
import { logger } from '@utils/logger';

/**
 * Интерфейс для результатов фильтрации вакансий
 * @interface VacancyFilters
 * @property {typeof vacancies} filteredVacancies - Отфильтрованный список вакансий
 * @property {number | null} categoryId - ID выбранной категории или null
 * @property {number | null} cityId - ID выбранного города или null
 */
interface VacancyFilters {
  filteredVacancies: typeof vacancies;
  categoryId: number | null;
  cityId: number | null;
}

/**
 * Хук для фильтрации вакансий на основе параметров URL.
 * Поддерживает фильтрацию по категории и городу.
 * 
 * @returns {VacancyFilters} Объект с отфильтрованными вакансиями и информацией о фильтрах
 * 
 * @example
 * ```tsx
 * const { filteredVacancies, categoryId, cityId } = useVacancyFilters();
 * ```
 * 
 * @remarks
 * - Поддерживает как параметр categoryId, так и id в URL
 * - Логирует предупреждения при некорректных ID
 * - Использует мемоизацию для оптимизации производительности
 */
export const useVacancyFilters = (): VacancyFilters => {
  const { categoryId, cityId, id } = useParams();

  // Поддержка как categoryId, так и id для универсальности
  const categoryIdNum = useMemo(() => {
    const paramToParse = categoryId || id;
    if (!paramToParse) return null;

    const parsed = parseInt(paramToParse, 10);
    if (isNaN(parsed)) {
      logger.warn('Invalid category ID in URL', { paramToParse });
      return null;
    }
    return parsed;
  }, [categoryId, id]);

  const cityIdNum = useMemo(() => {
    if (!cityId) return null;
    const parsed = parseInt(cityId, 10);
    if (isNaN(parsed)) {
      logger.warn('Invalid city ID in URL', { cityId });
      return null;
    }
    return parsed;
  }, [cityId]);

  const filteredVacancies = useMemo(() => {
    return filterVacancies(vacancies, categoryIdNum, cityIdNum);
  }, [categoryIdNum, cityIdNum]);

  return {
    filteredVacancies,
    categoryId: categoryIdNum,
    cityId: cityIdNum
  };
}; 