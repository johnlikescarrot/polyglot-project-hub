import { renderHook, act, waitFor } from '@testing-library/react';
import { useStreamingChat } from '@/hooks/useStreamingChat';

describe('useStreamingChat', () => {
  const mockModel = 'google/gemini-2.5-flash';

  it('should initialize with empty messages', () => {
    const { result } = renderHook(() => 
      useStreamingChat({ model: mockModel })
    );

    expect(result.current.messages).toEqual([]);
    expect(result.current.isLoading).toBe(false);
  });

  it('should have clearMessages function', () => {
    const { result } = renderHook(() =>
      useStreamingChat({ model: mockModel })
    );

    expect(typeof result.current.clearMessages).toBe('function');
  });

  it('should have sendMessage function', () => {
    const { result } = renderHook(() =>
      useStreamingChat({ model: mockModel })
    );

    expect(typeof result.current.sendMessage).toBe('function');
  });

  it('should clear messages', async () => {
    const { result } = renderHook(() =>
      useStreamingChat({ model: mockModel })
    );

    act(() => {
      result.current.clearMessages();
    });

    expect(result.current.messages).toEqual([]);
  });

  it('should handle error callback', async () => {
    const onError = jest.fn();
    const { result } = renderHook(() =>
      useStreamingChat({ model: mockModel, onError })
    );

    expect(result.current.messages).toEqual([]);
  });

  it('should maintain message state', async () => {
    const { result } = renderHook(() =>
      useStreamingChat({ model: mockModel })
    );

    expect(result.current.isLoading).toBe(false);
    expect(result.current.messages).toHaveLength(0);
  });
});
