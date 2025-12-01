# AI Research Assistant - Comprehensive Prompts Documentation

This document details ALL AI prompts integrated from the gpt-researcher repository into this Lovable.dev project.

## 📚 Complete Prompts Library

### 1. Core Research Prompts

#### MCP Tool Selection Prompt
**File**: `src/lib/researchPrompts.ts` - `generateMCPToolSelectionPrompt()`
**Purpose**: Selects optimal MCP tools for research queries
**Usage**: Tool selection for specialized research tasks

#### MCP Research Execution Prompt
**File**: `src/lib/researchPrompts.ts` - `generateMCPResearchPrompt()`
**Purpose**: Conducts research using selected MCP tools
**Usage**: Executing research with specialized tools

#### Search Queries Generation Prompt
**File**: `src/lib/researchPrompts.ts` - `generateSearchQueriesPrompt()`
**Purpose**: Generates Google search queries for research
**Features**:
- Context-aware query generation
- Supports detailed and subtopic reports
- Date-aware queries
- Configurable number of iterations

### 2. Report Generation Prompts

#### Main Report Generation Prompt
**File**: `src/lib/researchPrompts.ts` - `generateReportPrompt()`
**Purpose**: Creates comprehensive research reports
**Configuration**:
- Report format (APA, MLA, Chicago, Harvard, IEEE, Vancouver)
- Word count (500-5000 words)
- Tone selection
- Language selection
- Source type (web/local)
**Features**:
- Markdown formatting with headers
- In-text citations
- Reference lists
- Tables for structured data
- Multi-language support

#### Deep Research Prompt
**File**: `src/lib/researchPrompts.ts` - `generateDeepResearchPrompt()`
**Purpose**: Hierarchical, multi-level deep research
**Features**:
- Synthesizes information from multiple research depths
- Integrates findings from research branches
- Builds from foundational to advanced insights
- 2000+ word reports
- Emphasizes data-driven conclusions

#### Resource Report Prompt
**File**: `src/lib/researchPrompts.ts` - `generateResourceReportPrompt()`
**Purpose**: Generates bibliography recommendations
**Usage**: Source evaluation and recommendation

#### Outline Report Prompt
**File**: `src/lib/researchPrompts.ts` - `generateOutlineReportPrompt()`
**Purpose**: Creates structured research outlines
**Usage**: Planning and framework generation

#### Custom Report Prompt
**File**: `src/lib/researchPrompts.ts` - `generateCustomReportPrompt()`
**Purpose**: User-defined custom reports
**Usage**: Flexible reporting with custom queries

### 3. Source Management Prompts

#### Source Curation Prompt
**File**: `src/lib/researchPrompts.ts` - `curateSourcesPrompt()`
**Purpose**: Evaluates and curates research sources
**Evaluation Criteria**:
- Relevance to research query
- Credibility assessment
- Currency (recent vs. older sources)
- Objectivity analysis
- Quantitative value (statistics, data)
**Features**:
- Prioritizes sources with concrete data
- Retains diverse perspectives
- Filters irrelevant content
- JSON output format

### 4. Detailed Report Prompts

#### Subtopics Generation Prompt
**File**: `src/lib/researchPrompts.ts` - `generateSubtopicsPrompt()`
**Purpose**: Creates subtopic list for detailed reports
**Features**:
- Generates relevant subtopic headers
- Ensures no duplicates
- Configurable maximum subtopics
- Orders topics logically

#### Subtopic Report Prompt
**File**: `src/lib/researchPrompts.ts` - `generateSubtopicReportPrompt()`
**Purpose**: Writes individual subtopic sections
**Features**:
- Ensures content uniqueness
- Avoids overlap with existing sections
- 800+ words per subtopic
- In-text citations
- Markdown tables for data

#### Draft Section Titles Prompt
**File**: `src/lib/researchPrompts.ts` - `generateDraftTitlesPrompt()`
**Purpose**: Generates draft headers for sections
**Usage**: Structural planning

#### Report Introduction Prompt
**File**: `src/lib/researchPrompts.ts` - `generateReportIntroduction()`
**Purpose**: Creates report introductions
**Features**:
- H1 heading with title
- Well-structured and informative
- In-text citations
- Date-aware

#### Report Conclusion Prompt
**File**: `src/lib/researchPrompts.ts` - `generateReportConclusion()`
**Purpose**: Generates report conclusions
**Features**:
- Recaps main points
- Highlights key findings
- Discusses implications
- 2-3 paragraphs
- Multi-language support

### 5. Multi-Agent System Prompts

#### Reviewer Agent Prompt
**File**: `src/lib/researchPrompts.ts` - `reviewerSystemTemplate()`, `generateReviewPrompt()`
**Purpose**: Reviews research drafts and provides feedback
**Role**: Expert research article reviewer
**Features**:
- Guideline-based review
- Provides revision notes
- Accepts or requests revisions

#### Reviser Agent Prompt
**File**: `src/lib/researchPrompts.ts` - `reviserSystemPrompt()`, `generateRevisionPrompt()`
**Purpose**: Revises drafts based on reviewer feedback
**Role**: Expert writer
**Features**:
- Addresses reviewer notes
- Maintains draft quality
- JSON output format

#### Writer Agent Prompt
**File**: `src/lib/researchPrompts.ts` - `writerSystemPrompt()`, `generateWriterPrompt()`
**Purpose**: Writes research report sections
**Role**: Research writer
**Features**:
- Writes introductions and conclusions
- Includes markdown citations
- Guideline-aware
- JSON output format

#### Editor Agent Prompt
**File**: `src/lib/researchPrompts.ts` - `editorSystemPrompt()`, `generatePlanningPrompt()`
**Purpose**: Plans research outline and section layout
**Role**: Research editor
**Features**:
- Plans article sections
- Handles human feedback
- Configurable section count
- JSON output format

### 6. Deep Research Specific Prompts

#### Search Query Generation for Deep Research
**File**: `src/lib/researchPrompts.ts` - `generateDeepResearchSearchQueries()`
**Purpose**: Generates targeted search queries for deep research
**Features**:
- Multiple unique queries
- Research goal for each query
- Structured format

#### Research Plan Generation
**File**: `src/lib/researchPrompts.ts` - `generateResearchPlan()`
**Purpose**: Creates follow-up questions for research
**Features**:
- Analyzes original query and results
- Generates targeted questions
- Explores different aspects and time periods
- Date-aware analysis

#### Research Results Processing
**File**: `src/lib/researchPrompts.ts` - `processResearchResults()`
**Purpose**: Extracts learnings from research results
**Features**:
- Key learnings extraction
- Source citations
- Follow-up question suggestions

### 7. Agent Selection Prompts

#### Auto Agent Instructions
**File**: `src/lib/researchPrompts.ts` - `autoAgentInstructions()`
**Purpose**: Determines appropriate agent type based on topic
**Agent Types**:
- 💰 Finance Agent
- 📈 Business Analyst Agent
- 🌍 Travel Agent
- (Many more specialized agents)
**Features**:
- Topic-based agent selection
- Role-specific prompts
- Emoji categorization

#### Summary Generation Prompt
**File**: `src/lib/researchPrompts.ts` - `generateSummaryPrompt()`
**Purpose**: Summarizes text based on queries
**Features**:
- Query-focused summarization
- Includes factual information
- Numbers and statistics retention

### 8. Chat Interface Prompt

#### Chat System Prompt
**File**: `src/lib/researchPrompts.ts` - `chatSystemPrompt()`
**Purpose**: GPT Researcher chat assistant
**Features**:
- Report-aware responses
- Citation inclusion
- Markdown formatting
- Quick search tool usage
- Date-aware

### 9. Evaluation Prompt

#### SimpleQA Grader Template
**File**: `src/lib/researchPrompts.ts` - `simpleQAGraderTemplate()`
**Purpose**: Grades factual accuracy of responses
**Grades**:
- CORRECT
- INCORRECT
- NOT_ATTEMPTED
**Features**:
- Detailed examples for each grade
- Semantic meaning evaluation
- Handles hedging and guessing

## 🎯 Research Modes

### Standard Research Report
- Comprehensive, well-structured reports
- 1000+ words
- Citations and references
- Multiple perspectives

### Deep Research
- Hierarchical, multi-level analysis
- 2000+ words
- Synthesizes multiple research depths
- Advanced insights

### Detailed Report
- In-depth with subtopics
- Each subtopic thoroughly researched
- 800+ words per subtopic
- Unique content per section

### Outline Report
- Structured framework
- Main sections and subsections
- Key points coverage
- Planning tool

## ⚙️ Configuration Options

### Report Formats
- APA
- MLA
- Chicago
- Harvard
- IEEE
- Vancouver

### Writing Tones
- Objective
- Analytical
- Formal
- Informative
- Critical
- Persuasive
- Descriptive
- Comparative
- And 7 more...

### Languages
- English
- Spanish
- French
- German
- Chinese
- Japanese
- Korean
- Portuguese
- Russian
- Arabic
- Hindi

### Word Count Range
- Minimum: 500 words
- Maximum: 5000 words
- Default: 1000 words

## 🚀 Implementation Details

### Edge Function Integration
**File**: `supabase/functions/ai-research/index.ts`
- Enhanced system prompt for GPT Researcher
- Comprehensive research capabilities
- Multi-perspective analysis
- Hierarchical information synthesis

### UI Components
1. **ResearchModeSelector**: Configure research parameters
2. **ModelSelector**: Choose from 7 AI models
3. **ChatInput**: Submit research queries
4. **ChatMessage**: Display research results with markdown
5. **ResearchHistory**: Track session queries
6. **QuickActions**: Preset research topics

### Type System
**File**: `src/lib/researchTypes.ts`
- Complete type definitions
- Enums for configurations
- Interfaces for research structures

## 📖 Usage Examples

### Basic Research Query
```typescript
const message = "What are the latest developments in quantum computing?";
// Uses default settings: Standard Research, APA format, 1000 words
```

### Deep Research Query
```typescript
// Configure for deep research
settings = {
  reportType: ReportType.DeepResearch,
  reportFormat: "apa",
  tone: Tone.Analytical,
  totalWords: 2000,
  language: "english"
}
```

### Detailed Multi-Subtopic Report
```typescript
settings = {
  reportType: ReportType.DetailedReport,
  reportFormat: "ieee",
  tone: Tone.Formal,
  totalWords: 3000,
  language: "english"
}
```

## 🔧 Customization

All prompts are modular and can be:
- Extended with additional parameters
- Customized for specific use cases
- Combined for complex research workflows
- Localized for different languages

## 📚 Source Attribution

All prompts are based on the open-source [gpt-researcher](https://github.com/assafelovic/gpt-researcher) project.

- Homepage: https://gptr.dev
- Documentation: https://docs.gptr.dev
- GitHub: https://github.com/assafelovic/gpt-researcher

## 🎓 Best Practices

1. **Choose the Right Mode**: Use Deep Research for complex topics, Standard for general queries
2. **Configure Appropriately**: Adjust word count and format based on needs
3. **Select Proper Model**: Use Gemini 2.5 Flash for speed, Gemini 3 Pro for quality
4. **Specify Tone**: Match tone to audience and purpose
5. **Language Selection**: Ensure output language matches audience

---

**Built with ❤️ integrating the power of GPT Researcher into Lovable.dev**
