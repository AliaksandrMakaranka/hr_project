/**
 * Константы для UI компонентов
 */
export const UI = {
  BREAKPOINTS: {
    MOBILE: '768px',
    TABLET: '1024px',
    DESKTOP: '1440px'
  },
  COLORS: {
    PRIMARY: '#1976d2',
    PRIMARY_DARK: '#1565c0',
    TEXT_PRIMARY: '#333',
    TEXT_SECONDARY: '#666',
    TEXT_MUTED: '#999',
    BACKGROUND: '#fff',
    BORDER: '#eee',
    SHADOW: 'rgba(0, 0, 0, 0.1)',
    SHADOW_DARK: 'rgba(0, 0, 0, 0.15)'
  },
  SPACING: {
    CONTAINER_PADDING: 'clamp(1rem, 5vw, 2rem)',
    SECTION_MARGIN: 'clamp(2rem, 8vw, 4rem)',
    CARD_PADDING: 'clamp(1.5rem, 4vw, 2rem)',
    GRID_GAP: 'clamp(1rem, 3vw, 2rem)'
  },
  TYPOGRAPHY: {
    TITLE: 'clamp(1.5rem, 4vw, 2.25rem)',
    SUBTITLE: 'clamp(1.25rem, 3vw, 1.5rem)',
    BODY: 'clamp(0.875rem, 2vw, 1rem)',
    SMALL: 'clamp(0.75rem, 2vw, 0.875rem)'
  },
  BORDER_RADIUS: {
    CARD: '12px',
    BUTTON: '8px',
    TAG: '16px'
  },
  TRANSITIONS: {
    DEFAULT: '0.2s',
    MENU: '0.3s ease-in-out'
  },
  SHADOWS: {
    CARD: '0 4px 6px rgba(0, 0, 0, 0.1)',
    CARD_HOVER: '0 6px 12px rgba(0, 0, 0, 0.15)',
    NAVBAR: '0 2px 4px rgba(0, 0, 0, 0.1)'
  }
} as const; 