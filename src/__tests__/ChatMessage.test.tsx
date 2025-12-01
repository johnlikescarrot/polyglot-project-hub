/// <reference types="jest" />
import { render, screen } from '@testing-library/react';
import { ChatMessage } from '@/components/research/ChatMessage';
import type { Message } from '@/hooks/useStreamingChat';

describe('ChatMessage Component', () => {
  test('renders user message', () => {
    const message: Message = {
      role: 'user',
      content: 'Test message',
    };
    render(<ChatMessage message={message} />);
    expect(screen.getByText('Test message')).toBeInTheDocument();
  });

  test('renders assistant message with markdown', () => {
    const message: Message = {
      role: 'assistant',
      content: '# Header\nContent',
      model: 'google/gemini-2.5-flash',
    };
    render(<ChatMessage message={message} />);
    expect(screen.getByText(/Header/)).toBeInTheDocument();
  });

  test('shows model info for assistant', () => {
    const message: Message = {
      role: 'assistant',
      content: 'Test',
      model: 'google/gemini-2.5-flash',
    };
    render(<ChatMessage message={message} />);
    expect(screen.getByText(/gemini-2.5-flash/)).toBeInTheDocument();
  });

  test('hides model info for user', () => {
    const message: Message = {
      role: 'user',
      content: 'Test',
      model: 'google/gemini-2.5-flash',
    };
    render(<ChatMessage message={message} />);
    expect(screen.queryByText(/gemini-2.5-flash/)).not.toBeInTheDocument();
  });

  test('renders with correct styling', () => {
    const message: Message = {
      role: 'user',
      content: 'Test',
    };
    const { container } = render(<ChatMessage message={message} />);
    expect(container.querySelector('.flex')).toBeInTheDocument();
  });
});
