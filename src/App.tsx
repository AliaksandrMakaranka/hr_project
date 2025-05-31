import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from './theme';
import { GlobalStyle } from './styles/global';
import Navbar from './components/layout/Navbar';
import HomePage from './pages/Home';
import CitiesPage from './pages/Cities';
import CityPage from './pages/City';
import JobsPage from './pages/Jobs';
import VacancyPage from './components/VacancyPage';
import { ROUTES } from './constants/routes';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router>
        <Navbar />
        <main style={{ flex: 1, width: '100%' }}>
          <Routes>
            <Route path={ROUTES.HOME} element={<HomePage />} />
            <Route path={ROUTES.CITIES} element={<CitiesPage />} />
            <Route path={ROUTES.CITY(':id')} element={<CityPage />} />
            <Route path={ROUTES.CATEGORY(':id')} element={<JobsPage />} />
            <Route path={ROUTES.VACANCY(':id')} element={<VacancyPage />} />
          </Routes>
        </main>
      </Router>
    </ThemeProvider>
  );
};

export default App;
