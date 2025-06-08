import React, { useEffect, useMemo, useState } from 'react';
import { CategoriesRepository } from '../../../api';
import type { JobCategory } from '../../../types';
import CategoryCard from '../CategoryCard';
import { Container, Grid, Title } from './styles';

const CategoriesGrid: React.FC = () => {
  const [categories, setCategories] = useState<JobCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const categoriesRepository = useMemo(() => new CategoriesRepository(), []);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      setError(null);
      try {
        const categories = await categoriesRepository.getAll();
        setCategories(categories);
      } catch {
        setError('Failed to fetch categories');
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