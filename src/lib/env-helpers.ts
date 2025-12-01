// Pure environment variable helper functions

export function getProcessEnvValue(key: string): string | undefined {
  if (typeof process !== 'undefined' && process.env[key]) {
    return process.env[key];
  }
  return undefined;
}

export function getWindowEnvValue(key: string): string | undefined {
  if (typeof window !== 'undefined' && (window as any).__ENV?.[key]) {
    return (window as any).__ENV[key];
  }
  return undefined;
}

export function getGlobalThisValue(key: string): string | undefined {
  if (typeof globalThis !== 'undefined' && (globalThis as any)[key]) {
    return (globalThis as any)[key];
  }
  return undefined;
}

export function hasProcessEnv(key: string): boolean {
  return typeof process !== 'undefined' && !!process.env[key];
}

export function hasWindowEnv(key: string): boolean {
  return typeof window !== 'undefined' && !!(window as any).__ENV?.[key];
}

export function hasGlobalThisEnv(key: string): boolean {
  return typeof globalThis !== 'undefined' && !!(globalThis as any)[key];
}

export function getEnvironmentVariablePriority(key: string): string {
  if (hasProcessEnv(key)) return 'process.env';
  if (hasWindowEnv(key)) return 'window.__ENV';
  if (hasGlobalThisEnv(key)) return 'globalThis';
  return 'none';
}
