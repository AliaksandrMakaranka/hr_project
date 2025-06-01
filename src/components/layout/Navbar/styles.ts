import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export const Container = styled.header`
  background-color: ${({ theme }) => theme.colors.background.main};
  box-shadow: ${({ theme }) => theme.shadows.medium};
  position: sticky;
  top: 0;
  z-index: 1000;
`;

export const Nav = styled.nav`
  max-width: ${({ theme }) => theme.breakpoints.wide};
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Logo = styled(Link)`
  img {
    height: 40px;
    width: auto;
  }
`;

export const NavLinks = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.xl};
  align-items: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none;
  }
`;

export const NavLink = styled(Link)<{ $active?: boolean }>`
  color: ${({ theme, $active }) => $active ? theme.colors.construction.safety : theme.colors.textPrimary};
  text-decoration: none;
  font-weight: 500;
  position: relative;
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing.sm} 0;

  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: ${({ theme }) => theme.colors.construction.safety};
    transform: scaleX(${({ $active }) => $active ? 1 : 0});
    transition: transform ${({ theme }) => theme.transitions.fast};
  }

  &:hover:after {
    transform: scaleX(1);
  }
`;

export const MobileMenuButton = styled.button`
  display: none;
  flex-direction: column;
  gap: 6px;
  background: none;
  border: none;
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing.sm};

  span {
    display: block;
    width: 25px;
    height: 2px;
    background-color: ${({ theme }) => theme.colors.textPrimary};
    transition: ${({ theme }) => theme.transitions.fast};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: flex;
  }
`;

export const MobileMenu = styled(motion.div)`
  display: none;
  flex-direction: column;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: ${({ theme }) => theme.colors.background.main};
  box-shadow: ${({ theme }) => theme.shadows.medium};
  overflow: hidden;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: flex;
  }
`;

export const MobileNavLink = styled(Link)`
  color: ${({ theme }) => theme.colors.textPrimary};
  text-decoration: none;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  transition: background-color ${({ theme }) => theme.transitions.fast};

  &:hover {
    background-color: ${({ theme }) => theme.colors.background.light};
  }
`;

export const AboutDropdown = styled.div`
  position: relative;
`;

export const DropdownContent = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  background-color: ${({ theme }) => theme.colors.background.main};
  box-shadow: ${({ theme }) => theme.shadows.medium};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  padding: ${({ theme }) => theme.spacing.sm};
  min-width: 200px;
  display: ${({ $isOpen }) => $isOpen ? 'block' : 'none'};
  z-index: 1000;
`;

export const DropdownLink = styled(Link)`
  display: block;
  color: ${({ theme }) => theme.colors.textPrimary};
  text-decoration: none;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  transition: background-color ${({ theme }) => theme.transitions.fast};

  &:hover {
    background-color: ${({ theme }) => theme.colors.background.light};
  }
`;

export const NavDropdown = styled.div`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-weight: 500;
  position: relative;
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing.sm} 0;
  display: flex;
  align-items: center;
`; 