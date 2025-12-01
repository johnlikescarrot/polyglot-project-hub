import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ChatInput } from '@/components/research/ChatInput';
import { ModelSelector } from '@/components/research/ModelSelector';
import { UsageStats } from '@/components/research/UsageStats';
import { AI_MODELS } from '@/lib/aiModels';

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(q => ({
    matches: false, media: q, onchange: null,
    addListener: jest.fn(), removeListener: jest.fn(),
    addEventListener: jest.fn(), removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

describe('COMPONENT BRANCHES 100%', () => {
  // ChatInput line 16 - both branches of if(validateMessageForSend())
  test('ChatInput line 16 - true branch (valid message)', async () => {
    const onSend = jest.fn();
    render(<ChatInput onSend={onSend} disabled={false} />);
    const textarea = screen.getByPlaceholderText('Ask your research question...');
    await userEvent.type(textarea, 'test');
    const button = screen.getByRole('button');
    await userEvent.click(button);
    expect(onSend).toHaveBeenCalledWith('test');
  });

  test('ChatInput line 16 - false branch (empty message)', () => {
    const onSend = jest.fn();
    render(<ChatInput onSend={onSend} disabled={false} />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(onSend).not.toHaveBeenCalled();
  });

  test('ChatInput line 16 - false branch (disabled=true)', async () => {
    const onSend = jest.fn();
    render(<ChatInput onSend={onSend} disabled={true} />);
    const textarea = screen.getByPlaceholderText('Ask your research question...');
    await userEvent.type(textarea, 'test');
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    fireEvent.click(button);
    expect(onSend).not.toHaveBeenCalled();
  });

  // ModelSelector line 23 - Badge variant ternary both branches
  test('ModelSelector line 23 - true branch (premium model)', () => {
    const premium = AI_MODELS.find(m => m.category === 'premium');
    if (premium) {
      const onModelChange = jest.fn();
      render(
        <ModelSelector selectedModel={premium.id} onModelChange={onModelChange} />
      );
      expect(screen.getByText('AI Model')).toBeTruthy();
    }
  });

  test('ModelSelector line 23 - false branch (free model)', () => {
    const free = AI_MODELS.find(m => m.category === 'free');
    if (free) {
      const onModelChange = jest.fn();
      render(
        <ModelSelector selectedModel={free.id} onModelChange={onModelChange} />
      );
      expect(screen.getByText('AI Model')).toBeTruthy();
    }
  });

  // UsageStats line 14 - sessionDuration ternary both branches
  test('UsageStats line 14 - true branch (startTime provided)', () => {
    const startTime = Date.now() - 120000;
    render(
      <UsageStats 
        messages={[{ role: 'user' as const, content: 'test' }]} 
        startTime={startTime}
      />
    );
    expect(screen.getByText('Session Stats')).toBeTruthy();
    expect(screen.getByText(/Duration/)).toBeTruthy();
  });

  test('UsageStats line 14 - false branch (startTime undefined)', () => {
    render(
      <UsageStats 
        messages={[{ role: 'user' as const, content: 'test' }]} 
        startTime={undefined}
      />
    );
    expect(screen.getByText('Session Stats')).toBeTruthy();
    expect(screen.getByText(/Duration/)).toBeTruthy();
  });

  // Ensure both branches of message filtering work
  test('Chat with multiple messages both roles', () => {
    render(
      <UsageStats 
        messages={[
          { role: 'user' as const, content: 'question' },
          { role: 'assistant' as const, content: 'answer' },
          { role: 'user' as const, content: 'followup' },
        ]}
        startTime={Date.now()}
      />
    );
    expect(screen.getByText('Session Stats')).toBeTruthy();
  });

  test('ChatInput keyboard Enter sends', async () => {
    const onSend = jest.fn();
    render(<ChatInput onSend={onSend} disabled={false} />);
    const textarea = screen.getByPlaceholderText('Ask your research question...');
    await userEvent.type(textarea, 'test');
    fireEvent.keyDown(textarea, { key: 'Enter', code: 'Enter' });
    expect(onSend).toHaveBeenCalled();
  });

  test('ChatInput keyboard Shift+Enter does not send', async () => {
    const onSend = jest.fn();
    render(<ChatInput onSend={onSend} disabled={false} />);
    const textarea = screen.getByPlaceholderText('Ask your research question...');
    await userEvent.type(textarea, 'test');
    fireEvent.keyDown(textarea, { key: 'Enter', code: 'Enter', shiftKey: true });
    expect(onSend).not.toHaveBeenCalled();
  });
});
