import React from 'react';
import CategoriesGrid from '../../components/CategoriesGrid';
import { Container } from './styles';

const CategoriesPage: React.FC = () => {
  return (
    <Container>
      <CategoriesGrid />
    </Container>
  );
};

export default CategoriesPage; 