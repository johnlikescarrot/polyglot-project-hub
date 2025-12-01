import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import NotFound from '@/pages/NotFound';

describe('NotFound Page', () => {
  test('renders 404 heading', () => {
    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>
    );
    expect(screen.getByText('404')).toBeInTheDocument();
  });

  test('renders error message', () => {
    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>
    );
    expect(screen.getByText(/Page not found/i)).toBeInTheDocument();
  });

  test('has home link', () => {
    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>
    );
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/');
  });
});
