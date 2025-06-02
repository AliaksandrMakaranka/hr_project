import type { Vacancy } from '../types';
import type { ApiResponse, VacancyApplicationData, VacancyFilters, VacanciesResponse } from '../types/api';
import { vacancies as mockVacancies } from '../data/vacancies';
import { logger } from '@utils/logger';

/**
 * Repository class for handling vacancy-related API calls
 */
export class VacanciesRepository {
  /**
   * Get a list of all vacancies
   * @param filters Optional filters for vacancies
   * @returns Promise with paginated vacancies response
   */
  async getAll(filters?: VacancyFilters): Promise<ApiResponse<VacanciesResponse>> {
    logger.debug('Fetching all vacancies', { filters });
    try {
      // In a real app, this would be an API call
      // const response = await fetch('/api/vacancies?' + new URLSearchParams(filters));
      // if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      // return await response.json();

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
            },
            status: 200
          });
        }, 500);
      });
    } catch (error) {
      logger.error('Error fetching vacancies', {
        error,
        message: error instanceof Error ? error.message : 'Unknown error'
      });
      throw error;
    }
  }

  /**
   * Get a single vacancy by ID
   * @param id Vacancy ID
   * @returns Promise with vacancy data or null if not found
   */
  async getById(id: number): Promise<ApiResponse<Vacancy | null>> {
    logger.debug('Fetching vacancy by ID', { id });
    try {
      // In a real app, this would be an API call
      // const response = await fetch(`/api/vacancies/${id}`);
      // if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      // return await response.json();

      return new Promise((resolve) => {
        setTimeout(() => {
          const vacancy = mockVacancies.find(v => v.id === id) || null;
          resolve({
            data: vacancy,
            status: vacancy ? 200 : 404,
            message: vacancy ? undefined : 'Vacancy not found'
          });
        }, 500);
      });
    } catch (error) {
      logger.error('Error fetching vacancy by ID', {
        error,
        id,
        message: error instanceof Error ? error.message : 'Unknown error'
      });
      throw error;
    }
  }

  /**
   * Apply for a vacancy
   * @param vacancyId ID of the vacancy to apply for
   * @param applicationData Application data
   * @returns Promise with success status
   */
  async apply(vacancyId: number, applicationData: VacancyApplicationData): Promise<ApiResponse<boolean>> {
    logger.debug('Applying for vacancy', { vacancyId, applicationData });
    try {
      // In a real app, this would be an API call
      // const response = await fetch(`/api/vacancies/${vacancyId}/apply`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(applicationData)
      // });
      // if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      // return await response.json();

      return new Promise((resolve) => {
        setTimeout(() => {
          logger.info('Application submitted successfully', { vacancyId });
          resolve({
            data: true,
            status: 200,
            message: 'Application submitted successfully'
          });
        }, 500);
      });
    } catch (error) {
      logger.error('Error applying for vacancy', {
        error,
        vacancyId,
        message: error instanceof Error ? error.message : 'Unknown error'
      });
      throw error;
    }
  }
} 