import React from 'react';
import { NavLink as RouterNavLink } from 'react-router-dom';
import { ROUTES } from '../../../constants/routes';
import {
  NavbarContainer,
  NavbarContent,
  Logo,
  NavLinks,
  NavLink
} from './styles';

const Navbar: React.FC = () => {
  return (
    <NavbarContainer>
      <NavbarContent>
        <Logo to={ROUTES.HOME}>HR Company</Logo>
        <NavLinks>
          <NavLink to={ROUTES.HOME}>Главная</NavLink>
          <NavLink to={ROUTES.CITIES}>Города</NavLink>
        </NavLinks>
      </NavbarContent>
    </NavbarContainer>
  );
};

export default Navbar; 