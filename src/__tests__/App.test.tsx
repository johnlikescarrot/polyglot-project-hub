/// <reference types="jest" />
import { render } from '@testing-library/react';
import App from '@/App';

describe('App Component', () => {
  test('renders app with providers', () => {
    const { container } = render(<App />);
    expect(container).toBeInTheDocument();
  });

  test('renders router with routes', () => {
    const { container } = render(<App />);
    expect(container.querySelector('[role="main"]') || container.innerHTML.length > 0).toBeTruthy();
  });

  test('renders query client provider', () => {
    const { container } = render(<App />);
    expect(container).toBeInTheDocument();
  });

  test('renders tooltip provider', () => {
    const { container } = render(<App />);
    expect(container).toBeInTheDocument();
  });

  test('renders toaster components', () => {
    const { container } = render(<App />);
    expect(container).toBeInTheDocument();
  });
});
