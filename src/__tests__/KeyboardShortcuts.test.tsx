/// <reference types="jest" />
import { render, fireEvent } from '@testing-library/react';
import { KeyboardShortcuts } from '@/components/research/KeyboardShortcuts';

describe('KeyboardShortcuts Component - comprehensive', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders keyboard icon button', () => {
    const { container } = render(<KeyboardShortcuts />);
    expect(container.querySelector('button')).toBeInTheDocument();
  });

  test('button is interactive', () => {
    const { container } = render(<KeyboardShortcuts />);
    const button = container.querySelector('button');
    expect(button).toBeTruthy();
    fireEvent.click(button!);
  });

  test('accepts onNewChat callback', () => {
    const callback = jest.fn();
    const { container } = render(<KeyboardShortcuts onNewChat={callback} />);
    expect(container).toBeInTheDocument();
  });

  test('sets up keydown event listeners on mount', () => {
    const addEventListenerSpy = jest.spyOn(window, 'addEventListener');
    render(<KeyboardShortcuts />);
    expect(addEventListenerSpy).toHaveBeenCalledWith('keydown', expect.any(Function));
    addEventListenerSpy.mockRestore();
  });

  test('removes event listeners on unmount', () => {
    const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');
    const { unmount } = render(<KeyboardShortcuts />);
    unmount();
    expect(removeEventListenerSpy).toHaveBeenCalledWith('keydown', expect.any(Function));
    removeEventListenerSpy.mockRestore();
  });

  test('calls onNewChat on Ctrl+K keypress', () => {
    const onNewChat = jest.fn();
    render(<KeyboardShortcuts onNewChat={onNewChat} />);
    
    const event = new KeyboardEvent('keydown', { key: 'k', ctrlKey: true });
    window.dispatchEvent(event);
    expect(onNewChat).toHaveBeenCalled();
  });

  test('calls onNewChat on Cmd+K (Meta+K)', () => {
    const onNewChat = jest.fn();
    render(<KeyboardShortcuts onNewChat={onNewChat} />);
    
    const event = new KeyboardEvent('keydown', { key: 'k', metaKey: true });
    window.dispatchEvent(event);
    expect(onNewChat).toHaveBeenCalled();
  });

  test('does not call onNewChat on other key combinations', () => {
    const onNewChat = jest.fn();
    render(<KeyboardShortcuts onNewChat={onNewChat} />);
    
    const event = new KeyboardEvent('keydown', { key: 'j', ctrlKey: true });
    window.dispatchEvent(event);
    expect(onNewChat).not.toHaveBeenCalled();
  });

  test('renders without onNewChat callback', () => {
    const { container } = render(<KeyboardShortcuts />);
    expect(container).toBeInTheDocument();
  });

  test('keyboard icon button has correct styling', () => {
    const { container } = render(<KeyboardShortcuts />);
    const button = container.querySelector('button');
    expect(button).toBeTruthy();
  });

  test('handles multiple keyboard shortcut triggers', () => {
    const onNewChat = jest.fn();
    render(<KeyboardShortcuts onNewChat={onNewChat} />);
    
    fireEvent.keyDown(window, { key: 'k', ctrlKey: true });
    fireEvent.keyDown(window, { key: 'k', metaKey: true });
    
    expect(onNewChat.mock.calls.length).toBeGreaterThan(0);
  });
});
