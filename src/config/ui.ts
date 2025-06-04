
/**
 * Конфигурация UI компонентов
 */
export const UI_CONFIG = {
  theme: {
    light: {
      colors: {
        primary: '#1976d2',
        primaryDark: '#1565c0',
        textPrimary: '#333',
        textSecondary: '#666',
        textMuted: '#999',
        background: '#fff',
        border: '#eee',
        shadow: 'rgba(0, 0, 0, 0.1)',
        shadowDark: 'rgba(0, 0, 0, 0.15)',
      },
    },
    dark: {
      colors: {
        primary: '#90caf9',
        primaryDark: '#42a5f5',
        textPrimary: '#fff',
        textSecondary: '#ccc',
        textMuted: '#999',
        background: '#121212',
        border: '#333',
        shadow: 'rgba(0, 0, 0, 0.3)',
        shadowDark: 'rgba(0, 0, 0, 0.4)',
      },
    },
  },
  breakpoints: {
    mobile: '768px',
    tablet: '1024px',
    desktop: '1440px',
  },
  spacing: {
    containerPadding: 'clamp(1rem, 5vw, 2rem)',
    sectionMargin: 'clamp(2rem, 8vw, 4rem)',
    cardPadding: 'clamp(1.5rem, 4vw, 2rem)',
    gridGap: 'clamp(1rem, 3vw, 2rem)',
  },
  typography: {
    title: 'clamp(1.5rem, 4vw, 2.25rem)',
    subtitle: 'clamp(1.25rem, 3vw, 1.5rem)',
    body: 'clamp(0.875rem, 2vw, 1rem)',
    small: 'clamp(0.75rem, 2vw, 0.875rem)',
  },
  borderRadius: {
    card: '12px',
    button: '8px',
    tag: '16px',
  },
  transitions: {
    default: '0.2s',
    menu: '0.3s ease-in-out',
  },
  shadows: {
    card: '0 4px 6px rgba(0, 0, 0, 0.1)',
    cardHover: '0 6px 12px rgba(0, 0, 0, 0.15)',
    navbar: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  zIndex: {
    navbar: 1000,
    modal: 2000,
    tooltip: 3000,
  },
} as const;

export type UIConfig = typeof UI_CONFIG; 