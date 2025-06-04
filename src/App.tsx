import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from './theme';
import { GlobalStyle } from './styles/global';
import Navbar from '@layouts/Navbar';
import HomePage from './pages/Home';
import CitiesPage from './pages/Cities';
import CityPage from './pages/City';
import JobsPage from './pages/Jobs';
import VacancyPage from '@features/vacancy/VacancyPage';
import VacanciesPage from './pages/Vacancies';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfUse from './pages/TermsOfUse';
import CookiePolicy from './pages/CookiePolicy';
import AboutPage from './pages/About';
import { ROUTES } from './constants/routes';
import Footer from '@layouts/Footer';
import CookieConsent from '@features/cookie-consent/CookieConsent';
import { ErrorBoundary } from './components/ErrorBoundary';
import ScrollToTop from './components/ScrollToTop';

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
                <Route path={ROUTES.HOME} element={<HomePage />} />
                <Route path={ROUTES.VACANCIES} element={<VacanciesPage />} />
                <Route path={ROUTES.CITIES} element={<CitiesPage />} />
                <Route path={ROUTES.CITY(':id')} element={<CityPage />} />
                <Route path={ROUTES.CATEGORY(':id')} element={<JobsPage />} />
                <Route path={ROUTES.VACANCY(':id')} element={<VacancyPage />} />
                <Route path={ROUTES.PRIVACY_POLICY} element={<PrivacyPolicy />} />
                <Route path={ROUTES.TERMS_OF_USE} element={<TermsOfUse />} />
                <Route path={ROUTES.COOKIE_POLICY} element={<CookiePolicy />} />
                <Route path={ROUTES.ABOUT} element={<AboutPage />} />
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
