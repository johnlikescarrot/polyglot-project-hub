/// <reference types="jest" />
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ChatInput } from '@/components/research/ChatInput';
import * as extractors from '@/lib/coverage-extractors';

describe('ChatInput 100% Coverage', () => {
  test('validateMessageForSend: all 4 branches', () => {
    // disabled=false, message empty: false
    expect(extractors.validateMessageForSend('', false)).toBe(false);
    // disabled=false, message="text": true
    expect(extractors.validateMessageForSend('hello', false)).toBe(true);
    // disabled=true, message="text": false
    expect(extractors.validateMessageForSend('hello', true)).toBe(false);
    // disabled=true, message empty: false
    expect(extractors.validateMessageForSend('', true)).toBe(false);
  });

  test('shouldDisableSendButton: all paths', () => {
    expect(extractors.shouldDisableSendButton('', false)).toBe(true);
    expect(extractors.shouldDisableSendButton('text', false)).toBe(false);
    expect(extractors.shouldDisableSendButton('text', true)).toBe(true);
  });

  test('ChatInput with empty message - button disabled', () => {
    const mockSend = jest.fn();
    const { container } = render(<ChatInput onSend={mockSend} disabled={false} />);
    
    const button = container.querySelector('button');
    expect(button?.disabled).toBe(true);
  });

  test('ChatInput with message - button enabled', () => {
    const mockSend = jest.fn();
    const { container } = render(<ChatInput onSend={mockSend} disabled={false} />);
    
    const textarea = container.querySelector('textarea') as HTMLTextAreaElement;
    fireEvent.change(textarea, { target: { value: 'hello' } });
    
    const button = container.querySelector('button');
    expect(button?.disabled).toBe(false);
  });

  test('ChatInput with disabled prop - button always disabled', () => {
    const mockSend = jest.fn();
    const { container } = render(<ChatInput onSend={mockSend} disabled={true} />);
    
    const textarea = container.querySelector('textarea') as HTMLTextAreaElement;
    fireEvent.change(textarea, { target: { value: 'hello' } });
    
    const button = container.querySelector('button');
    expect(button?.disabled).toBe(true);
  });

  test('ChatInput handleSend true branch', () => {
    const mockSend = jest.fn();
    const { container } = render(<ChatInput onSend={mockSend} disabled={false} />);
    
    const textarea = container.querySelector('textarea') as HTMLTextAreaElement;
    fireEvent.change(textarea, { target: { value: 'hello' } });
    
    const button = container.querySelector('button') as HTMLButtonElement;
    fireEvent.click(button);
    
    expect(mockSend).toHaveBeenCalledWith('hello');
  });

  test('ChatInput handleSend false branch (empty message)', () => {
    const mockSend = jest.fn();
    const { container } = render(<ChatInput onSend={mockSend} disabled={false} />);
    
    const button = container.querySelector('button') as HTMLButtonElement;
    fireEvent.click(button);
    
    expect(mockSend).not.toHaveBeenCalled();
  });

  test('ChatInput handleKeyPress Enter key', () => {
    const mockSend = jest.fn();
    const { container } = render(<ChatInput onSend={mockSend} disabled={false} />);
    
    const textarea = container.querySelector('textarea') as HTMLTextAreaElement;
    fireEvent.change(textarea, { target: { value: 'hello' } });
    
    fireEvent.keyDown(textarea, { key: 'Enter', shiftKey: false });
    
    expect(mockSend).toHaveBeenCalledWith('hello');
  });

  test('ChatInput handleKeyPress Shift+Enter - no send', () => {
    const mockSend = jest.fn();
    const { container } = render(<ChatInput onSend={mockSend} disabled={false} />);
    
    const textarea = container.querySelector('textarea') as HTMLTextAreaElement;
    fireEvent.change(textarea, { target: { value: 'hello' } });
    
    fireEvent.keyDown(textarea, { key: 'Enter', shiftKey: true });
    
    expect(mockSend).not.toHaveBeenCalled();
  });

  test('Both if branches in handleSend', () => {
    const mockSend = jest.fn();
    const { container } = render(<ChatInput onSend={mockSend} disabled={false} />);
    
    const textarea = container.querySelector('textarea') as HTMLTextAreaElement;
    const button = container.querySelector('button') as HTMLButtonElement;

    // True branch: message with content
    fireEvent.change(textarea, { target: { value: 'test' } });
    fireEvent.click(button);
    expect(mockSend).toHaveBeenCalled();

    // False branch: empty message
    fireEvent.change(textarea, { target: { value: '' } });
    fireEvent.click(button);
    // Should still be 1 call total
    expect(mockSend).toHaveBeenCalledTimes(1);
  });
});
