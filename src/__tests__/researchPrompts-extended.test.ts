/// <reference types="jest" />
import { ResearchPrompts } from '@/lib/researchPrompts';

describe('ResearchPrompts - extended comprehensive', () => {
  describe('generateReportPrompt - all branches', () => {
    test('with APA format', () => {
      const prompt = ResearchPrompts.generateReportPrompt({
        question: 'test',
        reportFormat: 'apa',
      });
      expect(prompt).toContain('test');
    });

    test('with MLA format', () => {
      const prompt = ResearchPrompts.generateReportPrompt({
        question: 'test',
        reportFormat: 'mla',
      });
      expect(prompt).toContain('test');
    });

    test('with Chicago format', () => {
      const prompt = ResearchPrompts.generateReportPrompt({
        question: 'test',
        reportFormat: 'chicago',
      });
      expect(prompt).toContain('test');
    });

    test('with formal tone', () => {
      const prompt = ResearchPrompts.generateReportPrompt({
        question: 'test',
        tone: 'formal',
      });
      expect(prompt).toContain('test');
    });

    test('with technical language', () => {
      const prompt = ResearchPrompts.generateReportPrompt({
        question: 'test',
        language: 'technical',
      });
      expect(prompt).toContain('test');
    });

    test('with custom word count', () => {
      const prompt = ResearchPrompts.generateReportPrompt({
        question: 'test',
        totalWords: 5000,
      });
      expect(prompt).toContain('test');
    });

    test('with web source', () => {
      const prompt = ResearchPrompts.generateReportPrompt({
        question: 'test',
        reportSource: 'web',
      });
      expect(prompt).toContain('test');
    });

    test('with academic source', () => {
      const prompt = ResearchPrompts.generateReportPrompt({
        question: 'test',
        reportSource: 'academic',
      });
      expect(prompt).toContain('test');
    });

    test('with context provided', () => {
      const prompt = ResearchPrompts.generateReportPrompt({
        question: 'test',
        context: 'detailed context info',
      });
      expect(prompt).toContain('test');
    });

    test('all parameters together', () => {
      const prompt = ResearchPrompts.generateReportPrompt({
        question: 'AI Research',
        context: 'Current AI landscape',
        reportFormat: 'apa',
        totalWords: 3000,
        tone: 'formal',
        language: 'english',
        reportSource: 'web',
      });
      expect(prompt).toContain('AI Research');
    });
  });

  describe('generateSearchQueriesPrompt - detailed', () => {
    test('standard report type', () => {
      const prompt = ResearchPrompts.generateSearchQueriesPrompt(
        'quantum computing',
        '',
        'research_report'
      );
      expect(prompt).toContain('quantum computing');
    });

    test('detailed report type with parent query', () => {
      const prompt = ResearchPrompts.generateSearchQueriesPrompt(
        'quantum gates',
        'quantum computing',
        'detailed_report'
      );
      expect(prompt).toContain('quantum computing');
      expect(prompt).toContain('quantum gates');
    });

    test('subtopic report type', () => {
      const prompt = ResearchPrompts.generateSearchQueriesPrompt(
        'error correction',
        'quantum computing',
        'subtopic_report'
      );
      expect(prompt).toContain('quantum computing');
    });

    test('with context array', () => {
      const context = [
        { fact: 'Quantum computers are growing' },
        { fact: 'Google achieved quantum supremacy' }
      ];
      const prompt = ResearchPrompts.generateSearchQueriesPrompt(
        'quantum computing',
        '',
        'research_report',
        3,
        context
      );
      expect(prompt).toContain('Context');
    });

    test('custom max iterations', () => {
      const prompt = ResearchPrompts.generateSearchQueriesPrompt(
        'test',
        '',
        'research_report',
        10
      );
      expect(prompt).toContain('10');
    });

    test('single iteration', () => {
      const prompt = ResearchPrompts.generateSearchQueriesPrompt(
        'test',
        '',
        'research_report',
        1
      );
      expect(prompt).toContain('1');
    });

    test('returns list format', () => {
      const prompt = ResearchPrompts.generateSearchQueriesPrompt('test');
      expect(prompt).toContain('[');
      expect(prompt).toContain(']');
      expect(prompt).toContain('ONLY the list');
    });
  });

  describe('MCP prompts - edge cases', () => {
    test('tool selection with special characters in query', () => {
      const prompt = ResearchPrompts.generateMCPToolSelectionPrompt(
        'What are the "latest" AI trends? @2025',
        []
      );
      expect(prompt).toContain('latest');
    });

    test('tool selection with empty tools array', () => {
      const prompt = ResearchPrompts.generateMCPToolSelectionPrompt(
        'query',
        [],
        3
      );
      expect(prompt).toContain('AVAILABLE TOOLS');
    });

    test('research prompt with many tools', () => {
      const tools = Array.from({ length: 10 }, (_, i) => `tool_${i}`);
      const prompt = ResearchPrompts.generateMCPResearchPrompt('query', tools);
      expect(prompt).toContain('tool_0');
      expect(prompt).toContain('tool_9');
    });

    test('research prompt instructions complete', () => {
      const prompt = ResearchPrompts.generateMCPResearchPrompt('test', ['tool1']);
      expect(prompt).toContain('INSTRUCTIONS');
      expect(prompt).toContain('gather relevant information');
      expect(prompt).toContain('multiple tools');
      expect(prompt).toContain('Synthesize');
    });
  });
});
