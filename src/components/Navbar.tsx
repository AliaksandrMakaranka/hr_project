import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const NavContainer = styled.nav`
  background: #1976d2;
  padding: 1rem;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
  position: relative;
`;

const Brand = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: clamp(1.25rem, 4vw, 1.5rem);
  font-weight: bold;
  z-index: 2;
`;

const NavLinks = styled.div<{ isOpen: boolean }>`
  display: flex;
  gap: 1.25rem;
  align-items: center;

  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
    width: 100%;
    background: #1976d2;
    flex-direction: column;
    justify-content: center;
    transform: translateX(${({ isOpen }) => (isOpen ? '0' : '100%')});
    transition: transform 0.3s ease-in-out;
    z-index: 1;
  }
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: clamp(1rem, 3vw, 1.125rem);
  
  &:hover {
    text-decoration: underline;
  }
`;

const MenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 2;

  @media (max-width: 768px) {
    display: block;
  }
`;

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <NavContainer>
      <Brand to="/">HR Company</Brand>
      <MenuButton onClick={toggleMenu}>
        {isMenuOpen ? '✕' : '☰'}
      </MenuButton>
      <NavLinks isOpen={isMenuOpen}>
        <NavLink to="/" onClick={() => setIsMenuOpen(false)}>Главная</NavLink>
        <NavLink to="/cities" onClick={() => setIsMenuOpen(false)}>Города</NavLink>
        <NavLink to="/about" onClick={() => setIsMenuOpen(false)}>О компании</NavLink>
      </NavLinks>
    </NavContainer>
  );
};

export default Navbar; 