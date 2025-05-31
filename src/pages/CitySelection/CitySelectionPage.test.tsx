import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../theme';
import CitySelectionPage from './index';
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
    name: 'Варшава',
    coordinates: { lat: 52.2297, lng: 21.0122 },
    vacanciesCount: 10
  }
];

describe('CitySelectionPage', () => {
  beforeEach(() => {
    (useVacancyCounts as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      citiesWithCounts: mockCities,
      categoriesWithCounts: []
    });
    mockNavigate.mockClear();
  });

  it('renders city cards', () => {
    render(
      <ThemeProvider theme={theme}>
        <CitySelectionPage />
      </ThemeProvider>
    );

    expect(screen.getByText('Варшава')).toBeInTheDocument();
    expect(screen.getByText('10 вакансий')).toBeInTheDocument();
  });

  it('renders map container', () => {
    render(
      <ThemeProvider theme={theme}>
        <CitySelectionPage />
      </ThemeProvider>
    );

    expect(screen.getByTestId('map')).toBeInTheDocument();
  });

  it('handles navigation', () => {
    render(
      <ThemeProvider theme={theme}>
        <CitySelectionPage />
      </ThemeProvider>
    );

    const backButton = screen.getByText('← Назад');
    backButton.click();
    expect(mockNavigate).toHaveBeenCalledWith(-1);

    const allVacanciesButton = screen.getByText('Все вакансии');
    allVacanciesButton.click();
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
}); 