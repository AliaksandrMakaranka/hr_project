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
import { useParams, useNavigate } from 'react-router-dom';
import { ROUTES, NAVIGATION } from '@constants/routes';
import { useVacancyStore } from '@store/vacancyStore';
import { logger } from '@utils/logger';
import { calculateSalary, formatSalaryDisplay } from '@utils/salaryUtils';

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

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const Tag = styled.span`
  background: #e3f2fd;
  color: #1976d2;
  padding: 0.25rem 0.75rem;
  border-radius: 16px;
  font-size: 0.875rem;
`;

const WorkingHoursContainer = styled.div`
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #eee;
`;

const WorkingHoursTitle = styled.h3`
  font-size: 1rem;
  color: #333;
  margin-bottom: 0.5rem;
`;

const WorkingHoursList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const WorkingHoursItem = styled.li`
  color: #666;
  font-size: 0.875rem;
  margin-bottom: 0.25rem;
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

const LoadingMessage = styled.div`
  text-align: center;
  padding: 2rem;
  font-size: 1.25rem;
  color: #666;
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 2rem;
  font-size: 1.25rem;
  color: #d32f2f;
`;

const EmptyMessage = styled.div`
  text-align: center;
  padding: 2rem;
  font-size: 1.25rem;
  color: #666;
`;

const SalaryBlock = styled.pre`
  font-size: clamp(1rem, 2.5vw, 1.125rem);
  color: #333;
  margin-bottom: clamp(1rem, 3vw, 1.5rem);
  line-height: 1.6;
  background: #f9f9f9;
  padding: clamp(1rem, 3vw, 1.5rem);
  border-radius: 8px;
`;

const VacancyPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { 
    selectedVacancy,
    loading,
    error,
    fetchVacancyById,
    resetSelectedVacancy,
    applyForVacancy,
  } = useVacancyStore();

  useEffect(() => {
    if (id) {
      fetchVacancyById(parseInt(id));
    }

    return () => {
      resetSelectedVacancy();
    };
  }, [id, fetchVacancyById, resetSelectedVacancy]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleGoToCities = () => {
    navigate(ROUTES.CITIES);
  };

  const handleApply = async () => {
    if (!selectedVacancy) return;
    
    try {
      await applyForVacancy(selectedVacancy.id);
      logger.info('Application submitted successfully', { vacancyId: selectedVacancy.id });
      // TODO: Show success message to user
    } catch (err) {
      logger.error('Error submitting application', { error: err });
      // TODO: Show error message to user
    }
  };

  if (loading) {
    return (
      <Container>
        <LoadingMessage>Loading vacancy details...</LoadingMessage>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <ErrorMessage>Error: {error}</ErrorMessage>
        <NavButtonsContainer>
          <NavLinkButton onClick={handleGoBack}>
            {NAVIGATION.BACK}
          </NavLinkButton>
        </NavButtonsContainer>
      </Container>
    );
  }

  if (!selectedVacancy) {
    return (
      <Container>
        <EmptyMessage>Vacancy not found</EmptyMessage>
        <NavButtonsContainer>
          <NavLinkButton onClick={handleGoBack}>
            {NAVIGATION.BACK}
          </NavLinkButton>
        </NavButtonsContainer>
      </Container>
    );
  }

  const responsibilities = selectedVacancy.responsibilities || [];
  const requirements = selectedVacancy.requirements || [];
  const benefits = selectedVacancy.benefits || [];

  // Calculate salary data
  const salaryData = calculateSalary(selectedVacancy.salaryPerHour, selectedVacancy.currency);
  const formattedSalary = formatSalaryDisplay(salaryData);

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
        <Title>{selectedVacancy.title}</Title>
        <CompanyInfo>{selectedVacancy.company}</CompanyInfo>
        {/* Display original salary string if needed, or remove */}
        {/* <Salary>{selectedVacancy.salary}</Salary> */}
        
        {/* Display calculated salary block */}
        <SalaryBlock>{formattedSalary}</SalaryBlock>

        {selectedVacancy.tags && selectedVacancy.tags.length > 0 && (
          <TagsContainer>
            {selectedVacancy.tags.map((tag, index) => (
              <Tag key={`tag-${index}`}>{tag}</Tag>
            ))}
          </TagsContainer>
        )}
      </Header>

      <MainContent>
        <div>
          <ContentSection>
            <SectionTitle>Описание вакансии</SectionTitle>
            <Description>{selectedVacancy.description}</Description>
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
            <SectionTitle>Информация о вакансии</SectionTitle>
            <ContactInfo>
              <ContactItem>
                <ContactLabel>Компания</ContactLabel>
                <ContactValue>{selectedVacancy.company}</ContactValue>
              </ContactItem>
              <ContactItem>
                <ContactLabel>Город</ContactLabel>
                <ContactValue>{selectedVacancy.city?.name || 'Не указан'}</ContactValue>
              </ContactItem>
              <ContactItem>
                <ContactLabel>Категория</ContactLabel>
                <ContactValue>{selectedVacancy.category?.name || 'Не указана'}</ContactValue>
              </ContactItem>
              <ContactItem>
                <ContactLabel>Тип занятости</ContactLabel>
                <ContactValue>{selectedVacancy.employmentType || 'Не указан'}</ContactValue>
              </ContactItem>
              <ContactItem>
                <ContactLabel>Требуемый опыт</ContactLabel>
                <ContactValue>{selectedVacancy.experience || 'Не указан'}</ContactValue>
              </ContactItem>
              {selectedVacancy.location?.address && (
                <ContactItem>
                  <ContactLabel>Адрес</ContactLabel>
                  <ContactValue>{selectedVacancy.location.address}</ContactValue>
                </ContactItem>
              )}
              {selectedVacancy.contact && (
                <>
                  {selectedVacancy.contact.email && (
                    <ContactItem>
                      <ContactLabel>Email</ContactLabel>
                      <ContactValue>{selectedVacancy.contact.email}</ContactValue>
                    </ContactItem>
                  )}
                  {selectedVacancy.contact.phone && (
                    <ContactItem>
                      <ContactLabel>Телефон</ContactLabel>
                      <ContactValue>{selectedVacancy.contact.phone}</ContactValue>
                    </ContactItem>
                  )}
                </>
              )}
              {selectedVacancy.workingHours && (
                <WorkingHoursContainer>
                  <WorkingHoursTitle>График работы</WorkingHoursTitle>
                  <WorkingHoursList>
                    <WorkingHoursItem>
                      Время: {selectedVacancy.workingHours?.from} - {selectedVacancy.workingHours?.to}
                    </WorkingHoursItem>
                    <WorkingHoursItem>
                      Дни: {selectedVacancy.workingHours?.days?.join(', ')}
                    </WorkingHoursItem>
                  </WorkingHoursList>
                </WorkingHoursContainer>
              )}
            </ContactInfo>
          </ContentSection>

          <ContentSection>
            <SectionTitle>Откликнуться на вакансию</SectionTitle>
            <ApplyButton onClick={handleApply}>
              Откликнуться
            </ApplyButton>
          </ContentSection>
        </div>
      </MainContent>
    </Container>
  );
};

export default VacancyPage;