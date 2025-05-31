import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from './theme';
import { GlobalStyle } from './styles/global';
import Navbar from './components/layout/Navbar';
import HomePage from './pages/Home';
import CitySelectionPage from './pages/CitySelection';
import JobsPage from './pages/Jobs';
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
            <Route path={ROUTES.CITIES} element={<CitySelectionPage />} />
            <Route path="/city/:cityId" element={<JobsPage />} />
            <Route path="/category/:categoryId" element={<JobsPage />} />
          </Routes>
        </main>
      </Router>
    </ThemeProvider>
  );
};

export default App;
