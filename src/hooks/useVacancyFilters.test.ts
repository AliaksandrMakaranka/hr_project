import { renderHook } from '@testing-library/react';
import { useVacancyFilters } from './useVacancyFilters';
import { useParams } from 'react-router-dom';
import { vi } from 'vitest';

vi.mock('react-router-dom', () => ({
  useParams: vi.fn(),
}));

describe('useVacancyFilters', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns null for category and city when no params', () => {
    vi.mocked(useParams).mockReturnValue({});
    
    const { result } = renderHook(() => useVacancyFilters());
    
    expect(result.current.categoryId).toBeNull();
    expect(result.current.cityId).toBeNull();
  });

  it('parses valid category ID', () => {
    vi.mocked(useParams).mockReturnValue({ categoryId: '123' });
    
    const { result } = renderHook(() => useVacancyFilters());
    
    expect(result.current.categoryId).toBe(123);
  });

  it('handles invalid category ID', () => {
    vi.mocked(useParams).mockReturnValue({ categoryId: 'invalid' });
    
    const { result } = renderHook(() => useVacancyFilters());
    
    expect(result.current.categoryId).toBeNull();
  });
}); 