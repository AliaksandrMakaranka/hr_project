import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
import { useVacancyStore } from '../store/vacancyStore';
import type { Vacancy } from '../types';

const Container = styled.div`
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding: clamp(1rem, 5vw, 2rem);
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  width: 100%;
`;

const VacancyCard = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

const Title = styled.h2`
  font-size: 1.25rem;
  color: #333;
  margin-bottom: 0.5rem;
`;

const Company = styled.div`
  font-size: 1rem;
  color: #666;
  margin-bottom: 0.5rem;
`;

const Salary = styled.div`
  font-size: 1.125rem;
  color: #1976d2;
  font-weight: 500;
  margin-bottom: 1rem;
`;

const Location = styled.div`
  font-size: 0.875rem;
  color: #666;
  margin-bottom: 0.5rem;
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const Tag = styled.span`
  background: #e3f2fd;
  color: #1976d2;
  padding: 0.25rem 0.75rem;
  border-radius: 16px;
  font-size: 0.875rem;
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

const VacancyList: React.FC = () => {
  const navigate = useNavigate();
  const {
    loading,
    error,
    fetchVacancies,
    currentCity,
    currentCategory,
    getFilteredVacancies,
    getVacancyStats
  } = useVacancyStore();

  useEffect(() => {
    fetchVacancies();
  }, [fetchVacancies, currentCity, currentCategory]);

  const handleVacancyClick = (vacancy: Vacancy) => {
    navigate(`${ROUTES.VACANCIES}/${vacancy.id}`);
  };

  const filteredVacancies = getFilteredVacancies();
  const stats = getVacancyStats();

  if (loading) {
    return <LoadingMessage>Loading vacancies...</LoadingMessage>;
  }

  if (error) {
    return <ErrorMessage>Error: {error}</ErrorMessage>;
  }

  if (filteredVacancies.length === 0) {
    return (
      <EmptyMessage>
        {currentCity || currentCategory
          ? 'No vacancies found matching your criteria'
          : 'No vacancies available at the moment'}
      </EmptyMessage>
    );
  }

  return (
    <Container>
      <StatsContainer>
        <StatItem>
          <StatLabel>Total Vacancies:</StatLabel>
          <StatValue>{stats.total}</StatValue>
        </StatItem>
        {currentCity && (
          <StatItem>
            <StatLabel>Vacancies in {currentCity.name}:</StatLabel>
            <StatValue>{stats.byCity[currentCity.id] || 0}</StatValue>
          </StatItem>
        )}
        {currentCategory && (
          <StatItem>
            <StatLabel>Vacancies in {currentCategory.name}:</StatLabel>
            <StatValue>{stats.byCategory[currentCategory.id] || 0}</StatValue>
          </StatItem>
        )}
      </StatsContainer>

      <Grid>
        {filteredVacancies.map((vacancy) => (
          <VacancyCard
            key={vacancy.id}
            onClick={() => handleVacancyClick(vacancy)}
          >
            <Title>{vacancy.title}</Title>
            <Company>{vacancy.company}</Company>
            <Salary>{vacancy.salary}</Salary>
            <Location>{vacancy.city?.name || 'Location not specified'}</Location>
            {vacancy.tags && vacancy.tags.length > 0 && (
              <Tags>
                {vacancy.tags.map((tag, index) => (
                  <Tag key={`${vacancy.id}-tag-${index}`}>{tag}</Tag>
                ))}
              </Tags>
            )}
          </VacancyCard>
        ))}
      </Grid>
    </Container>
  );
};

const StatsContainer = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
  padding: 1rem;
  background: #f5f5f5;
  border-radius: 8px;
`;

const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StatLabel = styled.div`
  font-size: 0.875rem;
  color: #666;
  margin-bottom: 0.25rem;
`;

const StatValue = styled.div`
  font-size: 1.25rem;
  font-weight: 500;
  color: #1976d2;
`;

export default VacancyList; 