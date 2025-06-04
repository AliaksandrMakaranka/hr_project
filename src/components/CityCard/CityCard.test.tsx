import { render, screen } from '@testing-library/react';
import { CityCard } from './CityCard';
import { BrowserRouter } from 'react-router-dom';

const mockCity = {
  id: 1,
  name: 'Варшава',
  vacanciesCount: 5,
};

describe('CityCard', () => {
  const renderWithRouter = (component: React.ReactNode) => {
    return render(
      <BrowserRouter>
        {component}
      </BrowserRouter>
    );
  };

  it('renders city name', () => {
    renderWithRouter(<CityCard city={mockCity} testId="city-card" />);
    expect(screen.getByText('Варшава')).toBeInTheDocument();
  });

  it('renders vacancy count', () => {
    renderWithRouter(<CityCard city={mockCity} testId="city-card" />);
    expect(screen.getByText('5 вакансий')).toBeInTheDocument();
  });

  it('renders link to vacancies', () => {
    renderWithRouter(<CityCard city={mockCity} testId="city-card" />);
    const link = screen.getByTestId('city-card-link');
    expect(link).toHaveAttribute('href', '/vacancies?cityId=1');
  });

  it('handles zero vacancies', () => {
    const cityWithNoVacancies = { ...mockCity, vacanciesCount: 0 };
    renderWithRouter(<CityCard city={cityWithNoVacancies} testId="city-card" />);
    expect(screen.getByText('0 вакансий')).toBeInTheDocument();
  });
}); 