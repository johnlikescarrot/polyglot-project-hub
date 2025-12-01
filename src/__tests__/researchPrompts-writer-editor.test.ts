/// <reference types="jest" />
import { ResearchPrompts } from '@/lib/researchPrompts';

describe('ResearchPrompts - Writer, Editor, Deep Research Methods', () => {
  describe('Writer Agent Prompts', () => {
    test('writerSystemPrompt returns description', () => {
      const result = ResearchPrompts.writerSystemPrompt();
      expect(result).toContain('research writer');
      expect(result).toContain('research reports');
    });

    test('generateWriterPrompt with default parameters', () => {
      const result = ResearchPrompts.generateWriterPrompt('topic', 'data');
      expect(result).toContain('topic');
      expect(result).toContain('data');
      expect(result).toContain('introduction');
      expect(result).toContain('conclusion');
    });

    test('generateWriterPrompt with guidelines and followGuidelines false', () => {
      const result = ResearchPrompts.generateWriterPrompt('topic', 'data', 'some guidelines', false);
      expect(result).toContain('topic');
      expect(result).not.toContain('follow the guidelines');
    });

    test('generateWriterPrompt with guidelines and followGuidelines true', () => {
      const result = ResearchPrompts.generateWriterPrompt('topic', 'data', 'specific guidelines', true);
      expect(result).toContain('specific guidelines');
      expect(result).toContain('follow the guidelines');
    });

    test('generateWriterPrompt includes JSON format instruction', () => {
      const result = ResearchPrompts.generateWriterPrompt('q', 'd');
      expect(result).toContain('JSON');
      expect(result).toContain('introduction');
      expect(result).toContain('conclusion');
    });

    test('generateWriterPrompt includes markdown hyperlink example', () => {
      const result = ResearchPrompts.generateWriterPrompt('q', 'd');
      expect(result).toContain('markdown hyperlinks');
    });
  });

  describe('Editor Agent Prompts', () => {
    test('editorSystemPrompt returns description', () => {
      const result = ResearchPrompts.editorSystemPrompt();
      expect(result).toContain('editor');
      expect(result).toContain('research project');
    });

    test('generatePlanningPrompt with defaults', () => {
      const result = ResearchPrompts.generatePlanningPrompt('initial research');
      expect(result).toContain('initial research');
      expect(result).toContain('sections');
    });

    test('generatePlanningPrompt with custom max sections', () => {
      const result = ResearchPrompts.generatePlanningPrompt('research', '', 10);
      expect(result).toContain('10');
    });

    test('generatePlanningPrompt with human feedback empty string', () => {
      const result = ResearchPrompts.generatePlanningPrompt('research', '');
      expect(result).toContain('outline');
    });

    test('generatePlanningPrompt with human feedback "no"', () => {
      const result = ResearchPrompts.generatePlanningPrompt('research', 'no');
      expect(result).toContain('outline');
    });

    test('generatePlanningPrompt with human feedback provided', () => {
      const result = ResearchPrompts.generatePlanningPrompt('research', 'focus on recent developments', 5);
      expect(result).toContain('focus on recent developments');
      expect(result).toContain('5');
    });

    test('generatePlanningPrompt includes JSON format', () => {
      const result = ResearchPrompts.generatePlanningPrompt('research');
      expect(result).toContain('JSON');
      expect(result).toContain('title');
      expect(result).toContain('sections');
    });

    test('generatePlanningPrompt excludes introduction, conclusion, references', () => {
      const result = ResearchPrompts.generatePlanningPrompt('research');
      expect(result).toContain('introduction');
      expect(result).toContain('conclusion');
      expect(result).toContain('references');
    });
  });

  describe('Deep Research Specific Prompts', () => {
    test('generateDeepResearchSearchQueries with defaults', () => {
      const result = ResearchPrompts.generateDeepResearchSearchQueries('complex topic');
      expect(result).toContain('complex topic');
      expect(result).toContain('3');
    });

    test('generateDeepResearchSearchQueries with custom count', () => {
      const result = ResearchPrompts.generateDeepResearchSearchQueries('topic', 5);
      expect(result).toContain('5');
      expect(result).toContain('Goal:');
    });

    test('generateDeepResearchSearchQueries includes query format', () => {
      const result = ResearchPrompts.generateDeepResearchSearchQueries('topic');
      expect(result).toContain('Query:');
      expect(result).toContain('Goal:');
    });

    test('generateResearchPlan with defaults', () => {
      const result = ResearchPrompts.generateResearchPlan('original query', 'search results');
      expect(result).toContain('original query');
      expect(result).toContain('search results');
      expect(result).toContain('3');
    });

    test('generateResearchPlan with custom question count', () => {
      const result = ResearchPrompts.generateResearchPlan('query', 'results', 5);
      expect(result).toContain('5');
    });

    test('generateResearchPlan includes current time', () => {
      const result = ResearchPrompts.generateResearchPlan('q', 'r');
      expect(result).toContain('Current time:');
    });

    test('generateResearchPlan includes Question format', () => {
      const result = ResearchPrompts.generateResearchPlan('q', 'r');
      expect(result).toContain('Question:');
    });

    test('processResearchResults with query and context', () => {
      const result = ResearchPrompts.processResearchResults('research question', 'context data');
      expect(result).toContain('research question');
      expect(result).toContain('context data');
    });

    test('processResearchResults includes Learning format', () => {
      const result = ResearchPrompts.processResearchResults('q', 'c');
      expect(result).toContain('Learning');
      expect(result).toContain('Question:');
    });
  });

  describe('Chat and Evaluation Prompts', () => {
    test('chatSystemPrompt without report', () => {
      const result = ResearchPrompts.chatSystemPrompt();
      expect(result).toContain('GPT Researcher');
      expect(result).toContain('chat');
    });

    test('chatSystemPrompt with report', () => {
      const result = ResearchPrompts.chatSystemPrompt('comprehensive report data');
      expect(result).toContain('comprehensive report data');
      expect(result).toContain('markdown');
    });

    test('chatSystemPrompt includes current time', () => {
      const result = ResearchPrompts.chatSystemPrompt();
      expect(result).toContain('current time');
    });

    test('simpleQAGraderTemplate includes examples', () => {
      const result = ResearchPrompts.simpleQAGraderTemplate();
      expect(result).toContain('CORRECT');
      expect(result).toContain('INCORRECT');
      expect(result).toContain('NOT_ATTEMPTED');
    });

    test('simpleQAGraderTemplate includes Obama example', () => {
      const result = ResearchPrompts.simpleQAGraderTemplate();
      expect(result).toContain('Barack Obama');
      expect(result).toContain('children');
    });

    test('simpleQAGraderTemplate explains grading criteria', () => {
      const result = ResearchPrompts.simpleQAGraderTemplate();
      expect(result).toContain('gold target');
      expect(result).toContain('predicted answer');
    });
  });

  describe('Complex scenarios with all methods', () => {
    test('writer prompt with all parameters filled', () => {
      const result = ResearchPrompts.generateWriterPrompt(
        'quantum computing advancements',
        'detailed research data on quantum computing',
        'ensure academic rigor and clarity',
        true
      );
      expect(result).toContain('quantum computing advancements');
      expect(result).toContain('detailed research data');
      expect(result).toContain('academic rigor');
    });

    test('planning prompt with feedback loop', () => {
      const feedback = 'Please focus on recent breakthroughs and emerging technologies';
      const result = ResearchPrompts.generatePlanningPrompt(
        'AI revolution research',
        feedback,
        7
      );
      expect(result).toContain('breakthroughs');
      expect(result).toContain('emerging technologies');
      expect(result).toContain('7');
    });

    test('deep research flow with multiple queries', () => {
      const search = ResearchPrompts.generateDeepResearchSearchQueries('climate change', 5);
      const plan = ResearchPrompts.generateResearchPlan('climate change', search, 4);
      const process = ResearchPrompts.processResearchResults('climate change', plan);
      
      expect(search).toContain('climate change');
      expect(plan).toContain('climate change');
      expect(process).toContain('climate change');
    });

    test('chat system with complex report', () => {
      const report = 'Multi-section research covering history, current trends, and future outlook';
      const chat = ResearchPrompts.chatSystemPrompt(report);
      expect(chat).toContain(report);
      expect(chat).toContain('citations');
    });

    test('all prompts return valid strings', () => {
      const prompts = [
        ResearchPrompts.writerSystemPrompt(),
        ResearchPrompts.editorSystemPrompt(),
        ResearchPrompts.generateWriterPrompt('q', 'd'),
        ResearchPrompts.generatePlanningPrompt('r'),
        ResearchPrompts.generateDeepResearchSearchQueries('q'),
        ResearchPrompts.generateResearchPlan('q', 'r'),
        ResearchPrompts.processResearchResults('q', 'c'),
        ResearchPrompts.chatSystemPrompt(),
        ResearchPrompts.simpleQAGraderTemplate(),
      ];

      prompts.forEach(prompt => {
        expect(typeof prompt).toBe('string');
        expect(prompt.length).toBeGreaterThan(20);
      });
    });
  });

  describe('Date handling in prompts', () => {
    test('generateWriterPrompt includes current date', () => {
      const result = ResearchPrompts.generateWriterPrompt('q', 'd');
      expect(result).toMatch(/\d{1,2}\/\d{1,2}\/\d{4}|Today/);
    });

    test('generatePlanningPrompt includes current date', () => {
      const result = ResearchPrompts.generatePlanningPrompt('r');
      expect(result).toMatch(/\d{1,2}\/\d{1,2}\/\d{4}|Today/);
    });

    test('generateResearchPlan includes current time', () => {
      const result = ResearchPrompts.generateResearchPlan('q', 'r');
      expect(result).toContain(':');
    });

    test('chatSystemPrompt includes current time', () => {
      const result = ResearchPrompts.chatSystemPrompt();
      expect(result).toContain('Assume the current time');
    });
  });
});
