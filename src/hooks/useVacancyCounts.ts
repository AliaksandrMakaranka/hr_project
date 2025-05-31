import { useMemo } from 'react';
import { vacancies } from '../data/vacancies';
import { cities } from '../data/cities';
import { jobCategories } from '../data/categories';
import { updateCategoriesWithVacancyCounts, updateCitiesWithVacancyCounts } from '../utils/filters';

/**
 * Хук для подсчета количества вакансий по категориям и городам
 * @returns Обновленные массивы категорий и городов с количеством вакансий
 */
export const useVacancyCounts = () => {
  const categoriesWithCounts = useMemo(() => {
    return updateCategoriesWithVacancyCounts(jobCategories, vacancies);
  }, []);

  const citiesWithCounts = useMemo(() => {
    return updateCitiesWithVacancyCounts(cities, vacancies);
  }, []);

  return {
    categoriesWithCounts,
    citiesWithCounts
  };
}; 