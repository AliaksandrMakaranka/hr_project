import { Component, ErrorInfo, ReactNode } from 'react';
import { ErrorHandler } from '../utils/ErrorHandler';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  private errorHandler: ErrorHandler;

  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
    this.errorHandler = ErrorHandler.getInstance();
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.errorHandler.handleError({ error, errorInfo });
  }

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