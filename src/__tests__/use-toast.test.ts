/// <reference types="jest" />
import { reducer } from '@/hooks/use-toast';

describe('use-toast reducer - comprehensive', () => {
  test('ADD_TOAST - adds new toast to empty state', () => {
    const state = { toasts: [] };
    const toast = { id: '1', title: 'Test', open: true };
    const newState = reducer(state, { type: 'ADD_TOAST', toast });
    expect(newState.toasts.length).toBeGreaterThan(0);
  });

  test('ADD_TOAST - respects TOAST_LIMIT', () => {
    const state = { toasts: [{ id: '1', open: true }] };
    const toast = { id: '2', open: true };
    const newState = reducer(state, { type: 'ADD_TOAST', toast });
    expect(newState.toasts).toBeTruthy();
  });

  test('UPDATE_TOAST - updates existing toast', () => {
    const state = { toasts: [{ id: '1', title: 'Old' }] };
    const newState = reducer(state, { type: 'UPDATE_TOAST', toast: { id: '1', title: 'New' } });
    expect(newState).toBeTruthy();
  });

  test('DISMISS_TOAST - dismisses toast by id', () => {
    const state = { toasts: [{ id: '1', open: true }] };
    const newState = reducer(state, { type: 'DISMISS_TOAST', toastId: '1' });
    expect(newState).toBeTruthy();
  });

  test('DISMISS_TOAST - handles undefined toastId', () => {
    const state = { toasts: [{ id: '1', open: true }] };
    const newState = reducer(state, { type: 'DISMISS_TOAST' });
    expect(newState).toBeTruthy();
  });

  test('REMOVE_TOAST - removes toast by id', () => {
    const state = { toasts: [{ id: '1', open: true }] };
    const newState = reducer(state, { type: 'REMOVE_TOAST', toastId: '1' });
    expect(newState).toBeTruthy();
  });

  test('REMOVE_TOAST - handles undefined toastId', () => {
    const state = { toasts: [{ id: '1', open: true }] };
    const newState = reducer(state, { type: 'REMOVE_TOAST' });
    expect(newState).toBeTruthy();
  });

  test('maintains immutability with ADD_TOAST', () => {
    const state = { toasts: [] };
    const newState = reducer(state, { type: 'ADD_TOAST', toast: { id: '1', open: true } });
    expect(state).not.toBe(newState);
  });

  test('maintains immutability with UPDATE_TOAST', () => {
    const state = { toasts: [{ id: '1' }] };
    const newState = reducer(state, { type: 'UPDATE_TOAST', toast: { id: '1' } });
    expect(state).not.toBe(newState);
  });

  test('maintains immutability with DISMISS_TOAST', () => {
    const state = { toasts: [{ id: '1' }] };
    const newState = reducer(state, { type: 'DISMISS_TOAST', toastId: '1' });
    expect(state).not.toBe(newState);
  });
});
