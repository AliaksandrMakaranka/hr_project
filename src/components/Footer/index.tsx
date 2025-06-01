import React from 'react';
import { Link } from 'react-router-dom';
import { Container, FooterContent, FooterSection, FooterTitle, FooterLink, FooterText, SocialLinks, SocialLink } from './styles';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { ROUTES } from '../../constants/routes';

const Footer: React.FC = () => {
  return (
    <Container>
      <FooterContent>
        <FooterSection>
          <FooterTitle>О компании</FooterTitle>
          <FooterText>
            Мы специализируемся на подборе квалифицированных специалистов для строительной отрасли в Польше.
          </FooterText>
          <SocialLinks>
            <SocialLink href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebook />
            </SocialLink>
            <SocialLink href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter />
            </SocialLink>
            <SocialLink href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </SocialLink>
            <SocialLink href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <FaLinkedin />
            </SocialLink>
          </SocialLinks>
        </FooterSection>

        <FooterSection>
          <FooterTitle>Навигация</FooterTitle>
          <FooterLink as={Link} to={ROUTES.HOME}>Главная</FooterLink>
          <FooterLink as={Link} to={ROUTES.VACANCIES}>Вакансии</FooterLink>
          <FooterLink as={Link} to={ROUTES.CATEGORIES}>Категории</FooterLink>
          <FooterLink as={Link} to={ROUTES.ABOUT}>О нас</FooterLink>
          <FooterLink as={Link} to={ROUTES.CONTACT}>Контакты</FooterLink>
        </FooterSection>

        <FooterSection>
          <FooterTitle>Контакты</FooterTitle>
          <FooterText>Адрес: ул. Строительная, 123</FooterText>
          <FooterText>Варшава, Польша</FooterText>
          <FooterText>Телефон: +48 123 456 789</FooterText>
          <FooterText>Email: info@construction-jobs.pl</FooterText>
        </FooterSection>

        <FooterSection>
          <FooterTitle>Правовая информация</FooterTitle>
          <FooterLink as={Link} to={ROUTES.PRIVACY_POLICY}>Политика конфиденциальности</FooterLink>
          <FooterLink href="/terms">Условия использования</FooterLink>
          <FooterLink href="/cookies">Политика использования файлов cookie</FooterLink>
        </FooterSection>
      </FooterContent>
    </Container>
  );
};

export default Footer; 