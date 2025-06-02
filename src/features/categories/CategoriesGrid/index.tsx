import React, { useEffect, useState, useMemo } from 'react';
import CategoryCard from '../CategoryCard';
import { Container, Grid, Title } from './styles';
import { CategoriesRepository } from '../../../api';
import type { JobCategory } from '../../../types';
import { logger } from '../../../utils/logger';

const CategoriesGrid: React.FC = () => {
  const [categories, setCategories] = useState<JobCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const categoriesRepository = useMemo(() => new CategoriesRepository(), []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await categoriesRepository.getAll();
        setCategories(data.items);
      } catch (err) {
        logger.error('Error fetching categories', { error: err });
        setError('Failed to load categories');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [categoriesRepository]);

  if (loading) {
    return (
      <Container>
        <Title>Loading...</Title>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Title>Error</Title>
        <p>{error}</p>
      </Container>
    );
  }

  return (
    <Container>
      <Title>Категории вакансий</Title>
      <Grid>
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </Grid>
    </Container>
  );
};

export default CategoriesGrid; 