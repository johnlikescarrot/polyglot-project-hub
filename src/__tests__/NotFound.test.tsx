/// <reference types="jest" />
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import NotFound from '@/pages/NotFound';

describe('NotFound Page', () => {
  test('renders 404 heading', () => {
    const { container } = render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>
    );
    expect(container.textContent).toContain('404');
  });

  test('renders error message', () => {
    const { container } = render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>
    );
    expect(container.textContent).toContain('Page not found');
  });

  test('has home link', () => {
    const { container } = render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>
    );
    const link = container.querySelector('a');
    expect(link).toHaveAttribute('href', '/');
  });
});
