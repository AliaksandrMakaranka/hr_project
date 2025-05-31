import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../theme';
import HomePage from './index';
import { useVacancyCounts } from '../../hooks/useVacancyCounts';
import { vi } from 'vitest';

// Mock the useVacancyCounts hook
vi.mock('../../hooks/useVacancyCounts');

const mockVacancyCounts = {
  categoriesWithCounts: [
    {
      id: 1,
      name: 'IT',
      description: 'Работа в IT-сфере',
      vacanciesCount: 2,
      icon: '💻',
      popularSkills: ['React', 'TypeScript', 'JavaScript'],
      averageSalary: '3500-5000 PLN',
      subcategories: [
        { id: 101, name: 'Frontend', vacanciesCount: 1 },
        { id: 102, name: 'Backend', vacanciesCount: 1 }
      ]
    }
  ],
  citiesWithCounts: [
    {
      id: 1,
      name: 'Warsaw',
      vacanciesCount: 1,
      coordinates: { lat: 52.2297, lng: 21.0122 }
    }
  ]
};

const renderWithTheme = (component: React.ReactNode) => {
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  );
};

describe('HomePage', () => {
  beforeEach(() => {
    (useVacancyCounts as any).mockReturnValue(mockVacancyCounts);
  });

  it('renders main page sections', () => {
    renderWithTheme(<HomePage />);
    
    expect(screen.getByText('Найдите работу своей мечты в Польше')).toBeInTheDocument();
    expect(screen.getByText('Поиск по городам')).toBeInTheDocument();
  });

  it('displays essential category information', () => {
    renderWithTheme(<HomePage />);
    
    expect(screen.getByText('IT')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('Вакансий')).toBeInTheDocument();
    expect(screen.getByText('3500-5000 PLN')).toBeInTheDocument();
    expect(screen.getByText('Средняя ЗП')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('JavaScript')).toBeInTheDocument();
  });

  it('displays essential city information', () => {
    renderWithTheme(<HomePage />);
    
    expect(screen.getByText('Warsaw')).toBeInTheDocument();
    expect(screen.getByText('1 вакансий')).toBeInTheDocument();
  });

  it('provides correct navigation links', () => {
    renderWithTheme(<HomePage />);
    
    const categoryLink = screen.getByText('Смотреть вакансии');
    expect(categoryLink).toHaveAttribute('href', '/category/1');
    
    const cityLink = screen.getByText('Warsaw').closest('a');
    expect(cityLink).toHaveAttribute('href', '/city/1');
  });
}); 