import React, { memo, useCallback, useMemo } from 'react';
import { ErrorBoundary } from '../ErrorBoundary';
import { Logger } from '../../utils/Logger';

interface OptimizedComponentProps {
  className?: string;
  testId?: string;
  children: React.ReactNode;
}

export const OptimizedComponent = memo<OptimizedComponentProps>(({
  className,
  testId,
  children
}) => {
  const logger = useMemo(() => Logger.getInstance(), []);

  const handleError = useCallback((error: Error) => {
    logger.error('Component error', { error });
  }, [logger]);

  return (
    <ErrorBoundary onError={handleError}>
      <div className={className} data-testid={testId}>
        {children}
      </div>
    </ErrorBoundary>
  );
});

OptimizedComponent.displayName = 'OptimizedComponent'; 