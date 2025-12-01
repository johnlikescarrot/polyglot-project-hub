import { shouldRemoveListener, findListenerIndex, removeListenerFromArray, addToRemoveQueue, handleToastDismiss } from '@/hooks/use-toast-helpers';

describe('use-toast-helpers', () => {
  test('shouldRemoveListener true branch', () => expect(shouldRemoveListener(0)).toBe(true));
  test('shouldRemoveListener false branch', () => expect(shouldRemoveListener(-1)).toBe(false));
  test('shouldRemoveListener with positive index', () => expect(shouldRemoveListener(5)).toBe(true));
  
  test('findListenerIndex found', () => {
    const arr = [() => {}, () => {}, () => {}];
    expect(findListenerIndex(arr, arr[1])).toBe(1);
  });
  test('findListenerIndex not found', () => {
    const arr = [() => {}, () => {}];
    expect(findListenerIndex(arr, () => {})).toBe(-1);
  });
  
  test('removeListenerFromArray valid index', () => {
    const arr = [1, 2, 3];
    expect(removeListenerFromArray(arr, 1)).toEqual([1, 3]);
  });
  test('removeListenerFromArray invalid index', () => {
    const arr = [1, 2, 3];
    expect(removeListenerFromArray(arr, -1)).toEqual([1, 2, 3]);
  });
  test('removeListenerFromArray does not mutate', () => {
    const arr = [1, 2, 3];
    removeListenerFromArray(arr, 1);
    expect(arr).toEqual([1, 2, 3]);
  });
  
  test('addToRemoveQueue returns timeout', () => {
    const timeout = addToRemoveQueue('toast-1', 1000);
    expect(typeof timeout).toBe('number');
    clearTimeout(timeout);
  });
  
  test('handleToastDismiss with id', () => {
    expect(handleToastDismiss('toast-1')).toEqual({ shouldRemoveAll: false });
  });
  test('handleToastDismiss without id', () => {
    expect(handleToastDismiss()).toEqual({ shouldRemoveAll: true });
  });
  test('handleToastDismiss with undefined', () => {
    expect(handleToastDismiss(undefined)).toEqual({ shouldRemoveAll: true });
  });
});
