import { Component, ErrorInfo, ReactNode } from 'react';
import { ErrorHandler } from '../utils/ErrorHandler';

/**
 * Props для компонента ErrorBoundary
 * @interface Props
 * @property {ReactNode} children - Дочерние компоненты, которые будут обёрнуты в ErrorBoundary
 * @property {ReactNode} [fallback] - Опциональный компонент, который будет отображен при возникновении ошибки
 */
interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

/**
 * Состояние компонента ErrorBoundary
 * @interface State
 * @property {boolean} hasError - Флаг, указывающий на наличие ошибки
 */
interface State {
  hasError: boolean;
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
  private errorHandler: ErrorHandler;

  /**
   * Создает экземпляр ErrorBoundary
   * @param {Props} props - Свойства компонента
   */
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
    this.errorHandler = ErrorHandler.getInstance();
  }

  /**
   * Статический метод для обновления состояния при возникновении ошибки
   * @returns {State} Новое состояние с флагом hasError = true
   */
  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  /**
   * Обрабатывает ошибку и логирует её через ErrorHandler
   * @param {Error} error - Объект ошибки
   * @param {ErrorInfo} errorInfo - Дополнительная информация об ошибке
   */
  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.errorHandler.handleError({ error, errorInfo });
  }

  /**
   * Рендерит компонент
   * @returns {ReactNode} Fallback UI при ошибке или дочерние компоненты
   */
  render(): ReactNode {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div style={{
          padding: '20px',
          textAlign: 'center',
          color: '#666',
        }}>
          <h2>Что-то пошло не так...</h2>
          <p>Пожалуйста, попробуйте обновить страницу</p>
        </div>
      );
    }

    return this.props.children;
  }
} 