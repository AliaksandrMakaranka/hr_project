import type { JobCategory } from '../types/jobCategory';
import { jobCategories as mockCategories } from '../data/categories';
import { logger } from '../utils/logger';

/**
 * Repository class for handling job category-related API calls
 */
export class CategoriesRepository {
  /**
   * Get a list of all job categories
   * @returns Promise with array of job categories
   */
  async getAll(): Promise<JobCategory[]> {
    logger.debug('Fetching all job categories');
    try {
      // In a real app, this would be an API call
      // const response = await fetch('/api/categories');
      // if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      // return await response.json();

      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(mockCategories);
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
  async getById(id: number): Promise<JobCategory | null> {
    logger.debug('Fetching job category by ID', { id });
    try {
      // In a real app, this would be an API call
      // const response = await fetch(`/api/categories/${id}`);
      // if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      // return await response.json();

      return new Promise((resolve) => {
        setTimeout(() => {
          const category = mockCategories.find(c => c.id === id) || null;
          resolve(category);
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