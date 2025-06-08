import { calculateSalary } from '@utils/salaryUtils';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { EmptyMessage, ErrorMessage, LoadingMessage } from '../../components/common/Messages';
import { ROUTES } from '../../constants/routes';
import { jobCategories } from '../../data/categories/index';
import { VacancyStore } from '../../store/vacancyStore';
import type { VacancyFilters } from '../../types/api';
import type { City } from '../../types/city';
import type { Vacancy } from '../../types/vacancy';
import {
  ApplyButton,
  BackButton,
  Container,
  FilterGroup,
  FilterLabel,
  FilterSelect,
  Filters,
  NoResults,
  SearchInput,
  Title,
  VacanciesGrid,
  VacancyCard,
  VacancyCompany,
  VacancyDescription,
  VacancyDetails,
  VacancyHeader,
  VacancyInfo,
  VacancyInfoRow,
  VacancyLocation,
  VacancySalary,
  VacancyTitle
} from './styles';

const VacancyDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [store] = useState(() => new VacancyStore());
  const [vacancy, setVacancy] = useState<Vacancy | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVacancy = async () => {
      if (!id) return;

      setLoading(true);
      setError(null);

      try {
        const vacancyData = await store.repository.getVacancyById(parseInt(id));
        setVacancy(vacancyData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Не удалось загрузить вакансию');
      } finally {
        setLoading(false);
      }
    };

    fetchVacancy();
  }, [id, store.repository]);

  if (loading) {
    return (
      <Container>
        <LoadingMessage>Загрузка вакансии...</LoadingMessage>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <ErrorMessage>
          <h3>Произошла ошибка</h3>
          <p>{error}</p>
          <button
            onClick={() => navigate(-1)}
            style={{
              padding: '0.5rem 1rem',
              marginTop: '1rem',
              backgroundColor: '#4a90e2',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Вернуться назад
          </button>
        </ErrorMessage>
      </Container>
    );
  }

  if (!vacancy) {
    return (
      <Container>
        <EmptyMessage>
          <h3>Вакансия не найдена</h3>
          <p>Возможно, вакансия была удалена или перемещена</p>
          <button
            onClick={() => navigate(-1)}
            style={{
              padding: '0.5rem 1rem',
              marginTop: '1rem',
              backgroundColor: '#4a90e2',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Вернуться назад
          </button>
        </EmptyMessage>
      </Container>
    );
  }

  const salaryData = calculateSalary(vacancy.salaryPerHour, vacancy.currency);
  const formattedSalary = salaryData ? `${salaryData.hourly} (Брутто)` : 'Зарплата не указана';

  return (
    <Container>
      <BackButton onClick={() => navigate(-1)}>← Назад</BackButton>

      <VacancyDetails>
        <VacancyHeader>
          <VacancyTitle>{vacancy.title}</VacancyTitle>
          <VacancyCompany>{vacancy.company}</VacancyCompany>
        </VacancyHeader>

        <VacancyInfo>
          <VacancyInfoRow>
            <span>Город:</span>
            <span>{vacancy.city?.name || 'Не указан'}</span>
          </VacancyInfoRow>
          <VacancyInfoRow>
            <span>Зарплата:</span>
            <span>{formattedSalary}</span>
          </VacancyInfoRow>
          <VacancyInfoRow>
            <span>Тип занятости:</span>
            <span>{vacancy.employmentType || 'Не указан'}</span>
          </VacancyInfoRow>
          <VacancyInfoRow>
            <span>Категория:</span>
            <span>{vacancy.category?.name || 'Не указана'}</span>
          </VacancyInfoRow>
        </VacancyInfo>

        <VacancyDescription>
          <h3>Описание вакансии</h3>
          <p>{vacancy.description || 'Описание отсутствует'}</p>
        </VacancyDescription>

        <ApplyButton onClick={() => store.applyForVacancy(vacancy.id)}>
          Откликнуться на вакансию
        </ApplyButton>
      </VacancyDetails>
    </Container>
  );
};

const VacanciesPage: React.FC = () => {
  const navigate = useNavigate();
  const [store] = useState(() => new VacancyStore());
  const { items: vacancies, filters, loading, error } = store.state;

  useEffect(() => {
    store.fetchVacancies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(filters)]);

  const categories = jobCategories;
  const cities = Array.from(
    new Map(
      vacancies
        .filter((v: typeof vacancies[number]): v is typeof v & { city: City } => v.city !== undefined)
        .filter((v: typeof vacancies[number]) => v.city !== undefined)
        .map((v: typeof vacancies[number]) => [v.city!.id, v.city!])
    ).values()
  ) as City[];

  const setFilters = (newFilters: Partial<VacancyFilters>) => {
    store.setFilters(newFilters);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ searchTerm: e.target.value, page: 1 });
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters({ categoryId: e.target.value ? parseInt(e.target.value) : undefined, page: 1 });
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters({ cityId: e.target.value ? parseInt(e.target.value) : undefined, page: 1 });
  };

  const handleEmploymentTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters({ employmentType: e.target.value || undefined, page: 1 });
  };

  const handleSalaryFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setFilters({ salaryFrom: isNaN(value) ? undefined : value, page: 1 });
  };

  const handleSalaryToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setFilters({ salaryTo: isNaN(value) ? undefined : value, page: 1 });
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters({ sortBy: e.target.value as VacancyFilters['sortBy'] || undefined, page: 1 });
  };

  const handleSortOrderChange = () => {
    const currentSortOrder = filters.sortOrder;
    const newSortOrder = currentSortOrder === 'asc' ? 'desc' : 'asc';
    setFilters({
      sortOrder: newSortOrder,
      page: 1,
    });
  };

  const displayedVacancies = vacancies;

  const employmentTypeOptions = [
    { value: 'full-time', label: 'Полная занятость' },
    { value: 'part-time', label: 'Частичная занятость' },
    { value: 'contract', label: 'Контракт' },
    { value: 'temporary', label: 'Временная работа' },
  ];

  const sortByOptions = [
    { value: 'date', label: 'Дата' },
    { value: 'salary', label: 'Зарплата' },
  ];

  if (loading) {
    return (
      <Container>
        <Title>Вакансии</Title>
        <LoadingMessage>Загрузка вакансий...</LoadingMessage>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Title>Вакансии</Title>
        <ErrorMessage>
          <h3>Произошла ошибка</h3>
          <p>{error}</p>
          <button
            onClick={() => store.fetchVacancies()}
            style={{
              padding: '0.5rem 1rem',
              marginTop: '1rem',
              backgroundColor: '#4a90e2',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Попробовать снова
          </button>
        </ErrorMessage>
      </Container>
    );
  }

  if (vacancies.length === 0) {
    return (
      <Container>
        <Title>Вакансии</Title>
        <EmptyMessage>
          <h3>Вакансии не найдены</h3>
          <p>Попробуйте изменить параметры поиска или выбрать другой город</p>
        </EmptyMessage>
      </Container>
    );
  }

  return (
    <Container>
      <Title>Вакансии</Title>

      <Filters>
        <FilterGroup>
          <FilterLabel>Поиск</FilterLabel>
          <SearchInput
            type="text"
            placeholder="Поиск по названию, компании или описанию"
            value={filters.searchTerm || ''}
            onChange={handleSearch}
          />
        </FilterGroup>

        <FilterGroup>
          <FilterLabel>Категория</FilterLabel>
          <FilterSelect
            value={filters.categoryId?.toString() || ''}
            onChange={handleCategoryChange}
          >
            <option value="">Все категории</option>
            {categories.map(category => (
              <option key={category.id} value={category.id.toString()}>{category.name}</option>
            ))}
          </FilterSelect>
        </FilterGroup>

        <FilterGroup>
          <FilterLabel>Город</FilterLabel>
          <FilterSelect
            value={filters.cityId?.toString() || ''}
            onChange={handleCityChange}
          >
            <option value="">Все города</option>
            {cities.map((city: City) => (
              <option key={city.id} value={city.id.toString()}>{city.name}</option>
            ))}
          </FilterSelect>
        </FilterGroup>

        <FilterGroup>
          <FilterLabel>Тип занятости</FilterLabel>
          <FilterSelect
            value={filters.employmentType || ''}
            onChange={handleEmploymentTypeChange}
          >
            <option value="">Любой</option>
            {employmentTypeOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </FilterSelect>
        </FilterGroup>

        <FilterGroup>
          <FilterLabel>Зарплата (PLN)</FilterLabel>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <SearchInput
              type="number"
              placeholder="от"
              value={filters.salaryFrom?.toString() || ''}
              onChange={handleSalaryFromChange}
              style={{ width: '80px' }}
            />
            <SearchInput
              type="number"
              placeholder="до"
              value={filters.salaryTo?.toString() || ''}
              onChange={handleSalaryToChange}
              style={{ width: '80px' }}
            />
          </div>
        </FilterGroup>

        <FilterGroup>
          <FilterLabel>Сортировка</FilterLabel>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FilterSelect
              value={filters.sortBy || ''}
              onChange={handleSortChange}
            >
              <option value="">По умолчанию</option>
              {sortByOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </FilterSelect>
            <button
              onClick={handleSortOrderChange}
              style={{
                padding: '0.5rem',
                border: '1px solid #d1d5db',
                borderRadius: '4px',
                backgroundColor: '#f3f4f6',
                cursor: 'pointer'
              }}
            >
              {filters.sortOrder === 'desc' ? '↓' : '↑'}
            </button>
          </div>
        </FilterGroup>
      </Filters>

      {!loading && !error && displayedVacancies.length > 0 ? (
        <VacanciesGrid>
          {displayedVacancies.map((vacancy: typeof vacancies[number], index: number) => {
            const salaryData = calculateSalary(vacancy.salaryPerHour, vacancy.currency);
            const formattedSalary = salaryData ? `${salaryData.hourly} (Брутто)` : 'Зарплата не указана';

            return (
              <motion.div
                key={vacancy.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <VacancyCard onClick={() => navigate(ROUTES.VACANCY(vacancy.id))}>
                  <VacancyTitle>{vacancy.title}</VacancyTitle>
                  <VacancyCompany>{vacancy.company}</VacancyCompany>
                  <VacancyLocation>{vacancy.city?.name || 'Город не указан'}</VacancyLocation>
                  <VacancySalary>{formattedSalary}</VacancySalary>
                  <VacancyDescription>{vacancy.description}</VacancyDescription>
                </VacancyCard>
              </motion.div>
            );
          })}
        </VacanciesGrid>
      ) : (!loading && !error && (
        <NoResults>
          <h3>Вакансии не найдены</h3>
          <p>Попробуйте изменить параметры поиска</p>
        </NoResults>
      ))}
    </Container>
  );
};

export { VacanciesPage, VacancyDetailsPage };
