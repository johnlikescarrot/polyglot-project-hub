// Environment configuration factory - lazy-loaded to avoid import.meta parsing at module scope
interface Environment {
  VITE_SUPABASE_URL: string;
  VITE_SUPABASE_PUBLISHABLE_KEY: string;
}

let cachedEnv: Environment | null = null;

export function getEnv(): Environment {
  if (cachedEnv) {
    return cachedEnv;
  }

  // Jest test environment mock
  if (typeof process !== 'undefined' && process.env.NODE_ENV === 'test') {
    cachedEnv = {
      VITE_SUPABASE_URL: 'https://test.supabase.co',
      VITE_SUPABASE_PUBLISHABLE_KEY: 'test-key-123',
    };
    return cachedEnv;
  }

  // Vite production environment - lazy access at runtime
  try {
    const fn = new Function('return import.meta.env');
    const env = fn();
    cachedEnv = {
      VITE_SUPABASE_URL: env?.VITE_SUPABASE_URL || '',
      VITE_SUPABASE_PUBLISHABLE_KEY: env?.VITE_SUPABASE_PUBLISHABLE_KEY || '',
    };
  } catch {
    cachedEnv = {
      VITE_SUPABASE_URL: '',
      VITE_SUPABASE_PUBLISHABLE_KEY: '',
    };
  }

  return cachedEnv;
}

export function resetEnv(): void {
  cachedEnv = null;
}
