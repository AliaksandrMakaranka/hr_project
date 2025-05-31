import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { vacancies } from '../data/vacancies';
import { filterVacancies } from '../utils/filters';

/**
 * Хук для фильтрации вакансий по параметрам URL
 * @returns Отфильтрованные вакансии и информацию о фильтрах
 */
export const useVacancyFilters = () => {
  const { categoryId, cityId } = useParams();

  const categoryIdNum = categoryId ? Number(categoryId) : null;
  const cityIdNum = cityId ? Number(cityId) : null;

  const filteredVacancies = useMemo(() => {
    return filterVacancies(vacancies, categoryIdNum, cityIdNum);
  }, [categoryIdNum, cityIdNum]);

  return {
    filteredVacancies,
    categoryId: categoryIdNum,
    cityId: cityIdNum
  };
}; 