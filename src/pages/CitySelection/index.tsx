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
import { useNavigate } from 'react-router-dom';
import { MapContainer as LeafletMapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useVacancyCounts } from '../../hooks/useVacancyCounts';
import { ROUTES, NAVIGATION } from '../../constants/routes';
import {
  Container,
  PageTitle,
  ContentWrapper,
  CitiesList,
  CityCard,
  CityName,
  VacancyCount,
  MapContainer,
  NavButtonsContainer,
  NavLinkButton
} from './styles';

// Исправляем проблему с иконками маркеров по умолчанию в Leaflet в проектах с Vite
delete (L.Icon.Default.prototype as { _getIconUrl?: () => string })._getIconUrl;

// Используем стандартные импорты для иконок
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});

const CitySelectionPage: React.FC = () => {
  const { citiesWithCounts, isLoading, error } = useVacancyCounts();
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleGoToAllVacancies = () => {
    navigate(ROUTES.HOME);
  };

  const handleMarkerClick = (cityId: number) => {
    navigate(ROUTES.CITY(cityId));
  };

  if (isLoading) {
    return (
      <Container>
        <PageTitle>Загрузка городов...</PageTitle>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <PageTitle>Ошибка при загрузке городов</PageTitle>
        <p>{error.message}</p>
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

      <PageTitle>Выберите город</PageTitle>
      
      <ContentWrapper>
        <CitiesList>
          {citiesWithCounts.map(city => (
            city.coordinates && (
              <CityCard key={city.id} to={ROUTES.CITY(city.id)}>
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
            {citiesWithCounts.map(city => (
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