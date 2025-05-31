# Testing Approach

## Overview

Our testing strategy focuses on essential business logic and user interactions while avoiding brittle tests that could break with UI changes. We use React Testing Library with Vitest to write maintainable and resilient tests.

## What We Test

1. **Component Rendering**
   - Basic component mounting
   - Correct data display
   - Conditional rendering logic

2. **User Interactions**
   - Click handlers
   - Form submissions
   - Navigation events

3. **Business Logic**
   - Data transformations
   - State management
   - API integration

## What We Don't Test

1. **Styling and Layout**
   - CSS properties
   - Component positioning
   - Visual appearance

2. **Implementation Details**
   - Internal component structure
   - Deep DOM nesting
   - Component implementation specifics

3. **Third-party Library Behavior**
   - Library-specific functionality
   - External component behavior

## Test Structure

Tests are organized following these principles:

1. **Test File Location**
   - Tests are co-located with components
   - Test files are named `*.test.tsx`

2. **Test Setup**
   - Tests are wrapped with `ThemeProvider`
   - Common test utilities are shared
   - Mock data is centralized

3. **Test Writing Guidelines**
   - Use semantic queries (getByRole, getByText)
   - Focus on user-centric testing
   - Keep tests simple and focused

## Example Test

```typescript
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { theme } from '../theme';
import JobCard from './JobCard';
import { describe, it, expect } from 'vitest';

describe('JobCard', () => {
  const mockJob = {
    id: 1,
    title: 'Software Developer',
    company: 'Tech Corp',
    location: 'Warsaw'
  };

  it('renders job information correctly', () => {
    render(
      <ThemeProvider theme={theme}>
        <JobCard job={mockJob} />
      </ThemeProvider>
    );

    expect(screen.getByText('Software Developer')).toBeInTheDocument();
    expect(screen.getByText('Tech Corp')).toBeInTheDocument();
    expect(screen.getByText('Warsaw')).toBeInTheDocument();
  });
});
```

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage

# Run tests with UI
npm run test:ui
```

## Adding New Tests

When adding new tests:

1. Create a test file next to the component
2. Import necessary testing utilities from Vitest and React Testing Library
3. Wrap components with ThemeProvider
4. Write focused, user-centric tests
5. Avoid testing implementation details
6. Use semantic queries for element selection 