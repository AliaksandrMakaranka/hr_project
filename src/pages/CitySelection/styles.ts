import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding: clamp(1rem, 5vw, 2rem);
`;

export const PageTitle = styled.h1`
  font-size: clamp(1.5rem, 4vw, 2.25rem);
  color: #333;
  margin-bottom: clamp(2rem, 5vw, 3rem);
  text-align: center;
  line-height: 1.3;
`;

export const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: clamp(1.5rem, 4vw, 2.5rem);
  width: 100%;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const CitiesList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing.gridGap};
`;

export const CityCard = styled(Link)`
  background: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.card};
  padding: ${({ theme }) => theme.spacing.cardPadding};
  box-shadow: ${({ theme }) => theme.shadows.card};
  text-decoration: none;
  transition: transform ${({ theme }) => theme.transitions.default},
              box-shadow ${({ theme }) => theme.transitions.default};

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadows.cardHover};
  }
`;

export const CityName = styled.h2`
  font-size: clamp(1.25rem, 3vw, 1.5rem);
  margin-bottom: clamp(0.5rem, 2vw, 1rem);
  line-height: 1.3;
`;

export const VacancyCount = styled.div`
  color: #1976d2;
  font-size: clamp(1rem, 2.5vw, 1.125rem);
  font-weight: 500;
  margin-top: auto;
`;

export const MapContainer = styled.div`
  border-radius: 12px;
  height: clamp(300px, 50vw, 500px);
  width: 100%;
  overflow: hidden;
  position: relative;
`;

export const NavButtonsContainer = styled.div`
  margin-bottom: clamp(1.5rem, 4vw, 2rem);
  display: flex;
  gap: clamp(0.5rem, 2vw, 1rem);
  flex-wrap: wrap;
`;

export const NavLinkButton = styled.button`
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