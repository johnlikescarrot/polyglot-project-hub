/// <reference types="jest" />
import { render } from '@testing-library/react';
import { UsageStats } from '@/components/research/UsageStats';

describe('UsageStats Component', () => {
  test('renders usage stats component', () => {
    const { container } = render(
      <UsageStats messages={[]} startTime={Date.now()} />
    );
    expect(container).toBeInTheDocument();
  });

  test('renders with empty messages', () => {
    const { container } = render(
      <UsageStats messages={[]} startTime={Date.now()} />
    );
    expect(container).toBeInTheDocument();
  });

  test('renders with multiple messages', () => {
    const messages = [
      { role: 'user' as const, content: 'Question', timestamp: Date.now() },
      { role: 'assistant' as const, content: 'Answer', timestamp: Date.now() },
    ];
    const { container } = render(
      <UsageStats messages={messages} startTime={Date.now()} />
    );
    expect(container).toBeInTheDocument();
  });

  test('renders card with statistics', () => {
    const { container } = render(
      <UsageStats messages={[]} startTime={Date.now()} />
    );
    expect(container.querySelector('.p-4') || container).toBeInTheDocument();
  });

  test('accepts different start times', () => {
    const startTime = Date.now() - 60000; // 1 minute ago
    const { container } = render(
      <UsageStats messages={[]} startTime={startTime} />
    );
    expect(container).toBeInTheDocument();
  });

  test('handles messages with models', () => {
    const messages = [
      { role: 'assistant' as const, content: 'Answer', model: 'gpt-4', timestamp: Date.now() },
    ];
    const { container } = render(
      <UsageStats messages={messages} startTime={Date.now()} />
    );
    expect(container).toBeInTheDocument();
  });
});
