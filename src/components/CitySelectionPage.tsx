/**
 * Страница выбора города.
 * 
 * Компонент отображает:
 * 1. Список городов с количеством вакансий
 * 2. Интерактивную карту Польши (на основе Leaflet и OpenStreetMap)
 * 
 * @component
 * @returns {JSX.Element} Страница выбора города
 */

import React from 'react';
import styled from 'styled-components';
import { cities, vacancies } from '../data';
import { useNavigate } from 'react-router-dom';
import { MapContainer as LeafletMapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // Импортируем стили Leaflet
import L from 'leaflet'; // Импортируем объект L из Leaflet для кастомных иконок маркеров

// Исправляем проблему с иконками маркеров по умолчанию в Leaflet в проектах с Vite
delete (L.Icon.Default.prototype as any)._getIconUrl;

// Используем стандартные импорты для иконок
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});

// Стилизованные компоненты
const Container = styled.div`
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding: clamp(1rem, 5vw, 2rem);
`;

const PageTitle = styled.h1`
  font-size: clamp(1.5rem, 4vw, 2.25rem);
  color: #333;
  margin-bottom: clamp(2rem, 5vw, 3rem);
  text-align: center;
  line-height: 1.3;
`;

const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: clamp(1.5rem, 4vw, 2.5rem);
  width: 100%;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const CitiesList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 250px), 1fr));
  gap: clamp(1rem, 3vw, 1.5rem);
  width: 100%;
`;

const CityCard = styled.a`
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: clamp(1rem, 3vw, 1.5rem);
  text-decoration: none;
  color: #333;
  transition: transform 0.2s, box-shadow 0.2s;
  display: flex;
  flex-direction: column;
  height: 100%;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

const CityName = styled.h2`
  font-size: clamp(1.25rem, 3vw, 1.5rem);
  margin-bottom: clamp(0.5rem, 2vw, 1rem);
  line-height: 1.3;
`;

const VacancyCount = styled.div`
  color: #1976d2;
  font-size: clamp(1rem, 2.5vw, 1.125rem);
  font-weight: 500;
  margin-top: auto;
`;

const MapContainer = styled.div`
  border-radius: 12px;
  height: clamp(300px, 50vw, 500px);
  width: 100%;
  overflow: hidden;
  position: relative;
`;

const NavButtonsContainer = styled.div`
  margin-bottom: clamp(1.5rem, 4vw, 2rem);
  display: flex;
  gap: clamp(0.5rem, 2vw, 1rem);
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

  const handleMarkerClick = (cityId: number) => {
    navigate(`/city/${cityId}`);
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
            // Убедитесь, что у города есть координаты перед отображением карточки
            city.coordinates && (
              <CityCard key={city.id} href={`/city/${city.id}`}>
                <CityName>{city.name}</CityName>
                <VacancyCount>{city.vacanciesCount} вакансий</VacancyCount>
              </CityCard>
            )
          ))}
        </CitiesList>

        <MapContainer>
          <LeafletMapContainer 
            center={[52.0, 19.0]} // Центр Польши
            zoom={6} 
            scrollWheelZoom={false}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {citiesWithVacancies.map(city => (
              // Убедитесь, что у города есть координаты перед добавлением маркера
              city.coordinates && (
                <Marker
                  key={city.id}
                  position={[city.coordinates.lat, city.coordinates.lng]}
                  title={`${city.name} (${city.vacanciesCount} вакансий)`}
                  eventHandlers={{
                    click: () => handleMarkerClick(city.id),
                  }}
                />
              )
            ))}
          </LeafletMapContainer>
        </MapContainer>
      </ContentWrapper>
    </Container>
  );
};

export default CitySelectionPage; 