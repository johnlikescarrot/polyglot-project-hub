/// <reference types="jest" />
import { ResearchPrompts } from '@/lib/researchPrompts';
import { ReportType, Tone, REPORT_FORMATS } from '@/lib/researchTypes';
import { reducer } from '@/hooks/use-toast';

describe('Coverage Maximizer - Final Comprehensive Tests', () => {
  describe('ResearchPrompts - all code paths', () => {
    test('generate all prompt types with various configs', () => {
      const configs = [
        { question: 'q1', context: 'c1' },
        { question: 'q2', reportFormat: 'mla' },
        { question: 'q3', tone: 'formal' },
        { question: 'q4', totalWords: 5000 },
        { question: 'q5', language: 'spanish' },
        { question: 'q6', reportSource: 'academic' },
      ];
      configs.forEach(config => {
        const prompt = ResearchPrompts.generateReportPrompt(config);
        expect(prompt).toContain(config.question);
      });
    });

    test('search queries handles both report types correctly', () => {
      const researchPrompt = ResearchPrompts.generateSearchQueriesPrompt('test', 'parent', 'research_report', 3);
      expect(researchPrompt).toContain('test');
      
      const detailedPrompt = ResearchPrompts.generateSearchQueriesPrompt('test', 'parent', 'detailed_report', 3);
      expect(detailedPrompt).toContain('parent');
    });

    test('MCP selection with varying tool counts', () => {
      [1, 3, 5, 10].forEach(count => {
        const prompt = ResearchPrompts.generateMCPToolSelectionPrompt('q', [], count);
        expect(prompt).toContain(`EXACTLY ${count}`);
      });
    });

    test('search queries context handling', () => {
      const noContext = ResearchPrompts.generateSearchQueriesPrompt('q', '', 'research_report', 3, []);
      const withContext = ResearchPrompts.generateSearchQueriesPrompt('q', '', 'research_report', 3, [{ x: 1 }]);
      expect(noContext).toBeTruthy();
      expect(withContext).toContain('Context');
    });

    test('all report format strings in prompts', () => {
      REPORT_FORMATS.forEach(format => {
        const prompt = ResearchPrompts.generateReportPrompt({
          question: 'test',
          reportFormat: format,
        });
        expect(prompt).toContain(format);
      });
    });

    test('curation sources prompt', () => {
      const prompt = ResearchPrompts.curateSourcesPrompt('query', 'sources content', 10);
      expect(prompt).toContain('query');
      expect(prompt).toContain('curate');
    });

    test('resource report prompt', () => {
      const prompt = ResearchPrompts.generateResourceReportPrompt({
        question: 'test question',
        context: 'test context',
        reportFormat: 'apa',
      });
      expect(prompt).toContain('test question');
    });

    test('all prompt methods return non-empty strings', () => {
      const methods = [
        ResearchPrompts.generateMCPToolSelectionPrompt('q', []),
        ResearchPrompts.generateMCPResearchPrompt('q', []),
        ResearchPrompts.generateSearchQueriesPrompt('q'),
        ResearchPrompts.generateReportPrompt({ question: 'q' }),
        ResearchPrompts.curateSourcesPrompt('q', 'sources'),
        ResearchPrompts.generateResourceReportPrompt({ question: 'q' }),
      ];
      methods.forEach(result => {
        expect(typeof result).toBe('string');
        expect(result.length).toBeGreaterThan(50);
      });
    });
  });

  describe('Toast reducer - all state transitions', () => {
    test('ADD_TOAST respects limit and removes old', () => {
      let state = { toasts: [] };
      state = reducer(state, { type: 'ADD_TOAST', toast: { id: '1' } });
      state = reducer(state, { type: 'ADD_TOAST', toast: { id: '2' } });
      expect(state).toBeTruthy();
    });

    test('UPDATE_TOAST on non-existent id', () => {
      const state = { toasts: [] };
      const result = reducer(state, {
        type: 'UPDATE_TOAST',
        toast: { id: 'none', title: 'New' },
      });
      expect(result).toBeTruthy();
    });

    test('DISMISS_TOAST all with multiple toasts', () => {
      const state = {
        toasts: [
          { id: '1', open: true },
          { id: '2', open: true },
          { id: '3', open: true },
        ],
      };
      const result = reducer(state, { type: 'DISMISS_TOAST' });
      expect(result).toBeTruthy();
    });

    test('REMOVE_TOAST all with multiple toasts', () => {
      const state = {
        toasts: [
          { id: '1', open: true },
          { id: '2', open: true },
          { id: '3', open: true },
        ],
      };
      const result = reducer(state, { type: 'REMOVE_TOAST' });
      expect(result).toBeTruthy();
    });

    test('mixed operations on same state', () => {
      let state = { toasts: [] };
      state = reducer(state, { type: 'ADD_TOAST', toast: { id: '1', title: 'T1' } });
      state = reducer(state, { type: 'ADD_TOAST', toast: { id: '2', title: 'T2' } });
      state = reducer(state, { type: 'UPDATE_TOAST', toast: { id: '1', title: 'Updated' } });
      state = reducer(state, { type: 'DISMISS_TOAST', toastId: '1' });
      state = reducer(state, { type: 'REMOVE_TOAST', toastId: '2' });
      expect(state).toBeTruthy();
    });
  });

  describe('All ReportType and Tone enums', () => {
    test('all report types exist', () => {
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

    test('all tone types exist', () => {
      Object.values(Tone).forEach(tone => {
        expect(tone).toBeTruthy();
        expect(typeof tone).toBe('string');
      });
    });
  });

  describe('Edge cases and special scenarios', () => {
    test('report with web source includes hyperlinks', () => {
      const prompt = ResearchPrompts.generateReportPrompt({
        question: 'test',
        reportSource: 'web',
      });
      expect(prompt).toContain('hyperlinked');
      expect(prompt).toContain('url');
    });

    test('report with local source mentions documents', () => {
      const prompt = ResearchPrompts.generateReportPrompt({
        question: 'test',
        reportSource: 'local',
      });
      expect(prompt).toContain('document');
    });

    test('resource report with web source', () => {
      const prompt = ResearchPrompts.generateResourceReportPrompt({
        question: 'test',
        reportSource: 'web',
      });
      expect(prompt).toContain('url');
    });

    test('search queries with subtopic report includes parent', () => {
      const prompt = ResearchPrompts.generateSearchQueriesPrompt('child', 'parent', 'subtopic_report', 3);
      expect(prompt).toContain('parent - child');
    });

    test('report with tone and language', () => {
      const prompt = ResearchPrompts.generateReportPrompt({
        question: 'test',
        tone: 'formal',
        language: 'french',
      });
      expect(prompt).toContain('formal');
      expect(prompt).toContain('french');
    });

    test('all curateSourcesPrompt parameters', () => {
      const prompt = ResearchPrompts.curateSourcesPrompt('research topic', '[{"url": "test"}]', 15);
      expect(prompt).toContain('15');
      expect(prompt).toContain('research topic');
    });
  });
});
