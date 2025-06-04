import React, { Component, ErrorInfo, ReactNode } from 'react';
import { ErrorHandler } from '../utils/ErrorHandler';
import { Logger } from '../utils/Logger';

/**
 * Props для компонента ErrorBoundary
 * @interface Props
 * @property {ReactNode} children - Дочерние компоненты, которые будут обёрнуты в ErrorBoundary
 * @property {ReactNode} [fallback] - Опциональный компонент, который будет отображен при возникновении ошибки
 * @property {Function} [onError] - Функция, которая будет вызываться при возникновении ошибки
 */
interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

/**
 * Состояние компонента ErrorBoundary
 * @interface State
 * @property {boolean} hasError - Флаг, указывающий на наличие ошибки
 * @property {Error | null} error - Объект ошибки
 */
interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * Компонент ErrorBoundary для обработки ошибок в React-приложении.
 * Перехватывает ошибки в дочерних компонентах и отображает fallback UI.
 * 
 * @class ErrorBoundary
 * @extends {Component<Props, State>}
 * 
 * @example
 * ```tsx
 * <ErrorBoundary fallback={<CustomErrorComponent />}>
 *   <YourComponent />
 * </ErrorBoundary>
 * ```
 */
export class ErrorBoundary extends Component<Props, State> {
  private readonly errorHandler: ErrorHandler;
  private readonly logger: Logger;

  /**
   * Создает экземпляр ErrorBoundary
   * @param {Props} props - Свойства компонента
   */
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
    this.errorHandler = ErrorHandler.getInstance();
    this.logger = Logger.getInstance();
  }

  /**
   * Статический метод для обновления состояния при возникновении ошибки
   * @param {Error} error - Объект ошибки
   * @returns {State} Новое состояние с флагом hasError = true и сохраненной ошибкой
   */
  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  /**
   * Обрабатывает ошибку и логирует её через ErrorHandler
   * @param {Error} error - Объект ошибки
   * @param {ErrorInfo} errorInfo - Дополнительная информация об ошибке
   */
  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.errorHandler.handleError({ error, errorInfo });
    this.props.onError?.(error, errorInfo);
    this.logger.error('Error caught by boundary', { error, errorInfo });
  }

  /**
   * Рендерит компонент
   * @returns {ReactNode} Fallback UI при ошибке или дочерние компоненты
   */
  render(): ReactNode {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="error-boundary" data-testid="error-boundary">
          <h2>Что-то пошло не так...</h2>
          <p>Пожалуйста, попробуйте обновить страницу</p>
          {process.env.NODE_ENV === 'development' && this.state.error && (
            <pre className="error-details">
              {this.state.error.message}
            </pre>
          )}
        </div>
      );
    }

    return this.props.children;
  }
} 