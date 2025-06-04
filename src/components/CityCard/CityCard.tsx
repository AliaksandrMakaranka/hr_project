import React from 'react';
import { Link } from 'react-router-dom';
import { City } from '../../types/city';
import { ROUTES } from '../../constants/routes';
import {
  Card,
  CardContent,
  CardTitle,
  VacancyCount,
  CardLink
} from './styles';

interface CityCardProps {
  city: City;
  testId?: string;
}

export const CityCard: React.FC<CityCardProps> = ({ city, testId }) => {
  const { id, name, vacanciesCount = 0 } = city;

  return (
    <Card data-testid={testId}>
      <CardContent>
        <CardTitle>{name}</CardTitle>
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
      </CardContent>
    </Card>
  );
};

const getVacancyText = (count: number): string => {
  if (count === 0) return 'вакансий';
  if (count === 1) return 'вакансия';
  if (count < 5) return 'вакансии';
  return 'вакансий';
}; 