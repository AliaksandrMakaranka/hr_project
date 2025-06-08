import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ROUTES } from '../../constants/routes';
import { City } from '../../types/city';

const Card = styled.div`
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: translateY(-2px);
  }
`;

const Title = styled.h3`
  margin: 0 0 0.5rem;
  font-size: 1.25rem;
  color: #333;
`;

const VacancyCount = styled.div`
  color: #666;
  font-size: 0.875rem;
`;

const CardLink = styled.a`
  display: block;
  margin-top: 1rem;
  text-align: center;
  padding: 0.75rem 1rem;
  background-color: #007bff;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #0056b3;
  }
`;

interface CityCardProps {
  city: City;
  testId?: string;
}

export function CityCard({ city, testId }: CityCardProps) {
  const { id, name, vacanciesCount = 0 } = city;

  return (
    <Card data-testid={testId}>
      <Title>{name}</Title>
      <VacancyCount>
        {vacanciesCount} {getVacancyText(vacanciesCount)}
      </VacancyCount>
      <CardLink
        as={Link}
        to={`${ROUTES.VACANCIES}?cityId=${id}`}
        data-testid={`${testId}-link`}
      >
        Смотреть вакансии
      </CardLink>
    </Card>
  );
}

const getVacancyText = (count: number): string => {
  if (count === 0) return 'вакансий';
  if (count === 1) return 'вакансия';
  if (count < 5) return 'вакансии';
  return 'вакансий';
}; 