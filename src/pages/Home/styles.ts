import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.containerPadding};
`;

export const Hero = styled.section`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.sectionMargin};
`;

export const Title = styled.h1`
  font-size: ${({ theme }) => theme.typography.title};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: 1rem;
`;

export const Subtitle = styled.p`
  font-size: ${({ theme }) => theme.typography.subtitle};
  color: ${({ theme }) => theme.colors.textSecondary};
  max-width: 800px;
  margin: 0 auto;
`;

export const CategoriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.gridGap};
  margin-bottom: ${({ theme }) => theme.spacing.sectionMargin};
`;

export const CategoryCard = styled.div`
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

export const CategoryHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

export const CategoryIcon = styled.div`
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.primary};
`;

export const CategoryName = styled.h2`
  font-size: ${({ theme }) => theme.typography.subtitle};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin: 0;
`;

export const CategoryDescription = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 1.5rem;
`;

export const CategoryStats = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 1.5rem;
`;

export const Stat = styled.div`
  text-align: center;
`;

export const StatValue = styled.div`
  font-size: ${({ theme }) => theme.typography.subtitle};
  color: ${({ theme }) => theme.colors.primary};
  font-weight: bold;
`;

export const StatLabel = styled.div`
  font-size: ${({ theme }) => theme.typography.small};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const SkillsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

export const SkillTag = styled.span`
  background: ${({ theme }) => theme.colors.primary}10;
  color: ${({ theme }) => theme.colors.primary};
  padding: 0.25rem 0.75rem;
  border-radius: ${({ theme }) => theme.borderRadius.tag};
  font-size: ${({ theme }) => theme.typography.small};
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

export const PopularCities = styled.section`
  margin-bottom: ${({ theme }) => theme.spacing.sectionMargin};
`;

export const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.subtitle};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: 1.5rem;
`;

export const CitiesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
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

export const CityName = styled.h3`
  font-size: ${({ theme }) => theme.typography.body};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: 0.5rem;
`;

export const CityVacancies = styled.div`
  font-size: ${({ theme }) => theme.typography.small};
  color: ${({ theme }) => theme.colors.textSecondary};
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