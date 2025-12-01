/// <reference types="jest" />
import { getEnv, resetEnv } from '@/lib/env';

describe('env.ts - 100% Complete Coverage', () => {
  afterEach(() => {
    resetEnv();
    delete process.env.VITE_SUPABASE_URL;
    delete process.env.VITE_SUPABASE_PUBLISHABLE_KEY;
    delete (window as any).__ENV;
    delete (globalThis as any).VITE_SUPABASE_URL;
  });

  describe('getEnv caching', () => {
    test('returns cached instance on second call', () => {
      const env1 = getEnv();
      const env2 = getEnv();
      expect(env1).toBe(env2);
    });

    test('cache is reset after resetEnv', () => {
      const env1 = getEnv();
      resetEnv();
      const env2 = getEnv();
      expect(env1).not.toBe(env2);
    });
  });

  describe('loadEnv from process.env', () => {
    test('loads VITE_SUPABASE_URL from process.env', () => {
      process.env.VITE_SUPABASE_URL = 'https://process.supabase.co';
      resetEnv();
      const env = getEnv();
      expect(env.VITE_SUPABASE_URL).toBe('https://process.supabase.co');
    });

    test('loads VITE_SUPABASE_PUBLISHABLE_KEY from process.env', () => {
      process.env.VITE_SUPABASE_PUBLISHABLE_KEY = 'process-key-456';
      resetEnv();
      const env = getEnv();
      expect(env.VITE_SUPABASE_PUBLISHABLE_KEY).toBe('process-key-456');
    });

    test('both from process.env together', () => {
      process.env.VITE_SUPABASE_URL = 'https://process.co';
      process.env.VITE_SUPABASE_PUBLISHABLE_KEY = 'process-key';
      resetEnv();
      const env = getEnv();
      expect(env.VITE_SUPABASE_URL).toBe('https://process.co');
      expect(env.VITE_SUPABASE_PUBLISHABLE_KEY).toBe('process-key');
    });
  });

  describe('loadEnv from window.__ENV', () => {
    test('loads from window.__ENV when process.env missing', () => {
      (window as any).__ENV = { VITE_SUPABASE_URL: 'https://window.co' };
      resetEnv();
      const env = getEnv();
      expect(env.VITE_SUPABASE_URL).toBe('https://window.co');
    });

    test('loads VITE_SUPABASE_PUBLISHABLE_KEY from window.__ENV', () => {
      (window as any).__ENV = { VITE_SUPABASE_PUBLISHABLE_KEY: 'window-key-789' };
      resetEnv();
      const env = getEnv();
      expect(env.VITE_SUPABASE_PUBLISHABLE_KEY).toBe('window-key-789');
    });
  });

  describe('loadEnv from globalThis', () => {
    test('loads from globalThis when others missing', () => {
      (globalThis as any).VITE_SUPABASE_URL = 'https://global.co';
      resetEnv();
      const env = getEnv();
      expect(env.VITE_SUPABASE_URL).toBe('https://global.co');
    });
  });

  describe('getEnvironmentVariable fallback chain', () => {
    test('returns empty string when all sources missing', () => {
      resetEnv();
      const env = getEnv();
      expect(env.VITE_SUPABASE_URL).toBe('');
      expect(env.VITE_SUPABASE_PUBLISHABLE_KEY).toBe('');
    });

    test('process.env takes priority over window.__ENV', () => {
      process.env.VITE_SUPABASE_URL = 'https://process.co';
      (window as any).__ENV = { VITE_SUPABASE_URL: 'https://window.co' };
      resetEnv();
      const env = getEnv();
      expect(env.VITE_SUPABASE_URL).toBe('https://process.co');
    });

    test('window.__ENV takes priority over globalThis', () => {
      (window as any).__ENV = { VITE_SUPABASE_URL: 'https://window.co' };
      (globalThis as any).VITE_SUPABASE_URL = 'https://global.co';
      resetEnv();
      const env = getEnv();
      expect(env.VITE_SUPABASE_URL).toBe('https://window.co');
    });
  });

  describe('both environment variables together', () => {
    test('returns both URL and key from same source', () => {
      process.env.VITE_SUPABASE_URL = 'https://both.co';
      process.env.VITE_SUPABASE_PUBLISHABLE_KEY = 'both-key';
      resetEnv();
      const env = getEnv();
      expect(env.VITE_SUPABASE_URL).toBe('https://both.co');
      expect(env.VITE_SUPABASE_PUBLISHABLE_KEY).toBe('both-key');
    });

    test('returns partial values when only one available', () => {
      process.env.VITE_SUPABASE_URL = 'https://partial.co';
      resetEnv();
      const env = getEnv();
      expect(env.VITE_SUPABASE_URL).toBe('https://partial.co');
      expect(env.VITE_SUPABASE_PUBLISHABLE_KEY).toBe('');
    });
  });
});
