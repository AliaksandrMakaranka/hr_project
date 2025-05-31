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
      background: string;
      border: string;
      shadow: string;
      shadowDark: string;
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
    breakpoints: {
      mobile: string;
      tablet: string;
      desktop: string;
    };
  }
}

export const theme: DefaultTheme = {
  colors: {
    primary: UI.COLORS.PRIMARY,
    primaryDark: UI.COLORS.PRIMARY_DARK,
    textPrimary: UI.COLORS.TEXT_PRIMARY,
    textSecondary: UI.COLORS.TEXT_SECONDARY,
    textMuted: UI.COLORS.TEXT_MUTED,
    background: UI.COLORS.BACKGROUND,
    border: UI.COLORS.BORDER,
    shadow: UI.COLORS.SHADOW,
    shadowDark: UI.COLORS.SHADOW_DARK
  },
  spacing: {
    containerPadding: UI.SPACING.CONTAINER_PADDING,
    sectionMargin: UI.SPACING.SECTION_MARGIN,
    cardPadding: UI.SPACING.CARD_PADDING,
    gridGap: UI.SPACING.GRID_GAP
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
    tag: UI.BORDER_RADIUS.TAG
  },
  transitions: {
    default: UI.TRANSITIONS.DEFAULT,
    menu: UI.TRANSITIONS.MENU
  },
  shadows: {
    card: UI.SHADOWS.CARD,
    cardHover: UI.SHADOWS.CARD_HOVER,
    navbar: UI.SHADOWS.NAVBAR
  },
  breakpoints: {
    mobile: UI.BREAKPOINTS.MOBILE,
    tablet: UI.BREAKPOINTS.TABLET,
    desktop: UI.BREAKPOINTS.DESKTOP
  }
}; 