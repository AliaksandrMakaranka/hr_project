import { logger } from '@utils/Logger';
import type { JobCategory } from '../types';
import { apiClient } from './client';

/**
 * Repository class for handling job category-related API calls
 */
export class CategoriesRepository {
  /**
   * Get a list of all job categories
   * @param page Номер страницы
   * @param limit Количество элементов на странице
   * @returns Promise с пагинированным ответом категорий
   */
  async getAll(page: number = 1, limit: number = 10): Promise<JobCategory[]> {
    logger.debug('Fetching all job categories', { page, limit });
    try {
      const categories = await apiClient.get<JobCategory[]>('/categories');
      return categories;
    } catch (error) {
      logger.error('Error fetching job categories', {
        error,
        message: error instanceof Error ? error.message : 'Unknown error'
      });
      throw error;
    }
  }

  /**
   * Get a single job category by ID
   * @param id Category ID
   * @returns Promise with category data or null if not found
   */
  async getById(id: number): Promise<JobCategory | null> {
    logger.debug('Fetching job category by ID', { id });
    try {
      const category = await apiClient.get<JobCategory>(`/categories/${id}`);
      return category;
    } catch (error) {
      logger.error('Error fetching job category by ID', {
        error,
        id,
        message: error instanceof Error ? error.message : 'Unknown error'
      });
      throw error;
    }
  }
} 