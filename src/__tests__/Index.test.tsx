/// <reference types="jest" />
jest.mock('@/hooks/useStreamingChat', () => ({
  useStreamingChat: jest.fn(() => ({
    messages: [],
    isLoading: false,
    sendMessage: jest.fn(),
    clearMessages: jest.fn(),
  })),
}));

import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Index from '@/pages/Index';

describe('Index Page', () => {
  test('renders without error', () => {
    const { container } = render(<BrowserRouter><Index /></BrowserRouter>);
    expect(container).toBeInTheDocument();
  });

  test('renders header section', () => {
    const { container } = render(<BrowserRouter><Index /></BrowserRouter>);
    expect(container.querySelector('header')).toBeInTheDocument();
  });

  test('renders main chat area', () => {
    const { container } = render(<BrowserRouter><Index /></BrowserRouter>);
    expect(container.querySelector('main')).toBeInTheDocument();
  });

  test('renders sidebar', () => {
    const { container } = render(<BrowserRouter><Index /></BrowserRouter>);
    expect(container.querySelector('aside')).toBeInTheDocument();
  });

  test('renders welcome message when no messages', () => {
    const { container } = render(<BrowserRouter><Index /></BrowserRouter>);
    expect(container.textContent).toContain('Start Deep Research');
  });
});
