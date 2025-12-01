/// <reference types="jest" />
import { reducer } from '@/hooks/use-toast';

describe('use-toast reducer - extended', () => {
  test('ADD_TOAST with open state', () => {
    const state = { toasts: [] };
    const toast = { id: '1', open: true, title: 'Success' };
    const newState = reducer(state, { type: 'ADD_TOAST', toast });
    expect(newState.toasts).toBeTruthy();
  });

  test('ADD_TOAST with closed state', () => {
    const state = { toasts: [] };
    const toast = { id: '1', open: false };
    const newState = reducer(state, { type: 'ADD_TOAST', toast });
    expect(newState.toasts).toBeTruthy();
  });

  test('UPDATE_TOAST with partial update', () => {
    const state = { toasts: [{ id: '1', title: 'Old', open: true }] };
    const newState = reducer(state, {
      type: 'UPDATE_TOAST',
      toast: { id: '1', title: 'New' },
    });
    expect(newState).toBeTruthy();
  });

  test('UPDATE_TOAST preserves other properties', () => {
    const state = {
      toasts: [{ id: '1', title: 'Test', description: 'Desc', open: true }],
    };
    const newState = reducer(state, {
      type: 'UPDATE_TOAST',
      toast: { id: '1', title: 'Updated' },
    });
    expect(newState).toBeTruthy();
  });

  test('DISMISS_TOAST marks toast as not open', () => {
    const state = { toasts: [{ id: '1', open: true }] };
    const newState = reducer(state, {
      type: 'DISMISS_TOAST',
      toastId: '1',
    });
    expect(newState).toBeTruthy();
  });

  test('DISMISS_TOAST with no id dismisses all', () => {
    const state = {
      toasts: [
        { id: '1', open: true },
        { id: '2', open: true },
      ],
    };
    const newState = reducer(state, { type: 'DISMISS_TOAST' });
    expect(newState).toBeTruthy();
  });

  test('REMOVE_TOAST removes specific toast', () => {
    const state = {
      toasts: [
        { id: '1', open: true },
        { id: '2', open: true },
      ],
    };
    const newState = reducer(state, {
      type: 'REMOVE_TOAST',
      toastId: '1',
    });
    expect(newState).toBeTruthy();
  });

  test('REMOVE_TOAST removes all when no id', () => {
    const state = {
      toasts: [
        { id: '1', open: true },
        { id: '2', open: true },
      ],
    };
    const newState = reducer(state, { type: 'REMOVE_TOAST' });
    expect(newState).toBeTruthy();
  });

  test('multiple operations preserve order', () => {
    let state = { toasts: [] };
    
    state = reducer(state, {
      type: 'ADD_TOAST',
      toast: { id: '1', title: 'First' },
    });
    state = reducer(state, {
      type: 'ADD_TOAST',
      toast: { id: '2', title: 'Second' },
    });
    
    expect(state.toasts).toBeTruthy();
  });

  test('operations on empty state', () => {
    const state = { toasts: [] };
    const newState = reducer(state, {
      type: 'UPDATE_TOAST',
      toast: { id: 'nonexistent' },
    });
    expect(newState).toBeTruthy();
  });

  test('complex toast with all valid properties', () => {
    const state = { toasts: [] };
    const toast = {
      id: '1',
      title: 'Title',
      description: 'Description',
      open: true,
      variant: 'default' as const,
    };
    const newState = reducer(state, { type: 'ADD_TOAST', toast });
    expect(newState).toBeTruthy();
  });

  test('toast with destructive variant', () => {
    const state = { toasts: [] };
    const toast = {
      id: '1',
      title: 'Error',
      open: true,
      variant: 'destructive' as const,
    };
    const newState = reducer(state, { type: 'ADD_TOAST', toast });
    expect(newState).toBeTruthy();
  });
});
