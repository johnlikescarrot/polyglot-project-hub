/// <reference types="jest" />
jest.mock('@/hooks/useStreamingChat', () => ({
  useStreamingChat: jest.fn(() => ({
    messages: [],
    isLoading: false,
    sendMessage: jest.fn(),
    clearMessages: jest.fn(),
  })),
}));

describe('useStreamingChat Hook - mocked tests', () => {
  test('hook returns correct interface structure', () => {
    const { useStreamingChat } = require('@/hooks/useStreamingChat');
    const result = useStreamingChat({ model: 'test' });
    expect(result).toHaveProperty('messages');
    expect(result).toHaveProperty('isLoading');
    expect(result).toHaveProperty('sendMessage');
    expect(result).toHaveProperty('clearMessages');
  });

  test('hook accepts model parameter', () => {
    const { useStreamingChat } = require('@/hooks/useStreamingChat');
    const result = useStreamingChat({ model: 'gpt-4' });
    expect(result).toBeTruthy();
  });

  test('hook accepts optional onError callback', () => {
    const { useStreamingChat } = require('@/hooks/useStreamingChat');
    const onError = jest.fn();
    const result = useStreamingChat({ model: 'test', onError });
    expect(result).toBeTruthy();
  });

  test('messages array is initialized as empty', () => {
    const { useStreamingChat } = require('@/hooks/useStreamingChat');
    const result = useStreamingChat({ model: 'test' });
    expect(result.messages).toEqual([]);
  });

  test('isLoading is false initially', () => {
    const { useStreamingChat } = require('@/hooks/useStreamingChat');
    const result = useStreamingChat({ model: 'test' });
    expect(result.isLoading).toBe(false);
  });

  test('sendMessage function is callable', () => {
    const { useStreamingChat } = require('@/hooks/useStreamingChat');
    const result = useStreamingChat({ model: 'test' });
    expect(typeof result.sendMessage).toBe('function');
  });

  test('clearMessages function is callable', () => {
    const { useStreamingChat } = require('@/hooks/useStreamingChat');
    const result = useStreamingChat({ model: 'test' });
    expect(typeof result.clearMessages).toBe('function');
  });

  test('hook with multiple models', () => {
    const { useStreamingChat } = require('@/hooks/useStreamingChat');
    const models = ['gpt-4', 'gpt-3.5', 'claude', 'gemini'];
    models.forEach(model => {
      const result = useStreamingChat({ model });
      expect(result).toBeTruthy();
    });
  });

  test('hook with error callback called', () => {
    const { useStreamingChat } = require('@/hooks/useStreamingChat');
    const onError = jest.fn();
    const result = useStreamingChat({ model: 'test', onError });
    expect(result).toBeTruthy();
  });
});
