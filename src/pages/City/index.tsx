import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useVacancyCounts } from '../../hooks/useVacancyCounts';
import { ROUTES, NAVIGATION } from '../../constants/routes';
import {
  Container,
  PageTitle,
  VacanciesList,
  VacancyCard,
  VacancyTitle,
  VacancyCompany,
  VacancySalary,
  NavButtonsContainer,
  NavLinkButton
} from './styles';

/**
 * Страница с вакансиями конкретного города
 * Отображает все вакансии, доступные в выбранном городе
 */
const CityPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { citiesWithCounts, isLoading, error } = useVacancyCounts();
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleGoToAllVacancies = () => {
    navigate(ROUTES.HOME);
  };

  if (isLoading) {
    return (
      <Container>
        <PageTitle>Загрузка вакансий...</PageTitle>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <PageTitle>Ошибка при загрузке вакансий</PageTitle>
        <p>{error.message}</p>
      </Container>
    );
  }

  const cityId = parseInt(id || '0', 10);
  const city = citiesWithCounts.find(c => c.id === cityId);

  if (!city) {
    return (
      <Container>
        <NavButtonsContainer>
          <NavLinkButton onClick={handleGoBack}>
            {NAVIGATION.BACK}
          </NavLinkButton>
          <NavLinkButton onClick={handleGoToAllVacancies}>
            {NAVIGATION.ALL_VACANCIES}
          </NavLinkButton>
        </NavButtonsContainer>
        <PageTitle>Город не найден</PageTitle>
        <p>Город с указанным ID не существует.</p>
      </Container>
    );
  }

  const cityVacancies = city.vacancies || [];

  if (cityVacancies.length === 0) {
    return (
      <Container>
        <NavButtonsContainer>
          <NavLinkButton onClick={handleGoBack}>
            {NAVIGATION.BACK}
          </NavLinkButton>
          <NavLinkButton onClick={handleGoToAllVacancies}>
            {NAVIGATION.ALL_VACANCIES}
          </NavLinkButton>
        </NavButtonsContainer>
        <PageTitle>Вакансии в городе {city.name}</PageTitle>
        <p>В данный момент нет доступных вакансий в этом городе.</p>
      </Container>
    );
  }

  return (
    <Container>
      <NavButtonsContainer>
        <NavLinkButton onClick={handleGoBack}>
          {NAVIGATION.BACK}
        </NavLinkButton>
        <NavLinkButton onClick={handleGoToAllVacancies}>
          {NAVIGATION.ALL_VACANCIES}
        </NavLinkButton>
      </NavButtonsContainer>

      <PageTitle>Вакансии в городе {city.name}</PageTitle>
      
      <VacanciesList>
        {cityVacancies.map(vacancy => (
          <VacancyCard key={vacancy.id} to={ROUTES.VACANCY(vacancy.id)}>
            <VacancyTitle>{vacancy.title}</VacancyTitle>
            <VacancyCompany>{vacancy.company}</VacancyCompany>
            <VacancySalary>{vacancy.salary}</VacancySalary>
          </VacancyCard>
        ))}
      </VacanciesList>
    </Container>
  );
};

export default CityPage; 