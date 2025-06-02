import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface CityCardProps {
  name: string;
  vacanciesCount: number;
  imageUrl: string;
  to: string;
}

const Card = styled(Link)`
  background: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.card};
  overflow: hidden;
  text-decoration: none;
  transition: transform ${({ theme }) => theme.transitions.default},
              box-shadow ${({ theme }) => theme.transitions.default};
  box-shadow: ${({ theme }) => theme.shadows.card};

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadows.cardHover};
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 200px;
  overflow: hidden;
  position: relative;
`;

const CityImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform ${({ theme }) => theme.transitions.default};

  ${Card}:hover & {
    transform: scale(1.05);
  }
`;

const Content = styled.div`
  padding: 1rem;
`;

const CityName = styled.h2`
  font-size: clamp(1.25rem, 3vw, 1.5rem);
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.3;
`;

const VacancyCount = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 1rem;
`;

const CityCard: React.FC<CityCardProps> = ({ name, vacanciesCount, imageUrl, to }) => {
  return (
    <Card to={to}>
      <ImageContainer>
        <CityImage src={imageUrl} alt={name} />
      </ImageContainer>
      <Content>
        <CityName>{name}</CityName>
        <VacancyCount>{vacanciesCount} вакансий</VacancyCount>
      </Content>
    </Card>
  );
};

export default CityCard;