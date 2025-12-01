// Environment configuration with lazy-loaded import.meta.env for Jest testability
let cached: { VITE_SUPABASE_URL: string; VITE_SUPABASE_PUBLISHABLE_KEY: string } | null = null;

export const getEnv = () => {
  if (!cached) {
    cached = {
      VITE_SUPABASE_URL: (import.meta as any).env.VITE_SUPABASE_URL || '',
      VITE_SUPABASE_PUBLISHABLE_KEY: (import.meta as any).env.VITE_SUPABASE_PUBLISHABLE_KEY || '',
    };
  }
  return cached;
};

export const resetEnv = () => {
  cached = null;
};
