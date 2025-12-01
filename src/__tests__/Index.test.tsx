/// <reference types="jest" />
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Index from '@/pages/Index';

jest.mock('@/hooks/useStreamingChat', () => ({
  useStreamingChat: () => ({
    messages: [],
    isLoading: false,
    sendMessage: jest.fn(),
    clearMessages: jest.fn(),
  }),
}));

describe('Index Page', () => {
  const renderIndex = () => render(<BrowserRouter><Index /></BrowserRouter>);

  test('renders main heading', () => {
    const { container } = renderIndex();
    expect(container.textContent).toContain('AI Research Assistant');
  });

  test('renders subheading with AI models info', () => {
    const { container } = renderIndex();
    expect(container.textContent).toContain('7 AI Models');
  });

  test('renders research modes info section', () => {
    const { container } = renderIndex();
    expect(container.textContent).toContain('Research Modes');
  });

  test('renders header section', () => {
    const { container } = renderIndex();
    expect(container.querySelector('header')).toBeInTheDocument();
  });

  test('renders main chat area', () => {
    const { container } = renderIndex();
    expect(container.querySelector('main')).toBeInTheDocument();
  });

  test('renders aside sidebar', () => {
    const { container } = renderIndex();
    expect(container.querySelector('aside')).toBeInTheDocument();
  });

  test('displays welcome message when no messages', () => {
    const { container } = renderIndex();
    expect(container.textContent).toContain('Start Deep Research');
  });
});
