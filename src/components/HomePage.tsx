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
import styled from 'styled-components';
import { jobCategories, cities, vacancies } from '../data';
import { useNavigate } from 'react-router-dom';

// Стилизованные компоненты
const Container = styled.div`
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding: clamp(1rem, 5vw, 2rem);
`;

const Hero = styled.div`
  text-align: center;
  margin-bottom: clamp(2rem, 8vw, 4rem);
  width: 100%;
`;

const Title = styled.h1`
  font-size: clamp(2rem, 5vw, 3rem);
  color: #333;
  margin-bottom: clamp(1rem, 3vw, 1.5rem);
  line-height: 1.2;
`;

const Subtitle = styled.p`
  font-size: clamp(1rem, 2.5vw, 1.25rem);
  color: #666;
  max-width: min(600px, 90%);
  margin: 0 auto clamp(2rem, 5vw, 3rem);
  line-height: 1.6;
`;

const CategoriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr));
  gap: clamp(1rem, 3vw, 2rem);
  margin-bottom: clamp(2rem, 8vw, 4rem);
  width: 100%;
`;

const CategoryCard = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: clamp(1.5rem, 4vw, 2rem);
  transition: transform 0.2s, box-shadow 0.2s;
  height: 100%;
  display: flex;
  flex-direction: column;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

const CategoryHeader = styled.div`
  display: flex;
  align-items: center;
  gap: clamp(0.75rem, 2vw, 1rem);
  margin-bottom: clamp(1rem, 3vw, 1.5rem);
`;

const CategoryIcon = styled.div`
  width: clamp(40px, 8vw, 50px);
  height: clamp(40px, 8vw, 50px);
  background: #e3f2fd;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: clamp(1.25rem, 3vw, 1.5rem);
  color: #1976d2;
  flex-shrink: 0;
`;

const CategoryName = styled.h2`
  font-size: clamp(1.25rem, 3vw, 1.5rem);
  color: #333;
  margin: 0;
  line-height: 1.3;
`;

const CategoryDescription = styled.p`
  color: #666;
  margin-bottom: clamp(1rem, 3vw, 1.5rem);
  line-height: 1.6;
  font-size: clamp(0.875rem, 2vw, 1rem);
`;

const CategoryStats = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: clamp(1rem, 3vw, 1.5rem);
  padding-bottom: clamp(1rem, 3vw, 1.5rem);
  border-bottom: 1px solid #eee;
`;

const Stat = styled.div`
  text-align: center;
  flex: 1;
`;

const StatValue = styled.div`
  font-size: clamp(1.125rem, 2.5vw, 1.25rem);
  font-weight: 500;
  color: #1976d2;
`;

const StatLabel = styled.div`
  font-size: clamp(0.75rem, 2vw, 0.875rem);
  color: #666;
`;

const SkillsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: clamp(1rem, 3vw, 1.5rem);
`;

const SkillTag = styled.span`
  background: #f5f5f5;
  padding: 0.375rem 0.75rem;
  border-radius: 16px;
  font-size: clamp(0.75rem, 2vw, 0.875rem);
  color: #666;
`;

const ViewButton = styled.a`
  display: block;
  text-align: center;
  background: #1976d2;
  color: white;
  text-decoration: none;
  padding: clamp(0.75rem, 2vw, 1rem);
  border-radius: 8px;
  font-weight: 500;
  transition: background-color 0.2s;
  margin-top: auto;
  
  &:hover {
    background: #1565c0;
  }
`;

const PopularCities = styled.section`
  margin-top: clamp(2rem, 8vw, 4rem);
  width: 100%;
`;

const SectionTitle = styled.h2`
  font-size: clamp(1.5rem, 4vw, 2rem);
  color: #333;
  margin-bottom: clamp(1.5rem, 4vw, 2rem);
  text-align: center;
`;

const CitiesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 200px), 1fr));
  gap: clamp(1rem, 3vw, 1.5rem);
  width: 100%;
`;

const CityCard = styled.a`
  background: white;
  border-radius: 8px;
  padding: clamp(1rem, 3vw, 1.5rem);
  text-align: center;
  text-decoration: none;
  color: #333;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
  
  &:hover {
    transform: translateY(-3px);
  }
`;

const CityName = styled.div`
  font-size: clamp(1rem, 2.5vw, 1.125rem);
  font-weight: 500;
  margin-bottom: 0.5rem;
`;

const CityVacancies = styled.div`
  color: #1976d2;
  font-size: clamp(0.75rem, 2vw, 0.875rem);
`;

const NavButtonsContainer = styled.div`
  margin-bottom: clamp(1.5rem, 4vw, 2rem);
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const NavLinkButton = styled.button`
  background: none;
  border: 1px solid #1976d2;
  color: #1976d2;
  padding: clamp(0.5rem, 2vw, 0.75rem) clamp(1rem, 3vw, 1.5rem);
  border-radius: 8px;
  font-size: clamp(0.875rem, 2vw, 1rem);
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s;
  white-space: nowrap;
  
  &:hover {
    background: #1976d2;
    color: white;
  }
`;

const HomePage: React.FC = () => {
  // Подсчет количества вакансий для каждой категории
  const categoriesWithDynamicCounts = jobCategories.map(category => ({
    ...category,
    vacanciesCount: vacancies.filter(v => v.category.id === category.id).length
  }));

  // Подсчет количества вакансий для каждого города
  const citiesWithDynamicCounts = cities.map(city => ({
    ...city,
    vacanciesCount: vacancies.filter(v => v.city.id === city.id).length
  }));

  const navigate = useNavigate();

  const handleGoToCities = () => {
    navigate('/cities');
  };

  return (
    <Container>
      <NavButtonsContainer>
        <NavLinkButton onClick={handleGoToCities}>
          Поиск по городам
        </NavLinkButton>
      </NavButtonsContainer>

      <Hero>
        <Title>Найдите работу в Польше</Title>
        <Subtitle>
          Выберите интересующую вас профессию и начните свой путь к успешной карьере в Польше
        </Subtitle>
      </Hero>

      <CategoriesGrid>
        {categoriesWithDynamicCounts.map(category => (
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
                <StatLabel>Зарплата</StatLabel>
              </Stat>
            </CategoryStats>

            <SkillsList>
              {category.popularSkills.map((skill, index) => (
                <SkillTag key={index}>{skill}</SkillTag>
              ))}
            </SkillsList>

            <ViewButton href={`/category/${category.id}`}>
              Смотреть вакансии
            </ViewButton>
          </CategoryCard>
        ))}
      </CategoriesGrid>

      <PopularCities>
        <SectionTitle>Популярные города</SectionTitle>
        <CitiesGrid>
          {citiesWithDynamicCounts.map(city => (
            <CityCard key={city.id} href={`/city/${city.id}`}>
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