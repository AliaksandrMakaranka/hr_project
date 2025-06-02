import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  height: 80px;
  background: #000;
  position: sticky;
  top: 0;
  z-index: 999;
`;

export const Logo = styled(Link)`
  color: #fff;
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration: none;
`;

export const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavLink = styled(Link)<{ $active?: boolean }>`
  color: #fff;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-bottom: ${props => props.$active ? '2px solid #01bf71' : 'none'};

  &:hover {
    color: #01bf71;
  }
`;

export const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: #fff;
  font-size: 1.5rem;
  cursor: pointer;

  @media screen and (max-width: 768px) {
    display: block;
  }
`;

export const MobileMenu = styled.div<{ $isOpen: boolean }>`
  display: ${props => props.$isOpen ? 'flex' : 'none'};
  flex-direction: column;
  position: absolute;
  top: 80px;
  left: 0;
  right: 0;
  background: #000;
  padding: 1rem;
  gap: 1rem;

  @media screen and (min-width: 769px) {
    display: none;
  }
`;

export const MobileNavLink = styled(Link)<{ $active?: boolean }>`
  color: #fff;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-bottom: ${props => props.$active ? '2px solid #01bf71' : 'none'};

  &:hover {
    color: #01bf71;
  }
`; 