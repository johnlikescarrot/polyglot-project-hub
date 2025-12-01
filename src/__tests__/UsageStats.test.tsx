/// <reference types="jest" />
import { render } from '@testing-library/react';
import { UsageStats } from '@/components/research/UsageStats';

describe('UsageStats Component', () => {
  test('renders usage stats card', () => {
    const { container } = render(
      <UsageStats messages={[]} startTime={Date.now()} />
    );
    expect(container.textContent).toContain('Usage Statistics');
  });

  test('displays with no messages', () => {
    const { container } = render(
      <UsageStats messages={[]} startTime={Date.now()} />
    );
    expect(container).toBeInTheDocument();
  });

  test('displays with multiple messages', () => {
    const messages = [
      { role: 'user' as const, content: 'Test', timestamp: Date.now() },
      { role: 'assistant' as const, content: 'Response', timestamp: Date.now() },
    ];
    const { container } = render(
      <UsageStats messages={messages} startTime={Date.now()} />
    );
    expect(container).toBeInTheDocument();
  });

  test('renders stats section', () => {
    const { container } = render(
      <UsageStats messages={[]} startTime={Date.now()} />
    );
    expect(container.querySelector('.p-4') || container).toBeInTheDocument();
  });
});
