import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Banner = styled(motion.div)`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #2c3e50;
  color: #fff;
  padding: 1rem;
  z-index: 1000;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 0.75rem;
  }
`;

export const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

export const Text = styled.p`
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.4;
  flex: 1;
`;

export const Buttons = styled.div`
  display: flex;
  gap: 1rem;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
  }
`;

export const Button = styled.button`
  background-color: #f1c40f;
  color: #2c3e50;
  border: none;
  padding: 0.5rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f39c12;
  }

  @media (max-width: 768px) {
    padding: 0.5rem 1rem;
  }
`;

export const SettingsButton = styled(Button)`
  background-color: transparent;
  border: 1px solid #f1c40f;
  color: #f1c40f;

  &:hover {
    background-color: rgba(241, 196, 15, 0.1);
  }
`;

export const Link = styled.a`
  color: #f1c40f;
  text-decoration: none;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
`; 