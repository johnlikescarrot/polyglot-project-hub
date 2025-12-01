/// <reference types="jest" />
import { render } from '@testing-library/react';
import { ChatMessage } from '@/components/research/ChatMessage';
import type { Message } from '@/hooks/useStreamingChat';

describe('ChatMessage Component', () => {
  test('renders user message', () => {
    const message: Message = {
      role: 'user',
      content: 'Test message',
    };
    const { container } = render(<ChatMessage message={message} />);
    expect(container.textContent).toContain('Test message');
  });

  test('renders assistant message', () => {
    const message: Message = {
      role: 'assistant',
      content: '# Header\nContent',
      model: 'google/gemini-2.5-flash',
    };
    const { container } = render(<ChatMessage message={message} />);
    expect(container.textContent).toContain('Header');
  });

  test('shows model info for assistant', () => {
    const message: Message = {
      role: 'assistant',
      content: 'Test',
      model: 'google/gemini-2.5-flash',
    };
    const { container } = render(<ChatMessage message={message} />);
    expect(container.textContent).toContain('gemini-2.5-flash');
  });

  test('hides model info for user', () => {
    const message: Message = {
      role: 'user',
      content: 'Test',
      model: 'google/gemini-2.5-flash',
    };
    const { container } = render(<ChatMessage message={message} />);
    expect(container.textContent).not.toContain('Model: google');
  });
});
