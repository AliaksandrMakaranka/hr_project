import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../theme';
import JobsPage from './index';
import { useVacancyFilters } from '../../hooks/useVacancyFilters';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import '@testing-library/jest-dom';

// Mock the useVacancyFilters hook
vi.mock('../../hooks/useVacancyFilters');

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useNavigate: () => mockNavigate,
  Link: ({ children, to }: { children: React.ReactNode; to: string }) =>
    React.createElement('a', { href: to }, children)
}));

const mockVacancies = [
  {
    id: 1,
    title: 'Frontend Developer',
    company: 'Tech Corp',
    salary: '5000-7000 PLN',
    city: {
      id: 1,
      name: 'Варшава',
      coordinates: { lat: 52.2297, lng: 21.0122 }
    },
    category: {
      id: 1,
      name: 'IT',
      description: 'IT вакансии',
      icon: '💻'
    },
    description: 'Frontend разработчик',
    employmentType: 'Полная занятость',
    createdAt: '2024-03-20'
  }
];

describe('JobsPage', () => {
  beforeEach(() => {
    (useVacancyFilters as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      filteredVacancies: mockVacancies,
      categoryId: mockVacancies[0].category.id,
      cityId: mockVacancies[0].city.id
    });
    mockNavigate.mockClear();
  });

  it('renders vacancy cards', () => {
    render(
      <ThemeProvider theme={theme}>
        <JobsPage />
      </ThemeProvider>
    );

    expect(screen.getByTestId('vacancy-title-1')).toHaveTextContent('Frontend Developer');
    expect(screen.getByTestId('vacancy-company-1')).toHaveTextContent('Tech Corp');
    expect(screen.getByTestId('vacancy-salary-1')).toHaveTextContent('5000-7000 PLN');
    expect(screen.getByTestId('vacancy-city-1')).toHaveTextContent('Варшава');
  });

  it('renders vacancy details', () => {
    render(
      <ThemeProvider theme={theme}>
        <JobsPage />
      </ThemeProvider>
    );

    expect(screen.getByTestId('vacancy-description-1')).toHaveTextContent('Frontend разработчик');
    expect(screen.getByTestId('vacancy-employment-1')).toHaveTextContent('Полная занятость');
  });

  it('provides navigation links', () => {
    render(
      <ThemeProvider theme={theme}>
        <JobsPage />
      </ThemeProvider>
    );

    const viewButton = screen.getByText('Подробнее');
    expect(viewButton).toHaveAttribute('href', '/vacancy/1');

    const backButton = screen.getByText('← Назад');
    backButton.click();
    expect(mockNavigate).toHaveBeenCalledWith(-1);

    const searchByCitiesButton = screen.getByText('Поиск по городам');
    searchByCitiesButton.click();
    expect(mockNavigate).toHaveBeenCalledWith('/cities');
  });

  it('displays filter information', () => {
    render(
      <ThemeProvider theme={theme}>
        <JobsPage />
      </ThemeProvider>
    );

    expect(screen.getByTestId('vacancy-category-1')).toHaveTextContent('IT');
    expect(screen.getByTestId('vacancy-city-1')).toHaveTextContent('Варшава');
  });
}); 