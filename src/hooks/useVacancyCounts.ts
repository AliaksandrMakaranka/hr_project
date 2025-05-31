import { useMemo, useState, useEffect } from 'react';
import { vacancies } from '../data/vacancies';
import { jobCategories } from '../data/categories';
import { updateCategoriesWithVacancyCounts } from '../utils/filters';
import { getCities } from '../api/cities';
import type { City } from '../types/city';
import type { JobCategory } from '../types/jobCategory';
import { logger } from '../utils/logger';

interface VacancyCounts {
  categoriesWithCounts: (JobCategory & { vacanciesCount: number })[];
  citiesWithCounts: City[];
  isLoading: boolean;
  error: Error | null;
}

/**
 * Хук для подсчета количества вакансий по категориям и городам
 * @returns Обновленные массивы категорий и городов с количеством вакансий
 */
export const useVacancyCounts = (): VacancyCounts => {
  const [citiesWithCounts, setCitiesWithCounts] = useState<City[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchCities = async () => {
      logger.debug('Fetching cities with vacancy counts');
      setIsLoading(true);
      setError(null);

      try {
        const cities = await getCities();
        logger.debug('Cities fetched successfully', {
          count: cities.length
        });
        setCitiesWithCounts(cities);
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Failed to fetch cities');
        logger.error('Error fetching cities', {
          error,
          message: error.message
        });
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCities();
  }, []);

  const categoriesWithCounts = useMemo(() => {
    try {
      logger.debug('Updating categories with vacancy counts', {
        totalCategories: jobCategories.length,
        totalVacancies: vacancies.length
      });

      const updatedCategories = updateCategoriesWithVacancyCounts(jobCategories, vacancies);
      
      logger.debug('Categories updated with vacancy counts', {
        updatedCount: updatedCategories.length
      });

      return updatedCategories;
    } catch (error) {
      logger.error('Error updating categories with vacancy counts', {
        error,
        message: error instanceof Error ? error.message : 'Unknown error'
      });
      return jobCategories.map(category => ({
        ...category,
        vacanciesCount: 0
      }));
    }
  }, []);

  return {
    categoriesWithCounts,
    citiesWithCounts,
    isLoading,
    error
  };
}; 