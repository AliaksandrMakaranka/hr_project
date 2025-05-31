import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../theme';
import JobsPage from './index';
import { useVacancyFilters } from '../../hooks/useVacancyFilters';
import { vi } from 'vitest';

// Mock the useVacancyFilters hook
vi.mock('../../hooks/useVacancyFilters');

const mockVacancies = [
  {
    id: 1,
    title: 'Frontend Developer',
    company: 'Tech Corp',
    category: {
      id: 1,
      name: 'IT',
      description: 'Работа в IT-сфере',
      icon: '💻',
      popularSkills: ['React', 'TypeScript', 'JavaScript'],
      averageSalary: '3500-5000 PLN'
    },
    city: {
      id: 1,
      name: 'Warsaw',
      coordinates: { lat: 52.2297, lng: 21.0122 }
    },
    salary: '3000-4000 PLN',
    employmentType: 'Full-time',
    description: 'Looking for a skilled frontend developer'
  },
  {
    id: 2,
    title: 'Backend Developer',
    company: 'Tech Corp',
    category: {
      id: 1,
      name: 'IT',
      description: 'Работа в IT-сфере',
      icon: '💻',
      popularSkills: ['Node.js', 'Python', 'Java'],
      averageSalary: '3500-5000 PLN'
    },
    city: {
      id: 2,
      name: 'Krakow',
      coordinates: { lat: 50.0647, lng: 19.9450 }
    },
    salary: '4000-5000 PLN',
    employmentType: 'Full-time',
    description: 'Looking for a skilled backend developer'
  }
];

const renderWithTheme = (component: React.ReactNode) => {
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  );
};

describe('JobsPage', () => {
  beforeEach(() => {
    (useVacancyFilters as any).mockReturnValue({
      filteredVacancies: mockVacancies,
      categoryId: null,
      cityId: null
    });
  });

  it('renders the page with all vacancies when no filters are applied', () => {
    renderWithTheme(<JobsPage />);
    
    expect(screen.getByText('Все вакансии')).toBeInTheDocument();
    expect(screen.getByText('Найдено вакансий: 2')).toBeInTheDocument();
  });

  it('renders filtered vacancies when category filter is applied', () => {
    (useVacancyFilters as any).mockReturnValue({
      filteredVacancies: mockVacancies,
      categoryId: 1,
      cityId: null
    });
    renderWithTheme(<JobsPage />);
    
    expect(screen.getByText('Вакансии в категории "IT"')).toBeInTheDocument();
    expect(screen.getByText('Frontend Developer')).toBeInTheDocument();
    expect(screen.getByText('Backend Developer')).toBeInTheDocument();
  });

  it('renders vacancy details correctly', () => {
    renderWithTheme(<JobsPage />);
    
    expect(screen.getByText('Frontend Developer')).toBeInTheDocument();
    expect(screen.getByText('3000-4000 PLN')).toBeInTheDocument();
    expect(screen.getByText('Looking for a skilled frontend developer')).toBeInTheDocument();
    
    // Check for multiple instances of labels and values
    const categoryLabels = screen.getAllByText('Категория:');
    const cityLabels = screen.getAllByText('Город:');
    const employmentTypeLabels = screen.getAllByText('Тип занятости:');
    
    expect(categoryLabels).toHaveLength(2);
    expect(cityLabels).toHaveLength(2);
    expect(employmentTypeLabels).toHaveLength(2);
    
    expect(screen.getAllByText('IT')).toHaveLength(2);
    expect(screen.getByText('Warsaw')).toBeInTheDocument();
    expect(screen.getByText('Krakow')).toBeInTheDocument();
    expect(screen.getAllByText('Full-time')).toHaveLength(2);
  });

  it('provides navigation links with correct attributes', () => {
    renderWithTheme(<JobsPage />);
    
    const viewButtons = screen.getAllByText('Подробнее');
    expect(viewButtons[0]).toHaveAttribute('href', '/vacancy/1');
    expect(viewButtons[1]).toHaveAttribute('href', '/vacancy/2');
  });

  it('handles navigation actions correctly', () => {
    renderWithTheme(<JobsPage />);
    
    expect(screen.getByText('← Назад')).toBeInTheDocument();
    expect(screen.getByText('Поиск по городам')).toBeInTheDocument();
  });
}); 