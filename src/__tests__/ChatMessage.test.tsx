import { render, screen } from '@testing-library/react';
import { ChatMessage } from '@/components/research/ChatMessage';
import { Message } from '@/hooks/useStreamingChat';

describe('ChatMessage Component', () => {
  test('renders user message', () => {
    const message: Message = {
      role: 'user',
      content: 'Test message',
    };
    render(<ChatMessage message={message} />);
    expect(screen.getByText('Test message')).toBeInTheDocument();
  });

  test('renders assistant message', () => {
    const message: Message = {
      role: 'assistant',
      content: '# Header\nTest content',
      model: 'google/gemini-2.5-flash',
    };
    render(<ChatMessage message={message} />);
    expect(screen.getByText(/Header/)).toBeInTheDocument();
  });

  test('shows model info for assistant messages', () => {
    const message: Message = {
      role: 'assistant',
      content: 'Test',
      model: 'google/gemini-2.5-flash',
    };
    render(<ChatMessage message={message} />);
    expect(screen.getByText(/gemini-2.5-flash/)).toBeInTheDocument();
  });

  test('does not show model info for user messages', () => {
    const message: Message = {
      role: 'user',
      content: 'Test',
      model: 'google/gemini-2.5-flash',
    };
    render(<ChatMessage message={message} />);
    expect(screen.queryByText(/gemini-2.5-flash/)).not.toBeInTheDocument();
  });
});
