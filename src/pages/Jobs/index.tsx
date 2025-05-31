import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { jobCategories } from '../../data/categories';
import { cities } from '../../data/cities';
import type { City } from '../../types/city';
import type { JobCategory } from '../../types/jobCategory';
import type { Vacancy } from '../../types/vacancy';
import { useVacancyFilters } from '../../hooks/useVacancyFilters';
import { ROUTES, NAVIGATION } from '../../constants/routes';
import {
  Container,
  PageHeader,
  PageTitle,
  LocationInfo,
  VacanciesList,
  VacancyCard,
  VacancyTitle,
  VacancyInfo,
  InfoRow,
  VacancyDescription,
  ViewButton,
  NavButtonsContainer,
  NavLinkButton
} from './styles';

/**
 * Компонент страницы со списком вакансий
 * Отображает заголовок с информацией о выбранной категории/городе
 * и список вакансий с подробной информацией
 */
const JobsPage: React.FC = () => {
  const navigate = useNavigate();
  const { filteredVacancies = [], categoryId, cityId } = useVacancyFilters() || {};

  // Получение информации для заголовка
  const getHeaderInfo = () => {
    if (categoryId && cityId) {
      const category = jobCategories.find((c: JobCategory) => c.id === categoryId);
      const city = cities.find((c: City) => c.id === cityId);
      return `${category?.name} в ${city?.name}`;
    } else if (categoryId) {
      const category = jobCategories.find((c: JobCategory) => c.id === categoryId);
      return `Вакансии в категории "${category?.name}"`;
    } else if (cityId) {
      const city = cities.find((c: City) => c.id === cityId);
      return `Вакансии в городе ${city?.name}`;
    }
    return 'Все вакансии';
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleSearchByCities = () => {
    navigate(ROUTES.CITIES);
  };

  return (
    <Container>
      <NavButtonsContainer>
        <NavLinkButton onClick={handleGoBack}>
          {NAVIGATION.BACK}
        </NavLinkButton>
        <NavLinkButton onClick={handleSearchByCities}>
          {NAVIGATION.SEARCH_BY_CITIES}
        </NavLinkButton>
      </NavButtonsContainer>

      <PageHeader>
        <PageTitle>{getHeaderInfo()}</PageTitle>
        <LocationInfo>
          Найдено вакансий: {filteredVacancies?.length || 0}
        </LocationInfo>
      </PageHeader>

      <VacanciesList>
        {Array.isArray(filteredVacancies) && filteredVacancies.length > 0 ? (
          filteredVacancies.map((vacancy: Vacancy) => (
            <VacancyCard key={vacancy.id}>
              <VacancyTitle data-testid={`vacancy-title-${vacancy.id}`}>{vacancy.title}</VacancyTitle>
              <VacancyInfo>
                <InfoRow>
                  <span>Компания:</span>
                  <span data-testid={`vacancy-company-${vacancy.id}`}>{vacancy.company}</span>
                </InfoRow>
                <InfoRow>
                  <span>Категория:</span>
                  <span data-testid={`vacancy-category-${vacancy.id}`}>{vacancy.category?.name}</span>
                </InfoRow>
                <InfoRow>
                  <span>Город:</span>
                  <span data-testid={`vacancy-city-${vacancy.id}`}>{vacancy.city?.name}</span>
                </InfoRow>
                <InfoRow>
                  <span>Зарплата:</span>
                  <span data-testid={`vacancy-salary-${vacancy.id}`}>{vacancy.salary}</span>
                </InfoRow>
                <InfoRow>
                  <span>Тип занятости:</span>
                  <span data-testid={`vacancy-employment-${vacancy.id}`}>{vacancy.employmentType}</span>
                </InfoRow>
              </VacancyInfo>
              <VacancyDescription data-testid={`vacancy-description-${vacancy.id}`}>
                {vacancy.description}
              </VacancyDescription>
              <ViewButton as={Link} to={ROUTES.VACANCY(vacancy.id)}>
                {NAVIGATION.MORE_DETAILS}
              </ViewButton>
            </VacancyCard>
          ))
        ) : (
          <div>Нет доступных вакансий</div>
        )}
      </VacanciesList>
    </Container>
  );
};

export default JobsPage; 