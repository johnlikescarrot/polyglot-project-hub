/**
 * Research Types and Interfaces
 * Based on gpt-researcher architecture
 */

export enum ReportType {
  ResearchReport = "research_report",
  DetailedReport = "detailed_report",
  SubtopicReport = "subtopic_report",
  ResourceReport = "resource_report",
  OutlineReport = "outline_report",
  CustomReport = "custom_report",
  DeepResearch = "deep_research"
}

export enum ReportSource {
  Web = "web",
  Local = "local",
  Hybrid = "hybrid"
}

export enum Tone {
  Objective = "objective",
  Formal = "formal",
  Analytical = "analytical",
  Persuasive = "persuasive",
  Informative = "informative",
  Explanatory = "explanatory",
  Descriptive = "descriptive",
  Critical = "critical",
  Comparative = "comparative",
  Speculative = "speculative",
  Reflective = "reflective",
  Narrative = "narrative",
  Humorous = "humorous",
  Optimistic = "optimistic",
  Pessimistic = "pessimistic"
}

export interface ResearchConfig {
  query: string;
  reportType?: ReportType;
  reportSource?: ReportSource;
  reportFormat?: string;
  tone?: Tone;
  maxSubtopics?: number;
  maxSections?: number;
  totalWords?: number;
  language?: string;
  followGuidelines?: boolean;
  guidelines?: string;
}

export interface ResearchAgent {
  type: string;
  role: string;
  emoji: string;
}

export interface SearchQuery {
  query: string;
  goal?: string;
}

export interface ResearchSource {
  url: string;
  title: string;
  content: string;
  relevance?: number;
  timestamp?: number;
}

export interface DeepResearchNode {
  query: string;
  depth: number;
  learnings: string[];
  sources: ResearchSource[];
  followUpQuestions: string[];
  children?: DeepResearchNode[];
}

export interface ResearchResult {
  query: string;
  report: string;
  sources: ResearchSource[];
  metadata: {
    reportType: ReportType;
    wordCount: number;
    sourceCount: number;
    generatedAt: number;
    model: string;
  };
}

export const REPORT_FORMATS = [
  "apa",
  "mla",
  "chicago",
  "harvard",
  "ieee",
  "vancouver"
] as const;

export type ReportFormat = typeof REPORT_FORMATS[number];

export const LANGUAGES = [
  "english",
  "spanish",
  "french",
  "german",
  "chinese",
  "japanese",
  "korean",
  "portuguese",
  "russian",
  "arabic",
  "hindi"
] as const;

export type Language = typeof LANGUAGES[number];

export interface MultiAgentState {
  draft: string;
  review?: string;
  revision?: string;
  guidelines?: string;
  isComplete: boolean;
}

export interface EditorPlan {
  title: string;
  date: string;
  sections: string[];
}
