import React from 'react';
import { useVacancyCounts } from '../../hooks/useVacancyCounts';
import { ROUTES } from '../../constants/routes';
import {
  Container,
  PageTitle,
  CitiesList,
  CityCard,
  CityName,
  VacancyCount
} from './styles';

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
          <CityCard key={city.id} to={ROUTES.CITY(city.id)}>
            <CityName>{city.name}</CityName>
            <VacancyCount>{city.vacanciesCount} вакансий</VacancyCount>
          </CityCard>
        ))}
      </CitiesList>
    </Container>
  );
};

export default CitiesPage; 