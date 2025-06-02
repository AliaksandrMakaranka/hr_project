import React from 'react';
import CategoriesGrid from '@features/categories/CategoriesGrid';
import { Container } from './styles';

const CategoriesPage: React.FC = () => {
  return (
    <Container>
      <CategoriesGrid />
    </Container>
  );
};

export default CategoriesPage; 