import type { Vacancy } from '../types/vacancy';
import type { City } from '../types/city';
import type { JobCategory } from '../types/jobCategory';

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
  console.log('Filtering vacancies with params:', { categoryId, cityId });
  console.log('First vacancy category:', vacancies[0]?.category);

  return vacancies.filter(vacancy => {
    if (categoryId && cityId) {
      return vacancy.category.id === categoryId && vacancy.city.id === cityId;
    } else if (categoryId) {
      const matches = vacancy.category.id === categoryId;
      console.log(`Vacancy ${vacancy.id} category match:`, {
        vacancyCategoryId: vacancy.category.id,
        filterCategoryId: categoryId,
        matches
      });
      return matches;
    } else if (cityId) {
      return vacancy.city.id === cityId;
    }
    return true;
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
  return vacancies.filter(v => v.category.id === categoryId).length;
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
  return vacancies.filter(v => v.city.id === cityId).length;
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
  return categories.map(category => ({
    ...category,
    vacanciesCount: vacancies.filter(v => v.category.id === category.id).length
  }));
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
  return cities.map(city => {
    const cityVacancies = vacancies.filter(v => v.city.id === city.id);
    return {
      ...city,
      vacanciesCount: cityVacancies.length,
      vacancies: cityVacancies
    };
  });
}; 