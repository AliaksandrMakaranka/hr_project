import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ScrollToTop from './ScrollToTop';

describe('ScrollToTop', () => {
  beforeEach(() => {
    // Reset window.scrollY before each test
    Object.defineProperty(window, 'scrollY', { value: 0, writable: true });
    // Reset window.scrollTo mock
    window.scrollTo = vi.fn();
  });

  it('should not be visible initially', () => {
    render(<ScrollToTop />);
    expect(screen.queryByLabelText('Scroll to top')).not.toBeInTheDocument();
  });

  it('should appear when scrolling down', async () => {
    render(<ScrollToTop />);
    
    // Simulate scrolling down
    Object.defineProperty(window, 'scrollY', { value: 350 }); // Увеличил значение для уверенности, что > 300
    fireEvent.scroll(window);
    
    await waitFor(() => {
      expect(screen.getByLabelText('Scroll to top')).toBeInTheDocument();
    });
  });

  it('should scroll to top when clicked', async () => {
    render(<ScrollToTop />);
    
    // Scroll down first to make button visible
    Object.defineProperty(window, 'scrollY', { value: 350 });
    fireEvent.scroll(window);
    
    // Wait for button to appear before clicking
    const scrollToTopButton = await waitFor(() => screen.getByLabelText('Scroll to top'));

    // Click the button
    fireEvent.click(scrollToTopButton);
    
    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: 'smooth'
    });
  });
}); 