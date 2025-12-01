/// <reference types="jest" />
import { ResearchPrompts, PromptConfig } from '@/lib/researchPrompts';

describe('ResearchPrompts Class', () => {
  describe('generateMCPToolSelectionPrompt', () => {
    test('generates prompt with query', () => {
      const prompt = ResearchPrompts.generateMCPToolSelectionPrompt('test query', []);
      expect(prompt).toContain('test query');
    });

    test('generates prompt with tools info', () => {
      const tools = [{ name: 'tool1' }, { name: 'tool2' }];
      const prompt = ResearchPrompts.generateMCPToolSelectionPrompt('query', tools);
      expect(prompt).toContain('tool1');
      expect(prompt).toContain('tool2');
    });

    test('generates prompt with max tools parameter', () => {
      const prompt = ResearchPrompts.generateMCPToolSelectionPrompt('query', [], 5);
      expect(prompt).toContain('5');
    });

    test('uses default max tools of 3', () => {
      const prompt = ResearchPrompts.generateMCPToolSelectionPrompt('query', []);
      expect(prompt).toContain('3');
    });

    test('returns valid JSON format hint', () => {
      const prompt = ResearchPrompts.generateMCPToolSelectionPrompt('query', []);
      expect(prompt).toContain('selected_tools');
      expect(prompt).toContain('selection_reasoning');
    });
  });

  describe('generateMCPResearchPrompt', () => {
    test('generates research prompt with query', () => {
      const prompt = ResearchPrompts.generateMCPResearchPrompt('test query', []);
      expect(prompt).toContain('test query');
    });

    test('generates prompt with selected tools', () => {
      const tools = ['tool1', 'tool2'];
      const prompt = ResearchPrompts.generateMCPResearchPrompt('query', tools);
      expect(prompt).toContain('tool1');
      expect(prompt).toContain('tool2');
    });

    test('includes research instructions', () => {
      const prompt = ResearchPrompts.generateMCPResearchPrompt('query', []);
      expect(prompt).toContain('INSTRUCTIONS');
    });

    test('includes available tools section', () => {
      const prompt = ResearchPrompts.generateMCPResearchPrompt('query', ['tool1']);
      expect(prompt).toContain('AVAILABLE TOOLS');
    });

    test('returns string format', () => {
      const prompt = ResearchPrompts.generateMCPResearchPrompt('query', []);
      expect(typeof prompt).toBe('string');
    });
  });

  describe('PromptConfig Interface', () => {
    test('accepts minimal config', () => {
      const config: PromptConfig = { question: 'test' };
      expect(config.question).toBe('test');
    });

    test('accepts full config', () => {
      const config: PromptConfig = {
        question: 'test',
        context: 'context',
        reportFormat: 'apa',
        totalWords: 1000,
        tone: 'formal',
        language: 'english',
        reportSource: 'web',
      };
      expect(config.totalWords).toBe(1000);
    });
  });
});
