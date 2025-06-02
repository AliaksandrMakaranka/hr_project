import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { useVacancyStore } from './store/vacancyStore';

// Initialize store early if needed
const store = useVacancyStore.getState();

// Pre-fetch vacancies if needed
if (process.env.NODE_ENV === 'production') {
  store.fetchVacancies().catch(console.error);
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
); 