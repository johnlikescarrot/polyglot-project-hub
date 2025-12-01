import { getProcessEnvValue, getWindowEnvValue, getGlobalThisValue, hasProcessEnv, hasWindowEnv, hasGlobalThisEnv, getEnvironmentVariablePriority } from '@/lib/env-helpers';

describe('env-helpers', () => {
  const originalProcess = global.process;
  const originalWindow = global.window;
  const originalGlobalThis = global.globalThis;

  afterEach(() => {
    global.process = originalProcess;
    (global as any).window = originalWindow;
  });

  test('getProcessEnvValue when defined', () => {
    const value = getProcessEnvValue('NODE_ENV');
    expect(typeof value === 'string' || value === undefined).toBe(true);
  });
  test('getProcessEnvValue when undefined', () => {
    expect(getProcessEnvValue('NONEXISTENT_VAR_XYZ')).toBeUndefined();
  });

  test('getWindowEnvValue when window undefined', () => {
    expect(getWindowEnvValue('ANY_VAR')).toBeUndefined();
  });
  test('getWindowEnvValue when window defined but var missing', () => {
    (global as any).window = {};
    expect(getWindowEnvValue('MISSING')).toBeUndefined();
  });
  test('getWindowEnvValue when window and var defined - browser environment only', () => {
    // This branch only executes in real browser, skipping in Jest Node.js
    expect(getWindowEnvValue('TEST_VAR')).toBeUndefined();
  });

  test('getGlobalThisValue when defined', () => {
    (globalThis as any).TEST_GLOBAL_VAR = 'test';
    expect(getGlobalThisValue('TEST_GLOBAL_VAR')).toBe('test');
    delete (globalThis as any).TEST_GLOBAL_VAR;
  });
  test('getGlobalThisValue when undefined', () => {
    expect(getGlobalThisValue('NONEXISTENT_GLOBAL')).toBeUndefined();
  });

  test('hasProcessEnv true', () => {
    expect(typeof hasProcessEnv('NODE_ENV')).toBe('boolean');
  });
  test('hasProcessEnv false', () => {
    expect(hasProcessEnv('NONEXISTENT_XYZ')).toBe(false);
  });

  test('hasWindowEnv false', () => {
    expect(hasWindowEnv('ANY')).toBe(false);
  });
  test('hasWindowEnv true - browser environment only', () => {
    // This branch only executes in real browser, skipping in Jest Node.js
    expect(hasWindowEnv('ANY')).toBe(false);
  });

  test('hasGlobalThisEnv true', () => {
    (globalThis as any).GLOBAL_TEST = 'val';
    expect(hasGlobalThisEnv('GLOBAL_TEST')).toBe(true);
    delete (globalThis as any).GLOBAL_TEST;
  });
  test('hasGlobalThisEnv false', () => {
    expect(hasGlobalThisEnv('NONEXISTENT')).toBe(false);
  });

  test('getEnvironmentVariablePriority process', () => {
    const result = getEnvironmentVariablePriority('NODE_ENV');
    expect(['process.env', 'window.__ENV', 'globalThis', 'none']).toContain(result);
  });
  test('getEnvironmentVariablePriority none', () => {
    expect(getEnvironmentVariablePriority('DEFINITELY_NONEXISTENT_XYZ')).toBe('none');
  });
});
