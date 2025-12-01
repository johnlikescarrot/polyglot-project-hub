import { isDeepResearchType, isResearchReportType, isDetailedReportType, isOutlineReportType, isObjectiveTone, isAnalyticalTone, isFormalTone, getReportTypeName, getToneName } from '@/lib/research-prompts-helpers';

describe('research-prompts-helpers', () => {
  describe('report type checks', () => {
    test('isDeepResearchType true', () => expect(isDeepResearchType('deep-research')).toBe(true));
    test('isDeepResearchType false', () => expect(isDeepResearchType('other')).toBe(false));
    
    test('isResearchReportType true', () => expect(isResearchReportType('research-report')).toBe(true));
    test('isResearchReportType false', () => expect(isResearchReportType('other')).toBe(false));
    
    test('isDetailedReportType true', () => expect(isDetailedReportType('detailed-report')).toBe(true));
    test('isDetailedReportType false', () => expect(isDetailedReportType('other')).toBe(false));
    
    test('isOutlineReportType true', () => expect(isOutlineReportType('outline-report')).toBe(true));
    test('isOutlineReportType false', () => expect(isOutlineReportType('other')).toBe(false));
  });

  describe('tone checks', () => {
    test('isObjectiveTone true', () => expect(isObjectiveTone('objective')).toBe(true));
    test('isObjectiveTone false', () => expect(isObjectiveTone('other')).toBe(false));
    
    test('isAnalyticalTone true', () => expect(isAnalyticalTone('analytical')).toBe(true));
    test('isAnalyticalTone false', () => expect(isAnalyticalTone('other')).toBe(false));
    
    test('isFormalTone true', () => expect(isFormalTone('formal')).toBe(true));
    test('isFormalTone false', () => expect(isFormalTone('other')).toBe(false));
  });

  describe('getReportTypeName', () => {
    test('deep research', () => expect(getReportTypeName('deep-research')).toBe('Deep Research'));
    test('research report', () => expect(getReportTypeName('research-report')).toBe('Research Report'));
    test('detailed report', () => expect(getReportTypeName('detailed-report')).toBe('Detailed Report'));
    test('outline report', () => expect(getReportTypeName('outline-report')).toBe('Outline Report'));
    test('unknown', () => expect(getReportTypeName('unknown')).toBe('Unknown'));
  });

  describe('getToneName', () => {
    test('objective', () => expect(getToneName('objective')).toBe('Objective'));
    test('analytical', () => expect(getToneName('analytical')).toBe('Analytical'));
    test('formal', () => expect(getToneName('formal')).toBe('Formal'));
    test('unknown', () => expect(getToneName('unknown')).toBe('Unknown'));
  });
});
