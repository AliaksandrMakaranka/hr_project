import { useMemo, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { Logger } from '../utils/Logger';
import { filterVacancies } from '../utils/filters';
import { vacancies } from '../data/vacancies';

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
  const logger = useMemo(() => Logger.getInstance(), []);

  const parseId = useCallback((value: string | undefined): number | null => {
    if (!value) return null;
    const parsed = parseInt(value, 10);
    if (isNaN(parsed)) {
      logger.warn('Invalid ID in URL', { value });
      return null;
    }
    return parsed;
  }, [logger]);

  const categoryIdNum = useMemo(() => 
    parseId(categoryId || id),
    [categoryId, id, parseId]
  );

  const cityIdNum = useMemo(() => 
    parseId(cityId),
    [cityId, parseId]
  );

  const filteredVacancies = useMemo(() => 
    filterVacancies(vacancies, categoryIdNum, cityIdNum),
    [categoryIdNum, cityIdNum]
  );

  return {
    filteredVacancies,
    categoryId: categoryIdNum,
    cityId: cityIdNum
  };
}; 