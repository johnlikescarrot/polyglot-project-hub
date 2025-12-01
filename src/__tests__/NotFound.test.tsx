/// <reference types="jest" />
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import NotFound from '@/pages/NotFound';

describe('NotFound Page', () => {
  const renderNotFound = () => render(<BrowserRouter><NotFound /></BrowserRouter>);

  test('renders 404 heading', () => {
    const { container } = renderNotFound();
    expect(container.textContent).toContain('404');
  });

  test('renders error message', () => {
    const { container } = renderNotFound();
    expect(container.textContent).toContain('Page not found');
  });

  test('renders home link', () => {
    const { container } = renderNotFound();
    const link = container.querySelector('a[href="/"]');
    expect(link).toBeInTheDocument();
  });

  test('has correct styling classes', () => {
    const { container } = renderNotFound();
    expect(container.querySelector('.min-h-screen')).toBeInTheDocument();
    expect(container.querySelector('.text-center')).toBeInTheDocument();
  });

  test('logs error on mount', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    renderNotFound();
    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });
});
