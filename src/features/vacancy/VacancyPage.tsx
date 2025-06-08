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

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { EmptyMessage, ErrorMessage, LoadingMessage } from '../../components/common/Messages';
import { VacancyStore } from '../../store/vacancyStore';
import { Vacancy } from '../../types/vacancy';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Header = styled.div`
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const Company = styled.h2`
  font-size: 1.5rem;
  color: #666;
  margin-bottom: 1rem;
`;

const Info = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Section = styled.section`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 1rem;
`;

const List = styled.ul`
  list-style: disc;
  margin-left: 1.5rem;
`;

const ListItem = styled.li`
  margin-bottom: 0.5rem;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background-color: #0056b3;
  }
`;

const VacancyPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [store] = useState(() => new VacancyStore());
  const [selectedVacancy, setSelectedVacancy] = useState<Vacancy | null>(null);
  const { loading, error } = store.state;

  useEffect(() => {
    if (id) {
      store.fetchVacancies().then(() => {
        const vacancy = store.state.items.find(v => v.id === parseInt(id));
        setSelectedVacancy(vacancy || null);
      });
    }
  }, [id, store]);

  if (loading) {
    return <LoadingMessage>Loading vacancy details...</LoadingMessage>;
  }

  if (error) {
    return <ErrorMessage>Error: {error}</ErrorMessage>;
  }

  if (!selectedVacancy) {
    return <EmptyMessage>Vacancy not found</EmptyMessage>;
  }

  const handleApply = () => {
    // TODO: Implement application logic
    console.log('Applying for vacancy:', selectedVacancy.id);
  };

  return (
    <Container>
      <Header>
        <Title>{selectedVacancy.title}</Title>
        <Company>{selectedVacancy.company}</Company>
        <Info>
          <InfoItem>
            <strong>Location:</strong> {selectedVacancy.location?.address || 'Not specified'}
          </InfoItem>
          <InfoItem>
            <strong>Salary:</strong> {selectedVacancy.salary}
          </InfoItem>
          <InfoItem>
            <strong>Experience:</strong> {selectedVacancy.experience}
          </InfoItem>
          <InfoItem>
            <strong>Employment Type:</strong> {selectedVacancy.employmentType}
          </InfoItem>
        </Info>
      </Header>

      <Section>
        <SectionTitle>Description</SectionTitle>
        <p>{selectedVacancy.description}</p>
      </Section>

      {selectedVacancy.responsibilities && (
        <Section>
          <SectionTitle>Responsibilities</SectionTitle>
          <List>
            {selectedVacancy.responsibilities.map((item, index) => (
              <ListItem key={index}>{item}</ListItem>
            ))}
          </List>
        </Section>
      )}

      {selectedVacancy.requirements && (
        <Section>
          <SectionTitle>Requirements</SectionTitle>
          <List>
            {selectedVacancy.requirements.map((item, index) => (
              <ListItem key={index}>{item}</ListItem>
            ))}
          </List>
        </Section>
      )}

      {selectedVacancy.benefits && (
        <Section>
          <SectionTitle>Benefits</SectionTitle>
          <List>
            {selectedVacancy.benefits.map((item, index) => (
              <ListItem key={index}>{item}</ListItem>
            ))}
          </List>
        </Section>
      )}

      <Section>
        <SectionTitle>Contact Information</SectionTitle>
        {selectedVacancy.contact?.email && (
          <p>
            <strong>Email:</strong> {selectedVacancy.contact.email}
          </p>
        )}
        {selectedVacancy.contact?.phone && (
          <p>
            <strong>Phone:</strong> {selectedVacancy.contact.phone}
          </p>
        )}
      </Section>

      <Button onClick={handleApply}>Apply Now</Button>
    </Container>
  );
};

export default VacancyPage;