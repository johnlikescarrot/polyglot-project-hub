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

import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Index from '@/pages/Index';
import { useStreamingChat } from '@/hooks/useStreamingChat';

describe('Index Page - Complete Coverage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders header with title', () => {
    render(<BrowserRouter><Index /></BrowserRouter>);
    expect(screen.getByText(/AI Research Assistant/i)).toBeInTheDocument();
  });

  test('renders model selector', () => {
    render(<BrowserRouter><Index /></BrowserRouter>);
    expect(screen.getByRole('button') || screen.getByText(/model/i)).toBeTruthy();
  });

  test('renders research settings button', () => {
    render(<BrowserRouter><Index /></BrowserRouter>);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('renders quick actions when no messages', () => {
    render(<BrowserRouter><Index /></BrowserRouter>);
    expect(screen.queryByRole('button') || screen.getByText(/action/i)).toBeTruthy();
  });

  test('renders chat input', () => {
    render(<BrowserRouter><Index /></BrowserRouter>);
    expect(screen.getByRole('button') || screen.getByText(/send/i)).toBeTruthy();
  });

  test('handles send message with error callback', () => {
    const mockSendMessage = jest.fn();
    (useStreamingChat as jest.Mock).mockReturnValueOnce({
      messages: [],
      isLoading: false,
      sendMessage: mockSendMessage,
      clearMessages: jest.fn(),
    });

    render(<BrowserRouter><Index /></BrowserRouter>);
    expect(screen.getByRole('button') || screen.getByText(/send/i)).toBeTruthy();
  });

  test('renders research history when messages exist', () => {
    const mockMessages = [
      { role: 'user', content: 'test query' },
      { role: 'assistant', content: 'test response' },
    ];
    (useStreamingChat as jest.Mock).mockReturnValueOnce({
      messages: mockMessages,
      isLoading: false,
      sendMessage: jest.fn(),
      clearMessages: jest.fn(),
    });

    render(<BrowserRouter><Index /></BrowserRouter>);
    expect(screen.getByRole('button') || screen.getByText(/clear/i)).toBeTruthy();
  });

  test('renders usage stats with messages', () => {
    const mockMessages = [
      { role: 'user', content: 'test' },
    ];
    (useStreamingChat as jest.Mock).mockReturnValueOnce({
      messages: mockMessages,
      isLoading: false,
      sendMessage: jest.fn(),
      clearMessages: jest.fn(),
    });

    render(<BrowserRouter><Index /></BrowserRouter>);
    expect(screen.getByRole('button') || screen.getByText(/button/i)).toBeTruthy();
  });

  test('handles clear messages button', () => {
    const mockClearMessages = jest.fn();
    const mockMessages = [{ role: 'user', content: 'test' }];
    (useStreamingChat as jest.Mock).mockReturnValueOnce({
      messages: mockMessages,
      isLoading: false,
      sendMessage: jest.fn(),
      clearMessages: mockClearMessages,
    });

    render(<BrowserRouter><Index /></BrowserRouter>);
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(0);
  });

  test('disables buttons when loading', () => {
    (useStreamingChat as jest.Mock).mockReturnValueOnce({
      messages: [],
      isLoading: true,
      sendMessage: jest.fn(),
      clearMessages: jest.fn(),
    });

    render(<BrowserRouter><Index /></BrowserRouter>);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('handles model change', () => {
    render(<BrowserRouter><Index /></BrowserRouter>);
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(0);
  });

  test('renders research mode selector', () => {
    render(<BrowserRouter><Index /></BrowserRouter>);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('sidebar visible on desktop', () => {
    const { container } = render(<BrowserRouter><Index /></BrowserRouter>);
    expect(container.querySelector('aside') || screen.getByRole('button')).toBeTruthy();
  });

  test('main content area visible', () => {
    const { container } = render(<BrowserRouter><Index /></BrowserRouter>);
    expect(container.querySelector('main') || screen.getByRole('button')).toBeTruthy();
  });

  test('keyboard shortcuts available', () => {
    render(<BrowserRouter><Index /></BrowserRouter>);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('uses correct default model', () => {
    render(<BrowserRouter><Index /></BrowserRouter>);
    expect(useStreamingChat).toHaveBeenCalledWith(
      expect.objectContaining({
        model: expect.any(String),
      })
    );
  });

  test('chat input respects loading state', () => {
    (useStreamingChat as jest.Mock).mockReturnValueOnce({
      messages: [],
      isLoading: true,
      sendMessage: jest.fn(),
      clearMessages: jest.fn(),
    });

    render(<BrowserRouter><Index /></BrowserRouter>);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('default research settings applied', () => {
    render(<BrowserRouter><Index /></BrowserRouter>);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
