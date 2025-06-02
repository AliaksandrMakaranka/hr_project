import React from 'react';
import { useVacancyCounts } from '../../hooks/useVacancyCounts';
import { ROUTES } from '../../constants/routes';
import CityCard from '../../components/CityCard';
import {
  Container,
  PageTitle,
  CitiesList,
} from './styles';

// Map of city names to their image URLs (same as in CitySelection)
const cityImages: Record<string, string> = {
  'Варшава': '/images/cities/warsaw.jpg',
  'Краков': '/images/cities/krakow.jpg',
  'Вроцлав': '/images/cities/wroclaw.jpg',
  'Познань': '/images/cities/poznan.jpg',
  'Гданьск': '/images/cities/gdansk.jpg',
  'Лодзь': '/images/cities/lodz.jpg',
};

/**
 * Страница со списком городов
 * Отображает все города, в которых есть вакансии
 */
const CitiesPage: React.FC = () => {
  const { citiesWithCounts, isLoading, error } = useVacancyCounts();

  if (isLoading) {
    return (
      <Container>
        <PageTitle>Загрузка городов...</PageTitle>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <PageTitle>Ошибка при загрузке городов</PageTitle>
        <p>{error.message}</p>
      </Container>
    );
  }

  // Фильтруем города, оставляя только те, в которых есть вакансии
  const citiesWithVacancies = citiesWithCounts.filter(city => (city.vacanciesCount || 0) > 0);

  if (citiesWithVacancies.length === 0) {
    return (
      <Container>
        <PageTitle>Нет доступных городов</PageTitle>
        <p>В данный момент нет вакансий ни в одном городе.</p>
      </Container>
    );
  }

  return (
    <Container>
      <PageTitle>Выберите город</PageTitle>
      
      <CitiesList>
        {citiesWithVacancies.map(city => (
          <CityCard
            key={city.id}
            name={city.name}
            vacanciesCount={city.vacanciesCount || 0}
            imageUrl={cityImages[city.name] || '/images/cities/default.jpg'}
            to={ROUTES.CITY(city.id)}
          />
        ))}
      </CitiesList>
    </Container>
  );
};

export default CitiesPage; 