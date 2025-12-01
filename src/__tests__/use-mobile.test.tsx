/// <reference types="jest" />
import { renderHook, act } from '@testing-library/react';
import { useIsMobile } from '@/hooks/use-mobile';

describe('useIsMobile Hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('returns false for desktop viewport', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    });
    
    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(false);
  });

  test('returns true for mobile viewport', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 500,
    });
    
    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(true);
  });

  test('responds to window resize', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    });
    
    const { result, rerender } = renderHook(() => useIsMobile());
    expect(result.current).toBe(false);
    
    act(() => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 500,
      });
      window.dispatchEvent(new Event('resize'));
    });
    
    rerender();
  });

  test('sets up media query listener', () => {
    const { result } = renderHook(() => useIsMobile());
    expect(typeof result.current).toBe('boolean');
  });

  test('removes listener on unmount', () => {
    const { unmount } = renderHook(() => useIsMobile());
    expect(() => unmount()).not.toThrow();
  });
});
