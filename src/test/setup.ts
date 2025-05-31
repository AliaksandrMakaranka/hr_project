import '@testing-library/jest-dom';
import { vi } from 'vitest';
import React from 'react';
import { theme } from '../theme';
import { DefaultTheme } from 'styled-components';

// Mock react-router-dom
vi.mock('react-router-dom', () => ({
  useNavigate: () => vi.fn(),
  useParams: () => ({}),
  Link: ({ children, to }: { children: React.ReactNode; to: string }) => 
    React.createElement('a', { href: to }, children),
  NavLink: ({ children, to }: { children: React.ReactNode; to: string }) => 
    React.createElement('a', { href: to }, children)
}));

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock ResizeObserver
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock IntersectionObserver
global.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock styled-components theme
vi.mock('styled-components', async () => {
  const actual = await vi.importActual('styled-components');
  return {
    ...actual,
    createGlobalStyle: () => () => null,
    css: () => [],
    keyframes: () => 'animation',
    ThemeContext: {
      Consumer: ({ children }: { children: (theme: DefaultTheme) => React.ReactNode }) => children(theme),
      Provider: ({ children }: { children: React.ReactNode }) => children
    }
  };
});

// Mock data
// vi.mock('../data/vacancies', () => ({
//   vacancies: [
//     {
//       id: 1,
//       title: 'Frontend Developer',
//       company: 'Tech Corp',
//       salary: '3000-4000 PLN',
//       city: { id: 1, name: 'Warsaw' },
//       category: { id: 1, name: 'IT' },
//       employmentType: 'Full-time',
//       description: 'Looking for a skilled frontend developer'
//     },
//     {
//       id: 2,
//       title: 'Backend Developer',
//       company: 'Tech Corp',
//       salary: '4000-5000 PLN',
//       city: { id: 2, name: 'Krakow' },
//       category: { id: 1, name: 'IT' },
//       employmentType: 'Full-time',
//       description: 'Looking for a skilled backend developer'
//     }
//   ]
// }));

// vi.mock('../data/cities', () => ({
//   cities: [
//     { id: 1, name: 'Warsaw', vacanciesCount: 1 },
//     { id: 2, name: 'Krakow', vacanciesCount: 1 }
//   ]
// }));

// vi.mock('../data/categories', () => ({
//   jobCategories: [
//     { id: 1, name: 'IT', vacanciesCount: 2 }
//   ]
// })); 