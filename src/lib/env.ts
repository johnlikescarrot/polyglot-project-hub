// Environment configuration with CommonJS Jest compatibility
let cached: { VITE_SUPABASE_URL: string; VITE_SUPABASE_PUBLISHABLE_KEY: string } | null = null;

export const getEnv = () => {
  if (!cached) {
    // Get from global mock first (Jest setupTests.ts provides this)
    const globalMeta = (globalThis as any).import?.meta?.env;
    if (globalMeta) {
      cached = {
        VITE_SUPABASE_URL: globalMeta.VITE_SUPABASE_URL || '',
        VITE_SUPABASE_PUBLISHABLE_KEY: globalMeta.VITE_SUPABASE_PUBLISHABLE_KEY || '',
      };
    } else {
      // Fallback for Vite (production) - access dynamically at runtime
      try {
        const viteEnv = (import.meta as any).env;
        cached = {
          VITE_SUPABASE_URL: viteEnv?.VITE_SUPABASE_URL || '',
          VITE_SUPABASE_PUBLISHABLE_KEY: viteEnv?.VITE_SUPABASE_PUBLISHABLE_KEY || '',
        };
      } catch {
        cached = {
          VITE_SUPABASE_URL: '',
          VITE_SUPABASE_PUBLISHABLE_KEY: '',
        };
      }
    }
  }
  return cached;
};

export const resetEnv = () => {
  cached = null;
};
