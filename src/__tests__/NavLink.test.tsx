/// <reference types="jest" />
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { NavLink } from '@/components/NavLink';

describe('NavLink Component', () => {
  const renderNavLink = (props: any) => 
    render(<BrowserRouter><NavLink {...props} /></BrowserRouter>);

  test('renders navigation link', () => {
    const { container } = renderNavLink({ to: '/test' });
    const link = container.querySelector('a');
    expect(link).toBeInTheDocument();
  });

  test('has correct href attribute', () => {
    const { container } = renderNavLink({ to: '/about' });
    const link = container.querySelector('a[href="/about"]');
    expect(link).toBeInTheDocument();
  });

  test('applies custom className', () => {
    const { container } = renderNavLink({ to: '/test', className: 'custom-class' });
    const link = container.querySelector('a');
    expect(link?.className).toContain('custom-class');
  });

  test('displays name attribute', () => {
    const { container } = renderNavLink({ to: '/test', children: 'Home' });
    expect(container.textContent).toContain('Home');
  });
});
