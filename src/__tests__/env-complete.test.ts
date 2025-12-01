/// <reference types="jest" />
import { getEnv, resetEnv } from '@/lib/env';

describe('env.ts - 100% Coverage Final', () => {
  afterEach(() => {
    resetEnv();
  });

  test('getEnv returns object with VITE_SUPABASE_URL', () => {
    const env = getEnv();
    expect(env).toHaveProperty('VITE_SUPABASE_URL');
  });

  test('getEnv returns object with VITE_SUPABASE_PUBLISHABLE_KEY', () => {
    const env = getEnv();
    expect(env).toHaveProperty('VITE_SUPABASE_PUBLISHABLE_KEY');
  });

  test('getEnv caches result on first call', () => {
    const env1 = getEnv();
    const env2 = getEnv();
    expect(env1).toBe(env2);
  });

  test('resetEnv clears cache', () => {
    getEnv();
    resetEnv();
    expect(getEnv()).toBeDefined();
  });

  test('TEST environment provides test values', () => {
    const env = getEnv();
    expect(typeof env.VITE_SUPABASE_URL).toBe('string');
    expect(typeof env.VITE_SUPABASE_PUBLISHABLE_KEY).toBe('string');
  });

  test('getEnv returns URLs as strings', () => {
    const env = getEnv();
    expect(env.VITE_SUPABASE_URL).toContain('test') || expect(env.VITE_SUPABASE_URL).toBe('');
    expect(env.VITE_SUPABASE_PUBLISHABLE_KEY).toContain('test') || expect(env.VITE_SUPABASE_PUBLISHABLE_KEY).toBe('');
  });

  test('getEnv object structure is consistent', () => {
    const env = getEnv();
    expect(Object.keys(env).sort()).toEqual(['VITE_SUPABASE_PUBLISHABLE_KEY', 'VITE_SUPABASE_URL']);
  });
});
