import React from 'react';
import { useNavigate } from 'react-router-dom';
import { EmptyMessage, ErrorMessage, LoadingMessage } from '../../components/common/Messages';
import { ROUTES } from '../../constants/routes';
import { useVacancyStore } from '../../store/vacancyStore';
import { VacancyCard } from '../VacancyCard';

/**
 * Контейнер для списка вакансий
 * @component
 */
const Container = styled.div`
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding: clamp(1rem, 5vw, 2rem);
`;

/**
 * Сетка для отображения карточек вакансий
 * @component
 */
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  width: 100%;
`;

/**
 * Заголовок вакансии
 * @component
 */
const Title = styled.h2`
  font-size: 1.25rem;
  color: #333;
  margin-bottom: 0.5rem;
`;

/**
 * Название компании
 * @component
 */
const Company = styled.div`
  font-size: 1rem;
  color: #666;
  margin-bottom: 0.5rem;
`;

/**
 * Зарплата
 * @component
 */
const Salary = styled.div`
  font-size: 1.125rem;
  color: #1976d2;
  font-weight: 500;
  margin-bottom: 1rem;
`;

/**
 * Местоположение
 * @component
 */
const Location = styled.div`
  font-size: 0.875rem;
  color: #666;
  margin-bottom: 0.5rem;
`;

/**
 * Контейнер для тегов
 * @component
 */
const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
`;

/**
 * Тег вакансии
 * @component
 */
const Tag = styled.span`
  background: #e3f2fd;
  color: #1976d2;
  padding: 0.25rem 0.75rem;
  border-radius: 16px;
  font-size: 0.875rem;
`;

/**
 * Сообщение о загрузке
 * @component
 */
const LoadingMessage = styled.div`
  text-align: center;
  padding: 2rem;
  font-size: 1.25rem;
  color: #666;
`;

/**
 * Сообщение об ошибке
 * @component
 */
const ErrorMessage = styled.div`
  text-align: center;
  padding: 2rem;
  font-size: 1.25rem;
  color: #d32f2f;
`;

/**
 * Сообщение об отсутствии вакансий
 * @component
 */
const EmptyMessage = styled.div`
  text-align: center;
  padding: 2rem;
  font-size: 1.25rem;
  color: #666;
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
  const navigate = useNavigate();
  const { vacancies, loading, error } = useVacancyStore();

  const handleVacancyClick = (vacancyId: number) => {
    navigate(`${ROUTES.VACANCIES}/${vacancyId}`);
  };

  if (loading) {
    return <LoadingMessage>Loading vacancies...</LoadingMessage>;
  }

  if (error) {
    return <ErrorMessage>Error: {error}</ErrorMessage>;
  }

  if (vacancies.length === 0) {
    return (
      <EmptyMessage>
        No vacancies available at the moment
      </EmptyMessage>
    );
  }

  return (
    <Container>
      <StatsContainer>
        <StatItem>
          <StatLabel>Total Vacancies:</StatLabel>
          <StatValue>{vacancies.length}</StatValue>
        </StatItem>
      </StatsContainer>

      <Grid>
        {vacancies.map((vacancy) => (
          <VacancyCard
            key={vacancy.id}
            vacancy={vacancy}
            onClick={() => handleVacancyClick(vacancy.id)}
          />
        ))}
      </Grid>
    </Container>
  );
};

/**
 * Контейнер для статистики
 * @component
 */
const StatsContainer = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
  padding: 1rem;
  background: #f5f5f5;
  border-radius: 8px;
`;

/**
 * Элемент статистики
 * @component
 */
const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

/**
 * Метка статистики
 * @component
 */
const StatLabel = styled.div`
  font-size: 0.875rem;
  color: #666;
  margin-bottom: 0.25rem;
`;

/**
 * Значение статистики
 * @component
 */
const StatValue = styled.div`
  font-size: 1.25rem;
  font-weight: 500;
  color: #1976d2;
`;

export default VacancyList; 