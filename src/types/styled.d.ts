import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      primaryDark: string;
      textPrimary: string;
      textSecondary: string;
      textMuted: string;
      textLight: string;
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
        safety: string;
        warning: string;
        success: string;
      };
      text: {
        primary: string;
        secondary: string;
        muted: string;
      };
    };
    typography: {
      title: string;
      subtitle: string;
      body: string;
      small: string;
      h1: string;
      h2: string;
      h3: string;
      h4: string;
    };
    spacing: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      xxl: string;
      gridGap: string;
      cardPadding: string;
      sectionMargin: string;
      containerPadding: string;
    };
    breakpoints: {
      mobile: string;
      tablet: string;
      desktop: string;
      wide: string;
    };
    borderRadius: {
      small: string;
      medium: string;
      large: string;
      card: string;
      button: string;
      tag: string;
      round: string;
    };
    transitions: {
      fast: string;
      default: string;
      slow: string;
      menu: string;
    };
    shadows: {
      small: string;
      medium: string;
      large: string;
      card: string;
      cardHover: string;
      navbar: string;
    };
  }
} 