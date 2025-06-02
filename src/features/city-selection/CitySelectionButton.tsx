import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@constants/routes';
import { Button } from './styles';

const CitySelectionButton: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(ROUTES.CITIES);
  };

  return (
    <Button onClick={handleClick}>
      Выбрать город
    </Button>
  );
};

export default CitySelectionButton; 