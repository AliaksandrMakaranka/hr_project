import { Logger } from './Logger';
import { AppError, ValidationError, NotFoundError, ApiError } from './errors';

export class ErrorHandler {
  private static instance: ErrorHandler;
  private logger: Logger;

  private constructor() {
    this.logger = Logger.getInstance();
  }

  public static getInstance(): ErrorHandler {
    if (!ErrorHandler.instance) {
      ErrorHandler.instance = new ErrorHandler();
    }
    return ErrorHandler.instance;
  }

  public handleError(error: unknown): void {
    if (error instanceof AppError) {
      this.handleAppError(error);
    } else if (error instanceof Error) {
      this.handleGenericError(error);
    } else {
      this.handleUnknownError(error);
    }
  }

  private handleAppError(error: AppError): void {
    switch (error.constructor) {
      case ValidationError:
        this.logger.warn('Validation error', { error });
        break;
      case NotFoundError:
        this.logger.warn('Not found error', { error });
        break;
      case ApiError:
        this.logger.error('API error', { error });
        break;
      default:
        this.logger.error('Application error', { error });
    }
  }

  private handleGenericError(error: Error): void {
    this.logger.error('Generic error', { error });
  }

  private handleUnknownError(error: unknown): void {
    this.logger.error('Unknown error', { error });
  }
} 