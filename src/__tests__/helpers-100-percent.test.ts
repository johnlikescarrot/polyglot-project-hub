/// <reference types="jest" />
import {
  handleStreamingError, shouldRenderChatArea, shouldRenderQuickActions, shouldRenderResearchHistory,
  getChatAreaHeight
} from '@/lib/index-helpers';
import {
  checkIsMobile, getBreakpoint, handleMediaQueryChange, createMediaQueryString
} from '@/hooks/use-mobile-helpers';
import {
  shouldRemoveListener, findListenerIndex, removeListenerFromArray, handleToastDismiss
} from '@/hooks/use-toast-helpers';
import {
  isDeepResearchType, isResearchReportType, isDetailedReportType, isOutlineReportType,
  isObjectiveTone, isAnalyticalTone, isFormalTone, getReportTypeName, getToneName
} from '@/lib/research-prompts-helpers';
import {
  getProcessEnvValue, getWindowEnvValue, getGlobalThisValue,
  hasProcessEnv, hasWindowEnv, hasGlobalThisEnv, getEnvironmentVariablePriority
} from '@/lib/env-helpers';

describe('100% COVERAGE - EXTRACTED HELPER FUNCTIONS', () => {
  // ===== Index Helpers =====
  describe('Index Helpers', () => {
    test('handleStreamingError with message', () => {
      expect(() => handleStreamingError('test error')).not.toThrow();
    });

    test('handleStreamingError with empty string', () => {
      expect(() => handleStreamingError('')).not.toThrow();
    });

    test('shouldRenderChatArea true', () => { expect(shouldRenderChatArea(5)).toBe(true); });
    test('shouldRenderChatArea false', () => { expect(shouldRenderChatArea(0)).toBe(false); });
    test('shouldRenderQuickActions true', () => { expect(shouldRenderQuickActions(0)).toBe(true); });
    test('shouldRenderQuickActions false', () => { expect(shouldRenderQuickActions(1)).toBe(false); });
    test('shouldRenderResearchHistory true', () => { expect(shouldRenderResearchHistory(1)).toBe(true); });
    test('shouldRenderResearchHistory false', () => { expect(shouldRenderResearchHistory(0)).toBe(false); });
    test('getChatAreaHeight returns correct value', () => { expect(getChatAreaHeight()).toBe('calc(100vh-220px)'); });
  });

  // ===== use-mobile Helpers =====
  describe('use-mobile Helpers', () => {
    test('checkIsMobile true', () => { expect(checkIsMobile(500)).toBe(true); });
    test('checkIsMobile false', () => { expect(checkIsMobile(1000)).toBe(false); });
    test('checkIsMobile boundary 768 is false', () => { expect(checkIsMobile(768)).toBe(false); });
    test('checkIsMobile boundary 767 is true', () => { expect(checkIsMobile(767)).toBe(true); });
    test('getBreakpoint returns 768', () => { expect(getBreakpoint()).toBe(768); });
    test('handleMediaQueryChange true', () => { expect(handleMediaQueryChange(500)).toBe(true); });
    test('handleMediaQueryChange false', () => { expect(handleMediaQueryChange(1000)).toBe(false); });
    test('createMediaQueryString returns correct format', () => {
      expect(createMediaQueryString()).toBe('(max-width: 767px)');
    });
  });

  // ===== use-toast Helpers =====
  describe('use-toast Helpers', () => {
    test('shouldRemoveListener true', () => { expect(shouldRemoveListener(0)).toBe(true); });
    test('shouldRemoveListener true for positive index', () => { expect(shouldRemoveListener(5)).toBe(true); });
    test('shouldRemoveListener false for -1', () => { expect(shouldRemoveListener(-1)).toBe(false); });
    
    test('findListenerIndex finds existing', () => {
      const fn = jest.fn();
      const listeners = [jest.fn(), fn, jest.fn()];
      expect(findListenerIndex(listeners, fn)).toBe(1);
    });

    test('findListenerIndex returns -1 for missing', () => {
      const listeners = [jest.fn(), jest.fn()];
      expect(findListenerIndex(listeners, jest.fn())).toBe(-1);
    });

    test('removeListenerFromArray removes at index', () => {
      const listeners = [1, 2, 3];
      const result = removeListenerFromArray(listeners, 1);
      expect(result).toEqual([1, 3]);
    });

    test('removeListenerFromArray no-op for -1', () => {
      const listeners = [1, 2, 3];
      const result = removeListenerFromArray(listeners, -1);
      expect(result).toEqual([1, 2, 3]);
    });

    test('handleToastDismiss with id returns false for shouldRemoveAll', () => {
      expect(handleToastDismiss('id-123')).toEqual({ shouldRemoveAll: false });
    });

    test('handleToastDismiss without id returns true for shouldRemoveAll', () => {
      expect(handleToastDismiss()).toEqual({ shouldRemoveAll: true });
    });
  });

  // ===== Research Prompts Helpers =====
  describe('Research Prompts Helpers - Enum Comparisons', () => {
    test('isDeepResearchType true', () => { expect(isDeepResearchType('deep-research')).toBe(true); });
    test('isDeepResearchType false', () => { expect(isDeepResearchType('other')).toBe(false); });
    test('isResearchReportType true', () => { expect(isResearchReportType('research-report')).toBe(true); });
    test('isResearchReportType false', () => { expect(isResearchReportType('other')).toBe(false); });
    test('isDetailedReportType true', () => { expect(isDetailedReportType('detailed-report')).toBe(true); });
    test('isDetailedReportType false', () => { expect(isDetailedReportType('other')).toBe(false); });
    test('isOutlineReportType true', () => { expect(isOutlineReportType('outline-report')).toBe(true); });
    test('isOutlineReportType false', () => { expect(isOutlineReportType('other')).toBe(false); });
    
    test('isObjectiveTone true', () => { expect(isObjectiveTone('objective')).toBe(true); });
    test('isObjectiveTone false', () => { expect(isObjectiveTone('other')).toBe(false); });
    test('isAnalyticalTone true', () => { expect(isAnalyticalTone('analytical')).toBe(true); });
    test('isAnalyticalTone false', () => { expect(isAnalyticalTone('other')).toBe(false); });
    test('isFormalTone true', () => { expect(isFormalTone('formal')).toBe(true); });
    test('isFormalTone false', () => { expect(isFormalTone('other')).toBe(false); });

    test('getReportTypeName deep-research', () => { expect(getReportTypeName('deep-research')).toBe('Deep Research'); });
    test('getReportTypeName research-report', () => { expect(getReportTypeName('research-report')).toBe('Research Report'); });
    test('getReportTypeName detailed-report', () => { expect(getReportTypeName('detailed-report')).toBe('Detailed Report'); });
    test('getReportTypeName outline-report', () => { expect(getReportTypeName('outline-report')).toBe('Outline Report'); });
    test('getReportTypeName unknown', () => { expect(getReportTypeName('unknown')).toBe('Unknown'); });

    test('getToneName objective', () => { expect(getToneName('objective')).toBe('Objective'); });
    test('getToneName analytical', () => { expect(getToneName('analytical')).toBe('Analytical'); });
    test('getToneName formal', () => { expect(getToneName('formal')).toBe('Formal'); });
    test('getToneName unknown', () => { expect(getToneName('unknown')).toBe('Unknown'); });
  });

  // ===== Environment Helpers =====
  describe('Environment Helpers', () => {
    beforeEach(() => {
      delete process.env.TEST_VAR;
      delete (window as any).__ENV;
      delete (globalThis as any).TEST_VAR;
    });

    test('getProcessEnvValue existing', () => {
      process.env.TEST_VAR = 'test-value';
      expect(getProcessEnvValue('TEST_VAR')).toBe('test-value');
    });

    test('getProcessEnvValue missing', () => {
      expect(getProcessEnvValue('NONEXISTENT')).toBeUndefined();
    });

    test('getWindowEnvValue existing', () => {
      (window as any).__ENV = { TEST_VAR: 'test-value' };
      expect(getWindowEnvValue('TEST_VAR')).toBe('test-value');
    });

    test('getWindowEnvValue missing', () => {
      expect(getWindowEnvValue('NONEXISTENT')).toBeUndefined();
    });

    test('getGlobalThisValue existing', () => {
      (globalThis as any).TEST_VAR = 'test-value';
      expect(getGlobalThisValue('TEST_VAR')).toBe('test-value');
    });

    test('getGlobalThisValue missing', () => {
      expect(getGlobalThisValue('NONEXISTENT')).toBeUndefined();
    });

    test('hasProcessEnv true', () => {
      process.env.TEST_VAR = 'value';
      expect(hasProcessEnv('TEST_VAR')).toBe(true);
    });

    test('hasProcessEnv false', () => {
      expect(hasProcessEnv('NONEXISTENT')).toBe(false);
    });

    test('hasWindowEnv true', () => {
      (window as any).__ENV = { TEST_VAR: 'value' };
      expect(hasWindowEnv('TEST_VAR')).toBe(true);
    });

    test('hasWindowEnv false', () => {
      expect(hasWindowEnv('NONEXISTENT')).toBe(false);
    });

    test('hasGlobalThisEnv true', () => {
      (globalThis as any).TEST_VAR = 'value';
      expect(hasGlobalThisEnv('TEST_VAR')).toBe(true);
    });

    test('hasGlobalThisEnv false', () => {
      expect(hasGlobalThisEnv('NONEXISTENT')).toBe(false);
    });

    test('getEnvironmentVariablePriority process.env', () => {
      process.env.TEST_VAR = 'value';
      expect(getEnvironmentVariablePriority('TEST_VAR')).toBe('process.env');
    });

    test('getEnvironmentVariablePriority window.__ENV', () => {
      (window as any).__ENV = { TEST_VAR: 'value' };
      expect(getEnvironmentVariablePriority('TEST_VAR')).toBe('window.__ENV');
    });

    test('getEnvironmentVariablePriority globalThis', () => {
      (globalThis as any).TEST_VAR = 'value';
      expect(getEnvironmentVariablePriority('TEST_VAR')).toBe('globalThis');
    });

    test('getEnvironmentVariablePriority none', () => {
      expect(getEnvironmentVariablePriority('NONEXISTENT')).toBe('none');
    });
  });
});
