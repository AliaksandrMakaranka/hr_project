import type { DefaultTheme } from 'styled-components';

export const theme: DefaultTheme = {
  colors: {
    primary: '#FF4B2B',
    primaryDark: '#E63E1D',
    textPrimary: '#333333',
    textSecondary: '#666666',
    textMuted: '#999999',
    background: {
      main: '#FFFFFF',
      dark: '#F5F5F5',
      light: '#FAFAFA'
    },
    border: '#E0E0E0',
    shadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    shadowDark: '0 4px 8px rgba(0, 0, 0, 0.2)',
    secondary: '#4B4B4B',
    accent: '#FF6B4B',
    construction: {
      concrete: '#A9A9A9',
      steel: '#4682B4',
      wood: '#8B4513',
      safety: '#FF4B2B'
    },
    text: {
      primary: '#333333',
      secondary: '#666666'
    }
  },
  typography: {
    title: '2.5rem',
    subtitle: '1.5rem',
    body: '1rem',
    small: '0.875rem'
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '3rem',
    gridGap: '1.5rem',
    cardPadding: '1.5rem',
    sectionMargin: '3rem',
    containerPadding: '1rem'
  },
  breakpoints: {
    mobile: '320px',
    tablet: '768px',
    desktop: '1024px',
    wide: '1280px'
  },
  borderRadius: {
    small: '4px',
    medium: '8px',
    large: '16px',
    card: '8px',
    button: '4px',
    tag: '16px',
    round: '50%'
  },
  transitions: {
    fast: '0.2s ease',
    default: '0.3s ease',
    slow: '0.5s ease',
    menu: '0.3s ease'
  },
  shadows: {
    small: '0 2px 4px rgba(0, 0, 0, 0.1)',
    medium: '0 4px 8px rgba(0, 0, 0, 0.2)',
    large: '0 8px 16px rgba(0, 0, 0, 0.3)',
    card: '0 2px 4px rgba(0, 0, 0, 0.1)',
    cardHover: '0 4px 8px rgba(0, 0, 0, 0.2)',
    navbar: '0 2px 4px rgba(0, 0, 0, 0.1)'
  },
  fonts: {
    heading: 'Montserrat, Arial, sans-serif',
    main: 'Roboto, Arial, sans-serif'
  }
}; 