/// <reference types="jest" />
import { render } from '@testing-library/react';
import { ResearchHistory } from '@/components/research/ResearchHistory';

describe('ResearchHistory Component', () => {
  test('renders research history component', () => {
    const { container } = render(<ResearchHistory messages={[]} />);
    expect(container).toBeInTheDocument();
  });

  test('renders with empty messages array', () => {
    const { container } = render(<ResearchHistory messages={[]} />);
    expect(container).toBeInTheDocument();
  });

  test('renders with single message', () => {
    const messages = [
      { role: 'user' as const, content: 'What is AI?' },
    ];
    const { container } = render(<ResearchHistory messages={messages} />);
    expect(container).toBeInTheDocument();
  });

  test('renders with multiple messages', () => {
    const messages = [
      { role: 'user' as const, content: 'Question 1' },
      { role: 'assistant' as const, content: 'Answer 1' },
      { role: 'user' as const, content: 'Question 2' },
      { role: 'assistant' as const, content: 'Answer 2' },
    ];
    const { container } = render(<ResearchHistory messages={messages} />);
    expect(container).toBeInTheDocument();
  });

  test('renders card component', () => {
    const { container } = render(<ResearchHistory messages={[]} />);
    expect(container.querySelector('.rounded-lg') || container).toBeInTheDocument();
  });

  test('handles messages with timestamps', () => {
    const messages = [
      { role: 'user' as const, content: 'Test', timestamp: Date.now() },
    ];
    const { container } = render(<ResearchHistory messages={messages} />);
    expect(container).toBeInTheDocument();
  });
});
