/// <reference types="jest" />
import { render } from '@testing-library/react';
import { KeyboardShortcuts } from '@/components/research/KeyboardShortcuts';

describe('KeyboardShortcuts Component', () => {
  test('renders keyboard icon button', () => {
    const { container } = render(<KeyboardShortcuts />);
    expect(container.querySelector('button')).toBeInTheDocument();
  });

  test('renders component without error', () => {
    const { container } = render(<KeyboardShortcuts />);
    expect(container).toBeInTheDocument();
  });

  test('accepts onNewChat callback', () => {
    const callback = jest.fn();
    const { container } = render(<KeyboardShortcuts onNewChat={callback} />);
    expect(container).toBeInTheDocument();
  });

  test('sets up event listeners on mount', () => {
    const addEventListenerSpy = jest.spyOn(window, 'addEventListener');
    render(<KeyboardShortcuts />);
    expect(addEventListenerSpy).toHaveBeenCalledWith('keydown', expect.any(Function));
  });

  test('removes event listeners on unmount', () => {
    const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');
    const { unmount } = render(<KeyboardShortcuts />);
    unmount();
    expect(removeEventListenerSpy).toHaveBeenCalledWith('keydown', expect.any(Function));
  });

  test('calls onNewChat when Ctrl+K is pressed', () => {
    const onNewChat = jest.fn();
    render(<KeyboardShortcuts onNewChat={onNewChat} />);
    
    const event = new KeyboardEvent('keydown', { key: 'k', ctrlKey: true });
    window.dispatchEvent(event);
    expect(onNewChat).toHaveBeenCalled();
  });

  test('calls onNewChat when Cmd+K is pressed on Mac', () => {
    const onNewChat = jest.fn();
    render(<KeyboardShortcuts onNewChat={onNewChat} />);
    
    const event = new KeyboardEvent('keydown', { key: 'k', metaKey: true });
    window.dispatchEvent(event);
    expect(onNewChat).toHaveBeenCalled();
  });
});
