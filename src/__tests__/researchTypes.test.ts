/// <reference types="jest" />
import { ReportType, Tone } from '@/lib/researchTypes';

describe('Research Types', () => {
  test('ReportType enum exists with values', () => {
    expect(ReportType.ResearchReport).toBeDefined();
    expect(ReportType.SummaryReport).toBeDefined();
    expect(ReportType.OutlineReport).toBeDefined();
  });

  test('Tone enum exists with values', () => {
    expect(Tone.Objective).toBeDefined();
    expect(Tone.Analytical).toBeDefined();
    expect(Tone.Conversational).toBeDefined();
  });

  test('ReportType values are strings', () => {
    expect(typeof ReportType.ResearchReport).toBe('string');
  });

  test('Tone values are strings', () => {
    expect(typeof Tone.Objective).toBe('string');
  });
});
