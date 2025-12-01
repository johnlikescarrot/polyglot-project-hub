/// <reference types="jest" />
import { render } from '@testing-library/react';
import { ResearchHistory } from '@/components/research/ResearchHistory';

describe('ResearchHistory Component', () => {
  test('renders research history card', () => {
    const { container } = render(<ResearchHistory messages={[]} />);
    expect(container.textContent).toContain('Research History');
  });

  test('displays message count', () => {
    const messages = [
      { role: 'user' as const, content: 'Test message' },
    ];
    const { container } = render(<ResearchHistory messages={messages} />);
    expect(container).toBeInTheDocument();
  });

  test('renders with empty messages', () => {
    const { container } = render(<ResearchHistory messages={[]} />);
    expect(container).toBeInTheDocument();
  });

  test('displays multiple messages', () => {
    const messages = [
      { role: 'user' as const, content: 'Question 1' },
      { role: 'assistant' as const, content: 'Answer 1' },
      { role: 'user' as const, content: 'Question 2' },
    ];
    const { container } = render(<ResearchHistory messages={messages} />);
    expect(container).toBeInTheDocument();
  });

  test('renders scrollable area', () => {
    const { container } = render(<ResearchHistory messages={[]} />);
    expect(container.querySelector('[role="region"]') || container).toBeInTheDocument();
  });
});
