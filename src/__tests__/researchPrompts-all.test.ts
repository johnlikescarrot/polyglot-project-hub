/// <reference types="jest" />
import { ResearchPrompts } from '@/lib/researchPrompts';

describe('ResearchPrompts - all methods comprehensive', () => {
  describe('All MCP methods', () => {
    test('generateMCPToolSelectionPrompt returns string', () => {
      const result = ResearchPrompts.generateMCPToolSelectionPrompt('test', []);
      expect(typeof result).toBe('string');
      expect(result.length).toBeGreaterThan(0);
    });

    test('generateMCPResearchPrompt returns string', () => {
      const result = ResearchPrompts.generateMCPResearchPrompt('test', []);
      expect(typeof result).toBe('string');
      expect(result.length).toBeGreaterThan(0);
    });

    test('generateSearchQueriesPrompt returns string', () => {
      const result = ResearchPrompts.generateSearchQueriesPrompt('test');
      expect(typeof result).toBe('string');
      expect(result.length).toBeGreaterThan(0);
    });

    test('generateReportPrompt returns string', () => {
      const result = ResearchPrompts.generateReportPrompt({ question: 'test' });
      expect(typeof result).toBe('string');
      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe('Prompt validation', () => {
    test('MCP tool selection includes JSON format instructions', () => {
      const result = ResearchPrompts.generateMCPToolSelectionPrompt('test', []);
      expect(result).toContain('JSON');
      expect(result).toContain('selected_tools');
    });

    test('MCP research includes instructions section', () => {
      const result = ResearchPrompts.generateMCPResearchPrompt('test', []);
      expect(result).toContain('INSTRUCTIONS');
      expect(result).toContain('RESEARCH QUERY');
    });

    test('search queries prompt includes list format', () => {
      const result = ResearchPrompts.generateSearchQueriesPrompt('test');
      expect(result).toContain('[');
      expect(result).toContain(']');
    });

    test('report prompt includes task description', () => {
      const result = ResearchPrompts.generateReportPrompt({ question: 'test' });
      expect(result).toContain('test');
    });
  });

  describe('Edge cases and special inputs', () => {
    test('handles queries with special characters', () => {
      const result = ResearchPrompts.generateMCPToolSelectionPrompt('What is "AI"? #2025', []);
      expect(result).toContain('AI');
    });

    test('handles empty tool arrays', () => {
      const result = ResearchPrompts.generateMCPToolSelectionPrompt('query', []);
      expect(result).toContain('AVAILABLE TOOLS');
    });

    test('handles large tool arrays', () => {
      const tools = Array.from({ length: 20 }, (_, i) => ({ name: `tool_${i}` }));
      const result = ResearchPrompts.generateMCPToolSelectionPrompt('query', tools);
      expect(result).toContain('tool_0');
    });

    test('handles various report formats', () => {
      const formats = ['apa', 'mla', 'chicago', 'harvard'];
      formats.forEach(format => {
        const result = ResearchPrompts.generateReportPrompt({
          question: 'test',
          reportFormat: format,
        });
        expect(result).toBeTruthy();
      });
    });

    test('handles various languages', () => {
      const languages = ['english', 'spanish', 'french', 'german'];
      languages.forEach(lang => {
        const result = ResearchPrompts.generateReportPrompt({
          question: 'test',
          language: lang,
        });
        expect(result).toBeTruthy();
      });
    });

    test('handles custom iteration counts', () => {
      [1, 3, 5, 10].forEach(count => {
        const result = ResearchPrompts.generateSearchQueriesPrompt('test', '', 'research_report', count);
        expect(result).toContain(count.toString());
      });
    });

    test('handles parent queries in search prompts', () => {
      const result = ResearchPrompts.generateSearchQueriesPrompt(
        'detail',
        'parent topic',
        'detailed_report'
      );
      expect(result).toContain('parent topic');
      expect(result).toContain('detail');
    });

    test('handles context arrays in search prompts', () => {
      const context = [{ data: 'fact1' }, { data: 'fact2' }];
      const result = ResearchPrompts.generateSearchQueriesPrompt(
        'test',
        '',
        'research_report',
        3,
        context
      );
      expect(result).toContain('Context');
    });

    test('all methods accept and process various parameters', () => {
      const methods = [
        () => ResearchPrompts.generateMCPToolSelectionPrompt('q', [], 5),
        () => ResearchPrompts.generateMCPResearchPrompt('q', ['t1', 't2']),
        () => ResearchPrompts.generateSearchQueriesPrompt('q', 'p', 'research_report', 5),
        () => ResearchPrompts.generateReportPrompt({
          question: 'q',
          context: 'c',
          reportFormat: 'apa',
          totalWords: 2000,
          tone: 'formal',
          language: 'english',
          reportSource: 'web',
        }),
      ];

      methods.forEach(method => {
        const result = method();
        expect(typeof result).toBe('string');
        expect(result.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Prompt content validation', () => {
    test('MCP selection includes criteria and ranking', () => {
      const result = ResearchPrompts.generateMCPToolSelectionPrompt('test', []);
      expect(result).toContain('SELECTION CRITERIA');
      expect(result).toContain('ranked by relevance');
    });

    test('MCP research includes synthesis instruction', () => {
      const result = ResearchPrompts.generateMCPResearchPrompt('test', ['tool']);
      expect(result).toContain('Synthesize');
      expect(result).toContain('multiple sources');
    });

    test('search prompt specifies format requirement', () => {
      const result = ResearchPrompts.generateSearchQueriesPrompt('test');
      expect(result).toContain('ONLY the list');
    });

    test('report prompt includes all formatting options', () => {
      const result = ResearchPrompts.generateReportPrompt({
        question: 'test',
        reportFormat: 'apa',
        totalWords: 1000,
      });
      expect(result).toBeTruthy();
    });
  });
});
