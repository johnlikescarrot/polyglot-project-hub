/// <reference types="jest" />
import { render, fireEvent } from '@testing-library/react';
import { QuickActions } from '@/components/research/QuickActions';

describe('QuickActions Component', () => {
  test('renders quick actions card', () => {
    const { container } = render(<QuickActions onQuickQuery={jest.fn()} />);
    expect(container.textContent).toContain('Quick Research Topics');
  });

  test('renders four quick action buttons', () => {
    const { container } = render(<QuickActions onQuickQuery={jest.fn()} />);
    const buttons = container.querySelectorAll('button');
    expect(buttons.length).toBeGreaterThanOrEqual(4);
  });

  test('calls onQuickQuery when button clicked', () => {
    const onQuickQuery = jest.fn();
    const { container } = render(<QuickActions onQuickQuery={onQuickQuery} />);
    const buttons = container.querySelectorAll('button');
    
    fireEvent.click(buttons[0]);
    expect(onQuickQuery).toHaveBeenCalled();
  });

  test('disables buttons when disabled prop is true', () => {
    const { container } = render(<QuickActions onQuickQuery={jest.fn()} disabled={true} />);
    const buttons = container.querySelectorAll('button');
    
    buttons.forEach(button => {
      expect((button as HTMLButtonElement).disabled).toBe(true);
    });
  });

  test('enables buttons when disabled prop is false', () => {
    const { container } = render(<QuickActions onQuickQuery={jest.fn()} disabled={false} />);
    const buttons = container.querySelectorAll('button');
    
    buttons.forEach(button => {
      expect((button as HTMLButtonElement).disabled).toBe(false);
    });
  });

  test('renders action labels', () => {
    const { container } = render(<QuickActions onQuickQuery={jest.fn()} />);
    expect(container.textContent).toContain('Latest AI Trends');
    expect(container.textContent).toContain('Market Analysis');
  });

  test('passes correct query text to onQuickQuery', () => {
    const onQuickQuery = jest.fn();
    const { container } = render(<QuickActions onQuickQuery={onQuickQuery} />);
    const buttons = container.querySelectorAll('button');
    
    fireEvent.click(buttons[0]);
    expect(onQuickQuery).toHaveBeenCalledWith(expect.stringContaining('artificial intelligence'));
  });
});
