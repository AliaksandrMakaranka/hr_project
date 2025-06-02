import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ROUTES } from '../../../constants/routes';
import {
  Container,
  Nav,
  Logo,
  NavLinks,
  NavLink,
  MobileMenuButton,
  MobileMenu,
  MobileNavLink
} from './styles';

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <Container>
      <Nav>
        <Logo as={Link} to={ROUTES.HOME}>
          <img src="/images/logo.png" alt="Construction Jobs" />
        </Logo>

        <NavLinks>
          <NavLink as={Link} to={ROUTES.HOME} $active={location.pathname === ROUTES.HOME}>
            Главная
          </NavLink>
          <NavLink as={Link} to={ROUTES.VACANCIES} $active={location.pathname === ROUTES.VACANCIES}>
            Вакансии
          </NavLink>
          <NavLink as={Link} to={ROUTES.ABOUT} $active={location.pathname === ROUTES.ABOUT}>
            О компании
          </NavLink>
          <NavLink as={Link} to={ROUTES.CONTACT} $active={location.pathname === ROUTES.CONTACT}>
            Контакты
          </NavLink>
        </NavLinks>

        <MobileMenuButton onClick={toggleMobileMenu}>
          <span></span>
          <span></span>
          <span></span>
        </MobileMenuButton>

        <MobileMenu
          initial={false}
          animate={{ height: isMobileMenuOpen ? 'auto' : 0 }}
          transition={{ duration: 0.3 }}
        >
          <MobileNavLink as={Link} to={ROUTES.HOME} onClick={toggleMobileMenu}>
            Главная
          </MobileNavLink>
          <MobileNavLink as={Link} to={ROUTES.VACANCIES} onClick={toggleMobileMenu}>
            Вакансии
          </MobileNavLink>
          <MobileNavLink as={Link} to={ROUTES.ABOUT} onClick={toggleMobileMenu}>
            О компании
          </MobileNavLink>
          <MobileNavLink as={Link} to={ROUTES.CONTACT} onClick={toggleMobileMenu}>
            Контакты
          </MobileNavLink>
        </MobileMenu>
      </Nav>
    </Container>
  );
};

export default Navbar; 