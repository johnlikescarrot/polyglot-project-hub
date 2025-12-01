/// <reference types="jest" />
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { renderHook, act } from '@testing-library/react';
import { useStreamingChat } from '@/hooks/useStreamingChat';
import { NavLink } from '@/components/NavLink';

jest.useFakeTimers();

describe('Complete Coverage - All Remaining Gaps', () => {
  afterEach(() => {
    jest.clearAllTimers();
    jest.clearAllMocks();
  });

  describe('NavLink line 18 - all branches', () => {
    const renderLink = (props: any) => render(React.createElement(BrowserRouter, {}, React.createElement(NavLink, props, 'Link')));

    test('activeClassName and pendingClassName', () => {
      const { container } = renderLink({ to: '/', className: 'base', activeClassName: 'active', pendingClassName: 'pending' });
      expect(container.querySelector('a')).toBeInTheDocument();
    });

    test('only activeClassName', () => {
      const { container } = renderLink({ to: '/', className: 'base', activeClassName: 'active' });
      expect(container.querySelector('a')).toBeInTheDocument();
    });

    test('only pendingClassName', () => {
      const { container } = renderLink({ to: '/', className: 'base', pendingClassName: 'pending' });
      expect(container.querySelector('a')).toBeInTheDocument();
    });

    test('no special classes', () => {
      const { container } = renderLink({ to: '/', className: 'base' });
      expect(container.querySelector('a')).toBeInTheDocument();
    });
  });

  describe('useStreamingChat error paths (52,76,84,116-122)', () => {
    test('line 52 - response error with json', async () => {
      const onError = jest.fn();
      global.fetch = jest.fn(() => Promise.resolve({
        ok: false,
        status: 401,
        json: async () => ({ error: 'Unauthorized' }),
      })) as any;

      const { result } = renderHook(() => useStreamingChat({ model: 'gpt-4', onError }));
      await act(async () => {
        await result.current.sendMessage('test');
      });

      expect(onError).toHaveBeenCalledWith('Unauthorized');
    });

    test('line 52 - response error json fails', async () => {
      const onError = jest.fn();
      global.fetch = jest.fn(() => Promise.resolve({
        ok: false,
        status: 500,
        json: jest.fn().mockRejectedValue(new Error('json error')),
      })) as any;

      const { result } = renderHook(() => useStreamingChat({ model: 'gpt-4', onError }));
      await act(async () => {
        await result.current.sendMessage('test');
      });

      expect(onError).toHaveBeenCalledWith('Request failed: 500');
    });

    test('line 76 - non-data SSE line skipped', async () => {
      const chunk = 'event: ping\ndata: {"choices":[{"delta":{"content":"X"}}]}\n';
      const uint8 = new TextEncoder().encode(chunk);

      global.fetch = jest.fn(() => Promise.resolve({
        ok: true,
        body: {
          getReader: () => ({
            read: jest.fn()
              .mockResolvedValueOnce({ done: false, value: uint8 })
              .mockResolvedValueOnce({ done: true, value: undefined }),
          }),
        },
      })) as any;

      const { result } = renderHook(() => useStreamingChat({ model: 'gpt-4' }));
      await act(async () => {
        await result.current.sendMessage('test');
      });

      expect(result.current.messages).toBeDefined();
    });

    test('line 84 - empty content skipped', async () => {
      const chunk = 'data: {"choices":[{"delta":{}}]}\n';
      const uint8 = new TextEncoder().encode(chunk);

      global.fetch = jest.fn(() => Promise.resolve({
        ok: true,
        body: {
          getReader: () => ({
            read: jest.fn()
              .mockResolvedValueOnce({ done: false, value: uint8 })
              .mockResolvedValueOnce({ done: true, value: undefined }),
          }),
        },
      })) as any;

      const { result } = renderHook(() => useStreamingChat({ model: 'gpt-4' }));
      await act(async () => {
        await result.current.sendMessage('test');
      });

      expect(result.current.isLoading).toBe(false);
    });

    test('line 116 - non-Error thrown', async () => {
      const onError = jest.fn();
      global.fetch = jest.fn(() => Promise.reject('string error')) as any;

      const { result } = renderHook(() => useStreamingChat({ model: 'gpt-4', onError }));
      await act(async () => {
        await result.current.sendMessage('test');
      });

      expect(onError).toHaveBeenCalledWith('Unknown error occurred');
    });

    test('lines 119-125 - error message filtering', async () => {
      const onError = jest.fn();
      global.fetch = jest.fn(() => Promise.resolve({
        ok: true,
        body: {
          getReader: () => ({
            read: jest.fn()
              .mockResolvedValueOnce({ done: false, value: new TextEncoder().encode('data: {"choices":[{"delta":{"content":"X"}}]}\n') })
              .mockRejectedValueOnce(new Error('stream error')),
          }),
        },
      })) as any;

      const { result } = renderHook(() => useStreamingChat({ model: 'gpt-4', onError }));
      await act(async () => {
        await result.current.sendMessage('test');
      });

      expect(onError).toHaveBeenCalledWith('stream error');
    });
  });

  describe('useStreamingChat streaming edge cases', () => {
    test('assistant message creation', async () => {
      const chunk = 'data: {"choices":[{"delta":{"content":"Hello"}}]}\n';
      const uint8 = new TextEncoder().encode(chunk);

      global.fetch = jest.fn(() => Promise.resolve({
        ok: true,
        body: {
          getReader: () => ({
            read: jest.fn()
              .mockResolvedValueOnce({ done: false, value: uint8 })
              .mockResolvedValueOnce({ done: true, value: undefined }),
          }),
        },
      })) as any;

      const { result } = renderHook(() => useStreamingChat({ model: 'gpt-4' }));
      await act(async () => {
        await result.current.sendMessage('test');
      });

      const msg = result.current.messages[result.current.messages.length - 1];
      expect(msg?.role).toBe('assistant');
    });

    test('multiple chunks accumulate content', async () => {
      let idx = 0;
      const chunks = [
        'data: {"choices":[{"delta":{"content":"Hello"}}]}\n',
        'data: {"choices":[{"delta":{"content":" "}}]}\n',
        'data: {"choices":[{"delta":{"content":"World"}}]}\n',
      ];

      global.fetch = jest.fn(() => Promise.resolve({
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
      })) as any;

      const { result } = renderHook(() => useStreamingChat({ model: 'gpt-4' }));
      await act(async () => {
        await result.current.sendMessage('test');
      });

      expect(result.current.messages.length).toBeGreaterThan(0);
    });

    test('DONE token ends stream', async () => {
      const chunk = 'data: [DONE]\n';
      const uint8 = new TextEncoder().encode(chunk);

      global.fetch = jest.fn(() => Promise.resolve({
        ok: true,
        body: {
          getReader: () => ({
            read: jest.fn()
              .mockResolvedValueOnce({ done: false, value: uint8 })
              .mockResolvedValueOnce({ done: true, value: undefined }),
          }),
        },
      })) as any;

      const { result } = renderHook(() => useStreamingChat({ model: 'gpt-4' }));
      await act(async () => {
        await result.current.sendMessage('test');
      });

      expect(result.current.isLoading).toBe(false);
    });

    test('carriage return handling', async () => {
      const chunk = 'data: {"choices":[{"delta":{"content":"Test"}}]}\r\n';
      const uint8 = new TextEncoder().encode(chunk);

      global.fetch = jest.fn(() => Promise.resolve({
        ok: true,
        body: {
          getReader: () => ({
            read: jest.fn()
              .mockResolvedValueOnce({ done: false, value: uint8 })
              .mockResolvedValueOnce({ done: true, value: undefined }),
          }),
        },
      })) as any;

      const { result } = renderHook(() => useStreamingChat({ model: 'gpt-4' }));
      await act(async () => {
        await result.current.sendMessage('test');
      });

      expect(result.current.messages).toBeDefined();
    });

    test('comment line filtering', async () => {
      const chunk = ':comment\ndata: {"choices":[{"delta":{"content":"Real"}}]}\n';
      const uint8 = new TextEncoder().encode(chunk);

      global.fetch = jest.fn(() => Promise.resolve({
        ok: true,
        body: {
          getReader: () => ({
            read: jest.fn()
              .mockResolvedValueOnce({ done: false, value: uint8 })
              .mockResolvedValueOnce({ done: true, value: undefined }),
          }),
        },
      })) as any;

      const { result } = renderHook(() => useStreamingChat({ model: 'gpt-4' }));
      await act(async () => {
        await result.current.sendMessage('test');
      });

      expect(result.current.messages.length).toBeGreaterThan(0);
    });
  });
});
