import type { JobCategory } from '../types';
import type { ApiResponse, CategoriesResponse } from '../types/api';
import { jobCategories as mockCategories } from '../data/categories';
import { logger } from '@utils/logger';

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
  async getAll(page: number = 1, limit: number = 10): Promise<ApiResponse<CategoriesResponse>> {
    logger.debug('Fetching all job categories', { page, limit });
    try {
      // In a real app, this would be an API call
      // const response = await fetch(`/api/categories?page=${page}&limit=${limit}`);
      // if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      // return await response.json();

      return new Promise((resolve) => {
        setTimeout(() => {
          const total = mockCategories.length;
          const items = mockCategories.slice((page - 1) * limit, page * limit);

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
  async getById(id: number): Promise<ApiResponse<JobCategory | null>> {
    logger.debug('Fetching job category by ID', { id });
    try {
      // In a real app, this would be an API call
      // const response = await fetch(`/api/categories/${id}`);
      // if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      // return await response.json();

      return new Promise((resolve) => {
        setTimeout(() => {
          const category = mockCategories.find(c => c.id === id) || null;
          resolve({
            data: category,
            status: category ? 200 : 404,
            message: category ? undefined : 'Category not found'
          });
        }, 500);
      });
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