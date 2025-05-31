/**
 * Страница выбора города.
 * 
 * Компонент отображает:
 * 1. Список городов с количеством вакансий
 * 2. Интерактивную карту Польши (заглушка)
 * 
 * @component
 * @returns {JSX.Element} Страница выбора города
 */

import React from 'react';
import styled from 'styled-components';
import { cities, vacancies } from '../data';
import type { City } from '../types';
import { useNavigate } from 'react-router-dom';

// Стилизованные компоненты
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const PageTitle = styled.h1`
  font-size: 36px;
  color: #333;
  margin-bottom: 40px;
  text-align: center;
`;

const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const CitiesList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
`;

const CityCard = styled.a`
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  text-decoration: none;
  color: #333;
  transition: transform 0.2s, box-shadow 0.2s;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

const CityName = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
`;

const VacancyCount = styled.div`
  color: #1976d2;
  font-size: 18px;
  font-weight: 500;
`;

const MapContainer = styled.div`
  background: #f5f5f5;
  border-radius: 12px;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  font-size: 18px;
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

const CitySelectionPage: React.FC = () => {
  // Подсчет количества вакансий для каждого города
  const citiesWithVacancies = cities.map(city => ({
    ...city,
    vacanciesCount: vacancies.filter(v => v.city.id === city.id).length
  }));

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleGoToAllVacancies = () => {
    navigate('/');
  };

  return (
    <Container>
      <NavButtonsContainer>
        <NavLinkButton onClick={handleGoBack}>
          Назад
        </NavLinkButton>
        <NavLinkButton onClick={handleGoToAllVacancies}>
          Все вакансии
        </NavLinkButton>
      </NavButtonsContainer>

      <PageTitle>Выберите город</PageTitle>
      
      <ContentWrapper>
        <CitiesList>
          {citiesWithVacancies.map(city => (
            <CityCard key={city.id} href={`/city/${city.id}`}>
              <CityName>{city.name}</CityName>
              <VacancyCount>{city.vacanciesCount} вакансий</VacancyCount>
            </CityCard>
          ))}
        </CitiesList>

        <MapContainer>
          Здесь будет интерактивная карта Польши
        </MapContainer>
      </ContentWrapper>
    </Container>
  );
};

export default CitySelectionPage; 