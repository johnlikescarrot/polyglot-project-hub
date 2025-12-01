import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ChatInput } from '@/components/research/ChatInput';

describe('ChatInput Component', () => {
  test('renders textarea and button', () => {
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
    
    await user.type(textarea, 'Test');
    await user.click(button);
    
    expect(onSend).toHaveBeenCalledWith('Test');
  });

  test('sends on Enter key press', async () => {
    const onSend = jest.fn();
    const user = userEvent.setup();
    render(<ChatInput onSend={onSend} />);
    
    const textarea = screen.getByPlaceholderText(/research question/i);
    await user.type(textarea, 'Test{Enter}');
    
    expect(onSend).toHaveBeenCalledWith('Test');
  });

  test('disables button when disabled prop true', () => {
    render(<ChatInput onSend={jest.fn()} disabled={true} />);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  test('trims message before sending', async () => {
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
});
