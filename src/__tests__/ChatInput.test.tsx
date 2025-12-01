/// <reference types="jest" />
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ChatInput } from '@/components/research/ChatInput';

describe('ChatInput Component', () => {
  test('renders textarea and send button', () => {
    const { container } = render(<ChatInput onSend={jest.fn()} />);
    const textarea = container.querySelector('textarea');
    const button = container.querySelector('button');
    expect(textarea).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  test('calls onSend when button clicked', async () => {
    const onSend = jest.fn();
    const user = userEvent.setup();
    const { container } = render(<ChatInput onSend={onSend} />);
    
    const textarea = container.querySelector('textarea') as HTMLTextAreaElement;
    const button = container.querySelector('button') as HTMLButtonElement;
    
    await user.type(textarea, 'Test message');
    await user.click(button);
    
    expect(onSend).toHaveBeenCalledWith('Test message');
  });

  test('sends on Enter key', async () => {
    const onSend = jest.fn();
    const user = userEvent.setup();
    const { container } = render(<ChatInput onSend={onSend} />);
    
    const textarea = container.querySelector('textarea') as HTMLTextAreaElement;
    await user.type(textarea, 'Test{Enter}');
    
    expect(onSend).toHaveBeenCalledWith('Test');
  });

  test('disables when disabled prop is true', () => {
    const { container } = render(<ChatInput onSend={jest.fn()} disabled />);
    const button = container.querySelector('button') as HTMLButtonElement;
    expect(button.disabled).toBe(true);
  });

  test('trims messages before sending', async () => {
    const onSend = jest.fn();
    const user = userEvent.setup();
    const { container } = render(<ChatInput onSend={onSend} />);
    
    const textarea = container.querySelector('textarea') as HTMLTextAreaElement;
    const button = container.querySelector('button') as HTMLButtonElement;
    
    await user.type(textarea, '  Test  ');
    await user.click(button);
    
    expect(onSend).toHaveBeenCalledWith('Test');
  });
});
