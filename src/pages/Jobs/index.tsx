import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { jobCategories as categories } from '../../data/categories/index';
import { cities } from '../../data/cities';
import type { City } from '../../types/city';
import type { JobCategory } from '../../types/jobCategory';
import type { Vacancy } from '../../types/vacancy';
import { useVacancyFilters } from '../../hooks/useVacancyFilters';
import { ROUTES, NAVIGATION } from '../../constants/routes';
import { logger } from '../../utils/logger';
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
  NavLinkButton,
  NoVacanciesMessage
} from './styles';

/**
 * Компонент страницы со списком вакансий
 * Отображает заголовок с информацией о выбранной категории/городе
 * и список вакансий с подробной информацией
 */
const JobsPage: React.FC = () => {
  const navigate = useNavigate();
  const { filteredVacancies, categoryId, cityId } = useVacancyFilters();

  useEffect(() => {
    logger.debug('JobsPage mounted', {
      categoryId,
      cityId,
      vacanciesCount: filteredVacancies.length
    });
  }, [categoryId, cityId, filteredVacancies.length]);

  // Получение информации для заголовка
  const getHeaderInfo = (): string => {
    try {
      if (categoryId && cityId) {
        const category = categories.find((c: JobCategory) => c.id === categoryId);
        const city = cities.find((c: City) => c.id === cityId);
        
        if (!category || !city) {
          return 'Вакансии не найдены';
        }
        
        return `${category.name} в ${city.name}`;
      }
      
      if (categoryId) {
        const category = categories.find((c: JobCategory) => c.id === categoryId);
        if (!category) {
          return 'Вакансии не найдены';
        }
        return `Вакансии в категории "${category.name}"`;
      }
      
      if (cityId) {
        const city = cities.find((c: City) => c.id === cityId);
        if (!city) {
          return 'Вакансии не найдены';
        }
        return `Вакансии в городе ${city.name}`;
      }
      
      return 'Все вакансии';
    } catch (error) {
      logger.error('Error getting header info', { error });
      return 'Ошибка загрузки данных';
    }
  };

  const getNoVacanciesMessage = (): string => {
    if (categoryId && cityId) {
      return 'В выбранной категории и городе пока нет вакансий';
    }
    if (categoryId) {
      return 'В выбранной категории пока нет вакансий';
    }
    if (cityId) {
      return 'В выбранном городе пока нет вакансий';
    }
    return 'Нет доступных вакансий';
  };

  const handleGoBack = () => {
    logger.debug('Navigating back');
    navigate(-1);
  };

  const handleVacancyClick = (vacancyId: number) => {
    logger.debug('Vacancy clicked', { vacancyId });
  };

  return (
    <Container>
      <NavButtonsContainer>
        <NavLinkButton onClick={handleGoBack}>
          {NAVIGATION.BACK}
        </NavLinkButton>
      </NavButtonsContainer>

      <PageHeader>
        <PageTitle>{getHeaderInfo()}</PageTitle>
        <LocationInfo>
          Найдено вакансий: {filteredVacancies.length}
        </LocationInfo>
      </PageHeader>

      <VacanciesList>
        {filteredVacancies.length > 0 ? (
          filteredVacancies.map((vacancy: Vacancy) => (
            <VacancyCard key={vacancy.id}>
              <VacancyTitle data-testid={`vacancy-title-${vacancy.id}`}>
                {vacancy.title}
              </VacancyTitle>
              <VacancyInfo>
                <InfoRow>
                  <span>Компания:</span>
                  <span data-testid={`vacancy-company-${vacancy.id}`}>
                    {vacancy.company || 'Не указана'}
                  </span>
                </InfoRow>
                <InfoRow>
                  <span>Категория:</span>
                  <span data-testid={`vacancy-category-${vacancy.id}`}>
                    {vacancy.category?.name || 'Не указана'}
                  </span>
                </InfoRow>
                <InfoRow>
                  <span>Город:</span>
                  <span data-testid={`vacancy-city-${vacancy.id}`}>
                    {vacancy.city?.name || 'Не указан'}
                  </span>
                </InfoRow>
                <InfoRow>
                  <span>Зарплата:</span>
                  <span data-testid={`vacancy-salary-${vacancy.id}`}>
                    {vacancy.salary || 'Не указана'}
                  </span>
                </InfoRow>
                <InfoRow>
                  <span>Тип занятости:</span>
                  <span data-testid={`vacancy-employment-${vacancy.id}`}>
                    {vacancy.employmentType || 'Не указан'}
                  </span>
                </InfoRow>
              </VacancyInfo>
              <VacancyDescription data-testid={`vacancy-description-${vacancy.id}`}>
                {vacancy.description || 'Описание отсутствует'}
              </VacancyDescription>
              <ViewButton 
                as={Link} 
                to={ROUTES.VACANCY(vacancy.id)}
                onClick={() => handleVacancyClick(vacancy.id)}
              >
                {NAVIGATION.MORE_DETAILS}
              </ViewButton>
            </VacancyCard>
          ))
        ) : (
          <NoVacanciesMessage>
            {getNoVacanciesMessage()}
          </NoVacanciesMessage>
        )}
      </VacanciesList>
    </Container>
  );
};

export default JobsPage; 