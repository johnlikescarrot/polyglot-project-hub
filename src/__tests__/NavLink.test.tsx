/// <reference types="jest" />
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import NavLink from '@/components/NavLink';

describe('NavLink Component', () => {
  const renderNavLink = (props: any) => 
    render(<BrowserRouter><NavLink {...props} /></BrowserRouter>);

  test('renders navigation link', () => {
    const { container } = renderNavLink({ to: '/test', label: 'Test' });
    expect(container).toBeInTheDocument();
  });

  test('has link element', () => {
    const { container } = renderNavLink({ to: '/about', label: 'About' });
    const link = container.querySelector('a');
    expect(link).toBeInTheDocument();
  });
});
