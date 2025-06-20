import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ROUTES } from '@constants/routes';
import {
  Container,
  Logo,
  NavLinks,
  NavLink,
  MobileMenuButton,
  MobileMenu,
  MobileNavLink,
  LeftSection,
  RightSection
} from './styles';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Container>
      <LeftSection>
        <Logo to={ROUTES.HOME}>HR Company</Logo>
      </LeftSection>
      <RightSection>
        <NavLinks>
          <NavLink to={ROUTES.HOME} $active={location.pathname === ROUTES.HOME}>
            Home
          </NavLink>
          <NavLink to={ROUTES.VACANCIES} $active={location.pathname === ROUTES.VACANCIES}>
            Vacancies
          </NavLink>
          <NavLink to={ROUTES.CITIES} $active={location.pathname === ROUTES.CITIES}>
            Выбрать город
          </NavLink>
          <NavLink to={ROUTES.ABOUT} $active={location.pathname === ROUTES.ABOUT}>
            About
          </NavLink>
          <NavLink to={ROUTES.CONTACT} $active={location.pathname === ROUTES.CONTACT}>
            Contact
          </NavLink>
        </NavLinks>
        <MobileMenuButton onClick={toggleMenu}>
          {isOpen ? '✕' : '☰'}
        </MobileMenuButton>
        <MobileMenu $isOpen={isOpen}>
          <MobileNavLink to={ROUTES.HOME} $active={location.pathname === ROUTES.HOME}>
            Home
          </MobileNavLink>
          <MobileNavLink to={ROUTES.VACANCIES} $active={location.pathname === ROUTES.VACANCIES}>
            Vacancies
          </MobileNavLink>
          <MobileNavLink to={ROUTES.CITIES} $active={location.pathname === ROUTES.CITIES}>
            Выбрать город
          </MobileNavLink>
          <MobileNavLink to={ROUTES.ABOUT} $active={location.pathname === ROUTES.ABOUT}>
            About
          </MobileNavLink>
          <MobileNavLink to={ROUTES.CONTACT} $active={location.pathname === ROUTES.CONTACT}>
            Contact
          </MobileNavLink>
        </MobileMenu>
      </RightSection>
    </Container>
  );
};

export default Navbar; 