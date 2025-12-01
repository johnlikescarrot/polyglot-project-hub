/// <reference types="jest" />
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ChatInput } from '@/components/research/ChatInput';

describe('ChatInput Component', () => {
  test('renders textarea and send button', () => {
    render(<ChatInput onSend={jest.fn()} />);
    expect(screen.getByPlaceholderText(/research question/i)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('calls onSend when button clicked', async () => {
    const onSend = jest.fn();
    const user = userEvent.setup();
    render(<ChatInput onSend={onSend} />);
    
    const textarea = screen.getByPlaceholderText(/research question/i);
    const button = screen.getByRole('button');
    
    await user.type(textarea, 'Test message');
    await user.click(button);
    
    expect(onSend).toHaveBeenCalledWith('Test message');
  });

  test('sends on Enter key', async () => {
    const onSend = jest.fn();
    const user = userEvent.setup();
    render(<ChatInput onSend={onSend} />);
    
    const textarea = screen.getByPlaceholderText(/research question/i);
    await user.type(textarea, 'Test{Enter}');
    
    expect(onSend).toHaveBeenCalledWith('Test');
  });

  test('disables when disabled prop is true', () => {
    render(<ChatInput onSend={jest.fn()} disabled />);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  test('trims messages before sending', async () => {
    const onSend = jest.fn();
    const user = userEvent.setup();
    render(<ChatInput onSend={onSend} />);
    
    const textarea = screen.getByPlaceholderText(/research question/i);
    const button = screen.getByRole('button');
    
    await user.type(textarea, '  Test  ');
    await user.click(button);
    
    expect(onSend).toHaveBeenCalledWith('Test');
  });

  test('clears textarea after sending', async () => {
    const user = userEvent.setup();
    render(<ChatInput onSend={jest.fn()} />);
    
    const textarea = screen.getByPlaceholderText(/research question/i) as HTMLTextAreaElement;
    const button = screen.getByRole('button');
    
    await user.type(textarea, 'Test');
    await user.click(button);
    
    expect(textarea.value).toBe('');
  });

  test('does not send empty messages', async () => {
    const onSend = jest.fn();
    const user = userEvent.setup();
    render(<ChatInput onSend={onSend} />);
    
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    
    await user.click(button);
    expect(onSend).not.toHaveBeenCalled();
  });
});
