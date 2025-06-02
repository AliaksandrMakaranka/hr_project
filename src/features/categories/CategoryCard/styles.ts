import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Card = styled.div`
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  transition: transform 0.2s, box-shadow 0.2s;
  display: flex;
  flex-direction: column;
  height: 100%;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

export const Icon = styled.div`
  width: 64px;
  height: 64px;
  margin-bottom: 1rem;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

export const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const Title = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #2c3e50;
  margin: 0 0 0.5rem;
`;

export const Description = styled.p`
  font-size: 0.9rem;
  color: #666;
  margin: 0 0 1rem;
  line-height: 1.4;
  flex: 1;
`;

export const Button = styled(Link)`
  display: inline-block;
  background-color: #f1c40f;
  color: #2c3e50;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 500;
  text-align: center;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f39c12;
  }
`; 