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
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const Hero = styled.div`
  text-align: center;
  margin-bottom: 60px;
`;

const Title = styled.h1`
  font-size: 48px;
  color: #333;
  margin-bottom: 20px;
`;

const Subtitle = styled.p`
  font-size: 20px;
  color: #666;
  max-width: 600px;
  margin: 0 auto 40px;
`;

const CategoriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
  margin-bottom: 60px;
`;

const CategoryCard = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 30px;
  transition: transform 0.2s, box-shadow 0.2s;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

const CategoryHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
`;

const CategoryIcon = styled.div`
  width: 50px;
  height: 50px;
  background: #e3f2fd;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: #1976d2;
`;

const CategoryName = styled.h2`
  font-size: 24px;
  color: #333;
  margin: 0;
`;

const CategoryDescription = styled.p`
  color: #666;
  margin-bottom: 20px;
  line-height: 1.5;
`;

const CategoryStats = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #eee;
`;

const Stat = styled.div`
  text-align: center;
`;

const StatValue = styled.div`
  font-size: 20px;
  font-weight: 500;
  color: #1976d2;
`;

const StatLabel = styled.div`
  font-size: 14px;
  color: #666;
`;

const SkillsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 20px;
`;

const SkillTag = styled.span`
  background: #f5f5f5;
  padding: 6px 12px;
  border-radius: 16px;
  font-size: 14px;
  color: #666;
`;

const ViewButton = styled.a`
  display: block;
  text-align: center;
  background: #1976d2;
  color: white;
  text-decoration: none;
  padding: 12px;
  border-radius: 8px;
  font-weight: 500;
  transition: background-color 0.2s;
  
  &:hover {
    background: #1565c0;
  }
`;

const PopularCities = styled.section`
  margin-top: 60px;
`;

const SectionTitle = styled.h2`
  font-size: 32px;
  color: #333;
  margin-bottom: 30px;
  text-align: center;
`;

const CitiesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
`;

const CityCard = styled.a`
  background: white;
  border-radius: 8px;
  padding: 20px;
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
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 8px;
`;

const CityVacancies = styled.div`
  color: #1976d2;
  font-size: 14px;
`;

const NavButtonsContainer = styled.div`
  margin-bottom: 30px;
`;

const NavLinkButton = styled.button`
  background: none;
  border: 1px solid #1976d2;
  color: #1976d2;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s;
  
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