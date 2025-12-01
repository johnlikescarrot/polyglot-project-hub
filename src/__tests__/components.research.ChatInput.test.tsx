import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ChatInput } from '@/components/research/ChatInput';

describe('ChatInput', () => {
  it('should render textarea and send button', () => {
    const onSend = jest.fn();
    render(<ChatInput onSend={onSend} />);
    
    expect(screen.getByPlaceholderText(/Ask your research question/i)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should call onSend when send button clicked', async () => {
    const onSend = jest.fn();
    render(<ChatInput onSend={onSend} />);
    
    const textarea = screen.getByPlaceholderText(/Ask your research question/i);
    const button = screen.getByRole('button');
    
    await userEvent.type(textarea, 'Test message');
    await userEvent.click(button);
    
    expect(onSend).toHaveBeenCalledWith('Test message');
  });

  it('should call onSend on Enter key press', async () => {
    const onSend = jest.fn();
    render(<ChatInput onSend={onSend} />);
    
    const textarea = screen.getByPlaceholderText(/Ask your research question/i);
    await userEvent.type(textarea, 'Test message{Enter}');
    
    expect(onSend).toHaveBeenCalledWith('Test message');
  });

  it('should not call onSend on Shift+Enter', async () => {
    const onSend = jest.fn();
    render(<ChatInput onSend={onSend} />);
    
    const textarea = screen.getByPlaceholderText(/Ask your research question/i) as HTMLTextAreaElement;
    await userEvent.type(textarea, 'Test message');
    fireEvent.keyDown(textarea, { key: 'Enter', shiftKey: true });
    
    expect(onSend).not.toHaveBeenCalled();
  });

  it('should trim message before sending', async () => {
    const onSend = jest.fn();
    render(<ChatInput onSend={onSend} />);
    
    const textarea = screen.getByPlaceholderText(/Ask your research question/i);
    const button = screen.getByRole('button');
    
    await userEvent.type(textarea, '  Test message  ');
    await userEvent.click(button);
    
    expect(onSend).toHaveBeenCalledWith('Test message');
  });

  it('should disable send button when disabled prop is true', () => {
    render(<ChatInput onSend={jest.fn()} disabled={true} />);
    
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('should disable send button when message is empty', () => {
    render(<ChatInput onSend={jest.fn()} />);
    
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('should clear textarea after sending', async () => {
    render(<ChatInput onSend={jest.fn()} />);
    
    const textarea = screen.getByPlaceholderText(/Ask your research question/i) as HTMLTextAreaElement;
    const button = screen.getByRole('button');
    
    await userEvent.type(textarea, 'Test message');
    await userEvent.click(button);
    
    expect(textarea.value).toBe('');
  });

  it('should not send empty messages', async () => {
    const onSend = jest.fn();
    render(<ChatInput onSend={onSend} />);
    
    const button = screen.getByRole('button');
    await userEvent.click(button);
    
    expect(onSend).not.toHaveBeenCalled();
  });

  it('should not send whitespace-only messages', async () => {
    const onSend = jest.fn();
    render(<ChatInput onSend={onSend} />);
    
    const textarea = screen.getByPlaceholderText(/Ask your research question/i);
    const button = screen.getByRole('button');
    
    await userEvent.type(textarea, '   ');
    await userEvent.click(button);
    
    expect(onSend).not.toHaveBeenCalled();
  });
});
