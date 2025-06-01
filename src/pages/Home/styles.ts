import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Container = styled.div`
  min-height: 100vh;
`;

export const Hero = styled.section`
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url('/images/hero-bg.jpg') center/cover no-repeat;
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: ${({ theme }) => theme.colors.textPrimary};
  padding: ${({ theme }) => theme.spacing.xl};
`;

export const Title = styled.h1`
  font-size: ${({ theme }) => theme.typography.title};
  font-weight: 700;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
`;

export const Subtitle = styled.p`
  font-size: ${({ theme }) => theme.typography.subtitle};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
`;

export const AboutSection = styled.section`
  padding: ${({ theme }) => theme.spacing.xxl} ${({ theme }) => theme.spacing.xl};
  background-color: ${({ theme }) => theme.colors.background.light};
`;

export const AboutContent = styled.div`
  max-width: ${({ theme }) => theme.breakpoints.wide};
  margin: 0 auto;
`;

export const AboutText = styled.p`
  font-size: ${({ theme }) => theme.typography.body};
  line-height: 1.8;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: ${({ theme }) => theme.spacing.lg};

  &:last-child {
    margin-bottom: 0;
  }
`;

export const AdvantagesSection = styled.section`
  padding: ${({ theme }) => theme.spacing.xxl} ${({ theme }) => theme.spacing.xl};
  text-align: center;
`;

export const AdvantagesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
  max-width: ${({ theme }) => theme.breakpoints.wide};
  margin: ${({ theme }) => theme.spacing.xl} auto 0;
`;

export const AdvantageCard = styled.div`
  background-color: ${({ theme }) => theme.colors.background.main};
  padding: ${({ theme }) => theme.spacing.xl};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  box-shadow: ${({ theme }) => theme.shadows.medium};
  transition: transform ${({ theme }) => theme.transitions.fast};

  &:hover {
    transform: translateY(-5px);
  }

  .icon {
    font-size: 2.5rem;
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }

  h3 {
    font-size: ${({ theme }) => theme.typography.subtitle};
    font-weight: 600;
    margin-bottom: ${({ theme }) => theme.spacing.sm};
    color: ${({ theme }) => theme.colors.textPrimary};
  }

  p {
    color: ${({ theme }) => theme.colors.textSecondary};
    line-height: 1.6;
  }
`;

export const CTASection = styled.section`
  padding: ${({ theme }) => theme.spacing.xxl} ${({ theme }) => theme.spacing.xl};
  background-color: ${({ theme }) => theme.colors.construction.safety};
  color: ${({ theme }) => theme.colors.textPrimary};
  text-align: center;

  div {
    display: flex;
    gap: ${({ theme }) => theme.spacing.md};
    justify-content: center;
    flex-wrap: wrap;
    margin-top: ${({ theme }) => theme.spacing.xl};
  }
`;

export const CTAButton = styled.button`
  background-color: ${({ theme }) => theme.colors.textPrimary};
  color: ${({ theme }) => theme.colors.construction.safety};
  border: none;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  font-size: ${({ theme }) => theme.typography.body};
  font-weight: 600;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  cursor: pointer;
  transition: transform ${({ theme }) => theme.transitions.fast};

  &:hover {
    transform: translateY(-2px);
  }
`;

export const CTAButtonSecondary = styled(CTAButton)`
  background-color: transparent;
  border: 2px solid ${({ theme }) => theme.colors.textPrimary};
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.title};
  font-weight: 700;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const SectionSubtitle = styled.p`
  font-size: ${({ theme }) => theme.typography.subtitle};
  color: ${({ theme }) => theme.colors.textSecondary};
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
  max-width: ${({ theme }) => theme.breakpoints.wide};
  margin: -${({ theme }) => theme.spacing.xl} auto 0;
  padding: 0 ${({ theme }) => theme.spacing.xl};
  position: relative;
  z-index: 1;
`;

export const StatCard = styled.div`
  background-color: ${({ theme }) => theme.colors.background.main};
  padding: ${({ theme }) => theme.spacing.xl};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  box-shadow: ${({ theme }) => theme.shadows.medium};
  text-align: center;
`;

export const StatNumber = styled.div`
  font-size: ${({ theme }) => theme.typography.title};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.construction.safety};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

export const StatLabel = styled.div`
  font-size: ${({ theme }) => theme.typography.body};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const SearchContainer = styled.div`
  display: flex;
  max-width: 600px;
  margin: 0 auto;
  background: ${({ theme }) => theme.colors.background.light};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  box-shadow: ${({ theme }) => theme.shadows.medium};
  padding: ${({ theme }) => theme.spacing.sm};
`;

export const SearchInput = styled.input`
  flex: 1;
  border: none;
  padding: ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.typography.body};
  outline: none;
  border-radius: ${({ theme }) => theme.borderRadius.small};
`;

export const SearchButton = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.textPrimary};
  border: none;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.fast};
  font-weight: bold;

  &:hover {
    background: ${({ theme }) => theme.colors.accent};
  }
`;

export const CategoriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.spacing.gridGap};
  margin-bottom: ${({ theme }) => theme.spacing.sectionMargin};
`;

export const CategoryCard = styled(motion.div)`
  background: ${({ theme }) => theme.colors.background.light};
  border-radius: ${({ theme }) => theme.borderRadius.card};
  padding: ${({ theme }) => theme.spacing.cardPadding};
  box-shadow: ${({ theme }) => theme.shadows.card};
  transition: ${({ theme }) => theme.transitions.default};

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.shadows.cardHover};
  }
`;

export const CategoryTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.heading};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

export const CategoryDescription = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const CategoryStats = styled.div`
  display: flex;
  justify-content: space-between;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.typography.small};
`;

export const CitiesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing.gridGap};
`;

export const CityCard = styled(motion.div)`
  background: ${({ theme }) => theme.colors.background.light};
  border-radius: ${({ theme }) => theme.borderRadius.card};
  padding: ${({ theme }) => theme.spacing.cardPadding};
  box-shadow: ${({ theme }) => theme.shadows.card};
  text-align: center;
  transition: ${({ theme }) => theme.transitions.default};

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.shadows.cardHover};
  }
`;

export const CityName = styled.h4`
  font-family: ${({ theme }) => theme.fonts.heading};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

export const VacancyCount = styled.span`
  font-size: ${({ theme }) => theme.typography.small};
  color: ${({ theme }) => theme.colors.textSecondary};
`;