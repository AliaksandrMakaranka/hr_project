import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.containerPadding};
`;

export const PageTitle = styled.h1`
  font-size: ${({ theme }) => theme.typography.title};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: ${({ theme }) => theme.spacing.sectionMargin};
  text-align: center;
`;

export const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.gridGap};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

export const CitiesList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing.gridGap};
`;

export const CityCard = styled.a`
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
  font-size: ${({ theme }) => theme.typography.body};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: 0.5rem;
`;

export const VacancyCount = styled.div`
  font-size: ${({ theme }) => theme.typography.small};
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 500;
`;

export const MapContainer = styled.div`
  height: 600px;
  border-radius: ${({ theme }) => theme.borderRadius.card};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.card};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    height: 400px;
  }
`;

export const NavButtonsContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: ${({ theme }) => theme.spacing.sectionMargin};
`;

export const NavLinkButton = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: ${({ theme }) => theme.borderRadius.button};
  transition: background-color ${({ theme }) => theme.transitions.default};

  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
  }
`; 