import React, { Suspense } from 'react';
import { LoadingMessage } from './Messages';

interface LazyLoadProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const LazyLoad: React.FC<LazyLoadProps> = ({ 
  children, 
  fallback = <LoadingMessage>Loading...</LoadingMessage> 
}) => {
  return (
    <Suspense fallback={fallback}>
      {children}
    </Suspense>
  );
}; 