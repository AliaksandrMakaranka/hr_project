import React from 'react';
import { useNavigate } from 'react-router-dom';
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
  const { filteredVacancies, categoryId, cityId } = useVacancyFilters();

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
          Найдено вакансий: {filteredVacancies.length}
        </LocationInfo>
      </PageHeader>

      <VacanciesList>
        {filteredVacancies.map((vacancy: Vacancy) => (
          <VacancyCard key={vacancy.id}>
            <VacancyTitle>{vacancy.title}</VacancyTitle>
            <VacancyInfo>
              <InfoRow>
                <span>Категория:</span>
                <span>{vacancy.category.name}</span>
              </InfoRow>
              <InfoRow>
                <span>Город:</span>
                <span>{vacancy.city.name}</span>
              </InfoRow>
              <InfoRow>
                <span>Зарплата:</span>
                <span>{vacancy.salary}</span>
              </InfoRow>
              <InfoRow>
                <span>Тип занятости:</span>
                <span>{vacancy.employmentType}</span>
              </InfoRow>
            </VacancyInfo>
            <VacancyDescription>
              {vacancy.description}
            </VacancyDescription>
            <ViewButton href={ROUTES.VACANCY(vacancy.id)}>
              {NAVIGATION.MORE_DETAILS}
            </ViewButton>
          </VacancyCard>
        ))}
      </VacanciesList>
    </Container>
  );
};

export default JobsPage; 