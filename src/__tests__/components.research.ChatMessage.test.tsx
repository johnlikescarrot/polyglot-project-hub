import { render, screen } from '@testing-library/react';
import { ChatMessage } from '@/components/research/ChatMessage';
import { Message } from '@/hooks/useStreamingChat';

describe('ChatMessage', () => {
  it('should render user message correctly', () => {
    const message: Message = {
      role: 'user',
      content: 'Test user message',
    };
    
    render(<ChatMessage message={message} />);
    expect(screen.getByText('Test user message')).toBeInTheDocument();
  });

  it('should render assistant message correctly', () => {
    const message: Message = {
      role: 'assistant',
      content: '# Test Assistant Response\nThis is a test.',
      model: 'google/gemini-2.5-flash',
    };
    
    render(<ChatMessage message={message} />);
    expect(screen.getByText(/Test Assistant Response/)).toBeInTheDocument();
  });

  it('should show model info for assistant messages', () => {
    const message: Message = {
      role: 'assistant',
      content: 'Test content',
      model: 'google/gemini-2.5-flash',
    };
    
    render(<ChatMessage message={message} />);
    expect(screen.getByText(/gemini-2.5-flash/)).toBeInTheDocument();
  });

  it('should not show model info for user messages', () => {
    const message: Message = {
      role: 'user',
      content: 'Test user message',
      model: 'google/gemini-2.5-flash',
    };
    
    render(<ChatMessage message={message} />);
    expect(screen.queryByText(/gemini-2.5-flash/)).not.toBeInTheDocument();
  });

  it('should render user avatar for user messages', () => {
    const message: Message = {
      role: 'user',
      content: 'Test message',
    };
    
    const { container } = render(<ChatMessage message={message} />);
    expect(container.querySelector('[role="img"]')).toBeInTheDocument();
  });

  it('should render assistant avatar for assistant messages', () => {
    const message: Message = {
      role: 'assistant',
      content: 'Test message',
    };
    
    const { container } = render(<ChatMessage message={message} />);
    expect(container.querySelector('[role="img"]')).toBeInTheDocument();
  });

  it('should render markdown content for assistant messages', () => {
    const message: Message = {
      role: 'assistant',
      content: '**Bold text** and *italic text*',
    };
    
    render(<ChatMessage message={message} />);
    expect(screen.getByText(/Bold text/)).toBeInTheDocument();
  });

  it('should align user message to right', () => {
    const message: Message = {
      role: 'user',
      content: 'Test',
    };
    
    const { container } = render(<ChatMessage message={message} />);
    expect(container.querySelector('.justify-end')).toBeInTheDocument();
  });

  it('should align assistant message to left', () => {
    const message: Message = {
      role: 'assistant',
      content: 'Test',
    };
    
    const { container } = render(<ChatMessage message={message} />);
    expect(container.querySelector('.justify-start')).toBeInTheDocument();
  });
});
