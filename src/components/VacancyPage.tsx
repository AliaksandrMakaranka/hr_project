/**
 * Страница с детальной информацией о вакансии.
 * 
 * Компонент отображает:
 * 1. Заголовок и основную информацию о вакансии
 * 2. Описание и требования
 * 3. Информацию о работодателе
 * 4. Форму отклика на вакансию
 * 
 * @component
 * @returns {JSX.Element} Страница с детальной информацией о вакансии
 */

import React, { useEffect } from 'react';
import styled from 'styled-components';
import { vacancies } from '../data';
import { useParams, useNavigate } from 'react-router-dom';
import { ROUTES, NAVIGATION } from '../constants/routes';
import { logger } from '../utils/logger';

// Стилизованные компоненты
const Container = styled.div`
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding: clamp(1rem, 5vw, 2rem);
`;

const Header = styled.div`
  margin-bottom: clamp(2rem, 5vw, 3rem);
  width: 100%;
`;

const Title = styled.h1`
  font-size: clamp(1.5rem, 4vw, 2.25rem);
  color: #333;
  margin-bottom: clamp(1rem, 3vw, 1.5rem);
  line-height: 1.3;
`;

const CompanyInfo = styled.div`
  font-size: clamp(1rem, 2.5vw, 1.25rem);
  color: #666;
  margin-bottom: clamp(0.5rem, 2vw, 1rem);
`;

const Salary = styled.div`
  font-size: clamp(1.25rem, 3vw, 1.5rem);
  color: #1976d2;
  font-weight: 500;
  margin-bottom: clamp(1rem, 3vw, 1.5rem);
`;

const MainContent = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 2fr) minmax(0, 1fr);
  gap: clamp(1.5rem, 4vw, 2.5rem);
  width: 100%;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ContentSection = styled.section`
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: clamp(1.5rem, 4vw, 2rem);
  margin-bottom: clamp(1.5rem, 4vw, 2rem);
  width: 100%;
`;

const SectionTitle = styled.h2`
  font-size: clamp(1.25rem, 3vw, 1.5rem);
  color: #333;
  margin-bottom: clamp(1rem, 3vw, 1.5rem);
  line-height: 1.3;
`;

const Description = styled.p`
  color: #666;
  line-height: 1.6;
  margin-bottom: clamp(1rem, 3vw, 1.5rem);
  font-size: clamp(0.875rem, 2vw, 1rem);
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
`;

const ListItem = styled.li`
  color: #666;
  padding: clamp(0.5rem, 2vw, 1rem) 0;
  border-bottom: 1px solid #eee;
  font-size: clamp(0.875rem, 2vw, 1rem);
  
  &:last-child {
    border-bottom: none;
  }
  
  &:before {
    content: "•";
    color: #1976d2;
    font-weight: bold;
    margin-right: 0.5rem;
  }
`;

const ContactInfo = styled.div`
  background: #f5f5f5;
  border-radius: 8px;
  padding: clamp(1rem, 3vw, 1.5rem);
  width: 100%;
`;

const ContactItem = styled.div`
  margin-bottom: clamp(0.75rem, 2vw, 1rem);
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const ContactLabel = styled.div`
  font-weight: 500;
  color: #333;
  margin-bottom: 0.25rem;
  font-size: clamp(0.875rem, 2vw, 1rem);
`;

const ContactValue = styled.div`
  color: #666;
  font-size: clamp(0.875rem, 2vw, 1rem);
`;

const ApplyButton = styled.button`
  background: #1976d2;
  color: white;
  border: none;
  padding: clamp(0.75rem, 2vw, 1rem) clamp(1.5rem, 4vw, 2rem);
  border-radius: 8px;
  font-size: clamp(1rem, 2.5vw, 1.125rem);
  font-weight: 500;
  cursor: pointer;
  width: 100%;
  transition: background-color 0.2s;
  
  &:hover {
    background: #1565c0;
  }
`;

const NavButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const NavLinkButton = styled.button`
  background: #1976d2;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background: #1565c0;
  }
`;

const VacancyPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Find the vacancy by ID with proper type checking
  const vacancy = vacancies.find(v => v.id === Number(id));

  useEffect(() => {
    logger.debug('VacancyPage mounted', { id, vacancyFound: !!vacancy });
    
    if (!id) {
      logger.warn('No vacancy ID provided');
      return;
    }

    if (!vacancy) {
      logger.error('Vacancy not found', { id });
    }
  }, [id, vacancy]);

  const handleGoBack = () => {
    logger.debug('Navigating back');
    navigate(-1);
  };

  const handleGoToCities = () => {
    logger.debug('Navigating to cities page');
    navigate(ROUTES.CITIES);
  };

  // If vacancy is not found, show error message
  if (!vacancy) {
    return (
      <Container>
        <NavButtonsContainer>
          <NavLinkButton onClick={handleGoBack}>
            {NAVIGATION.BACK}
          </NavLinkButton>
        </NavButtonsContainer>
        <Header>
          <Title>Вакансия не найдена</Title>
          <Description>
            К сожалению, запрашиваемая вакансия не существует или была удалена.
          </Description>
        </Header>
      </Container>
    );
  }

  // Ensure all required arrays exist before mapping
  const responsibilities = vacancy.responsibilities || [];
  const requirements = vacancy.requirements || [];
  const benefits = vacancy.benefits || [];

  return (
    <Container>
      <NavButtonsContainer>
        <NavLinkButton onClick={handleGoBack}>
          {NAVIGATION.BACK}
        </NavLinkButton>
        <NavLinkButton onClick={handleGoToCities}>
          {NAVIGATION.SEARCH_BY_CITIES}
        </NavLinkButton>
      </NavButtonsContainer>

      <Header>
        <Title>{vacancy.title}</Title>
        <CompanyInfo>{vacancy.company}</CompanyInfo>
        <Salary>{vacancy.salary}</Salary>
      </Header>

      <MainContent>
        <div>
          <ContentSection>
            <SectionTitle>Описание вакансии</SectionTitle>
            <Description>{vacancy.description}</Description>
          </ContentSection>

          <ContentSection>
            <SectionTitle>Обязанности</SectionTitle>
            <List>
              {responsibilities.map((item, index) => (
                <ListItem key={`responsibility-${index}`}>{item}</ListItem>
              ))}
            </List>
          </ContentSection>

          <ContentSection>
            <SectionTitle>Требования</SectionTitle>
            <List>
              {requirements.map((item, index) => (
                <ListItem key={`requirement-${index}`}>{item}</ListItem>
              ))}
            </List>
          </ContentSection>

          <ContentSection>
            <SectionTitle>Условия работы</SectionTitle>
            <List>
              {benefits.map((item, index) => (
                <ListItem key={`benefit-${index}`}>{item}</ListItem>
              ))}
            </List>
          </ContentSection>
        </div>

        <div>
          <ContentSection>
            <SectionTitle>Информация о работодателе</SectionTitle>
            <ContactInfo>
              <ContactItem>
                <ContactLabel>Компания</ContactLabel>
                <ContactValue>{vacancy.company}</ContactValue>
              </ContactItem>
              <ContactItem>
                <ContactLabel>Город</ContactLabel>
                <ContactValue>{vacancy.city?.name || 'Не указан'}</ContactValue>
              </ContactItem>
              <ContactItem>
                <ContactLabel>Тип занятости</ContactLabel>
                <ContactValue>{vacancy.employmentType}</ContactValue>
              </ContactItem>
            </ContactInfo>
          </ContentSection>

          <ContentSection>
            <SectionTitle>Откликнуться на вакансию</SectionTitle>
            <ApplyButton onClick={() => logger.info('Apply button clicked', { vacancyId: vacancy.id })}>
              Откликнуться
            </ApplyButton>
          </ContentSection>
        </div>
      </MainContent>
    </Container>
  );
};

export default VacancyPage;