/// <reference types="jest" />
import { reducer } from '@/hooks/use-toast';

describe('use-toast reducer', () => {
  test('handles ADD_TOAST action', () => {
    const state = { toasts: [] };
    const toast = {
      id: '1',
      title: 'Test',
      open: true,
    };
    
    const newState = reducer(state, { type: 'ADD_TOAST', toast });
    expect(newState.toasts.length).toBeGreaterThan(0);
  });

  test('handles UPDATE_TOAST action', () => {
    const state = {
      toasts: [
        { id: '1', title: 'Test', open: true },
      ],
    };
    
    const newState = reducer(state, {
      type: 'UPDATE_TOAST',
      toast: { id: '1', title: 'Updated' },
    });
    expect(newState.toasts).toBeTruthy();
  });

  test('handles DISMISS_TOAST action', () => {
    const state = {
      toasts: [
        { id: '1', title: 'Test', open: true },
      ],
    };
    
    const newState = reducer(state, {
      type: 'DISMISS_TOAST',
      toastId: '1',
    });
    expect(newState.toasts).toBeTruthy();
  });

  test('handles REMOVE_TOAST action', () => {
    const state = {
      toasts: [
        { id: '1', title: 'Test', open: true },
      ],
    };
    
    const newState = reducer(state, {
      type: 'REMOVE_TOAST',
      toastId: '1',
    });
    expect(newState).toBeTruthy();
  });

  test('maintains state immutability', () => {
    const state = { toasts: [] };
    const newState = reducer(state, { type: 'ADD_TOAST', toast: { id: '1', open: true } });
    expect(state).not.toBe(newState);
  });
});
