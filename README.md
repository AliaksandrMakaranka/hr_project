# HR Company: Jobs in Poland

Front-end of a recruitment agency website: job offers by city and category, filters, a city map and cookie/privacy pages. Cities: Warsaw, Kraków, Wrocław, Łódź, Poznań, Gdańsk.

**Stack:** React 18 · TypeScript · Vite · Zustand · React Router · styled-components · Framer Motion · Leaflet · Vitest + Testing Library · ESLint

> Status: prototype. The UI works on mock data; the back-end API is not connected yet.

## Features

- Job list with filters by city and category
- Job details page
- City selection with map (Leaflet)
- Category grid with offer counts
- Cookie consent, privacy policy and terms of use pages
- Error boundary and typed API layer ready for a real back-end

## Structure

```
src/
├── api/        # Typed API clients (vacancies, categories, cities, contact)
├── features/   # Business components: vacancy, categories, city selection, cookie consent
├── pages/      # Home, Jobs, Vacancies, Cities, City, Categories, About, legal pages
├── store/      # Zustand state and selectors
├── ui/         # Reusable UI components
├── hooks/      # useVacancyFilters, useVacancyCounts, useCookieConsent
└── data/       # Mock data for development
```

Detailed architecture notes (in Russian): [docs/architecture-ru.md](docs/architecture-ru.md)

## Running locally

Requirements: Node.js 20+.

```bash
git clone https://github.com/AliaksandrMakaranka/hr_project.git
cd hr_project
npm install
npm run dev       # http://localhost:5173
```

Other commands:

```bash
npm run build     # production build
npm test          # 21 unit tests (Vitest)
npm run lint      # ESLint
```

---

### 🇵🇱 Opis

Front-end strony agencji rekrutacyjnej: oferty pracy według miast i kategorii, filtry, mapa miast. React, TypeScript, Vite, Zustand. Prototyp na danych testowych.
