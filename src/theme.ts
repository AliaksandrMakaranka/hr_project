import type { DefaultTheme } from 'styled-components';
import { UI } from './constants/ui';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      primaryDark: string;
      textPrimary: string;
      textSecondary: string;
      textMuted: string;
      background: {
        main: string;
        dark: string;
        light: string;
      };
      border: string;
      shadow: string;
      shadowDark: string;
      secondary: string;
      accent: string;
      construction: {
        concrete: string;
        steel: string;
        wood: string;
        safety: string;
      };
      text: {
        primary: string;
        secondary: string;
      };
    };
    fonts: {
      main: string;
      heading: string;
    };
    spacing: {
      containerPadding: string;
      sectionMargin: string;
      cardPadding: string;
      gridGap: string;
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      xxl: string;
    };
    typography: {
      title: string;
      subtitle: string;
      body: string;
      small: string;
    };
    borderRadius: {
      card: string;
      button: string;
      tag: string;
      small: string;
      medium: string;
      large: string;
      round: string;
    };
    transitions: {
      default: string;
      menu: string;
      fast: string;
      slow: string;
    };
    shadows: {
      card: string;
      cardHover: string;
      navbar: string;
      small: string;
      medium: string;
      large: string;
    };
    breakpoints: {
      mobile: string;
      tablet: string;
      desktop: string;
      wide: string;
    };
  }
}

export const theme: DefaultTheme = {
  colors: {
    primary: '#FFD700', // Желтый - основной акцент
    primaryDark: UI.COLORS.PRIMARY_DARK,
    textPrimary: '#1A1A1A',
    textSecondary: '#666666',
    textMuted: UI.COLORS.TEXT_MUTED,
    background: {
      main: '#F5F5F5',
      dark: '#2C2C2C',
      light: '#FFFFFF',
    },
    border: UI.COLORS.BORDER,
    shadow: UI.COLORS.SHADOW,
    shadowDark: UI.COLORS.SHADOW_DARK,
    secondary: '#1A1A1A', // Черный
    accent: '#FF6B00', // Оранжевый для акцентов
    construction: {
      concrete: '#A9A9A9',
      steel: '#4682B4',
      wood: '#8B4513',
      safety: '#FF0000',
    },
    text: {
      primary: '#1A1A1A',
      secondary: '#666666',
    }
  },
  fonts: {
    main: "'Roboto', sans-serif",
    heading: "'Montserrat', sans-serif",
  },
  spacing: {
    containerPadding: UI.SPACING.CONTAINER_PADDING,
    sectionMargin: UI.SPACING.SECTION_MARGIN,
    cardPadding: UI.SPACING.CARD_PADDING,
    gridGap: UI.SPACING.GRID_GAP,
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '3rem',
  },
  typography: {
    title: UI.TYPOGRAPHY.TITLE,
    subtitle: UI.TYPOGRAPHY.SUBTITLE,
    body: UI.TYPOGRAPHY.BODY,
    small: UI.TYPOGRAPHY.SMALL
  },
  borderRadius: {
    card: UI.BORDER_RADIUS.CARD,
    button: UI.BORDER_RADIUS.BUTTON,
    tag: UI.BORDER_RADIUS.TAG,
    small: '4px',
    medium: '8px',
    large: '16px',
    round: '50%',
  },
  transitions: {
    default: '0.3s ease',
    menu: UI.TRANSITIONS.MENU,
    fast: '0.15s ease',
    slow: '0.5s ease',
  },
  shadows: {
    card: UI.SHADOWS.CARD,
    cardHover: UI.SHADOWS.CARD_HOVER,
    navbar: UI.SHADOWS.NAVBAR,
    small: '0 2px 4px rgba(0,0,0,0.1)',
    medium: '0 4px 8px rgba(0,0,0,0.1)',
    large: '0 8px 16px rgba(0,0,0,0.1)',
  },
  breakpoints: {
    mobile: '320px',
    tablet: '768px',
    desktop: '1024px',
    wide: '1440px',
  }
}; 