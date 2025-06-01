import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ROUTES } from '../../../constants/routes';
import {
  Container,
  Nav,
  Logo,
  NavLinks,
  NavLink,
  NavDropdown,
  MobileMenuButton,
  MobileMenu,
  MobileNavLink,
  AboutDropdown,
  DropdownContent,
  DropdownLink
} from './styles';

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAboutDropdownOpen, setIsAboutDropdownOpen] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleAboutDropdown = () => {
    setIsAboutDropdownOpen(!isAboutDropdownOpen);
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
          <NavLink as={Link} to={ROUTES.CATEGORIES} $active={location.pathname === ROUTES.CATEGORIES}>
            Категории
          </NavLink>
          <NavDropdown
            onClick={toggleAboutDropdown}
            style={{ color: location.pathname === ROUTES.ABOUT || location.pathname === ROUTES.CONTACT ? '#FF4B2B' : undefined }}
          >
            О нас
            <AboutDropdown>
              <DropdownContent $isOpen={isAboutDropdownOpen}>
                <DropdownLink as={Link} to={ROUTES.ABOUT}>О компании</DropdownLink>
                <DropdownLink as={Link} to={ROUTES.CONTACT}>Контакты</DropdownLink>
              </DropdownContent>
            </AboutDropdown>
          </NavDropdown>
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
          <MobileNavLink as={Link} to={ROUTES.CATEGORIES} onClick={toggleMobileMenu}>
            Категории
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