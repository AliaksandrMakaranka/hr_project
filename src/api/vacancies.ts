import { logger } from '@utils/Logger';
import { vacancies as mockVacancies } from '../data/vacancies';
import type { Vacancy } from '../types';
import type { VacanciesResponse, VacancyApplicationData, VacancyFilters } from '../types/api';

// Вспомогательная функция для извлечения числового значения зарплаты из строки
const parseSalary = (salaryString: string | undefined): number | null => {
  if (!salaryString) return null;
  const match = salaryString.match(/\d+/);
  return match ? parseInt(match[0], 10) : null;
};

/**
 * Repository class for handling vacancy-related API calls
 */
export class VacanciesRepository {
  /**
   * Get a list of all vacancies
   * @param filters Optional filters for vacancies
   * @returns Promise with paginated vacancies response
   */
  async getAll(filters?: VacancyFilters): Promise<VacanciesResponse> {
    logger.debug('Fetching all vacancies', { filters });

    // В реальном приложении здесь формировался бы URL с query-параметрами:
    // const params = new URLSearchParams();
    // if (filters?.city) params.append('city', filters.city);
    // if (filters?.category) params.append('category', filters.category);
    // if (filters?.employmentType) params.append('employmentType', filters.employmentType);
    // if (filters?.salaryFrom !== undefined) params.append('salaryFrom', filters.salaryFrom.toString());
    // if (filters?.salaryTo !== undefined) params.append('salaryTo', filters.salaryTo.toString());
    // if (filters?.searchTerm) params.append('searchTerm', filters.searchTerm);
    // if (filters?.sortBy) params.append('sortBy', filters.sortBy);
    // if (filters?.sortOrder) params.append('sortOrder', filters.sortOrder);
    // if (filters?.page) params.append('page', filters.page.toString());
    // if (filters?.limit) params.append('limit', filters.limit.toString());
    // const query = params.toString();
    // const url = query ? `${API_BASE_URL}?${query}` : API_BASE_URL;
    // return apiClient.get<VacanciesResponse>(url);

    return new Promise((resolve) => {
      setTimeout(() => {
        let filteredVacancies = [...mockVacancies]; // Создаем копию для фильтрации и сортировки

        // Фильтрация
        if (filters?.categoryId) {
          filteredVacancies = filteredVacancies.filter(vacancy => vacancy.category?.id === filters.categoryId);
        }
        if (filters?.cityId) {
          filteredVacancies = filteredVacancies.filter(vacancy => vacancy.city?.id === filters.cityId);
        }
        if (filters?.employmentType) {
          filteredVacancies = filteredVacancies.filter(vacancy => vacancy.employmentType === filters.employmentType);
        }
        if (filters?.salaryFrom !== undefined) {
          const salaryFrom = filters.salaryFrom; // Присваиваем в константу для гарантированного типа
          filteredVacancies = filteredVacancies.filter(vacancy => {
            const salary = parseSalary(vacancy.salary);
            return salary !== null && salary >= salaryFrom;
          });
        }
        if (filters?.salaryTo !== undefined) {
          const salaryTo = filters.salaryTo; // Присваиваем в константу для гарантированного типа
          filteredVacancies = filteredVacancies.filter(vacancy => {
            const salary = parseSalary(vacancy.salary);
            return salary !== null && salary <= salaryTo;
          });
        }
        if (filters?.searchTerm) {
          const lowerCaseSearchTerm = filters.searchTerm.toLowerCase();
          filteredVacancies = filteredVacancies.filter(vacancy =>
            vacancy.title.toLowerCase().includes(lowerCaseSearchTerm) ||
            vacancy.description.toLowerCase().includes(lowerCaseSearchTerm)
          );
        }

        // Сортировка
        if (filters?.sortBy) {
          filteredVacancies.sort((a, b) => {
            let compare = 0;
            if (filters.sortBy === 'date') {
              // Предполагаем, что у вакансии есть поле createdAt или аналогичное
              // В моковых данных нет даты, используем ID как прокси
              compare = (a.id || 0) - (b.id || 0); // Сортировка по ID как прокси даты
            } else if (filters.sortBy === 'salary') {
              const salaryA = parseSalary(a.salary) || 0;
              const salaryB = parseSalary(b.salary) || 0;
              compare = salaryA - salaryB;
            }

            if (filters.sortOrder === 'desc') {
              return compare * -1;
            }
            return compare;
          });
        }

        const page = filters?.page || 1;
        const limit = filters?.limit || 10;

        const total = filteredVacancies.length;
        const items = filteredVacancies.slice((page - 1) * limit, page * limit);

        resolve({
          items,
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit)
        });
      }, 500);
    });
  }

  /**
   * Get a single vacancy by ID
   * @param id Vacancy ID
   * @returns Promise with vacancy data or null if not found
   */
  async getById(id: number): Promise<Vacancy | null> {
    logger.debug('Fetching vacancy by ID', { id });

    // In a real app, this would be an API call
    // return apiClient.get<Vacancy | null>(`${API_BASE_URL}/${id}`);

    return new Promise((resolve) => {
      setTimeout(() => {
        const vacancy = mockVacancies.find(v => v.id === id) || null;
        if (!vacancy) {
          resolve(null);
          return;
        }
        resolve(vacancy);
      }, 500);
    });
  }

  /**
   * Apply for a vacancy
   * @param vacancyId ID of the vacancy to apply for
   * @param applicationData Application data
   * @returns Promise with success status
   */
  async apply(vacancyId: number, applicationData: VacancyApplicationData): Promise<boolean> {
    logger.debug('Applying for vacancy', { vacancyId, applicationData });

    // In a real app, this would be an API call
    // return apiClient.post<boolean>(`${API_BASE_URL}/${vacancyId}/apply`, applicationData);

    return new Promise((resolve) => {
      setTimeout(() => {
        logger.info('Application submitted successfully', { vacancyId });
        resolve(true);
      }, 500);
    });
  }
} 