import { useMemo, useState, useEffect } from 'react';
import { vacancies } from '../data/vacancies';
import { jobCategories } from '../data/categories';
import { updateCategoriesWithVacancyCounts } from '../utils/filters';
import { getCities } from '../api/cities';
import type { City } from '../types/city';

/**
 * Хук для подсчета количества вакансий по категориям и городам
 * @returns Обновленные массивы категорий и городов с количеством вакансий
 */
export const useVacancyCounts = () => {
  const [citiesWithCounts, setCitiesWithCounts] = useState<City[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const cities = await getCities();
        setCitiesWithCounts(cities);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch cities'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchCities();
  }, []);

  const categoriesWithCounts = useMemo(() => {
    return updateCategoriesWithVacancyCounts(jobCategories, vacancies);
  }, []);

  return {
    categoriesWithCounts,
    citiesWithCounts,
    isLoading,
    error
  };
}; 