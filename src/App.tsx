import CookieConsent from '@features/cookie-consent/CookieConsent';
import Footer from '@layouts/Footer';
import Navbar from '@layouts/Navbar';
import React, { lazy, Suspense } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { ErrorBoundary } from './components/ErrorBoundary';
import ScrollToTop from './components/ScrollToTop';
import { ROUTES } from './constants/routes';
import { VacanciesPage, VacancyDetailsPage } from './pages/Vacancies';
import { GlobalStyle } from './styles/global';
import { theme } from './theme';

// Ленивая загрузка страниц
const HomePage = lazy(() => import('./pages/Home'));
const CitiesPage = lazy(() => import('./pages/Cities'));
const CityPage = lazy(() => import('./pages/City'));
const CategoriesPage = lazy(() => import('./pages/Categories'));
const JobsPage = lazy(() => import('./pages/Jobs'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsOfUse = lazy(() => import('./pages/TermsOfUse'));
const CookiePolicy = lazy(() => import('./pages/CookiePolicy'));
const AboutPage = lazy(() => import('./pages/About'));

// Компонент для ленивой загрузки
const LazyLoad: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Suspense fallback={<div>Loading...</div>}>
    {children}
  </Suspense>
);

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router>
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Navbar />
          <main style={{ flex: 1, width: '100%' }}>
            <ErrorBoundary>
              <Routes>
                <Route path={ROUTES.HOME} element={<LazyLoad><HomePage /></LazyLoad>} />
                <Route path={ROUTES.VACANCIES} element={<LazyLoad><VacanciesPage /></LazyLoad>} />
                <Route path={ROUTES.VACANCY(':id')} element={<LazyLoad><VacancyDetailsPage /></LazyLoad>} />
                <Route path={ROUTES.CITIES} element={<LazyLoad><CitiesPage /></LazyLoad>} />
                <Route path={ROUTES.CITY(':id')} element={<LazyLoad><CityPage /></LazyLoad>} />
                <Route path={ROUTES.CATEGORIES} element={<LazyLoad><CategoriesPage /></LazyLoad>} />
                <Route path={ROUTES.CATEGORY(':id')} element={<LazyLoad><JobsPage /></LazyLoad>} />
                <Route path={ROUTES.PRIVACY_POLICY} element={<LazyLoad><PrivacyPolicy /></LazyLoad>} />
                <Route path={ROUTES.TERMS_OF_USE} element={<LazyLoad><TermsOfUse /></LazyLoad>} />
                <Route path={ROUTES.COOKIE_POLICY} element={<LazyLoad><CookiePolicy /></LazyLoad>} />
                <Route path={ROUTES.ABOUT} element={<LazyLoad><AboutPage /></LazyLoad>} />
              </Routes>
            </ErrorBoundary>
          </main>
          <Footer />
          <CookieConsent />
        </div>
        <ScrollToTop />
      </Router>
    </ThemeProvider>
  );
};

export default App;
