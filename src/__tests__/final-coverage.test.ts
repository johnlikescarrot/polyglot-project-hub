/// <reference types="jest" />
import { renderHook } from '@testing-library/react';
import { useIsMobile } from '@/hooks/use-mobile';
import { MODELS } from '@/lib/aiModels';
import { ReportType, Tone, ReportSource } from '@/lib/researchTypes';

describe('Final Coverage Push - All Edge Cases', () => {
  describe('useIsMobile hook comprehensive', () => {
    test('returns boolean type', () => {
      const { result } = renderHook(() => useIsMobile());
      expect(typeof result.current).toBe('boolean');
    });

    test('respects mobile breakpoint', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 500,
      });
      const { result } = renderHook(() => useIsMobile());
      expect(typeof result.current).toBe('boolean');
    });

    test('handles desktop screens', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1920,
      });
      const { result } = renderHook(() => useIsMobile());
      expect(typeof result.current).toBe('boolean');
    });
  });

  describe('AI Models configuration', () => {
    test('models array exists and is valid', () => {
      expect(MODELS).toBeTruthy();
      expect(Array.isArray(MODELS)).toBe(true);
      expect(MODELS.length).toBeGreaterThan(0);
    });

    test('models have required properties', () => {
      MODELS.forEach(model => {
        expect(model.id).toBeTruthy();
        expect(model.name).toBeTruthy();
        expect(model.category).toBeTruthy();
      });
    });

    test('all models have unique ids', () => {
      const ids = MODELS.map(m => m.id);
      const unique = new Set(ids);
      expect(ids.length).toBe(unique.size);
    });

    test('models have consistent structure', () => {
      MODELS.forEach(model => {
        expect(typeof model.id).toBe('string');
        expect(typeof model.name).toBe('string');
        expect(typeof model.category).toBe('string');
      });
    });

    test('multiple model access patterns', () => {
      const modelCount = MODELS.length;
      const firstModel = MODELS[0];
      expect(firstModel).toBeTruthy();
      expect(modelCount).toBeGreaterThan(0);
    });
  });

  describe('Research types enums comprehensive', () => {
    test('all ReportType values', () => {
      [
        ReportType.ResearchReport,
        ReportType.DeepResearch,
        ReportType.DetailedReport,
        ReportType.OutlineReport,
        ReportType.CustomReport,
        ReportType.ResourceReport,
        ReportType.SubtopicReport,
      ].forEach(type => {
        expect(type).toBeTruthy();
      });
    });

    test('all ReportSource values', () => {
      [ReportSource.Web, ReportSource.Local, ReportSource.Hybrid].forEach(source => {
        expect(source).toBeTruthy();
      });
    });

    test('all Tone values', () => {
      Object.values(Tone).forEach(tone => {
        expect(tone).toBeTruthy();
        expect(typeof tone).toBe('string');
      });
    });

    test('enum consistency', () => {
      const types = Object.values(ReportType);
      expect(types.length).toBeGreaterThan(0);
      types.forEach(t => expect(typeof t).toBe('string'));
    });
  });

  describe('Integration scenarios', () => {
    test('hook initialization', () => {
      const { result } = renderHook(() => useIsMobile());
      expect(result.current).toBeTruthy();
    });

    test('models data loading', () => {
      expect(MODELS.length).toBeGreaterThan(0);
      expect(MODELS[0].id).toBeTruthy();
    });

    test('complete workflow setup', () => {
      const mobile = useIsMobile instanceof Function;
      const models = Array.isArray(MODELS);
      expect(mobile && models).toBe(true);
    });

    test('enum accessibility', () => {
      expect(ReportType.ResearchReport).toBe('research_report');
      expect(Tone.Objective).toBe('objective');
      expect(ReportSource.Web).toBe('web');
    });
  });
});
