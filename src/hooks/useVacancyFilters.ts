import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { vacancies } from '../data/vacancies';
import { filterVacancies } from '../utils/filters';

/**
 * Хук для фильтрации вакансий по параметрам URL
 * @returns Отфильтрованные вакансии и информацию о фильтрах
 */
export const useVacancyFilters = () => {
  const { categoryId, cityId, id } = useParams();

  // Поддержка как categoryId, так и id для универсальности
  const categoryIdNum = categoryId
    ? parseInt(categoryId, 10)
    : id
      ? parseInt(id, 10)
      : null;
  const cityIdNum = cityId ? parseInt(cityId, 10) : null;

  console.log('URL params:', { categoryId, cityId, id });
  console.log('Parsed IDs:', { categoryIdNum, cityIdNum });

  const filteredVacancies = useMemo(() => {
    const filtered = filterVacancies(vacancies, categoryIdNum, cityIdNum);
    console.log('Filtered vacancies:', filtered);
    return filtered;
  }, [categoryIdNum, cityIdNum]);

  return {
    filteredVacancies,
    categoryId: categoryIdNum,
    cityId: cityIdNum
  };
}; 