import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../theme';
import HomePage from './index';
import { useVacancyCounts } from '../../hooks/useVacancyCounts';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import '@testing-library/jest-dom';

// Mock the useVacancyCounts hook
vi.mock('../../hooks/useVacancyCounts');

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useNavigate: () => mockNavigate,
  Link: ({ children, to }: { children: React.ReactNode; to: string }) =>
    React.createElement('a', { href: to }, children)
}));

const mockCategories = [
  {
    id: 1,
    name: 'IT',
    description: 'IT вакансии',
    icon: '💻',
    vacanciesCount: 10,
    averageSalary: '5000 PLN',
    popularSkills: ['React', 'TypeScript']
  }
];

const mockCities = [
  {
    id: 1,
    name: 'Варшава',
    coordinates: { lat: 52.2297, lng: 21.0122 },
    vacanciesCount: 10
  }
];

describe('HomePage', () => {
  beforeEach(() => {
    (useVacancyCounts as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      categoriesWithCounts: mockCategories,
      citiesWithCounts: mockCities
    });
    mockNavigate.mockClear();
  });

  it('renders category cards', () => {
    render(
      <ThemeProvider theme={theme}>
        <HomePage />
      </ThemeProvider>
    );

    expect(screen.getByTestId('category-name-1')).toHaveTextContent('IT');
    expect(screen.getByTestId('category-description-1')).toHaveTextContent('IT вакансии');
    expect(screen.getByTestId('category-vacancies-1')).toHaveTextContent('10');
    expect(screen.getByTestId('category-salary-1')).toHaveTextContent('5000 PLN');
  });

  it('renders city cards', () => {
    render(
      <ThemeProvider theme={theme}>
        <HomePage />
      </ThemeProvider>
    );

    expect(screen.getByText(/Варшава/i)).toBeInTheDocument();
    expect(screen.getByText(/10 вакансий/i)).toBeInTheDocument();
  });

  it('provides navigation links', () => {
    render(
      <ThemeProvider theme={theme}>
        <HomePage />
      </ThemeProvider>
    );

    const categoryLink = screen.getByText(/Смотреть вакансии/i);
    expect(categoryLink).toHaveAttribute('href', '/category/1');

    const cityLink = screen.getByText(/Варшава/i).closest('a');
    expect(cityLink).toHaveAttribute('href', '/city/1');
  });
}); 