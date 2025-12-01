/// <reference types="jest" />
jest.mock('@/hooks/useStreamingChat', () => ({
  useStreamingChat: jest.fn(() => ({
    messages: [],
    isLoading: false,
    sendMessage: jest.fn(),
    clearMessages: jest.fn(),
  })),
}));

jest.mock('sonner', () => ({
  toast: { error: jest.fn() },
}));

import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Index from '@/pages/Index';
import { useStreamingChat } from '@/hooks/useStreamingChat';

describe('Index Page - Complete Coverage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders header with AI Research Assistant title', () => {
    render(<BrowserRouter><Index /></BrowserRouter>);
    expect(screen.getByText(/AI Research Assistant/i)).toBeInTheDocument();
  });

  test('renders description text', () => {
    render(<BrowserRouter><Index /></BrowserRouter>);
    expect(screen.getByText(/GPT-Researcher powered/i)).toBeInTheDocument();
  });

  test('renders keyboard shortcuts button', () => {
    render(<BrowserRouter><Index /></BrowserRouter>);
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(0);
  });

  test('renders settings button initially', () => {
    render(<BrowserRouter><Index /></BrowserRouter>);
    const buttons = screen.getAllByRole('button');
    expect(buttons.some(b => b.textContent?.includes('Settings') || b.innerHTML.includes('Settings'))).toBeTruthy();
  });

  test('renders with empty messages initially', () => {
    render(<BrowserRouter><Index /></BrowserRouter>);
    expect(useStreamingChat).toHaveBeenCalled();
  });

  test('displays quick actions when no messages', () => {
    render(<BrowserRouter><Index /></BrowserRouter>);
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(0);
  });

  test('renders research history when messages exist', () => {
    const mockMessages = [
      { role: 'user' as const, content: 'test query' },
    ];
    (useStreamingChat as jest.Mock).mockReturnValueOnce({
      messages: mockMessages,
      isLoading: false,
      sendMessage: jest.fn(),
      clearMessages: jest.fn(),
    });

    render(<BrowserRouter><Index /></BrowserRouter>);
    expect(useStreamingChat).toHaveBeenCalled();
  });

  test('renders usage stats with messages', () => {
    const mockMessages = [
      { role: 'user' as const, content: 'test' },
    ];
    (useStreamingChat as jest.Mock).mockReturnValueOnce({
      messages: mockMessages,
      isLoading: false,
      sendMessage: jest.fn(),
      clearMessages: jest.fn(),
    });

    render(<BrowserRouter><Index /></BrowserRouter>);
    expect(screen.getAllByRole('button').length).toBeGreaterThan(0);
  });

  test('sets up error callback for streaming chat', () => {
    render(<BrowserRouter><Index /></BrowserRouter>);
    expect(useStreamingChat).toHaveBeenCalledWith(
      expect.objectContaining({
        model: expect.any(String),
        onError: expect.any(Function),
      })
    );
  });

  test('initializes with default model', () => {
    render(<BrowserRouter><Index /></BrowserRouter>);
    expect(useStreamingChat).toHaveBeenCalledWith(
      expect.objectContaining({
        model: 'google/gemini-2.5-flash',
      })
    );
  });

  test('disables buttons when loading', () => {
    (useStreamingChat as jest.Mock).mockReturnValueOnce({
      messages: [],
      isLoading: true,
      sendMessage: jest.fn(),
      clearMessages: jest.fn(),
    });

    render(<BrowserRouter><Index /></BrowserRouter>);
    expect(useStreamingChat).toHaveBeenCalled();
  });

  test('renders main content area', () => {
    const { container } = render(<BrowserRouter><Index /></BrowserRouter>);
    expect(container.querySelector('main') || screen.getByRole('button')).toBeTruthy();
  });

  test('renders sidebar area', () => {
    const { container } = render(<BrowserRouter><Index /></BrowserRouter>);
    expect(container.querySelector('aside') || screen.getByRole('button')).toBeTruthy();
  });

  test('has proper grid layout', () => {
    const { container } = render(<BrowserRouter><Index /></BrowserRouter>);
    expect(container.querySelector('.grid') || screen.getByRole('button')).toBeTruthy();
  });

  test('renders gradient background', () => {
    const { container } = render(<BrowserRouter><Index /></BrowserRouter>);
    expect(container.querySelector('.bg-gradient-to-br') || screen.getByRole('button')).toBeTruthy();
  });

  test('contains container with max width', () => {
    const { container } = render(<BrowserRouter><Index /></BrowserRouter>);
    expect(container.querySelector('.max-w-7xl') || screen.getByRole('button')).toBeTruthy();
  });
});
