/// <reference types="jest" />
import { render } from '@testing-library/react';
import { ChatMessage } from '@/components/research/ChatMessage';
import type { Message } from '@/hooks/useStreamingChat';

describe('ChatMessage Component', () => {
  test('renders user message content', () => {
    const message: Message = { role: 'user', content: 'Test user message' };
    const { container } = render(<ChatMessage message={message} />);
    expect(container.textContent).toContain('Test user message');
  });

  test('renders assistant message', () => {
    const message: Message = { role: 'assistant', content: 'Assistant response', model: 'google/gemini-2.5-flash' };
    const { container } = render(<ChatMessage message={message} />);
    expect(container.textContent).toContain('Assistant response');
  });

  test('shows model info for assistant messages', () => {
    const message: Message = { role: 'assistant', content: 'Test', model: 'google/gemini-2.5-flash' };
    const { container } = render(<ChatMessage message={message} />);
    expect(container.textContent).toContain('gemini-2.5-flash');
  });

  test('user message has correct styling', () => {
    const message: Message = { role: 'user', content: 'Test' };
    const { container } = render(<ChatMessage message={message} />);
    expect(container.querySelector('.justify-end')).toBeInTheDocument();
  });

  test('assistant message has correct styling', () => {
    const message: Message = { role: 'assistant', content: 'Test' };
    const { container } = render(<ChatMessage message={message} />);
    expect(container.querySelector('.justify-start')).toBeInTheDocument();
  });
});
