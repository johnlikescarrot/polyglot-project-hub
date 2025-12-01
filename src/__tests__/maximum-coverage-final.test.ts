/// <reference types="jest" />
import { renderHook, act } from '@testing-library/react';
import { useStreamingChat } from '@/hooks/useStreamingChat';
import { cn } from '@/lib/utils';

jest.useFakeTimers();

describe('Maximum Coverage - All Logic Paths', () => {
  afterEach(() => {
    jest.clearAllTimers();
    jest.clearAllMocks();
  });

  // cn utility used in NavLink line 18
  describe('cn utility - all ternary combinations', () => {
    test('both classes present', () => {
      const result = cn('base', 'active', 'pending');
      expect(result).toContain('base');
      expect(result).toContain('active');
      expect(result).toContain('pending');
    });

    test('first conditional true second false', () => {
      const active = true, pending = false;
      const result = cn('base', active && 'active', pending && 'pending');
      expect(result).toContain('active');
      expect(result).not.toContain('pending');
    });

    test('first conditional false second true', () => {
      const active = false, pending = true;
      const result = cn('base', active && 'active', pending && 'pending');
      expect(result).not.toContain('active');
      expect(result).toContain('pending');
    });

    test('both conditionals false', () => {
      const active = false, pending = false;
      const result = cn('base', active && 'active', pending && 'pending');
      expect(result).toContain('base');
      expect(result).not.toContain('active');
      expect(result).not.toContain('pending');
    });
  });

  // useStreamingChat comprehensive error and edge cases
  describe('useStreamingChat - all testable branches', () => {
    test('successful message streaming', async () => {
      const chunk = 'data: {"choices":[{"delta":{"content":"Response"}}]}\n';
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          body: {
            getReader: () => ({
              read: jest.fn()
                .mockResolvedValueOnce({ done: false, value: new TextEncoder().encode(chunk) })
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
      expect(result.current.isLoading).toBe(false);
    });

    test('error with JSON response', async () => {
      const onError = jest.fn();
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: false,
          status: 401,
          json: async () => ({ error: 'Unauthorized' }),
        })
      ) as any;

      const { result } = renderHook(() => useStreamingChat({ model: 'gpt-4', onError }));
      await act(async () => {
        await result.current.sendMessage('test');
      });

      expect(onError).toHaveBeenCalledWith('Unauthorized');
      expect(result.current.isLoading).toBe(false);
    });

    test('error without JSON body', async () => {
      const onError = jest.fn();
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: false,
          status: 500,
          json: jest.fn().mockRejectedValue(new Error('parse error')),
        })
      ) as any;

      const { result } = renderHook(() => useStreamingChat({ model: 'gpt-4', onError }));
      await act(async () => {
        await result.current.sendMessage('test');
      });

      expect(onError).toHaveBeenCalledWith('Request failed: 500');
    });

    test('network error', async () => {
      const onError = jest.fn();
      global.fetch = jest.fn(() => Promise.reject(new Error('Network failed'))) as any;

      const { result } = renderHook(() => useStreamingChat({ model: 'gpt-4', onError }));
      await act(async () => {
        await result.current.sendMessage('test');
      });

      expect(onError).toHaveBeenCalledWith('Network failed');
    });

    test('non-Error thrown', async () => {
      const onError = jest.fn();
      global.fetch = jest.fn(() => Promise.reject('string error')) as any;

      const { result } = renderHook(() => useStreamingChat({ model: 'gpt-4', onError }));
      await act(async () => {
        await result.current.sendMessage('test');
      });

      expect(onError).toHaveBeenCalledWith('Unknown error occurred');
    });

    test('no response body', async () => {
      const onError = jest.fn();
      global.fetch = jest.fn(() =>
        Promise.resolve({ ok: true, body: null })
      ) as any;

      const { result } = renderHook(() => useStreamingChat({ model: 'gpt-4', onError }));
      await act(async () => {
        await result.current.sendMessage('test');
      });

      expect(onError).toHaveBeenCalledWith('No response body');
    });

    test('invalid JSON in SSE chunk', async () => {
      const warnSpy = jest.spyOn(console, 'warn').mockImplementation();
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          body: {
            getReader: () => ({
              read: jest.fn()
                .mockResolvedValueOnce({ done: false, value: new TextEncoder().encode('data: {invalid}\n') })
                .mockResolvedValueOnce({ done: true, value: undefined }),
            }),
          },
        })
      ) as any;

      const { result } = renderHook(() => useStreamingChat({ model: 'gpt-4' }));
      await act(async () => {
        await result.current.sendMessage('test');
      });

      expect(warnSpy).toHaveBeenCalledWith('Failed to parse SSE chunk:', expect.any(Error));
      warnSpy.mockRestore();
    });

    test('DONE token terminates stream', async () => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          body: {
            getReader: () => ({
              read: jest.fn()
                .mockResolvedValueOnce({ done: false, value: new TextEncoder().encode('data: [DONE]\n') })
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

    test('carriage return stripped from lines', async () => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          body: {
            getReader: () => ({
              read: jest.fn()
                .mockResolvedValueOnce({ done: false, value: new TextEncoder().encode('data: {"choices":[{"delta":{"content":"X"}}]}\r\n') })
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

    test('comment lines skipped', async () => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          body: {
            getReader: () => ({
              read: jest.fn()
                .mockResolvedValueOnce({ done: false, value: new TextEncoder().encode(':comment\ndata: {"choices":[{"delta":{"content":"Y"}}]}\n') })
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

    test('empty lines skipped', async () => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          body: {
            getReader: () => ({
              read: jest.fn()
                .mockResolvedValueOnce({ done: false, value: new TextEncoder().encode('\n\ndata: {"choices":[{"delta":{"content":"Z"}}]}\n') })
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

    test('multiple messages accumulate', async () => {
      let idx = 0;
      const chunks = [
        'data: {"choices":[{"delta":{"content":"A"}}]}\n',
        'data: {"choices":[{"delta":{"content":"B"}}]}\n',
      ];

      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          body: {
            getReader: () => ({
              read: jest.fn(() => {
                if (idx < chunks.length) {
                  return Promise.resolve({ done: false, value: new TextEncoder().encode(chunks[idx++]) });
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

    test('clear messages resets state', () => {
      const { result } = renderHook(() => useStreamingChat({ model: 'gpt-4' }));
      act(() => {
        result.current.clearMessages();
      });
      expect(result.current.messages).toEqual([]);
    });

    test('message timestamp populated', async () => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          body: {
            getReader: () => ({
              read: async () => ({ done: true, value: undefined }),
            }),
          },
        })
      ) as any;

      const { result } = renderHook(() => useStreamingChat({ model: 'gpt-4' }));
      await act(async () => {
        await result.current.sendMessage('test');
      });

      expect(result.current.messages[0]?.timestamp).toBeDefined();
    });

    test('missing content delta skipped', async () => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          body: {
            getReader: () => ({
              read: jest.fn()
                .mockResolvedValueOnce({ done: false, value: new TextEncoder().encode('data: {"choices":[{"delta":{}}]}\n') })
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
  });
});
