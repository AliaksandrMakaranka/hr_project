import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../theme';
import CitySelectionPage from './index';
import { useVacancyCounts } from '../../hooks/useVacancyCounts';
import { vi } from 'vitest';

// Mock the useVacancyCounts hook
vi.mock('../../hooks/useVacancyCounts');

// Mock react-leaflet
vi.mock('react-leaflet', () => ({
  MapContainer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="map">{children}</div>
  ),
  TileLayer: () => null,
  Marker: () => null
}));

const mockCities = [
  {
    id: 1,
    name: 'Warsaw',
    vacanciesCount: 5,
    coordinates: { lat: 52.2297, lng: 21.0122 }
  },
  {
    id: 2,
    name: 'Krakow',
    vacanciesCount: 3,
    coordinates: { lat: 50.0647, lng: 19.9450 }
  }
];

const renderWithTheme = (component: React.ReactNode) => {
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  );
};

describe('CitySelectionPage', () => {
  beforeEach(() => {
    (useVacancyCounts as any).mockReturnValue({
      citiesWithCounts: mockCities
    });
  });

  it('renders the page title', () => {
    renderWithTheme(<CitySelectionPage />);
    expect(screen.getByText('Выберите город')).toBeInTheDocument();
  });

  it('displays city cards with correct information', () => {
    renderWithTheme(<CitySelectionPage />);
    
    expect(screen.getByText('Warsaw')).toBeInTheDocument();
    expect(screen.getByText('5 вакансий')).toBeInTheDocument();
    expect(screen.getByText('Krakow')).toBeInTheDocument();
    expect(screen.getByText('3 вакансий')).toBeInTheDocument();
  });

  it('renders the map container', () => {
    renderWithTheme(<CitySelectionPage />);
    expect(screen.getByTestId('map')).toBeInTheDocument();
  });

  it('provides navigation buttons', () => {
    renderWithTheme(<CitySelectionPage />);
    
    expect(screen.getByText('← Назад')).toBeInTheDocument();
    expect(screen.getByText('Все вакансии')).toBeInTheDocument();
  });
}); 