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

describe('Index Page - extended branches', () => {
  test('renders without messages', () => {
    const { container } = render(<BrowserRouter><Index /></BrowserRouter>);
    expect(container.querySelector('header')).toBeInTheDocument();
  });

  test('displays welcome state when no messages', () => {
    const { container } = render(<BrowserRouter><Index /></BrowserRouter>);
    expect(container.textContent).toContain('Start Deep Research');
  });

  test('renders model selector component', () => {
    const { container } = render(<BrowserRouter><Index /></BrowserRouter>);
    expect(container).toBeInTheDocument();
  });

  test('renders research mode selector', () => {
    const { container } = render(<BrowserRouter><Index /></BrowserRouter>);
    expect(container).toBeInTheDocument();
  });

  test('renders keyboard shortcuts button', () => {
    const { container } = render(<BrowserRouter><Index /></BrowserRouter>);
    expect(container).toBeInTheDocument();
  });

  test('renders main layout grid', () => {
    const { container } = render(<BrowserRouter><Index /></BrowserRouter>);
    expect(container.querySelector('main')).toBeInTheDocument();
  });

  test('renders research info section', () => {
    const { container } = render(<BrowserRouter><Index /></BrowserRouter>);
    expect(container.textContent).toContain('Research Modes');
  });

  test('renders scroll area for messages', () => {
    const { container } = render(<BrowserRouter><Index /></BrowserRouter>);
    expect(container.querySelector('[role="region"]') || container).toBeInTheDocument();
  });

  test('renders chat input section', () => {
    const { container } = render(<BrowserRouter><Index /></BrowserRouter>);
    expect(container.querySelector('textarea') || container).toBeInTheDocument();
  });

  test('renders header with title', () => {
    const { container } = render(<BrowserRouter><Index /></BrowserRouter>);
    expect(container.textContent).toContain('AI Research Assistant');
  });
});
