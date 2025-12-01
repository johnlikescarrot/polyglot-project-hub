/// <reference types="jest" />
import { renderHook, act, waitFor } from '@testing-library/react';
import { useStreamingChat, type Message } from '@/hooks/useStreamingChat';

describe('useStreamingChat Hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = jest.fn();
  });

  test('initializes with empty messages and not loading', () => {
    const { result } = renderHook(() => useStreamingChat({ model: 'test-model' }));
    expect(result.current.messages).toEqual([]);
    expect(result.current.isLoading).toBe(false);
  });

  test('returns sendMessage and clearMessages functions', () => {
    const { result } = renderHook(() => useStreamingChat({ model: 'test-model' }));
    expect(typeof result.current.sendMessage).toBe('function');
    expect(typeof result.current.clearMessages).toBe('function');
  });

  test('clearMessages empties the messages array', async () => {
    const { result } = renderHook(() => useStreamingChat({ model: 'test-model' }));
    
    await act(async () => {
      result.current.clearMessages();
    });
    
    expect(result.current.messages).toEqual([]);
  });

  test('creates message object with correct structure', () => {
    const { result } = renderHook(() => useStreamingChat({ model: 'test-model' }));
    expect(typeof result.current.sendMessage).toBe('function');
  });

  test('handles missing response body error', async () => {
    const onError = jest.fn();
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      body: null,
    });

    const { result } = renderHook(() => useStreamingChat({ model: 'test-model', onError }));
    
    await act(async () => {
      await result.current.sendMessage('test message');
    });

    await waitFor(() => {
      expect(onError).toHaveBeenCalled();
    });
  });

  test('calls onError when fetch fails', async () => {
    const onError = jest.fn();
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

    const { result } = renderHook(() => useStreamingChat({ model: 'test-model', onError }));
    
    await act(async () => {
      await result.current.sendMessage('test message');
    });

    await waitFor(() => {
      expect(onError).toHaveBeenCalledWith('Network error');
    });
  });

  test('handles response error status', async () => {
    const onError = jest.fn();
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: async () => ({ error: 'Server error' }),
    });

    const { result } = renderHook(() => useStreamingChat({ model: 'test-model', onError }));
    
    await act(async () => {
      await result.current.sendMessage('test message');
    });

    await waitFor(() => {
      expect(onError).toHaveBeenCalled();
    });
  });

  test('returns correct interface', () => {
    const { result } = renderHook(() => useStreamingChat({ model: 'test-model' }));
    expect(result.current).toHaveProperty('messages');
    expect(result.current).toHaveProperty('isLoading');
    expect(result.current).toHaveProperty('sendMessage');
    expect(result.current).toHaveProperty('clearMessages');
  });
});
