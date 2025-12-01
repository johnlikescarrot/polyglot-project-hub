import { handleStreamingError, shouldRenderChatArea, shouldRenderQuickActions, shouldRenderResearchHistory, getChatAreaHeight } from '@/lib/index-helpers';

describe('index-helpers', () => {
  test('handleStreamingError with message', () => {
    const spy = jest.spyOn(console, 'warn');
    handleStreamingError('Error message');
    expect(spy).not.toHaveBeenCalled();
    spy.mockRestore();
  });

  test('handleStreamingError with empty message', () => {
    const spy = jest.spyOn(console, 'warn');
    handleStreamingError('');
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });

  test('shouldRenderChatArea with messages', () => {
    expect(shouldRenderChatArea(5)).toBe(true);
    expect(shouldRenderChatArea(1)).toBe(true);
  });

  test('shouldRenderChatArea without messages', () => {
    expect(shouldRenderChatArea(0)).toBe(false);
  });

  test('shouldRenderQuickActions with messages', () => {
    expect(shouldRenderQuickActions(1)).toBe(false);
    expect(shouldRenderQuickActions(5)).toBe(false);
  });

  test('shouldRenderQuickActions without messages', () => {
    expect(shouldRenderQuickActions(0)).toBe(true);
  });

  test('shouldRenderResearchHistory with messages', () => {
    expect(shouldRenderResearchHistory(1)).toBe(true);
    expect(shouldRenderResearchHistory(5)).toBe(true);
  });

  test('shouldRenderResearchHistory without messages', () => {
    expect(shouldRenderResearchHistory(0)).toBe(false);
  });

  test('getChatAreaHeight', () => {
    expect(getChatAreaHeight()).toBe('calc(100vh-220px)');
  });
});
