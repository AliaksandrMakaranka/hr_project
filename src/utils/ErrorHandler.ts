import { ErrorInfo } from 'react';

export interface ErrorDetails {
  error: Error;
  errorInfo?: ErrorInfo;
  context?: Record<string, unknown>;
}

export class ErrorHandler {
  private static instance: ErrorHandler;

  private constructor() {
    this.setupGlobalErrorHandlers();
  }

  public static getInstance(): ErrorHandler {
    if (!ErrorHandler.instance) {
      ErrorHandler.instance = new ErrorHandler();
    }
    return ErrorHandler.instance;
  }

  private setupGlobalErrorHandlers(): void {
    window.onerror = (message, source, lineno, colno, error) => {
      this.handleError({
        error: error || new Error(message as string),
        context: {
          source,
          lineno,
          colno,
        },
      });
      return false;
    };

    window.addEventListener('unhandledrejection', (event) => {
      this.handleError({
        error: event.reason instanceof Error ? event.reason : new Error(String(event.reason)),
        context: {
          type: 'unhandledrejection',
        },
      });
    });
  }

  public handleError(details: ErrorDetails): void {
    const { error, errorInfo, context } = details;
    
    // Log to console
    console.error('Error occurred:', {
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo?.componentStack,
      context,
    });

    // TODO: Add integration with error tracking services like Sentry or LogRocket
    // Example:
    // if (process.env.NODE_ENV === 'production') {
    //   Sentry.captureException(error, {
    //     extra: {
    //       errorInfo,
    //       context,
    //     },
    //   });
    // }
  }

  public handleApiError(error: unknown): { message: string; status?: number } {
    if (error instanceof Error) {
      this.handleError({ error });
      return { message: error.message };
    }

    if (error instanceof Response) {
      return {
        message: `HTTP Error: ${error.status}`,
        status: error.status,
      };
    }

    return {
      message: 'An unknown error occurred',
    };
  }
} 