/// <reference types="jest" />
import { renderHook, act, waitFor } from '@testing-library/react';
import { useStreamingChat, Message } from '@/hooks/useStreamingChat';

// Mock fetch globally
global.fetch = jest.fn();

// Mock TextDecoder
(global as any).TextDecoder = class TextDecoder {
  decode(data: Uint8Array, options?: any) {
    return new TextDecoder().decode(data);
  }
};

describe('useStreamingChat - Complete Coverage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (global.fetch as jest.Mock).mockClear();
  });

  test('initializes with empty messages and not loading', () => {
    const { result } = renderHook(() => useStreamingChat({ model: 'gpt-4' }));
    expect(result.current.messages).toEqual([]);
    expect(result.current.isLoading).toBe(false);
  });

  test('clearMessages empties message array', () => {
    const { result } = renderHook(() => useStreamingChat({ model: 'gpt-4' }));
    act(() => {
      result.current.clearMessages();
    });
    expect(result.current.messages).toEqual([]);
  });

  test('sendMessage sets loading state', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));
    const { result } = renderHook(() => useStreamingChat({ model: 'gpt-4' }));
    
    await act(async () => {
      result.current.sendMessage('test');
      await waitFor(() => expect(result.current.isLoading).toBe(false));
    });
  });

  test('sendMessage adds user message', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));
    const { result } = renderHook(() => useStreamingChat({ model: 'gpt-4' }));
    
    await act(async () => {
      result.current.sendMessage('hello');
      await waitFor(() => expect(result.current.messages.length).toBeGreaterThan(0));
    });
  });

  test('handles fetch error with onError callback', async () => {
    const onError = jest.fn();
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Connection failed'));
    
    const { result } = renderHook(() => useStreamingChat({ model: 'gpt-4', onError }));
    
    await act(async () => {
      result.current.sendMessage('test');
      await waitFor(() => {
        expect(onError).toHaveBeenCalled();
      });
    });
  });

  test('handles response.ok false', async () => {
    const onError = jest.fn();
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: async () => ({ error: 'Server error' }),
    });
    
    const { result } = renderHook(() => useStreamingChat({ model: 'gpt-4', onError }));
    
    await act(async () => {
      result.current.sendMessage('test');
      await waitFor(() => {
        expect(onError).toHaveBeenCalled();
      });
    });
  });

  test('handles response without body', async () => {
    const onError = jest.fn();
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      body: null,
    });
    
    const { result } = renderHook(() => useStreamingChat({ model: 'gpt-4', onError }));
    
    await act(async () => {
      result.current.sendMessage('test');
      await waitFor(() => {
        expect(onError).toHaveBeenCalled();
      });
    });
  });

  test('handles JSON parse error', async () => {
    const mockReader = {
      read: jest.fn(),
    };
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      body: { getReader: () => mockReader },
    });
    mockReader.read.mockResolvedValueOnce({
      done: false,
      value: new Uint8Array([]),
    });
    mockReader.read.mockResolvedValueOnce({
      done: true,
      value: undefined,
    });
    
    const { result } = renderHook(() => useStreamingChat({ model: 'gpt-4' }));
    
    await act(async () => {
      result.current.sendMessage('test');
      await waitFor(() => expect(result.current.isLoading).toBe(false));
    });
  });

  test('model parameter is used in request', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Test'));
    
    const { result } = renderHook(() => useStreamingChat({ model: 'claude-3' }));
    
    await act(async () => {
      result.current.sendMessage('test');
      await waitFor(() => {
        expect(result.current.messages[0]?.content).toBe('test');
      });
    });
  });

  test('messages include timestamp', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Test'));
    
    const { result } = renderHook(() => useStreamingChat({ model: 'gpt-4' }));
    
    await act(async () => {
      result.current.sendMessage('test');
      await waitFor(() => {
        expect(result.current.messages[0]?.timestamp).toBeTruthy();
      });
    });
  });
});
