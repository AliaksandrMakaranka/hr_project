import React, { useState } from 'react';
import type { ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ROUTES } from '../../constants/routes';
import { vacancies } from '../../data/vacancies';
import type { JobCategory } from '../../types/jobCategory';
import type { City } from '../../types/city';
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

const VacanciesPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  // Получаем уникальные категории и города
  const categories = Array.from(
    new Map(
      vacancies
        .filter((v): v is typeof v & { category: JobCategory } => v.category !== undefined)
        .map(v => [v.category.id, v.category])
    ).values()
  );
  
  const cities = Array.from(
    new Map(
      vacancies
        .filter((v): v is typeof v & { city: City } => v.city !== undefined)
        .map(v => [v.city.id, v.city])
    ).values()
  );

  const filteredVacancies = vacancies.filter(vacancy => {
    const matchesSearch = vacancy.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vacancy.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vacancy.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = !selectedCategory || 
      (vacancy.category && String(vacancy.category.id) === selectedCategory);
    
    const matchesCity = !selectedCity || 
      (vacancy.city && String(vacancy.city.id) === selectedCity);
    
    return matchesSearch && matchesCategory && matchesCity;
  });

  return (
    <Container>
      <Title>Вакансии</Title>

      <Filters>
        <FilterGroup>
          <FilterLabel>Поиск</FilterLabel>
          <SearchInput
            type="text"
            placeholder="Поиск по названию, компании или описанию"
            value={searchQuery}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
          />
        </FilterGroup>

        <FilterGroup>
          <FilterLabel>Категория</FilterLabel>
          <FilterSelect
            value={selectedCategory}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => setSelectedCategory(e.target.value)}
          >
            <option value="">Все категории</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </FilterSelect>
        </FilterGroup>

        <FilterGroup>
          <FilterLabel>Город</FilterLabel>
          <FilterSelect
            value={selectedCity}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => setSelectedCity(e.target.value)}
          >
            <option value="">Все города</option>
            {cities.map(city => (
              <option key={city.id} value={city.id}>{city.name}</option>
            ))}
          </FilterSelect>
        </FilterGroup>
      </Filters>

      {filteredVacancies.length > 0 ? (
        <VacanciesGrid>
          {filteredVacancies.map((vacancy, index) => (
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
      ) : (
        <NoResults>
          <h3>Вакансии не найдены</h3>
          <p>Попробуйте изменить параметры поиска</p>
        </NoResults>
      )}
    </Container>
  );
};

export default VacanciesPage; 