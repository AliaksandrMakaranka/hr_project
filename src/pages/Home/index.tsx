/**
 * Главная страница приложения для поиска работы в Польше.
 * 
 * Компонент отображает:
 * 1. Заголовок и подзаголовок
 * 2. Сетку карточек категорий профессий
 * 3. Сетку популярных городов
 * 
 * Каждая карточка категории содержит:
 * - Иконку и название категории
 * - Описание
 * - Статистику (количество вакансий и средняя зарплата)
 * - Список популярных навыков
 * - Кнопку для перехода к вакансиям
 * 
 * Каждая карточка города содержит:
 * - Название города
 * - Количество доступных вакансий
 * 
 * @component
 * @returns {JSX.Element} Главная страница приложения
 */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useVacancyCounts } from '../../hooks/useVacancyCounts';
import { ROUTES, NAVIGATION } from '../../constants/routes';
import {
  Container,
  Hero,
  Title,
  Subtitle,
  CategoriesGrid,
  CategoryCard,
  CategoryHeader,
  CategoryIcon,
  CategoryName,
  CategoryDescription,
  CategoryStats,
  Stat,
  StatValue,
  StatLabel,
  SkillsList,
  SkillTag,
  ViewButton,
  PopularCities,
  SectionTitle,
  CitiesGrid,
  CityCard,
  CityName,
  CityVacancies,
  NavButtonsContainer,
  NavLinkButton
} from './styles';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { categoriesWithCounts, citiesWithCounts } = useVacancyCounts();

  const handleGoToCities = () => {
    navigate(ROUTES.CITIES);
  };

  return (
    <Container>
      <Hero>
        <Title>Найдите работу своей мечты в Польше</Title>
        <Subtitle>
          Мы помогаем специалистам найти лучшие вакансии в польских компаниях.
          Выберите категорию или город, чтобы начать поиск.
        </Subtitle>
      </Hero>

      <NavButtonsContainer>
        <NavLinkButton onClick={handleGoToCities}>
          {NAVIGATION.SEARCH_BY_CITIES}
        </NavLinkButton>
      </NavButtonsContainer>

      <CategoriesGrid>
        {categoriesWithCounts.map(category => (
          <CategoryCard key={category.id}>
            <CategoryHeader>
              <CategoryIcon>{category.icon}</CategoryIcon>
              <CategoryName>{category.name}</CategoryName>
            </CategoryHeader>
            <CategoryDescription>{category.description}</CategoryDescription>
            <CategoryStats>
              <Stat>
                <StatValue>{category.vacanciesCount}</StatValue>
                <StatLabel>Вакансий</StatLabel>
              </Stat>
              <Stat>
                <StatValue>{category.averageSalary}</StatValue>
                <StatLabel>Средняя ЗП</StatLabel>
              </Stat>
            </CategoryStats>
            <SkillsList>
              {category.popularSkills.map((skill, index) => (
                <SkillTag key={index}>{skill}</SkillTag>
              ))}
            </SkillsList>
            <ViewButton href={ROUTES.CATEGORY(category.id)}>
              {NAVIGATION.VIEW_VACANCIES}
            </ViewButton>
          </CategoryCard>
        ))}
      </CategoriesGrid>

      <PopularCities>
        <SectionTitle>Популярные города</SectionTitle>
        <CitiesGrid>
          {citiesWithCounts.map(city => (
            <CityCard key={city.id} href={ROUTES.CITY(city.id)}>
              <CityName>{city.name}</CityName>
              <CityVacancies>{city.vacanciesCount} вакансий</CityVacancies>
            </CityCard>
          ))}
        </CitiesGrid>
      </PopularCities>
    </Container>
  );
};

export default HomePage; 