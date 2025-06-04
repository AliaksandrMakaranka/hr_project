
export type Environment = 'development' | 'production' | 'test';

export interface AppConfig {
  name: string;
  version: string;
  environment: Environment;
  isDevelopment: boolean;
  isProduction: boolean;
}

export interface ApiEndpoint {
  list: string;
  details: (id: number) => string;
  [key: string]: string | ((id: number) => string);
}

export interface ApiEndpoints {
  vacancies: ApiEndpoint;
  cities: ApiEndpoint;
  categories: ApiEndpoint;
  contact: {
    send: string;
  };
}

export interface ThemeColors {
  primary: string;
  primaryDark: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  background: string;
  border: string;
  shadow: string;
  shadowDark: string;
}

export interface Theme {
  colors: ThemeColors;
}

export interface UIConfig {
  theme: {
    light: Theme;
    dark: Theme;
  };
  breakpoints: {
    mobile: string;
    tablet: string;
    desktop: string;
  };
  spacing: {
    containerPadding: string;
    sectionMargin: string;
    cardPadding: string;
    gridGap: string;
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
  };
  transitions: {
    default: string;
    menu: string;
  };
  shadows: {
    card: string;
    cardHover: string;
    navbar: string;
  };
  zIndex: {
    navbar: number;
    modal: number;
    tooltip: number;
  };
} 