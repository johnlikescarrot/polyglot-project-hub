/// <reference types="jest" />
import { cn } from '@/lib/utils';

describe('cn utility function', () => {
  test('returns empty string with no input', () => {
    expect(cn()).toBe('');
  });

  test('merges multiple class names', () => {
    const result = cn('px-2 py-1', 'px-3');
    expect(result).toContain('px-3');
    expect(result).toContain('py-1');
  });

  test('handles undefined and null values', () => {
    const result = cn('px-2', undefined, null, 'py-1');
    expect(result).toContain('px-2');
    expect(result).toContain('py-1');
  });

  test('handles conditional object classes', () => {
    const result = cn({ 'px-2': true, 'py-1': false });
    expect(result).toContain('px-2');
    expect(result).not.toContain('py-1');
  });

  test('merges tailwind conflicts correctly', () => {
    const result = cn('px-2 py-1', 'px-3 py-2');
    expect(result).toContain('px-3');
    expect(result).toContain('py-2');
  });

  test('handles array inputs', () => {
    const result = cn(['px-2', 'py-1'], 'px-3');
    expect(result).toContain('px-3');
  });
});
