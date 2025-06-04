export class AppError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly status: number = 500
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export class ValidationError extends AppError {
  constructor(message: string, public readonly field?: string) {
    super(message, 'VALIDATION_ERROR', 400);
    this.name = 'ValidationError';
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string, id: number | string) {
    super(
      `${resource} with id ${id} not found`,
      'NOT_FOUND',
      404
    );
    this.name = 'NotFoundError';
  }
}

export class ApiError extends AppError {
  constructor(
    message: string,
    public readonly response?: Response,
    public readonly data?: unknown
  ) {
    super(message, 'API_ERROR', response?.status ?? 500);
    this.name = 'ApiError';
  }
} 