import React from 'react';
import styled from 'styled-components';
import { Vacancy } from '../../types';

interface VacancyCardProps {
    vacancy: Vacancy;
    onClick?: () => void;
}

const Card = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
`;

const Title = styled.h3`
  font-size: 1.25rem;
  color: #333;
  margin-bottom: 0.5rem;
`;

const Company = styled.div`
  font-size: 1rem;
  color: #666;
  margin-bottom: 0.5rem;
`;

const Salary = styled.div`
  font-size: 1.125rem;
  color: #1976d2;
  font-weight: 500;
  margin-bottom: 1rem;
`;

const Location = styled.div`
  font-size: 0.875rem;
  color: #666;
  margin-bottom: 0.5rem;
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const Tag = styled.span`
  background: #e3f2fd;
  color: #1976d2;
  padding: 0.25rem 0.75rem;
  border-radius: 16px;
  font-size: 0.875rem;
`;

export const VacancyCard: React.FC<VacancyCardProps> = ({ vacancy, onClick }) => {
    return (
        <Card onClick={onClick}>
            <Title>{vacancy.title}</Title>
            <Company>{vacancy.company}</Company>
            <Salary>{vacancy.salary}</Salary>
            <Location>{vacancy.location?.address}</Location>
            {vacancy.tags && vacancy.tags.length > 0 && (
                <Tags>
                    {vacancy.tags.map((tag, index) => (
                        <Tag key={index}>{tag}</Tag>
                    ))}
                </Tags>
            )}
        </Card>
    );
}; 