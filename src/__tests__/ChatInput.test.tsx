/// <reference types="jest" />
import { render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ChatInput } from '@/components/research/ChatInput';

describe('ChatInput Component', () => {
  test('renders textarea with placeholder', () => {
    const { container } = render(<ChatInput onSend={jest.fn()} />);
    const textarea = container.querySelector('textarea');
    expect(textarea).toBeInTheDocument();
  });

  test('renders send button', () => {
    const { container } = render(<ChatInput onSend={jest.fn()} />);
    const button = container.querySelector('button');
    expect(button).toBeInTheDocument();
  });

  test('calls onSend with message on button click', async () => {
    const onSend = jest.fn();
    const user = userEvent.setup();
    const { container } = render(<ChatInput onSend={onSend} />);
    
    const textarea = container.querySelector('textarea') as HTMLTextAreaElement;
    const button = container.querySelector('button') as HTMLButtonElement;
    
    await user.type(textarea, 'Test message');
    await user.click(button);
    
    expect(onSend).toHaveBeenCalledWith('Test message');
  });

  test('sends message on Enter key', async () => {
    const onSend = jest.fn();
    const { container } = render(<ChatInput onSend={onSend} />);
    
    const textarea = container.querySelector('textarea') as HTMLTextAreaElement;
    fireEvent.change(textarea, { target: { value: 'Test' } });
    fireEvent.keyDown(textarea, { key: 'Enter', code: 'Enter' });
    
    expect(onSend).toHaveBeenCalled();
  });

  test('does not send on Shift+Enter', async () => {
    const onSend = jest.fn();
    const { container } = render(<ChatInput onSend={onSend} />);
    
    const textarea = container.querySelector('textarea') as HTMLTextAreaElement;
    fireEvent.change(textarea, { target: { value: 'Test' } });
    fireEvent.keyDown(textarea, { key: 'Enter', shiftKey: true });
    
    expect(onSend).not.toHaveBeenCalled();
  });

  test('disables button when disabled prop is true', () => {
    const { container } = render(<ChatInput onSend={jest.fn()} disabled={true} />);
    const button = container.querySelector('button') as HTMLButtonElement;
    expect(button.disabled).toBe(true);
  });

  test('trims message before sending', async () => {
    const onSend = jest.fn();
    const user = userEvent.setup();
    const { container } = render(<ChatInput onSend={onSend} />);
    
    const textarea = container.querySelector('textarea') as HTMLTextAreaElement;
    const button = container.querySelector('button') as HTMLButtonElement;
    
    await user.type(textarea, '  Test  ');
    await user.click(button);
    
    expect(onSend).toHaveBeenCalledWith('Test');
  });

  test('clears textarea after sending', async () => {
    const user = userEvent.setup();
    const { container } = render(<ChatInput onSend={jest.fn()} />);
    
    const textarea = container.querySelector('textarea') as HTMLTextAreaElement;
    const button = container.querySelector('button') as HTMLButtonElement;
    
    await user.type(textarea, 'Test');
    await user.click(button);
    
    expect(textarea.value).toBe('');
  });

  test('button disabled with empty message', () => {
    const { container } = render(<ChatInput onSend={jest.fn()} />);
    const button = container.querySelector('button') as HTMLButtonElement;
    expect(button.disabled).toBe(true);
  });

  test('button disabled with whitespace message', async () => {
    const user = userEvent.setup();
    const { container } = render(<ChatInput onSend={jest.fn()} />);
    
    const textarea = container.querySelector('textarea') as HTMLTextAreaElement;
    const button = container.querySelector('button') as HTMLButtonElement;
    
    await user.type(textarea, '   ');
    
    expect(button.disabled).toBe(true);
  });
});
