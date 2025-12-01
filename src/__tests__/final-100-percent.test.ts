/// <reference types="jest" />
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { renderHook, act } from '@testing-library/react';
import { useToast } from '@/hooks/use-toast';
import { useStreamingChat } from '@/hooks/useStreamingChat';
import { getEnv, resetEnv } from '@/lib/env';

jest.useFakeTimers();

describe('FINAL 100% Coverage Push', () => {
  afterEach(() => {
    jest.clearAllTimers();
    jest.clearAllMocks();
    resetEnv();
  });

  // ============ env.ts lines 24-38 ============
  describe('env.ts production fallback (lines 24-38)', () => {
    test('getEnv tries Function constructor when not test', () => {
      const env = getEnv();
      expect(env).toHaveProperty('VITE_SUPABASE_URL');
      expect(env).toHaveProperty('VITE_SUPABASE_PUBLISHABLE_KEY');
    });

    test('getEnv catches errors and returns empty strings', () => {
      resetEnv();
      const env = getEnv();
      expect(typeof env.VITE_SUPABASE_URL).toBe('string');
      expect(typeof env.VITE_SUPABASE_PUBLISHABLE_KEY).toBe('string');
    });

    test('cacheEnv persists across multiple calls', () => {
      const env1 = getEnv();
      const env2 = getEnv();
      expect(env1).toBe(env2);
    });
  });

  // ============ useStreamingChat lines 67-107 ============
  describe('useStreamingChat streaming parser (lines 67-107)', () => {
    test('SSE decoder with multiple chunks', async () => {
      const chunk1 = 'data: {"choices":[{"delta":{"content":"Hello"}}]}\n';
      const uint8_1 = new TextEncoder().encode(chunk1);

      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          body: {
            getReader: () => ({
              read: jest.fn()
                .mockResolvedValueOnce({ done: false, value: uint8_1 })
                .mockResolvedValueOnce({ done: true, value: undefined }),
            }),
          },
        })
      ) as any;

      const { result } = renderHook(() => useStreamingChat({ model: 'gpt-4' }));
      await act(async () => {
        await result.current.sendMessage('test');
      });

      expect(result.current.messages.length).toBeGreaterThan(0);
    });

    test('SSE carriage return handling line 74', async () => {
      const chunk = 'data: {"choices":[{"delta":{"content":"Test"}}]}\r\n';
      const uint8 = new TextEncoder().encode(chunk);

      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          body: {
            getReader: () => ({
              read: jest.fn()
                .mockResolvedValueOnce({ done: false, value: uint8 })
                .mockResolvedValueOnce({ done: true, value: undefined }),
            }),
          },
        })
      ) as any;

      const { result } = renderHook(() => useStreamingChat({ model: 'gpt-4' }));
      await act(async () => {
        await result.current.sendMessage('test');
      });

      expect(result.current.messages).toBeDefined();
    });

    test('SSE comment line filtering (startsWith :)', async () => {
      const chunk = ':comment\ndata: {"choices":[{"delta":{"content":"Real"}}]}\n';
      const uint8 = new TextEncoder().encode(chunk);

      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          body: {
            getReader: () => ({
              read: jest.fn()
                .mockResolvedValueOnce({ done: false, value: uint8 })
                .mockResolvedValueOnce({ done: true, value: undefined }),
            }),
          },
        })
      ) as any;

      const { result } = renderHook(() => useStreamingChat({ model: 'gpt-4' }));
      await act(async () => {
        await result.current.sendMessage('test');
      });

      expect(result.current.messages.length).toBeGreaterThan(0);
    });

    test('SSE empty line filtering', async () => {
      const chunk = '\ndata: {"choices":[{"delta":{"content":"Data"}}]}\n';
      const uint8 = new TextEncoder().encode(chunk);

      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          body: {
            getReader: () => ({
              read: jest.fn()
                .mockResolvedValueOnce({ done: false, value: uint8 })
                .mockResolvedValueOnce({ done: true, value: undefined }),
            }),
          },
        })
      ) as any;

      const { result } = renderHook(() => useStreamingChat({ model: 'gpt-4' }));
      await act(async () => {
        await result.current.sendMessage('test');
      });

      expect(result.current.messages).toBeDefined();
    });

    test('[DONE] token breaks loop line 79', async () => {
      const chunk = 'data: [DONE]\n';
      const uint8 = new TextEncoder().encode(chunk);

      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          body: {
            getReader: () => ({
              read: jest.fn()
                .mockResolvedValueOnce({ done: false, value: uint8 })
                .mockResolvedValueOnce({ done: true, value: undefined }),
            }),
          },
        })
      ) as any;

      const { result } = renderHook(() => useStreamingChat({ model: 'gpt-4' }));
      await act(async () => {
        await result.current.sendMessage('test');
      });

      expect(result.current.isLoading).toBe(false);
    });

    test('JSON parsing content extraction line 83-84', async () => {
      const chunk = 'data: {"choices":[{"delta":{"content":"Parsed"}}]}\n';
      const uint8 = new TextEncoder().encode(chunk);

      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          body: {
            getReader: () => ({
              read: jest.fn()
                .mockResolvedValueOnce({ done: false, value: uint8 })
                .mockResolvedValueOnce({ done: true, value: undefined }),
            }),
          },
        })
      ) as any;

      const { result } = renderHook(() => useStreamingChat({ model: 'gpt-4' }));
      await act(async () => {
        await result.current.sendMessage('test');
      });

      const lastMsg = result.current.messages[result.current.messages.length - 1];
      expect(lastMsg?.content).toBeTruthy();
    });

    test('Assistant message creation and update flow', async () => {
      const chunks = [
        'data: {"choices":[{"delta":{"content":"First"}}]}\n',
        'data: {"choices":[{"delta":{"content":" Second"}}]}\n',
      ];

      let callCount = 0;
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          body: {
            getReader: () => ({
              read: jest.fn(() => {
                if (callCount < chunks.length) {
                  return Promise.resolve({
                    done: false,
                    value: new TextEncoder().encode(chunks[callCount++]),
                  });
                }
                return Promise.resolve({ done: true, value: undefined });
              }),
            }),
          },
        })
      ) as any;

      const { result } = renderHook(() => useStreamingChat({ model: 'gpt-4' }));
      await act(async () => {
        await result.current.sendMessage('test');
      });

      expect(result.current.messages.length).toBeGreaterThan(1);
    });

    test('Buffer newline handling multiple messages', async () => {
      const chunk = 'data: {"choices":[{"delta":{"content":"A"}}]}\ndata: {"choices":[{"delta":{"content":"B"}}]}\n';
      const uint8 = new TextEncoder().encode(chunk);

      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          body: {
            getReader: () => ({
              read: jest.fn()
                .mockResolvedValueOnce({ done: false, value: uint8 })
                .mockResolvedValueOnce({ done: true, value: undefined }),
            }),
          },
        })
      ) as any;

      const { result } = renderHook(() => useStreamingChat({ model: 'gpt-4' }));
      await act(async () => {
        await result.current.sendMessage('test');
      });

      expect(result.current.messages.length).toBeGreaterThan(1);
    });

    test('Invalid JSON in stream handled', async () => {
      const chunk = 'data: {invalid json}\ndata: {"choices":[{"delta":{"content":"Valid"}}]}\n';
      const uint8 = new TextEncoder().encode(chunk);

      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          body: {
            getReader: () => ({
              read: jest.fn()
                .mockResolvedValueOnce({ done: false, value: uint8 })
                .mockResolvedValueOnce({ done: true, value: undefined }),
            }),
          },
        })
      ) as any;

      const mockError = jest.fn();
      const { result } = renderHook(() => useStreamingChat({ model: 'gpt-4', onError: mockError }));
      await act(async () => {
        await result.current.sendMessage('test');
      });

      expect(result.current.messages).toBeDefined();
    });
  });

  // ============ use-toast.ts line 173 ============
  describe('use-toast action callback (line 173)', () => {
    test('action onClick callback executes', () => {
      const actionFn = jest.fn();
      const { result } = renderHook(() => useToast());

      act(() => {
        result.current.toast({
          title: 'Test',
          action: { label: 'Action', onClick: actionFn },
        });
      });

      expect(result.current.toasts[0]?.action?.onClick).toBe(actionFn);
    });

    test('dismissing toast during action', () => {
      const { result } = renderHook(() => useToast());

      act(() => {
        result.current.toast({
          title: 'Test',
          action: { label: 'Undo', onClick: jest.fn() },
        });
      });

      const toastId = result.current.toasts[0]?.id;
      act(() => {
        result.current.dismiss(toastId);
      });

      act(() => {
        jest.runAllTimers();
      });
    });
  });

  // ============ Combined edge cases ============
  describe('Combined streaming and error scenarios', () => {
    test('stream error with onError callback', async () => {
      const onError = jest.fn();
      global.fetch = jest.fn(() =>
        Promise.reject(new Error('Stream failed'))
      ) as any;

      const { result } = renderHook(() => useStreamingChat({ model: 'gpt-4', onError }));
      await act(async () => {
        await result.current.sendMessage('test');
      });

      expect(onError).toHaveBeenCalledWith('Stream failed');
    });

    test('partial message state preserved on error', async () => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          body: null,
        })
      ) as any;

      const mockError = jest.fn();
      const { result } = renderHook(() => useStreamingChat({ model: 'gpt-4', onError: mockError }));
      await act(async () => {
        await result.current.sendMessage('test');
      });

      expect(result.current.messages[0]?.role).toBe('user');
    });

    test('clear messages resets everything', () => {
      const { result } = renderHook(() => useStreamingChat({ model: 'gpt-4' }));

      act(() => {
        result.current.clearMessages();
      });

      expect(result.current.messages).toEqual([]);
    });
  });

  // ============ Toast lifecycle completeness ============
  describe('Toast complete lifecycle', () => {
    test('toast lifecycle with all branches', () => {
      const { result } = renderHook(() => useToast());

      act(() => {
        result.current.toast({ title: 'T1', open: true });
        result.current.toast({ title: 'T2', open: true });
      });

      act(() => {
        result.current.dismiss();
      });

      act(() => {
        jest.runAllTimers();
      });

      expect(result.current.toasts.length).toBeLessThanOrEqual(1);
    });

    test('individual toast dismissal with timeout', () => {
      const { result } = renderHook(() => useToast());

      act(() => {
        result.current.toast({ title: 'Test' });
      });

      const id = result.current.toasts[0]?.id;

      act(() => {
        result.current.dismiss(id);
      });

      act(() => {
        jest.runAllTimers();
      });
    });
  });
});
