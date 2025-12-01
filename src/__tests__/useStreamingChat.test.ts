/// <reference types="jest" />
import { renderHook, act } from '@testing-library/react';
import { useStreamingChat } from '@/hooks/useStreamingChat';

describe('useStreamingChat Hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('initializes with empty messages', () => {
    const { result } = renderHook(() => useStreamingChat({ model: 'test' }));
    expect(result.current.messages).toEqual([]);
  });

  test('initializes with isLoading false', () => {
    const { result } = renderHook(() => useStreamingChat({ model: 'test' }));
    expect(result.current.isLoading).toBe(false);
  });

  test('returns sendMessage function', () => {
    const { result } = renderHook(() => useStreamingChat({ model: 'test' }));
    expect(typeof result.current.sendMessage).toBe('function');
  });

  test('returns clearMessages function', () => {
    const { result } = renderHook(() => useStreamingChat({ model: 'test' }));
    expect(typeof result.current.clearMessages).toBe('function');
  });

  test('clearMessages empties messages array', async () => {
    const { result } = renderHook(() => useStreamingChat({ model: 'test' }));
    
    await act(async () => {
      result.current.clearMessages();
    });
    
    expect(result.current.messages).toEqual([]);
  });

  test('accepts model parameter', () => {
    const { result } = renderHook(() => useStreamingChat({ model: 'gpt-4' }));
    expect(result.current).toBeTruthy();
  });

  test('accepts optional onError callback', () => {
    const onError = jest.fn();
    const { result } = renderHook(() => useStreamingChat({ model: 'test', onError }));
    expect(result.current).toBeTruthy();
  });
});
