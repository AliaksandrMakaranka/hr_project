import { createGlobalStyle } from 'styled-components';

export const FontStyles = createGlobalStyle`
  @font-face {
    font-family: 'MainFont';
    src: url('/fonts/main.woff2') format('woff2');
    font-display: swap;
    font-weight: 400;
    font-style: normal;
  }

  @font-face {
    font-family: 'MainFont';
    src: url('/fonts/main-bold.woff2') format('woff2');
    font-display: swap;
    font-weight: 700;
    font-style: normal;
  }
`; 