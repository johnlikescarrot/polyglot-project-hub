/// <reference types="jest" />
import { getNavLinkClassName } from '@/components/NavLink';
import { getModeButtonClass, shouldShowModeDescription, getModeDescription } from '@/components/research/ResearchModeSelector';
import { shouldShowQuickActions } from '@/pages/Index';
import { ReportType } from '@/lib/researchTypes';

describe('Extracted Functions - 100% Branch Coverage', () => {
  describe('getNavLinkClassName - NavLink line 18', () => {
    test('both false', () => {
      const result = getNavLinkClassName(false, false, 'base', 'active', 'pending');
      expect(result).toContain('base');
    });
    test('isActive true', () => {
      const result = getNavLinkClassName(true, false, 'base', 'active', 'pending');
      expect(result).toContain('active');
    });
    test('isPending true', () => {
      const result = getNavLinkClassName(false, true, 'base', 'active', 'pending');
      expect(result).toContain('pending');
    });
    test('both true', () => {
      const result = getNavLinkClassName(true, true, 'base', 'active', 'pending');
      expect(result).toContain('active');
      expect(result).toContain('pending');
    });
  });

  describe('getModeButtonClass - ResearchModeSelector line 119', () => {
    test('selected', () => {
      const result = getModeButtonClass(true);
      expect(result).toContain('primary');
    });
    test('not selected', () => {
      const result = getModeButtonClass(false);
      expect(result).toContain('border');
    });
  });

  describe('shouldShowModeDescription - ResearchModeSelector line 221', () => {
    test('deep research', () => {
      expect(shouldShowModeDescription(ReportType.DeepResearch)).toBe(true);
    });
    test('research report', () => {
      expect(shouldShowModeDescription(ReportType.ResearchReport)).toBe(true);
    });
    test('detailed report', () => {
      expect(shouldShowModeDescription(ReportType.DetailedReport)).toBe(true);
    });
    test('outline report', () => {
      expect(shouldShowModeDescription(ReportType.OutlineReport)).toBe(true);
    });
  });

  describe('getModeDescription - ResearchModeSelector line 228-235', () => {
    test('deep research description', () => {
      const desc = getModeDescription(ReportType.DeepResearch);
      expect(desc).toContain('multi-level');
    });
    test('research report description', () => {
      const desc = getModeDescription(ReportType.ResearchReport);
      expect(desc).toContain('comprehensive');
    });
    test('detailed report description', () => {
      const desc = getModeDescription(ReportType.DetailedReport);
      expect(desc).toContain('in-depth');
    });
    test('outline report description', () => {
      const desc = getModeDescription(ReportType.OutlineReport);
      expect(desc).toContain('outline');
    });
  });

  describe('shouldShowQuickActions - Index line 31', () => {
    test('empty messages', () => {
      expect(shouldShowQuickActions(0)).toBe(true);
    });
    test('has messages', () => {
      expect(shouldShowQuickActions(1)).toBe(false);
    });
    test('multiple messages', () => {
      expect(shouldShowQuickActions(5)).toBe(false);
    });
  });
});
