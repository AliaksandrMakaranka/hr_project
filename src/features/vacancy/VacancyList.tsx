import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { VacancyCard } from '../../components/VacancyCard';
import { EmptyMessage, ErrorMessage, LoadingMessage } from '../../components/common/Messages';
import { ROUTES } from '../../constants/routes';
import { VacancyStore } from '../../store/vacancyStore';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
  padding: 1rem;
`;

/**
 * Компонент списка вакансий.
 * Отображает сетку карточек вакансий с возможностью фильтрации по городу и категории.
 * Включает статистику по количеству вакансий.
 * 
 * @component
 * @returns {JSX.Element} Компонент списка вакансий
 * 
 * @example
 * ```tsx
 * <VacancyList />
 * ```
 */
const VacancyList: React.FC = () => {
  const [store] = useState(() => new VacancyStore());
  const { items: vacancies, loading, error } = store.state;
  const navigate = useNavigate();

  useEffect(() => {
    store.fetchVacancies();
  }, [store]);

  const handleVacancyClick = (vacancyId: number) => {
    navigate(`${ROUTES.VACANCIES}/${vacancyId}`);
  };

  if (loading) {
    return <LoadingMessage>Loading vacancies...</LoadingMessage>;
  }

  if (error) {
    return <ErrorMessage>Error: {error}</ErrorMessage>;
  }

  if (!vacancies.length) {
    return (
      <EmptyMessage>
        No vacancies available at the moment
      </EmptyMessage>
    );
  }

  return (
    <Grid>
      {vacancies.map((vacancy) => (
        <VacancyCard
          key={vacancy.id}
          vacancy={vacancy}
          onClick={() => handleVacancyClick(vacancy.id)}
        />
      ))}
    </Grid>
  );
};

export default VacancyList; 