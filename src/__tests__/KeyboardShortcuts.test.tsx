/// <reference types="jest" />
import { render, fireEvent } from '@testing-library/react';
import { KeyboardShortcuts } from '@/components/research/KeyboardShortcuts';

describe('KeyboardShortcuts Component', () => {
  test('renders keyboard icon button', () => {
    const { container } = render(<KeyboardShortcuts />);
    const button = container.querySelector('button');
    expect(button).toBeInTheDocument();
  });

  test('renders dialog with shortcuts', () => {
    const { container } = render(<KeyboardShortcuts />);
    const button = container.querySelector('button');
    fireEvent.click(button!);
    expect(container.textContent).toContain('Keyboard Shortcuts');
  });

  test('displays all shortcuts in dialog', () => {
    const { container } = render(<KeyboardShortcuts />);
    const button = container.querySelector('button');
    fireEvent.click(button!);
    expect(container.textContent).toContain('New chat');
    expect(container.textContent).toContain('Send message');
  });

  test('calls onNewChat on Ctrl+K', () => {
    const onNewChat = jest.fn();
    render(<KeyboardShortcuts onNewChat={onNewChat} />);
    
    fireEvent.keyDown(window, { key: 'k', ctrlKey: true });
    expect(onNewChat).toHaveBeenCalled();
  });

  test('calls onNewChat on Cmd+K (Mac)', () => {
    const onNewChat = jest.fn();
    render(<KeyboardShortcuts onNewChat={onNewChat} />);
    
    fireEvent.keyDown(window, { key: 'k', metaKey: true });
    expect(onNewChat).toHaveBeenCalled();
  });

  test('does not call onNewChat on other key combinations', () => {
    const onNewChat = jest.fn();
    render(<KeyboardShortcuts onNewChat={onNewChat} />);
    
    fireEvent.keyDown(window, { key: 'j', ctrlKey: true });
    expect(onNewChat).not.toHaveBeenCalled();
  });

  test('removes event listener on unmount', () => {
    const { unmount } = render(<KeyboardShortcuts />);
    const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');
    
    unmount();
    expect(removeEventListenerSpy).toHaveBeenCalledWith('keydown', expect.any(Function));
  });
});
