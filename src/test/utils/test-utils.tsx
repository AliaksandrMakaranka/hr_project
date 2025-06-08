import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../theme';

export const renderWithTheme = (ui: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      {ui}
    </ThemeProvider>
  );
}; 