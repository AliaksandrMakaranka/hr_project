/**
 * Страница с вакансиями.
 * 
 * Компонент отображает:
 * 1. Заголовок с информацией о выбранной категории/городе
 * 2. Список вакансий с детальной информацией
 * 
 * @component
 * @param {Object} props - Свойства компонента
 * @param {number} props.categoryId - ID категории (опционально)
 * @param {number} props.cityId - ID города (опционально)
 * @returns {JSX.Element} Страница с вакансиями
 */

import React from 'react';
import styled from 'styled-components';
import { vacancies, jobCategories, cities } from '../data';
import type { Vacancy } from '../types';
import { useParams, useNavigate } from 'react-router-dom';

// Стилизованные компоненты
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const PageHeader = styled.div`
  margin-bottom: 40px;
  text-align: center;
`;

const PageTitle = styled.h1`
  font-size: 36px;
  color: #333;
  margin-bottom: 10px;
`;

const LocationInfo = styled.div`
  font-size: 18px;
  color: #666;
`;

const VacanciesList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
`;

const VacancyCard = styled.div`
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

const VacancyTitle = styled.h2`
  font-size: 24px;
  color: #333;
  margin-bottom: 15px;
`;

const VacancyInfo = styled.div`
  margin-bottom: 20px;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  color: #666;
`;

const VacancyDescription = styled.p`
  color: #666;
  margin-bottom: 20px;
  line-height: 1.5;
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

const NavButtonsContainer = styled.div`
  margin-bottom: 30px;
  display: flex;
  gap: 10px;
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

const JobsPage: React.FC = () => {
  const { categoryId, cityId } = useParams<{ categoryId?: string; cityId?: string }>();

  const categoryIdNumber = categoryId ? parseInt(categoryId, 10) : undefined;
  const cityIdNumber = cityId ? parseInt(cityId, 10) : undefined;

  // Фильтрация вакансий по категории и/или городу
  const filteredVacancies = vacancies.filter(vacancy => {
    if (categoryIdNumber !== undefined && cityIdNumber !== undefined) {
      return vacancy.category.id === categoryIdNumber && vacancy.city.id === cityIdNumber;
    }
    if (categoryIdNumber !== undefined) {
      return vacancy.category.id === categoryIdNumber;
    }
    if (cityIdNumber !== undefined) {
      return vacancy.city.id === cityIdNumber;
    }
    return true;
  });

  // Получение информации о категории/городе для заголовка
  const category = categoryIdNumber !== undefined ? jobCategories.find(c => c.id === categoryIdNumber) : null;
  const city = cityIdNumber !== undefined ? cities.find(c => c.id === cityIdNumber) : null;

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleGoToCities = () => {
    navigate('/cities');
  };

  return (
    <Container>
      <NavButtonsContainer>
        <NavLinkButton onClick={handleGoBack}>
          Назад
        </NavLinkButton>
        <NavLinkButton onClick={handleGoToCities}>
          Поиск по городам
        </NavLinkButton>
      </NavButtonsContainer>

      <PageHeader>
        <PageTitle>
          {category && city
            ? `Вакансии ${category.name} в ${city.name}`
            : category
            ? `Вакансии ${category.name}`
            : city
            ? `Вакансии в ${city.name}`
            : 'Все вакансии'}
        </PageTitle>
        <LocationInfo>
          {filteredVacancies.length} вакансий
        </LocationInfo>
      </PageHeader>

      <VacanciesList>
        {filteredVacancies.map(vacancy => (
          <VacancyCard key={vacancy.id}>
            <VacancyTitle>{vacancy.title}</VacancyTitle>
            
            <VacancyInfo>
              <InfoRow>
                <span>Компания:</span>
                <span>{vacancy.company}</span>
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
                <span>Опыт:</span>
                <span>{vacancy.experience}</span>
              </InfoRow>
            </VacancyInfo>

            <VacancyDescription>
              {vacancy.description}
            </VacancyDescription>

            <ViewButton href={`/vacancy/${vacancy.id}`}>
              Подробнее
            </ViewButton>
          </VacancyCard>
        ))}
      </VacanciesList>
    </Container>
  );
};

export default JobsPage; 