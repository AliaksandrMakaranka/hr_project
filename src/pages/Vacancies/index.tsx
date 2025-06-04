import React, { useMemo } from 'react';
import type { ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ROUTES } from '../../constants/routes';
import type { City } from '../../types/city';
import { jobCategories } from '../../data/categories/index';
import {
  Container,
  Title,
  Filters,
  FilterGroup,
  FilterLabel,
  FilterSelect,
  SearchInput,
  VacanciesGrid,
  VacancyCard,
  VacancyTitle,
  VacancyCompany,
  VacancyLocation,
  VacancySalary,
  VacancyDescription,
  NoResults
} from './styles';
import { useVacancyStore } from '../../store/vacancyStore';
import type { VacancyFilters } from '../../types/api';

const VacanciesPage: React.FC = () => {
  const navigate = useNavigate();

  const { 
    vacancies,
    filters,
    loading,
    error,
    setFilters,
    fetchVacancies,
  } = useVacancyStore();

  React.useEffect(() => {
    fetchVacancies();
  }, [fetchVacancies]);

  const categories = useMemo(() => jobCategories, []);
  const cities = useMemo(() => {
    const uniqueCities = Array.from(
      new Map(
        vacancies
          .filter((v): v is typeof v & { city: City } => v.city !== undefined)
          .map(v => [v.city.id, v.city])
      ).values()
    );
    return uniqueCities;
  }, [vacancies]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilters({ searchTerm: e.target.value, page: 1 });
  };

  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFilters({ category: e.target.value || undefined, page: 1 });
  };

  const handleCityChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFilters({ city: e.target.value || undefined, page: 1 });
  };

  const handleEmploymentTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFilters({ employmentType: e.target.value || undefined, page: 1 });
  };

  const handleSalaryFromChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    setFilters({ salaryFrom: isNaN(value) ? undefined : value, page: 1 });
  };

  const handleSalaryToChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    setFilters({ salaryTo: isNaN(value) ? undefined : value, page: 1 });
  };

  const handleSortByChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFilters({ sortBy: e.target.value as VacancyFilters['sortBy'] || undefined, page: 1 });
  };

  const handleSortOrderToggle = () => {
    const currentSortOrder = filters.sortOrder;
    const newSortOrder = currentSortOrder === 'asc' ? 'desc' : 'asc';
    setFilters({ 
      sortOrder: newSortOrder,
      page: 1
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
            onChange={handleSearchChange}
          />
        </FilterGroup>

        <FilterGroup>
          <FilterLabel>Категория</FilterLabel>
          <FilterSelect
            value={filters.category || ''}
            onChange={handleCategoryChange}
          >
            <option value="">Все категории</option>
            {categories.map(category => (
              <option key={category.id} value={category.name}>{category.name}</option>
            ))}
          </FilterSelect>
        </FilterGroup>

        <FilterGroup>
          <FilterLabel>Город</FilterLabel>
          <FilterSelect
            value={filters.city || ''}
            onChange={handleCityChange}
          >
            <option value="">Все города</option>
            {cities.map(city => (
              <option key={city.id} value={city.name}>{city.name}</option>
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
              value={filters.salaryFrom || ''}
              onChange={handleSalaryFromChange}
              style={{ width: '80px' }}
            />
            <SearchInput
              type="number"
              placeholder="до"
              value={filters.salaryTo || ''}
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
              onChange={handleSortByChange}
            >
              <option value="">По умолчанию</option>
              {sortByOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </FilterSelect>
            <button
              onClick={handleSortOrderToggle}
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

      {loading && <p>Загрузка вакансий...</p>}
      {error && <p style={{ color: 'red' }}>Ошибка загрузки: {error}</p>}

      {!loading && !error && displayedVacancies.length > 0 ? (
        <VacanciesGrid>
          {displayedVacancies.map((vacancy, index) => (
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
                <VacancySalary>{vacancy.salary}</VacancySalary>
                <VacancyDescription>{vacancy.description}</VacancyDescription>
              </VacancyCard>
            </motion.div>
          ))}
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

export default VacanciesPage; 