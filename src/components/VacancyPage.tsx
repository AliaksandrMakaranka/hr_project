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

  // Find the vacancy by ID
  const vacancy = vacancies.find(v => v.id === Number(id));

  useEffect(() => {
    // Add console log for debugging
    console.log('Vacancy ID:', id);
    console.log('Found vacancy:', vacancy);
  }, [id, vacancy]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleGoToCities = () => {
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
              {vacancy.responsibilities.map((item, index) => (
                <ListItem key={index}>{item}</ListItem>
              ))}
            </List>
          </ContentSection>

          <ContentSection>
            <SectionTitle>Требования</SectionTitle>
            <List>
              {vacancy.requirements.map((item, index) => (
                <ListItem key={index}>{item}</ListItem>
              ))}
            </List>
          </ContentSection>

          <ContentSection>
            <SectionTitle>Условия работы</SectionTitle>
            <List>
              {vacancy.benefits.map((item, index) => (
                <ListItem key={index}>{item}</ListItem>
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
                <ContactValue>{vacancy.employer.name}</ContactValue>
              </ContactItem>
              <ContactItem>
                <ContactLabel>Email</ContactLabel>
                <ContactValue>{vacancy.employer.email}</ContactValue>
              </ContactItem>
              <ContactItem>
                <ContactLabel>Телефон</ContactLabel>
                <ContactValue>{vacancy.employer.phone}</ContactValue>
              </ContactItem>
              {vacancy.employer.website && (
                <ContactItem>
                  <ContactLabel>Веб-сайт</ContactLabel>
                  <ContactValue>
                    <a href={`https://${vacancy.employer.website}`} target="_blank" rel="noopener noreferrer">
                      {vacancy.employer.website}
                    </a>
                  </ContactValue>
                </ContactItem>
              )}
            </ContactInfo>
          </ContentSection>

          <ApplyButton onClick={() => alert('Функционал отклика на вакансию будет добавлен позже')}>
            Откликнуться на вакансию
          </ApplyButton>
        </div>
      </MainContent>
    </Container>
  );
};

export default VacancyPage;