import React from 'react';
import CategoryCard from '../CategoryCard';
import { jobCategories as categories } from '../../data/categories/index';
import { Container, Grid, Title } from './styles';

const CategoriesGrid: React.FC = () => {
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