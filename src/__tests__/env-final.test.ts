/// <reference types="jest" />
import { getEnv, resetEnv } from '@/lib/env';

describe('env.ts - Complete Coverage', () => {
  afterEach(() => {
    resetEnv();
    jest.clearAllMocks();
  });

  test('getEnv returns cached result', () => {
    const env1 = getEnv();
    const env2 = getEnv();
    expect(env1).toBe(env2);
  });

  test('getEnv TEST environment path', () => {
    const env = getEnv();
    expect(env.VITE_SUPABASE_URL).toBe('https://test.supabase.co');
    expect(env.VITE_SUPABASE_PUBLISHABLE_KEY).toBe('test-key-123');
  });

  test('resetEnv clears cache', () => {
    const before = getEnv();
    resetEnv();
    const after = getEnv();
    expect(typeof after.VITE_SUPABASE_URL).toBe('string');
  });

  test('env properties are strings', () => {
    const env = getEnv();
    expect(typeof env.VITE_SUPABASE_URL).toBe('string');
    expect(typeof env.VITE_SUPABASE_PUBLISHABLE_KEY).toBe('string');
  });

  test('env has required properties', () => {
    const env = getEnv();
    expect(Object.keys(env)).toContain('VITE_SUPABASE_URL');
    expect(Object.keys(env)).toContain('VITE_SUPABASE_PUBLISHABLE_KEY');
  });

  test('multiple resets return fresh environment', () => {
    getEnv();
    resetEnv();
    const fresh1 = getEnv();
    resetEnv();
    const fresh2 = getEnv();
    expect(fresh1).not.toBe(fresh2);
  });
});
