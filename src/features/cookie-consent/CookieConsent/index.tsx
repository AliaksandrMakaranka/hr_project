import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ROUTES } from '@constants/routes';
import { useCookieConsent } from '@hooks/useCookieConsent';
import {
  Banner,
  Content,
  Text,
  Buttons,
  Button,
  SettingsButton,
  Link as StyledLink
} from './styles';

const CookieConsent: React.FC = () => {
  const { hasConsent, setConsent } = useCookieConsent();

  const handleAccept = () => {
    setConsent({
      analytics: true,
      functional: true,
      marketing: false
    });
  };

  const handleSettings = () => {
    // TODO: Реализовать открытие модального окна с настройками
    console.log('Открыть настройки');
  };

  return (
    <AnimatePresence>
      {!hasConsent && (
        <Banner
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Content>
            <Text>
              Мы используем файлы cookie для улучшения работы сайта. Продолжая пользоваться сайтом, 
              вы соглашаетесь с{' '}
              <StyledLink as={Link} to={ROUTES.COOKIE_POLICY}>
                Политикой использования cookie
              </StyledLink>.
            </Text>
            <Buttons>
              <Button onClick={handleAccept}>
                Принять
              </Button>
              <SettingsButton onClick={handleSettings}>
                Настройки
              </SettingsButton>
            </Buttons>
          </Content>
        </Banner>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent; 