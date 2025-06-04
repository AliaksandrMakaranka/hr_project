import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { ErrorBoundary } from '../../components/ErrorBoundary';
import { theme } from '../../theme';

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => {
  return render(ui, {
    wrapper: ({ children }) => (
      <ErrorBoundary>
        {children}
      </ErrorBoundary>
    ),
  });
};

export const renderWithTheme = (ui: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      {ui}
    </ThemeProvider>
  );
}; 