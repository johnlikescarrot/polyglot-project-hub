/// <reference types="jest" />
import { cn } from '@/lib/utils';

describe('cn utility', () => {
  test('should return empty string for no inputs', () => {
    expect(cn()).toBe('');
  });

  test('should merge class names correctly', () => {
    const result = cn('px-2 py-1', 'px-3');
    expect(result).toContain('px-3');
    expect(result).toContain('py-1');
  });

  test('should handle undefined and null', () => {
    const result = cn('px-2', undefined, null, 'py-1');
    expect(result).toContain('px-2');
    expect(result).toContain('py-1');
  });

  test('should handle conditional classes', () => {
    const result = cn({ 'px-2': true, 'py-1': false });
    expect(result).toContain('px-2');
  });

  test('should merge tailwind conflicts', () => {
    const result = cn('px-2 py-1', 'px-3');
    expect(result).toContain('px-3');
  });

  test('should handle arrays', () => {
    const result = cn(['px-2', 'py-1']);
    expect(result).toContain('px-2');
    expect(result).toContain('py-1');
  });
});
