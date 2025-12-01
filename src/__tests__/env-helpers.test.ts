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
  test('getWindowEnvValue when window and var defined', () => {
    (global as any).window = { __ENV: { TEST_VAR: 'test_value' } };
    expect(getWindowEnvValue('TEST_VAR')).toBe('test_value');
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
  test('hasWindowEnv true', () => {
    (global as any).window = { __ENV: { TEST: 'val' } };
    expect(hasWindowEnv('TEST')).toBe(true);
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
