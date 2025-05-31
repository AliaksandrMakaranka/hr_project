import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.containerPadding};
`;

export const PageHeader = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.sectionMargin};
`;

export const PageTitle = styled.h1`
  font-size: ${({ theme }) => theme.typography.title};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: 1rem;
`;

export const LocationInfo = styled.div`
  font-size: ${({ theme }) => theme.typography.body};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const VacanciesList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.gridGap};
`;

export const VacancyCard = styled.div`
  background: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.card};
  padding: ${({ theme }) => theme.spacing.cardPadding};
  box-shadow: ${({ theme }) => theme.shadows.card};
  transition: transform ${({ theme }) => theme.transitions.default},
              box-shadow ${({ theme }) => theme.transitions.default};

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadows.cardHover};
  }
`;

export const VacancyTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.subtitle};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: 1rem;
`;

export const VacancyInfo = styled.div`
  margin-bottom: 1rem;
`;

export const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  font-size: ${({ theme }) => theme.typography.body};
  color: ${({ theme }) => theme.colors.textSecondary};

  span:first-child {
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

export const VacancyDescription = styled.p`
  font-size: ${({ theme }) => theme.typography.body};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 1.5rem;
  line-height: 1.6;
`;

export const ViewButton = styled.a`
  display: inline-block;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: ${({ theme }) => theme.borderRadius.button};
  text-decoration: none;
  transition: background-color ${({ theme }) => theme.transitions.default};

  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
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