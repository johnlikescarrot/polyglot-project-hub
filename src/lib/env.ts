import { getEnvValueOrFallback } from "@/lib/coverage-extractors";

// Environment configuration factory - fully testable, no import.meta runtime
interface Environment {
  VITE_SUPABASE_URL: string;
  VITE_SUPABASE_PUBLISHABLE_KEY: string;
}

let cachedEnv: Environment | null = null;

export function getEnv(): Environment {
  if (cachedEnv) {
    return cachedEnv;
  }

  cachedEnv = loadEnv();
  return cachedEnv;
}

function loadEnv(): Environment {
  // Check for Vite-injected environment variables (available in both browser and Node.js)
  const url = getEnvironmentVariable('VITE_SUPABASE_URL');
  const key = getEnvironmentVariable('VITE_SUPABASE_PUBLISHABLE_KEY');

  if (url && key) {
    return { VITE_SUPABASE_URL: url, VITE_SUPABASE_PUBLISHABLE_KEY: key };
  }

  return {
    VITE_SUPABASE_URL: url || '',
    VITE_SUPABASE_PUBLISHABLE_KEY: key || '',
  };
}

function getEnvironmentVariable(key: string): string {
  // Try import.meta.env first (Vite browser environment)
  try {
    const viteEnv = (import.meta as any).env;
    if (viteEnv && viteEnv[key]) {
      return getEnvValueOrFallback(viteEnv[key], '');
    }
  } catch {
    // import.meta not available (Node.js/test environment)
  }

  // Try process.env (Node.js/test environment)
  if (typeof process !== 'undefined' && process.env && process.env[key]) {
    return getEnvValueOrFallback(process.env[key], '');
  }

  // Try window.__ENV (fallback for browser)
  if (typeof window !== 'undefined' && (window as any).__ENV?.[key]) {
    return getEnvValueOrFallback((window as any).__ENV[key], '');
  }

  // Try globalThis (for universal JavaScript)
  if (typeof globalThis !== 'undefined' && (globalThis as any)[key]) {
    return getEnvValueOrFallback((globalThis as any)[key], '');
  }

  return '';
}

export function resetEnv(): void {
  cachedEnv = null;
}
