import { cn } from '@/lib/utils';

describe('utils.cn', () => {
  it('should merge class names correctly', () => {
    const result = cn('px-2 py-1', 'px-3');
    expect(result).toContain('px-3');
    expect(result).toContain('py-1');
  });

  it('should handle undefined and null values', () => {
    const result = cn('px-2', undefined, null, 'py-1');
    expect(result).toContain('px-2');
    expect(result).toContain('py-1');
  });

  it('should handle object classnames', () => {
    const result = cn({ 'px-2': true, 'py-1': false });
    expect(result).toContain('px-2');
    expect(result).not.toContain('py-1');
  });

  it('should merge tailwind conflicts correctly', () => {
    const result = cn('px-2 py-1', 'px-3 py-2');
    expect(result).toContain('px-3');
    expect(result).toContain('py-2');
  });

  it('should handle array of classnames', () => {
    const result = cn(['px-2', 'py-1']);
    expect(result).toContain('px-2');
    expect(result).toContain('py-1');
  });

  it('should return empty string when no classes provided', () => {
    expect(cn()).toBe('');
  });
});
