/// <reference types="jest" />
import { ReportType, ReportSource, Tone } from '@/lib/researchTypes';

describe('Research Types Enums', () => {
  describe('ReportType', () => {
    test('has ResearchReport value', () => {
      expect(ReportType.ResearchReport).toBe('research_report');
    });

    test('has DetailedReport value', () => {
      expect(ReportType.DetailedReport).toBe('detailed_report');
    });

    test('has SubtopicReport value', () => {
      expect(ReportType.SubtopicReport).toBe('subtopic_report');
    });

    test('has ResourceReport value', () => {
      expect(ReportType.ResourceReport).toBe('resource_report');
    });

    test('has OutlineReport value', () => {
      expect(ReportType.OutlineReport).toBe('outline_report');
    });

    test('has CustomReport value', () => {
      expect(ReportType.CustomReport).toBe('custom_report');
    });

    test('has DeepResearch value', () => {
      expect(ReportType.DeepResearch).toBe('deep_research');
    });
  });

  describe('ReportSource', () => {
    test('has Web value', () => {
      expect(ReportSource.Web).toBe('web');
    });

    test('has Local value', () => {
      expect(ReportSource.Local).toBe('local');
    });

    test('has Hybrid value', () => {
      expect(ReportSource.Hybrid).toBe('hybrid');
    });
  });

  describe('Tone', () => {
    test('has Objective value', () => {
      expect(Tone.Objective).toBe('objective');
    });

    test('has Formal value', () => {
      expect(Tone.Formal).toBe('formal');
    });

    test('has Analytical value', () => {
      expect(Tone.Analytical).toBe('analytical');
    });

    test('has Persuasive value', () => {
      expect(Tone.Persuasive).toBe('persuasive');
    });

    test('has Informative value', () => {
      expect(Tone.Informative).toBe('informative');
    });

    test('has Explanatory value', () => {
      expect(Tone.Explanatory).toBe('explanatory');
    });

    test('has Descriptive value', () => {
      expect(Tone.Descriptive).toBe('descriptive');
    });

    test('has Critical value', () => {
      expect(Tone.Critical).toBe('critical');
    });

    test('has Comparative value', () => {
      expect(Tone.Comparative).toBe('comparative');
    });

    test('has Speculative value', () => {
      expect(Tone.Speculative).toBe('speculative');
    });

    test('has Reflective value', () => {
      expect(Tone.Reflective).toBe('reflective');
    });

    test('has Narrative value', () => {
      expect(Tone.Narrative).toBe('narrative');
    });

    test('has Humorous value', () => {
      expect(Tone.Humorous).toBe('humorous');
    });

    test('has Optimistic value', () => {
      expect(Tone.Optimistic).toBe('optimistic');
    });

    test('has Pessimistic value', () => {
      expect(Tone.Pessimistic).toBe('pessimistic');
    });
  });
});
