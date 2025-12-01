// Environment configuration with Jest compatibility
let cached: { VITE_SUPABASE_URL: string; VITE_SUPABASE_PUBLISHABLE_KEY: string } | null = null;

export const getEnv = () => {
  if (!cached) {
    try {
      // Try to use import.meta.env (production/Vite)
      cached = {
        VITE_SUPABASE_URL: (import.meta as any).env?.VITE_SUPABASE_URL || (global as any).import?.meta?.env?.VITE_SUPABASE_URL || '',
        VITE_SUPABASE_PUBLISHABLE_KEY: (import.meta as any).env?.VITE_SUPABASE_PUBLISHABLE_KEY || (global as any).import?.meta?.env?.VITE_SUPABASE_PUBLISHABLE_KEY || '',
      };
    } catch {
      // Fallback for Jest environment
      cached = {
        VITE_SUPABASE_URL: (global as any).import?.meta?.env?.VITE_SUPABASE_URL || '',
        VITE_SUPABASE_PUBLISHABLE_KEY: (global as any).import?.meta?.env?.VITE_SUPABASE_PUBLISHABLE_KEY || '',
      };
    }
  }
  return cached;
};

export const resetEnv = () => {
  cached = null;
};
