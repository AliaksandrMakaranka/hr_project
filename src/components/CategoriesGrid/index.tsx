import React, { useEffect, useState } from 'react';
import CategoryCard from '../CategoryCard';
import { Container, Grid, Title } from './styles';
import { CategoriesRepository } from '../../api';
import type { JobCategory } from '../../types/jobCategory';
import { logger } from '../../utils/logger';

const CategoriesGrid: React.FC = () => {
  const [categories, setCategories] = useState<JobCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const categoriesRepository = new CategoriesRepository();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await categoriesRepository.getAll();
        setCategories(categoriesData);
      } catch (err) {
        logger.error('Error fetching categories', { error: err });
        setError('Failed to load categories');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

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