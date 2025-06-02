import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@constants/routes';
import type { JobCategory } from '../../../types';
import {
  Card,
  Icon,
  Content,
  Title,
  Description,
  Button
} from './styles';

interface CategoryCardProps {
  category: JobCategory;
  onClick?: () => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <Card onClick={handleClick}>
      <Icon>
        <img src={`/icons/${category.icon}.svg`} alt={category.title} />
      </Icon>
      <Content>
        <Title>{category.title}</Title>
        <Description>{category.description}</Description>
        <Button as={Link} to={ROUTES.CATEGORY(category.id)}>
          Смотреть вакансии
        </Button>
      </Content>
    </Card>
  );
};

export default CategoryCard; 