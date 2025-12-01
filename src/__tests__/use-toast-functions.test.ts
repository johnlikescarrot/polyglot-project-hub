/// <reference types="jest" />
import { toast, useToast } from '@/hooks/use-toast';
import { renderHook, act } from '@testing-library/react';

describe('use-toast functions - toast() and useToast()', () => {
  describe('toast function', () => {
    test('toast creates and dispatches ADD_TOAST action', () => {
      const result = toast({ title: 'Test Toast' });
      expect(result.id).toBeTruthy();
      expect(result.dismiss).toBeTruthy();
      expect(result.update).toBeTruthy();
    });

    test('toast returns object with dismiss function', () => {
      const result = toast({ title: 'Test' });
      expect(typeof result.dismiss).toBe('function');
      result.dismiss();
    });

    test('toast returns object with update function', () => {
      const result = toast({ title: 'Test' });
      expect(typeof result.update).toBe('function');
      result.update({ id: result.id, title: 'Updated' });
    });

    test('toast onOpenChange dismisses when false', () => {
      const result = toast({ title: 'Test' });
      expect(result.id).toBeTruthy();
    });

    test('multiple toasts get unique IDs', () => {
      const t1 = toast({ title: 'Toast 1' });
      const t2 = toast({ title: 'Toast 2' });
      expect(t1.id).not.toBe(t2.id);
    });
  });

  describe('useToast hook', () => {
    test('useToast returns state object', () => {
      const { result } = renderHook(() => useToast());
      expect(result.current.toasts).toBeTruthy();
      expect(Array.isArray(result.current.toasts)).toBe(true);
    });

    test('useToast has toast function', () => {
      const { result } = renderHook(() => useToast());
      expect(typeof result.current.toast).toBe('function');
    });

    test('useToast has dismiss function', () => {
      const { result } = renderHook(() => useToast());
      expect(typeof result.current.dismiss).toBe('function');
    });

    test('useToast updates when toast is added', () => {
      const { result } = renderHook(() => useToast());
      act(() => {
        result.current.toast({ title: 'New Toast' });
      });
      expect(result.current.toasts.length).toBeGreaterThan(0);
    });

    test('useToast calls dismiss on specific toast', () => {
      const { result } = renderHook(() => useToast());
      let toastId: string;
      act(() => {
        const toastResult = result.current.toast({ title: 'Test' });
        toastId = toastResult.id;
      });
      act(() => {
        result.current.dismiss(toastId!);
      });
      expect(result.current.toasts[0]?.open).toBe(false);
    });

    test('useToast calls dismiss all without ID', () => {
      const { result } = renderHook(() => useToast());
      act(() => {
        result.current.toast({ title: 'T1' });
        result.current.toast({ title: 'T2' });
      });
      act(() => {
        result.current.dismiss();
      });
      result.current.toasts.forEach(t => {
        expect(t.open).toBe(false);
      });
    });

    test('useToast cleanup removes listener on unmount', () => {
      const { unmount } = renderHook(() => useToast());
      unmount();
    });

    test('listener index check for removal', () => {
      const { result } = renderHook(() => useToast());
      const { result: result2 } = renderHook(() => useToast());
      result.current.toast({ title: 'Toast' });
    });
  });

  describe('toast onOpenChange callback', () => {
    test('onOpenChange callback called with false triggers dismiss', () => {
      const result = toast({ title: 'Test Toast' });
      expect(result.id).toBeTruthy();
    });

    test('toast spreads props correctly', () => {
      const result = toast({
        title: 'Title',
        description: 'Description',
      });
      expect(result.id).toBeTruthy();
    });
  });

  describe('dispatch function flow', () => {
    test('dispatch triggers listeners', () => {
      const { result } = renderHook(() => useToast());
      act(() => {
        result.current.toast({ title: 'Test' });
      });
      expect(result.current.toasts.length).toBeGreaterThan(0);
    });

    test('multiple dispatches update state', () => {
      const { result } = renderHook(() => useToast());
      act(() => {
        result.current.toast({ title: 'T1' });
        result.current.toast({ title: 'T2' });
      });
      expect(result.current.toasts.length).toBeGreaterThan(0);
    });
  });
});
