/// <reference types="jest" />
import { getModeButtonClass, shouldShowModeDescription, getModeDescription } from '@/components/research/research-mode-functions';
import { ReportType } from '@/lib/researchTypes';

describe('ResearchModeSelector - 100% Coverage', () => {
  describe('getModeButtonClass', () => {
    test('selected returns primary style', () => {
      expect(getModeButtonClass(true)).toContain('primary');
    });
    test('not selected returns border style', () => {
      expect(getModeButtonClass(false)).toContain('border');
    });
  });

  describe('shouldShowModeDescription - all report types', () => {
    test('DeepResearch true', () => { expect(shouldShowModeDescription(ReportType.DeepResearch)).toBe(true); });
    test('ResearchReport true', () => { expect(shouldShowModeDescription(ReportType.ResearchReport)).toBe(true); });
    test('DetailedReport true', () => { expect(shouldShowModeDescription(ReportType.DetailedReport)).toBe(true); });
    test('OutlineReport true', () => { expect(shouldShowModeDescription(ReportType.OutlineReport)).toBe(true); });
  });

  describe('getModeDescription - returns correct descriptions', () => {
    test('DeepResearch', () => { expect(getModeDescription(ReportType.DeepResearch)).toContain('multi-level'); });
    test('ResearchReport', () => { expect(getModeDescription(ReportType.ResearchReport)).toContain('comprehensive'); });
    test('DetailedReport', () => { expect(getModeDescription(ReportType.DetailedReport)).toContain('in-depth'); });
    test('OutlineReport', () => { expect(getModeDescription(ReportType.OutlineReport)).toContain('outline'); });
  });
});
