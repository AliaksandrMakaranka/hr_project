import type { Vacancy } from '../types';
import type { VacancyApplicationData, VacancyFilters, VacanciesResponse } from '../types/api';
import { vacancies as mockVacancies } from '../data/vacancies';
import { logger } from '@utils/logger';
import type { ApiResult } from './client';

/**
 * Repository class for handling vacancy-related API calls
 */
export class VacanciesRepository {
  /**
   * Get a list of all vacancies
   * @param filters Optional filters for vacancies
   * @returns Promise with paginated vacancies response
   */
  async getAll(filters?: VacancyFilters): Promise<ApiResult<VacanciesResponse>> {
    logger.debug('Fetching all vacancies', { filters });
    
    // In a real app, this would be an API call
    // return apiClient.get<VacanciesResponse>(API_BASE_URL, {
    //   params: filters
    // });

    return new Promise((resolve) => {
      setTimeout(() => {
        const page = filters?.page || 1;
        const limit = filters?.limit || 10;
        const filteredVacancies = mockVacancies.filter(vacancy => {
          if (filters?.category && vacancy.category?.id !== filters.category) return false;
          if (filters?.city && vacancy.city?.id !== filters.city) return false;
          if (filters?.employmentType && vacancy.employmentType !== filters.employmentType) return false;
          if (filters?.experience && vacancy.experience !== filters.experience) return false;
          if (filters?.search && !vacancy.title.toLowerCase().includes(filters.search.toLowerCase())) return false;
          return true;
        });

        const total = filteredVacancies.length;
        const items = filteredVacancies.slice((page - 1) * limit, page * limit);

        resolve({
          data: {
            items,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit)
          }
        });
      }, 500);
    });
  }

  /**
   * Get a single vacancy by ID
   * @param id Vacancy ID
   * @returns Promise with vacancy data or null if not found
   */
  async getById(id: number): Promise<ApiResult<Vacancy | null>> {
    logger.debug('Fetching vacancy by ID', { id });
    
    // In a real app, this would be an API call
    // return apiClient.get<Vacancy | null>(`${API_BASE_URL}/${id}`);

    return new Promise((resolve) => {
      setTimeout(() => {
        const vacancy = mockVacancies.find(v => v.id === id) || null;
        if (!vacancy) {
          resolve({
            error: {
              message: 'Vacancy not found',
              status: 404
            }
          });
          return;
        }
        resolve({ data: vacancy });
      }, 500);
    });
  }

  /**
   * Apply for a vacancy
   * @param vacancyId ID of the vacancy to apply for
   * @param applicationData Application data
   * @returns Promise with success status
   */
  async apply(vacancyId: number, applicationData: VacancyApplicationData): Promise<ApiResult<boolean>> {
    logger.debug('Applying for vacancy', { vacancyId, applicationData });
    
    // In a real app, this would be an API call
    // return apiClient.post<boolean>(`${API_BASE_URL}/${vacancyId}/apply`, applicationData);

    return new Promise((resolve) => {
      setTimeout(() => {
        logger.info('Application submitted successfully', { vacancyId });
        resolve({ data: true });
      }, 500);
    });
  }
} 