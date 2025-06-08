import { Component, ReactNode } from 'react';
import { Logger } from '../../utils/Logger';
import { ErrorBoundary } from '../ErrorBoundary';

export interface BaseComponentProps {
  className?: string;
  testId?: string;
}

export interface BaseComponentState {
  isLoading: boolean;
  error: Error | null;
}

export abstract class BaseComponent<P extends BaseComponentProps, S extends BaseComponentState> extends Component<P, S> {
  protected readonly logger: Logger;

  protected constructor(props: P) {
    super(props);
    this.logger = Logger.getInstance();
    this.state = {
      isLoading: false,
      error: null,
    } as S;
  }

  protected async handleAsync<T>(
    operation: () => Promise<T>,
    onSuccess?: (result: T) => void,
    onError?: (error: Error) => void
  ): Promise<void> {
    try {
      this.setState({ isLoading: true, error: null });
      const result = await operation();
      onSuccess?.(result);
    } catch (error) {
      const appError = error instanceof Error ? error : new Error('Unknown error');
      this.setState({ error: appError });
      onError?.(appError);
      this.logger.error('Operation failed', { error: appError });
    } finally {
      this.setState({ isLoading: false });
    }
  }

  protected renderError(): ReactNode {
    const { error } = this.state;
    if (!error) return null;

    return (
      <div className="error-container" data-testid={`${this.props.testId}-error`}>
        <h3>Error</h3>
        <p>{error.message}</p>
      </div>
    );
  }

  protected renderLoading(): ReactNode {
    if (!this.state.isLoading) return null;

    return (
      <div className="loading-container" data-testid={`${this.props.testId}-loading`}>
        <div className="spinner" />
      </div>
    );
  }

  protected abstract renderContent(): ReactNode;

  render(): ReactNode {
    return (
      <ErrorBoundary>
        <div className={this.props.className} data-testid={this.props.testId}>
          {this.renderLoading()}
          {this.renderError()}
          {this.renderContent()}
        </div>
      </ErrorBoundary>
    );
  }
} 