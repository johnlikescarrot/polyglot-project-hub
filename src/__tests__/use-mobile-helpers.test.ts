import { checkIsMobile, getBreakpoint, handleMediaQueryChange, createMediaQueryString } from '@/hooks/use-mobile-helpers';

describe('use-mobile-helpers', () => {
  test('checkIsMobile true branch', () => expect(checkIsMobile(500)).toBe(true));
  test('checkIsMobile false branch', () => expect(checkIsMobile(1000)).toBe(false));
  test('checkIsMobile boundary', () => expect(checkIsMobile(767)).toBe(true));
  test('checkIsMobile at breakpoint', () => expect(checkIsMobile(768)).toBe(false));
  test('getBreakpoint', () => expect(getBreakpoint()).toBe(768));
  test('handleMediaQueryChange mobile', () => expect(handleMediaQueryChange(500)).toBe(true));
  test('handleMediaQueryChange desktop', () => expect(handleMediaQueryChange(1000)).toBe(false));
  test('createMediaQueryString', () => expect(createMediaQueryString()).toBe('(max-width: 767px)'));
});
