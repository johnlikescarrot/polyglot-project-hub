/// <reference types="jest" />
import { render } from '@testing-library/react';
import App from '@/App';

describe('App Component', () => {
  test('renders app without error', () => {
    const { container } = render(<App />);
    expect(container).toBeInTheDocument();
  });

  test('renders query client provider', () => {
    const { container } = render(<App />);
    expect(container).toBeInTheDocument();
  });

  test('renders tooltip provider', () => {
    const { container } = render(<App />);
    expect(container).toBeInTheDocument();
  });

  test('renders browser router', () => {
    const { container } = render(<App />);
    expect(container).toBeInTheDocument();
  });

  test('renders toaster components', () => {
    const { container } = render(<App />);
    expect(container).toBeInTheDocument();
  });
});
