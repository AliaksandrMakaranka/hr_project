import { useCallback, useState } from 'react';
import { Logger } from '../utils/Logger';

interface AsyncState<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
}

export function useAsync<T>() {
  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    isLoading: false,
    error: null,
  });

  const logger = Logger.getInstance();

  const execute = useCallback(async (promise: Promise<T>) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const data = await promise;
      setState({ data, isLoading: false, error: null });
      return data;
    } catch (error) {
      const appError = error instanceof Error ? error : new Error('Unknown error');
      setState({ data: null, isLoading: false, error: appError });
      logger.error('Async operation failed', { error: appError });
      throw appError;
    }
  }, [logger]);

  return {
    ...state,
    execute,
  };
} 