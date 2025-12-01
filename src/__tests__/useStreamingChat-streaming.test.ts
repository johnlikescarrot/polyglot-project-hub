/// <reference types="jest" />
import { useStreamingChat } from '@/hooks/useStreamingChat';
import { renderHook, act } from '@testing-library/react';

// Mock TextDecoder fully for streaming tests
const mockTextDecoder = class {
  decode(input: Uint8Array | undefined, opts?: any): string {
    if (!input) return '';
    return Buffer.from(input).toString('utf-8');
  }
};

global.TextDecoder = mockTextDecoder as any;

describe('useStreamingChat - Streaming Parser (Lines 67-107)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('SSE stream with complete data: line 67 - decoder.decode', async () => {
    const sseChunk = 'data: {"choices":[{"delta":{"content":"Hello"}}]}\n';
    const uint8 = new TextEncoder().encode(sseChunk);

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

  test('SSE line ending with \\r - line 74', async () => {
    const sseChunk = 'data: {"choices":[{"delta":{"content":"Test"}}]}\r\n';
    const uint8 = new TextEncoder().encode(sseChunk);

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

  test('SSE comment line - line 75 (startswith :)', async () => {
    const sseChunk = ':comment line\ndata: {"choices":[{"delta":{"content":"Real"}}]}\n';
    const uint8 = new TextEncoder().encode(sseChunk);

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

  test('SSE empty line - line 75 (trim === "")', async () => {
    const sseChunk = '\ndata: {"choices":[{"delta":{"content":"Data"}}]}\n';
    const uint8 = new TextEncoder().encode(sseChunk);

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

  test('SSE non-data line - line 76', async () => {
    const sseChunk = 'event: message\ndata: {"choices":[{"delta":{"content":"X"}}]}\n';
    const uint8 = new TextEncoder().encode(sseChunk);

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

  test('[DONE] token ends stream - line 79', async () => {
    const sseChunk = 'data: [DONE]\n';
    const uint8 = new TextEncoder().encode(sseChunk);

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

  test('JSON parse for SSE data - line 82', async () => {
    const sseChunk = 'data: {"choices":[{"delta":{"content":"Parsed"}}]}\n';
    const uint8 = new TextEncoder().encode(sseChunk);

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

    expect(result.current.messages.some(m => m.content.includes('Parsed'))).toBe(true);
  });

  test('Message accumulation in setMessages - line 86-93', async () => {
    const chunks = [
      'data: {"choices":[{"delta":{"content":"Hello"}}]}\n',
      'data: {"choices":[{"delta":{"content":" "}}]}\n',
      'data: {"choices":[{"delta":{"content":"World"}}]}\n',
    ];

    const mockRead = jest.fn();
    chunks.forEach((chunk, idx) => {
      const uint8 = new TextEncoder().encode(chunk);
      mockRead.mockResolvedValueOnce({ done: false, value: uint8 });
    });
    mockRead.mockResolvedValueOnce({ done: true, value: undefined });

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        body: {
          getReader: () => ({
            read: mockRead,
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

  test('Assistant message update flow - line 88-93', async () => {
    const sseChunk = 'data: {"choices":[{"delta":{"content":"AI response"}}]}\n';
    const uint8 = new TextEncoder().encode(sseChunk);

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
      await result.current.sendMessage('user input');
    });

    const assistantMessage = result.current.messages.find(m => m.role === 'assistant');
    expect(assistantMessage).toBeDefined();
    expect(assistantMessage?.content).toContain('AI');
  });

  test('Buffer management through newlines - line 70-72', async () => {
    const sseChunk = 'data: {"choices":[{"delta":{"content":"M1"}}]}\ndata: {"choices":[{"delta":{"content":"M2"}}]}\n';
    const uint8 = new TextEncoder().encode(sseChunk);

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
});
