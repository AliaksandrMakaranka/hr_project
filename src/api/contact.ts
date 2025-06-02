import type { ApiResponse } from '../types/api';
import { logger } from '../utils/logger';

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
  subject?: string;
}

export interface ContactResponse {
  success: boolean;
  messageId?: string;
}

/**
 * Repository class for handling contact form-related API calls
 */
export class ContactRepository {
  /**
   * Submit a contact form
   * @param formData Contact form data
   * @returns Promise with contact form submission response
   */
  async submitForm(formData: ContactFormData): Promise<ApiResponse<ContactResponse>> {
    logger.debug('Submitting contact form', { formData });
    try {
      // In a real app, this would be an API call
      // const response = await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });
      // if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      // return await response.json();

      return new Promise((resolve) => {
        setTimeout(() => {
          logger.info('Contact form submitted successfully', { formData });
          resolve({
            data: {
              success: true,
              messageId: `msg_${Date.now()}`
            },
            status: 200,
            message: 'Contact form submitted successfully'
          });
        }, 500);
      });
    } catch (error) {
      logger.error('Error submitting contact form', {
        error,
        formData,
        message: error instanceof Error ? error.message : 'Unknown error'
      });
      throw error;
    }
  }
} 