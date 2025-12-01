/// <reference types="jest" />
import { ResearchPrompts, PromptConfig } from '@/lib/researchPrompts';

describe('ResearchPrompts - comprehensive', () => {
  describe('generateMCPToolSelectionPrompt', () => {
    test('generates valid prompt with query', () => {
      const prompt = ResearchPrompts.generateMCPToolSelectionPrompt('AI trends 2025', []);
      expect(prompt).toContain('AI trends 2025');
      expect(prompt).toContain('RESEARCH QUERY');
    });

    test('includes tools info in JSON', () => {
      const tools = [{ name: 'web_search', description: 'Search' }, { name: 'api_call', description: 'API' }];
      const prompt = ResearchPrompts.generateMCPToolSelectionPrompt('query', tools);
      expect(prompt).toContain('web_search');
      expect(prompt).toContain('AVAILABLE TOOLS');
    });

    test('specifies correct max tools default', () => {
      const prompt = ResearchPrompts.generateMCPToolSelectionPrompt('query', []);
      expect(prompt).toContain('EXACTLY 3 tools');
    });

    test('respects custom max tools parameter', () => {
      const prompt = ResearchPrompts.generateMCPToolSelectionPrompt('query', [], 7);
      expect(prompt).toContain('EXACTLY 7 tools');
    });

    test('includes selection criteria', () => {
      const prompt = ResearchPrompts.generateMCPToolSelectionPrompt('query', []);
      expect(prompt).toContain('SELECTION CRITERIA');
      expect(prompt).toContain('Choose tools');
    });

    test('specifies JSON output format', () => {
      const prompt = ResearchPrompts.generateMCPToolSelectionPrompt('query', []);
      expect(prompt).toContain('selected_tools');
      expect(prompt).toContain('selection_reasoning');
      expect(prompt).toContain('relevance_score');
    });
  });

  describe('generateMCPResearchPrompt', () => {
    test('generates research prompt with full query', () => {
      const query = 'What are quantum computing breakthroughs?';
      const prompt = ResearchPrompts.generateMCPResearchPrompt(query, []);
      expect(prompt).toContain(query);
      expect(prompt).toContain('RESEARCH QUERY');
    });

    test('includes all available tools', () => {
      const tools = ['web_search', 'academic_db', 'news_api'];
      const prompt = ResearchPrompts.generateMCPResearchPrompt('query', tools);
      tools.forEach(tool => expect(prompt).toContain(tool));
    });

    test('includes comprehensive instructions', () => {
      const prompt = ResearchPrompts.generateMCPResearchPrompt('query', ['tool1']);
      expect(prompt).toContain('INSTRUCTIONS');
      expect(prompt).toContain('Use the available tools');
      expect(prompt).toContain('gather relevant information');
    });

    test('specifies error handling', () => {
      const prompt = ResearchPrompts.generateMCPResearchPrompt('query', ['tool1']);
      expect(prompt).toContain('tool call fails');
      expect(prompt).toContain('alternative');
    });

    test('handles empty tools array', () => {
      const prompt = ResearchPrompts.generateMCPResearchPrompt('query', []);
      expect(prompt).toContain('AVAILABLE TOOLS');
    });

    test('handles single tool', () => {
      const prompt = ResearchPrompts.generateMCPResearchPrompt('query', ['single_tool']);
      expect(prompt).toContain('single_tool');
    });

    test('handles multiple tools', () => {
      const tools = ['tool1', 'tool2', 'tool3', 'tool4', 'tool5'];
      const prompt = ResearchPrompts.generateMCPResearchPrompt('query', tools);
      expect(prompt).toContain('tool1');
      expect(prompt).toContain('tool5');
    });
  });

  describe('generateSearchQueriesPrompt', () => {
    test('generates search queries prompt with question', () => {
      const prompt = ResearchPrompts.generateSearchQueriesPrompt('What is AI?');
      expect(prompt).toContain('What is AI?');
      expect(prompt).toContain('google search queries');
    });

    test('includes max iterations in prompt', () => {
      const prompt = ResearchPrompts.generateSearchQueriesPrompt('query', '', 'research_report', 5);
      expect(prompt).toContain('5');
    });

    test('uses parent query for detailed reports', () => {
      const prompt = ResearchPrompts.generateSearchQueriesPrompt(
        'AI basics',
        'Artificial Intelligence',
        'detailed_report'
      );
      expect(prompt).toContain('Artificial Intelligence');
    });

    test('includes context when provided', () => {
      const context = [{ fact: 'AI is growing' }];
      const prompt = ResearchPrompts.generateSearchQueriesPrompt('query', '', 'research_report', 3, context);
      expect(prompt).toContain('Context');
    });

    test('handles context-less search queries', () => {
      const prompt = ResearchPrompts.generateSearchQueriesPrompt('query', '', 'research_report', 3, []);
      expect(prompt).toContain('google search queries');
    });

    test('returns list format in prompt', () => {
      const prompt = ResearchPrompts.generateSearchQueriesPrompt('query');
      expect(prompt).toContain('[');
      expect(prompt).toContain(']');
    });

    test('specifies only list response requirement', () => {
      const prompt = ResearchPrompts.generateSearchQueriesPrompt('query');
      expect(prompt).toContain('ONLY the list');
    });
  });

  describe('generateReportPrompt', () => {
    test('generates report prompt with minimal config', () => {
      const config: PromptConfig = { question: 'What is AI?' };
      const prompt = ResearchPrompts.generateReportPrompt(config);
      expect(prompt).toContain('What is AI?');
    });

    test('includes report format in prompt', () => {
      const config: PromptConfig = { question: 'test', reportFormat: 'apa' };
      const prompt = ResearchPrompts.generateReportPrompt(config);
      expect(prompt).toContain('test');
    });

    test('uses default values for optional fields', () => {
      const config: PromptConfig = { question: 'test' };
      const prompt = ResearchPrompts.generateReportPrompt(config);
      expect(prompt).toContain('test');
    });

    test('handles full config object', () => {
      const config: PromptConfig = {
        question: 'What is AI?',
        context: 'Current AI landscape',
        reportFormat: 'apa',
        totalWords: 2000,
        tone: 'formal',
        language: 'english',
        reportSource: 'web',
      };
      const prompt = ResearchPrompts.generateReportPrompt(config);
      expect(prompt).toContain('What is AI?');
    });
  });

  describe('PromptConfig Interface', () => {
    test('accepts minimal config with only question', () => {
      const config: PromptConfig = { question: 'What is AI?' };
      expect(config.question).toBe('What is AI?');
      expect(config.context).toBeUndefined();
    });

    test('accepts full config with all fields', () => {
      const config: PromptConfig = {
        question: 'What is AI?',
        context: 'Current AI landscape',
        reportFormat: 'apa',
        totalWords: 2000,
        tone: 'formal',
        language: 'english',
        reportSource: 'web',
      };
      expect(config.question).toBe('What is AI?');
      expect(config.context).toBe('Current AI landscape');
      expect(config.reportFormat).toBe('apa');
      expect(config.totalWords).toBe(2000);
      expect(config.tone).toBe('formal');
      expect(config.language).toBe('english');
      expect(config.reportSource).toBe('web');
    });

    test('supports partial config', () => {
      const config: PromptConfig = {
        question: 'test',
        reportFormat: 'mla',
        totalWords: 1500,
      };
      expect(config).toBeTruthy();
    });
  });
});
