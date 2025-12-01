/// <reference types="jest" />
import { ResearchPrompts } from '@/lib/researchPrompts';

describe('ResearchPrompts - 100% Coverage All Methods', () => {
  test('generateResourceReportPrompt with web source', () => {
    const result = ResearchPrompts.generateResourceReportPrompt({
      question: 'test',
      reportSource: 'web',
    });
    expect(result).toContain('hyperlinked');
  });

  test('generateResourceReportPrompt with non-web source', () => {
    const result = ResearchPrompts.generateResourceReportPrompt({
      question: 'test',
      reportSource: 'local',
    });
    expect(result).toContain('document names');
  });

  test('generateResourceReportPrompt with tone', () => {
    const result = ResearchPrompts.generateResourceReportPrompt({
      question: 'test',
      tone: 'analytical',
    });
    expect(result).toContain('analytical');
  });

  test('generateCustomReportPrompt combines context and query', () => {
    const result = ResearchPrompts.generateCustomReportPrompt('custom prompt', 'context data');
    expect(result).toContain('context data');
    expect(result).toContain('custom prompt');
  });

  test('generateOutlineReportPrompt with default words', () => {
    const result = ResearchPrompts.generateOutlineReportPrompt({
      question: 'topic',
    });
    expect(result).toContain('1000');
  });

  test('generateOutlineReportPrompt with custom words', () => {
    const result = ResearchPrompts.generateOutlineReportPrompt({
      question: 'topic',
      totalWords: 5000,
    });
    expect(result).toContain('5000');
  });

  test('generateDeepResearchPrompt with web source', () => {
    const result = ResearchPrompts.generateDeepResearchPrompt({
      question: 'test',
      reportSource: 'web',
    });
    expect(result).toContain('hyperlinked');
  });

  test('generateDeepResearchPrompt with non-web source', () => {
    const result = ResearchPrompts.generateDeepResearchPrompt({
      question: 'test',
      reportSource: 'local',
    });
    expect(result).toContain('document');
  });

  test('generateDeepResearchPrompt with tone', () => {
    const result = ResearchPrompts.generateDeepResearchPrompt({
      question: 'test',
      tone: 'formal',
    });
    expect(result).toContain('formal');
  });

  test('autoAgentInstructions returns valid string', () => {
    const result = ResearchPrompts.autoAgentInstructions();
    expect(result).toContain('Finance Agent');
    expect(result).toContain('Business Analyst');
  });

  test('generateSummaryPrompt formats correctly', () => {
    const result = ResearchPrompts.generateSummaryPrompt('query text', 'data content');
    expect(result).toContain('query text');
    expect(result).toContain('data content');
  });

  test('generateSubtopicsPrompt with array join', () => {
    const result = ResearchPrompts.generateSubtopicsPrompt('task', 'data', ['topic1', 'topic2', 'topic3']);
    expect(result).toContain('topic1, topic2, topic3');
  });

  test('generateSubtopicsPrompt with max subtopics', () => {
    const result = ResearchPrompts.generateSubtopicsPrompt('task', 'data', ['a', 'b'], 10);
    expect(result).toContain('10');
  });

  test('generateSubtopicReportPrompt all parameters', () => {
    const result = ResearchPrompts.generateSubtopicReportPrompt(
      'subtopic',
      ['header1', 'header2'],
      ['content1', 'content2'],
      'main',
      'context',
      'apa',
      5,
      800,
      'formal',
      'english'
    );
    expect(result).toContain('subtopic');
    expect(result).toContain('main');
    expect(result).toContain('header1');
  });

  test('generateDraftTitlesPrompt with subtopic', () => {
    const result = ResearchPrompts.generateDraftTitlesPrompt('sub', 'main', 'context', 5);
    expect(result).toContain('sub');
    expect(result).toContain('main');
  });

  test('generateReportIntroduction with summary', () => {
    const result = ResearchPrompts.generateReportIntroduction('question', 'summary data', 'english', 'apa');
    expect(result).toContain('question');
    expect(result).toContain('summary data');
  });

  test('generateReportConclusion formats correctly', () => {
    const result = ResearchPrompts.generateReportConclusion('query', 'report', 'spanish', 'mla');
    expect(result).toContain('query');
    expect(result).toContain('report');
  });

  test('reviewerSystemTemplate returns string', () => {
    const result = ResearchPrompts.reviewerSystemTemplate();
    expect(typeof result).toBe('string');
    expect(result).toContain('review');
  });

  test('generateReviewPrompt with revision notes', () => {
    const result = ResearchPrompts.generateReviewPrompt('guidelines', 'draft', 'notes');
    expect(result).toContain('guidelines');
    expect(result).toContain('draft');
  });

  test('generateReviewPrompt without revision notes', () => {
    const result = ResearchPrompts.generateReviewPrompt('guidelines', 'draft');
    expect(result).toContain('review');
  });

  test('reviserSystemPrompt returns string', () => {
    const result = ResearchPrompts.reviserSystemPrompt?.();
    expect(typeof result).toBe('string');
  });

  test('generateRevisionPrompt combines draft and review', () => {
    const result = ResearchPrompts.generateRevisionPrompt?.('draft text', 'review feedback');
    expect(result).toBeTruthy();
  });

  test('curateSourcesPrompt with custom max results', () => {
    const result = ResearchPrompts.curateSourcesPrompt('topic', 'sources', 20);
    expect(result).toContain('20');
  });

  test('all tone variations in deepResearch', () => {
    ['formal', 'analytical', 'casual'].forEach(tone => {
      const result = ResearchPrompts.generateDeepResearchPrompt({
        question: 'test',
        tone,
      });
      expect(result).toContain(tone);
    });
  });

  test('all language variations in reportIntro', () => {
    ['english', 'spanish', 'french'].forEach(lang => {
      const result = ResearchPrompts.generateReportIntroduction('test', '', lang);
      expect(result).toContain(lang);
    });
  });

  test('all report formats in resource report', () => {
    ['apa', 'mla', 'chicago', 'harvard'].forEach(format => {
      const result = ResearchPrompts.generateResourceReportPrompt({
        question: 'test',
        reportFormat: format,
      });
      expect(result).toBeTruthy();
    });
  });

  test('edge case empty context in subtopic', () => {
    const result = ResearchPrompts.generateSubtopicReportPrompt(
      'sub',
      [],
      [],
      'main',
      '',
      'apa'
    );
    expect(result).toContain('sub');
  });

  test('edge case large subtopic count', () => {
    const result = ResearchPrompts.generateSubtopicsPrompt(
      'task',
      'data',
      Array(50).fill('topic'),
      100
    );
    expect(result).toContain('100');
  });

  test('date formatting in various prompts', () => {
    const report = ResearchPrompts.generateReportPrompt({ question: 'test' });
    expect(report).toMatch(/\d{1,2}, 202\d/);
  });
});
