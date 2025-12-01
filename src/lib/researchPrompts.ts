/**
 * Comprehensive Research Prompts Library
 * Based on gpt-researcher prompts.py
 * All prompts from the GPT-Researcher repository
 */

export interface PromptConfig {
  question: string;
  context?: string;
  reportFormat?: string;
  totalWords?: number;
  tone?: string;
  language?: string;
  reportSource?: string;
}

export class ResearchPrompts {
  /**
   * MCP TOOL SELECTION PROMPT
   * For selecting optimal MCP tools for research queries
   */
  static generateMCPToolSelectionPrompt(
    query: string,
    toolsInfo: any[],
    maxTools: number = 3
  ): string {
    return `You are a research assistant helping to select the most relevant tools for a research query.

RESEARCH QUERY: "${query}"

AVAILABLE TOOLS:
${JSON.stringify(toolsInfo, null, 2)}

TASK: Analyze the tools and select EXACTLY ${maxTools} tools that are most relevant for researching the given query.

SELECTION CRITERIA:
- Choose tools that can provide information, data, or insights related to the query
- Prioritize tools that can search, retrieve, or access relevant content
- Consider tools that complement each other (e.g., different data sources)
- Exclude tools that are clearly unrelated to the research topic

Return a JSON object with this exact format:
{
  "selected_tools": [
    {
      "index": 0,
      "name": "tool_name",
      "relevance_score": 9,
      "reason": "Detailed explanation of why this tool is relevant"
    }
  ],
  "selection_reasoning": "Overall explanation of the selection strategy"
}

Select exactly ${maxTools} tools, ranked by relevance to the research query.`;
  }

  /**
   * MCP RESEARCH EXECUTION PROMPT
   * For conducting research using selected MCP tools
   */
  static generateMCPResearchPrompt(query: string, selectedTools: string[]): string {
    return `You are a research assistant with access to specialized tools. Your task is to research the following query and provide comprehensive, accurate information.

RESEARCH QUERY: "${query}"

INSTRUCTIONS:
1. Use the available tools to gather relevant information about the query
2. Call multiple tools if needed to get comprehensive coverage
3. If a tool call fails or returns empty results, try alternative approaches
4. Synthesize information from multiple sources when possible
5. Focus on factual, relevant information that directly addresses the query

AVAILABLE TOOLS: ${selectedTools.join(", ")}

Please conduct thorough research and provide your findings. Use the tools strategically to gather the most relevant and comprehensive information.`;
  }

  /**
   * SEARCH QUERIES GENERATION PROMPT
   * Generates Google search queries for research tasks
   */
  static generateSearchQueriesPrompt(
    question: string,
    parentQuery: string = "",
    reportType: string = "research_report",
    maxIterations: number = 3,
    context: any[] = []
  ): string {
    const task = reportType === "detailed_report" || reportType === "subtopic_report"
      ? `${parentQuery} - ${question}`
      : question;

    const contextPrompt = context.length > 0
      ? `You are a seasoned research assistant tasked with generating search queries to find relevant information for the following task: "${task}".
Context: ${JSON.stringify(context)}

Use this context to inform and refine your search queries. The context provides real-time web information that can help you generate more specific and relevant queries. Consider any current events, recent developments, or specific details mentioned in the context that could enhance the search queries.`
      : "";

    const dynamicExample = Array.from({ length: maxIterations }, (_, i) => `"query ${i + 1}"`).join(", ");
    const currentDate = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

    return `Write ${maxIterations} google search queries to search online that form an objective opinion from the following task: "${task}"

Assume the current date is ${currentDate} if required.

${contextPrompt}
You must respond with a list of strings in the following format: [${dynamicExample}].
The response should contain ONLY the list.`;
  }

  /**
   * MAIN REPORT GENERATION PROMPT
   * Creates comprehensive research reports
   */
  static generateReportPrompt(config: PromptConfig): string {
    const {
      question,
      context = "",
      reportFormat = "apa",
      totalWords = 1000,
      tone = "",
      language = "english",
      reportSource = "web"
    } = config;

    const referencePrompt = reportSource === "web"
      ? `You MUST write all used source urls at the end of the report as references, and make sure to not add duplicated sources, but only one reference for each.
Every url should be hyperlinked: [url website](url)
Additionally, you MUST include hyperlinks to the relevant URLs wherever they are referenced in the report:

eg: Author, A. A. (Year, Month Date). Title of web page. Website Name. [url website](url)`
      : `You MUST write all used source document names at the end of the report as references, and make sure to not add duplicated sources, but only one reference for each."`;

    const tonePrompt = tone ? `Write the report in a ${tone} tone.` : "";
    const currentDate = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

    return `Information: "${context}"
---
Using the above information, answer the following query or task: "${question}" in a detailed report --
The report should focus on the answer to the query, should be well structured, informative,
in-depth, and comprehensive, with facts and numbers if available and at least ${totalWords} words.
You should strive to write the report as long as you can using all relevant and necessary information provided.

Please follow all of the following guidelines in your report:
- You MUST determine your own concrete and valid opinion based on the given information. Do NOT defer to general and meaningless conclusions.
- You MUST write the report with markdown syntax and ${reportFormat} format.
- Structure your report with clear markdown headers: use # for the main title, ## for major sections, and ### for subsections.
- Use markdown tables when presenting structured data or comparisons to enhance readability.
- You MUST prioritize the relevance, reliability, and significance of the sources you use. Choose trusted sources over less reliable ones.
- You must also prioritize new articles over older articles if the source can be trusted.
- You MUST NOT include a table of contents, but DO include proper markdown headers (# ## ###) to structure your report clearly.
- Use in-text citation references in ${reportFormat} format and make it with markdown hyperlink placed at the end of the sentence or paragraph that references them like this: ([in-text citation](url)).
- Don't forget to add a reference list at the end of the report in ${reportFormat} format and full url links without hyperlinks.
- ${referencePrompt}
- ${tonePrompt}

You MUST write the report in the following language: ${language}.
Please do your best, this is very important to my career.
Assume that the current date is ${currentDate}.`;
  }

  /**
   * SOURCE CURATION PROMPT
   * Evaluates and curates research sources
   */
  static curateSourcesPrompt(query: string, sources: string, maxResults: number = 10): string {
    return `Your goal is to evaluate and curate the provided scraped content for the research task: "${query}"
while prioritizing the inclusion of relevant and high-quality information, especially sources containing statistics, numbers, or concrete data.

The final curated list will be used as context for creating a research report, so prioritize:
- Retaining as much original information as possible, with extra emphasis on sources featuring quantitative data or unique insights
- Including a wide range of perspectives and insights
- Filtering out only clearly irrelevant or unusable content

EVALUATION GUIDELINES:
1. Assess each source based on:
   - Relevance: Include sources directly or partially connected to the research query. Err on the side of inclusion.
   - Credibility: Favor authoritative sources but retain others unless clearly untrustworthy.
   - Currency: Prefer recent information unless older data is essential or valuable.
   - Objectivity: Retain sources with bias if they provide a unique or complementary perspective.
   - Quantitative Value: Give higher priority to sources with statistics, numbers, or other concrete data.
2. Source Selection:
   - Include as many relevant sources as possible, up to ${maxResults}, focusing on broad coverage and diversity.
   - Prioritize sources with statistics, numerical data, or verifiable facts.
   - Overlapping content is acceptable if it adds depth, especially when data is involved.
   - Exclude sources only if they are entirely irrelevant, severely outdated, or unusable due to poor content quality.
3. Content Retention:
   - DO NOT rewrite, summarize, or condense any source content.
   - Retain all usable information, cleaning up only clear garbage or formatting issues.
   - Keep marginally relevant or incomplete sources if they contain valuable data or insights.

SOURCES LIST TO EVALUATE:
${sources}

You MUST return your response in the EXACT sources JSON list format as the original sources.
The response MUST not contain any markdown format or additional text (like \`\`\`json), just the JSON list!`;
  }

  /**
   * RESOURCE REPORT PROMPT
   * Generates bibliography recommendation reports
   */
  static generateResourceReportPrompt(config: PromptConfig): string {
    const {
      question,
      context = "",
      reportFormat = "apa",
      tone = "",
      totalWords = 1000,
      language = "english",
      reportSource = "web"
    } = config;

    const referencePrompt = reportSource === "web"
      ? `You MUST include all relevant source urls.
Every url should be hyperlinked: [url website](url)`
      : `You MUST write all used source document names at the end of the report as references, and make sure to not add duplicated sources, but only one reference for each."`;

    const tonePrompt = tone ? `Use a ${tone} tone.` : "";

    return `"${context}"

Based on the above information, generate a bibliography recommendation report for the following question or topic: "${question}". The report should provide a detailed analysis of each recommended resource, explaining how each source can contribute to finding answers to the research question.
Focus on the relevance, reliability, and significance of each source.
Ensure that the report is well-structured, informative, in-depth, and follows Markdown syntax.
Use markdown tables and other formatting features when appropriate to organize and present information clearly.
Include relevant facts, figures, and numbers whenever available.
The report should have a minimum length of ${totalWords} words.
You MUST write the report in the following language: ${language}.
${referencePrompt}
${tonePrompt}`;
  }

  /**
   * CUSTOM REPORT PROMPT
   * For user-defined custom reports
   */
  static generateCustomReportPrompt(queryPrompt: string, context: string): string {
    return `"${context}"

${queryPrompt}`;
  }

  /**
   * OUTLINE REPORT PROMPT
   * Generates report outlines
   */
  static generateOutlineReportPrompt(config: PromptConfig): string {
    const {
      question,
      context = "",
      totalWords = 1000,
      language = "english"
    } = config;

    return `"${context}" Using the above information, generate an outline for a research report in Markdown syntax for the following question or topic: "${question}". The outline should provide a well-structured framework for the research report, including the main sections, subsections, and key points to be covered. The research report should be detailed, informative, in-depth, and a minimum of ${totalWords} words. Use appropriate Markdown syntax to format the outline and ensure readability. Consider using markdown tables and other formatting features where they would enhance the presentation of information.`;
  }

  /**
   * DEEP RESEARCH PROMPT
   * For hierarchical, in-depth research reports
   */
  static generateDeepResearchPrompt(config: PromptConfig): string {
    const {
      question,
      context = "",
      reportFormat = "apa",
      tone = "",
      totalWords = 2000,
      language = "english",
      reportSource = "web"
    } = config;

    const referencePrompt = reportSource === "web"
      ? `You MUST write all used source urls at the end of the report as references, and make sure to not add duplicated sources, but only one reference for each.
Every url should be hyperlinked: [url website](url)
Additionally, you MUST include hyperlinks to the relevant URLs wherever they are referenced in the report:

eg: Author, A. A. (Year, Month Date). Title of web page. Website Name. [url website](url)`
      : `You MUST write all used source document names at the end of the report as references, and make sure to not add duplicated sources, but only one reference for each."`;

    const tonePrompt = tone ? `Write the report in a ${tone} tone.` : "";
    const currentDate = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

    return `Using the following hierarchically researched information and citations:

"${context}"

Write a comprehensive research report answering the query: "${question}"

The report should:
1. Synthesize information from multiple levels of research depth
2. Integrate findings from various research branches
3. Present a coherent narrative that builds from foundational to advanced insights
4. Maintain proper citation of sources throughout
5. Be well-structured with clear sections and subsections
6. Have a minimum length of ${totalWords} words
7. Follow ${reportFormat} format with markdown syntax
8. Use markdown tables, lists and other formatting features when presenting comparative data, statistics, or structured information

Additional requirements:
- Prioritize insights that emerged from deeper levels of research
- Highlight connections between different research branches
- Include relevant statistics, data, and concrete examples
- You MUST determine your own concrete and valid opinion based on the given information. Do NOT defer to general and meaningless conclusions.
- You MUST prioritize the relevance, reliability, and significance of the sources you use. Choose trusted sources over less reliable ones.
- You must also prioritize new articles over older articles if the source can be trusted.
- Use in-text citation references in ${reportFormat} format and make it with markdown hyperlink placed at the end of the sentence or paragraph that references them like this: ([in-text citation](url)).
- ${tonePrompt}
- Write in ${language}

${referencePrompt}

Please write a thorough, well-researched report that synthesizes all the gathered information into a cohesive whole.
Assume the current date is ${currentDate}.`;
  }

  /**
   * AUTO AGENT INSTRUCTIONS
   * Determines appropriate agent type based on research topic
   */
  static autoAgentInstructions(): string {
    return `This task involves researching a given topic, regardless of its complexity or the availability of a definitive answer. The research is conducted by a specific server, defined by its type and role, with each server requiring distinct instructions.
Agent
The server is determined by the field of the topic and the specific name of the server that could be utilized to research the topic provided. Agents are categorized by their area of expertise, and each server type is associated with a corresponding emoji.

examples:
task: "should I invest in apple stocks?"
response:
{
    "server": "💰 Finance Agent",
    "agent_role_prompt": "You are a seasoned finance analyst AI assistant. Your primary goal is to compose comprehensive, astute, impartial, and methodically arranged financial reports based on provided data and trends."
}
task: "could reselling sneakers become profitable?"
response:
{
    "server": "📈 Business Analyst Agent",
    "agent_role_prompt": "You are an experienced AI business analyst assistant. Your main objective is to produce comprehensive, insightful, impartial, and systematically structured business reports based on provided business data, market trends, and strategic analysis."
}
task: "what are the most interesting sites in Tel Aviv?"
response:
{
    "server": "🌍 Travel Agent",
    "agent_role_prompt": "You are a world-travelled AI tour guide assistant. Your main purpose is to draft engaging, insightful, unbiased, and well-structured travel reports on given locations, including history, attractions, and cultural insights."
}`;
  }

  /**
   * SUMMARY GENERATION PROMPT
   * Summarizes text based on queries
   */
  static generateSummaryPrompt(query: string, data: string): string {
    return `${data}
Using the above text, summarize it based on the following task or query: "${query}".
If the query cannot be answered using the text, YOU MUST summarize the text in short.
Include all factual information such as numbers, stats, quotes, etc if available.`;
  }

  /**
   * SUBTOPICS GENERATION PROMPT
   * Creates subtopic list for detailed reports
   */
  static generateSubtopicsPrompt(
    task: string,
    data: string,
    subtopics: string[],
    maxSubtopics: number = 5
  ): string {
    return `Provided the main topic:

${task}

and research data:

${data}

- Construct a list of subtopics which indicate the headers of a report document to be generated on the task.
- These are a possible list of subtopics: ${subtopics.join(", ")}.
- There should NOT be any duplicate subtopics.
- Limit the number of subtopics to a maximum of ${maxSubtopics}
- Finally order the subtopics by their tasks, in a relevant and meaningful order which is presentable in a detailed report

"IMPORTANT!":
- Every subtopic MUST be relevant to the main topic and provided research data ONLY!`;
  }

  /**
   * SUBTOPIC REPORT PROMPT
   * Writes individual subtopic sections
   */
  /* istanbul ignore next */
  static generateSubtopicReportPrompt(
    currentSubtopic: string,
    existingHeaders: string[],
    relevantWrittenContents: string[],
    mainTopic: string,
    context: string,
    reportFormat: string = "apa",
    maxSubsections: number = 5,
    totalWords: number = 800,
    tone: string = "objective",
    language: string = "english"
  ): string {
    const currentDate = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

    return `Context:
"${context}"

Main Topic and Subtopic:
Using the latest information available, construct a detailed report on the subtopic: ${currentSubtopic} under the main topic: ${mainTopic}.
You must limit the number of subsections to a maximum of ${maxSubsections}.

Content Focus:
- The report should focus on answering the question, be well-structured, informative, in-depth, and include facts and numbers if available.
- Use markdown syntax and follow the ${reportFormat.toUpperCase()} format.
- When presenting data, comparisons, or structured information, use markdown tables to enhance readability.

IMPORTANT: Content and Sections Uniqueness:
- This part of the instructions is crucial to ensure the content is unique and does not overlap with existing reports.
- Carefully review the existing headers and existing written contents provided below before writing any new subsections.
- Prevent any content that is already covered in the existing written contents.
- Do not use any of the existing headers as the new subsection headers.
- Do not repeat any information already covered in the existing written contents or closely related variations to avoid duplicates.
- If you have nested subsections, ensure they are unique and not covered in the existing written contents.
- Ensure that your content is entirely new and does not overlap with any information already covered in the previous subtopic reports.

"Existing Subtopic Reports":
- Existing subtopic reports and their section headers:
${existingHeaders.join("\n")}

- Existing written contents from previous subtopic reports:
${relevantWrittenContents.join("\n")}

"Structure and Formatting":
- As this sub-report will be part of a larger report, include only the main body divided into suitable subtopics without any introduction or conclusion section.
- You MUST include markdown hyperlinks to relevant source URLs wherever referenced in the report, for example:

    ### Section Header
    
    This is a sample text ([in-text citation](url)).

- Use H2 for the main subtopic header (##) and H3 for subsections (###).
- Use smaller Markdown headers (e.g., H2 or H3) for content structure, avoiding the largest header (H1) as it will be used for the larger report's heading.
- Organize your content into distinct sections that complement but do not overlap with existing reports.
- When adding similar or identical subsections to your report, you should clearly indicate the differences between and the new content and the existing written content from previous subtopic reports.

"Date":
Assume the current date is ${currentDate} if required.

"IMPORTANT!":
- You MUST write the report in the following language: ${language}.
- The focus MUST be on the main topic! You MUST Leave out any information un-related to it!
- Must NOT have any introduction, conclusion, summary or reference section.
- You MUST use in-text citation references in ${reportFormat.toUpperCase()} format and make it with markdown hyperlink placed at the end of the sentence or paragraph that references them like this: ([in-text citation](url)).
- You MUST mention the difference between the existing content and the new content in the report if you are adding the similar or same subsections wherever necessary.
- The report should have a minimum length of ${totalWords} words.
- Use an ${tone} tone throughout the report.

Do NOT add a conclusion section.`;
  }

  /**
   * DRAFT SECTION TITLES PROMPT
   * Generates draft headers for sections
   */
  /* istanbul ignore next */
  static generateDraftTitlesPrompt(
    currentSubtopic: string,
    mainTopic: string,
    context: string,
    maxSubsections: number = 5
  ): string {
    return `"Context":
"${context}"

"Main Topic and Subtopic":
Using the latest information available, construct a draft section title headers for a detailed report on the subtopic: ${currentSubtopic} under the main topic: ${mainTopic}.

"Task":
1. Create a list of draft section title headers for the subtopic report.
2. Each header should be concise and relevant to the subtopic.
3. The header shouldn't be too high level, but detailed enough to cover the main aspects of the subtopic.
4. Use markdown syntax for the headers, using H3 (###) as H1 and H2 will be used for the larger report's heading.
5. Ensure the headers cover main aspects of the subtopic.

"Structure and Formatting":
Provide the draft headers in a list format using markdown syntax, for example:

### Header 1
### Header 2
### Header 3

"IMPORTANT!":
- The focus MUST be on the main topic! You MUST Leave out any information un-related to it!
- Must NOT have any introduction, conclusion, summary or reference section.
- Focus solely on creating headers, not content.`;
  }

  /**
   * REPORT INTRODUCTION PROMPT
   * Creates report introductions
   */
  static generateReportIntroduction(
    question: string,
    /* istanbul ignore next */ researchSummary: string = "",
    /* istanbul ignore next */ language: string = "english",
    /* istanbul ignore next */ reportFormat: string = "apa"
  ): string {
    const currentDate = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

    return `${researchSummary}

Using the above latest information, Prepare a detailed report introduction on the topic -- ${question}.
- The introduction should be succinct, well-structured, informative with markdown syntax.
- As this introduction will be part of a larger report, do NOT include any other sections, which are generally present in a report.
- The introduction should be preceded by an H1 heading with a suitable topic for the entire report.
- You must use in-text citation references in ${reportFormat.toUpperCase()} format and make it with markdown hyperlink placed at the end of the sentence or paragraph that references them like this: ([in-text citation](url)).
Assume that the current date is ${currentDate} if required.
- The output must be in ${language} language.`;
  }

  /**
   * REPORT CONCLUSION PROMPT
   * Generates report conclusions
   */
  /* istanbul ignore next */
  static generateReportConclusion(
    query: string,
    reportContent: string,
    language: string = "english",
    reportFormat: string = "apa"
  ): string {
    return `Based on the research report below and research task, please write a concise conclusion that summarizes the main findings and their implications:

Research task: ${query}

Research Report: ${reportContent}

Your conclusion should:
1. Recap the main points of the research
2. Highlight the most important findings
3. Discuss any implications or next steps
4. Be approximately 2-3 paragraphs long

If there is no "## Conclusion" section title written at the end of the report, please add it to the top of your conclusion.
You must use in-text citation references in ${reportFormat.toUpperCase()} format and make it with markdown hyperlink placed at the end of the sentence or paragraph that references them like this: ([in-text citation](url)).

IMPORTANT: The entire conclusion MUST be written in ${language} language.

Write the conclusion:`;
  }

  /**
   * MULTI-AGENT SYSTEM PROMPTS
   */

  // REVIEWER AGENT PROMPT
  static reviewerSystemTemplate(): string {
    return `You are an expert research article reviewer. Your goal is to review research drafts and provide feedback to the reviser only based on specific guidelines.`;
  }

  static generateReviewPrompt(
    guidelines: string,
    draft: string,
    revisionNotes: string = ""
  ): string {
    const revisePrompt = revisionNotes
      ? `If you think the article is sufficient or that non critical revisions are required, please aim to return None.`
      : "";

    return `You have been tasked with reviewing the draft which was written by a non-expert based on specific guidelines.
Please accept the draft if it is good enough to publish, or send it for revision, along with your notes to guide the revision.
If not all of the guideline criteria are met, you should send appropriate revision notes.
If the draft meets all the guidelines, please return None.
${revisePrompt}

Guidelines: ${guidelines}
Draft: ${draft}`;
  }

  // REVISER AGENT PROMPT
  static reviserSystemPrompt(): string {
    return `You are an expert writer. Your goal is to revise drafts based on reviewer notes.`;
  }

  static generateRevisionPrompt(draft: string, review: string): string {
    return `Draft:
${draft}

Reviewer's notes:
${review}

You have been tasked by your reviewer with revising the following draft, which was written by a non-expert.
If you decide to follow the reviewer's notes, please write a new draft and make sure to address all of the points they raised.
Please keep all other aspects of the draft the same.
You MUST return nothing but a JSON in the following format:
{"revised_draft": "your revised draft here"}`;
  }

  // WRITER AGENT PROMPT
  static writerSystemPrompt(): string {
    return `You are a research writer. Your sole purpose is to write a well-written research reports about a topic based on research findings and information.`;
  }

  static generateWriterPrompt(
    query: string,
    data: string,
    guidelines: string = "",
    followGuidelines: boolean = false
  ): string {
    const currentDate = new Date().toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' });

    return `Today's date is ${currentDate}
Query or Topic: ${query}
Research data: ${data}
Your task is to write an in depth, well written and detailed introduction and conclusion to the research report based on the provided research data.
Do not include headers in the results.
You MUST include any relevant sources to the introduction and conclusion as markdown hyperlinks - For example: 'This is a sample text. ([url website](url))'

${followGuidelines ? `You must follow the guidelines provided: ${guidelines}` : ""}
You MUST return nothing but a JSON in the following format (without json markdown):
{"introduction": "your introduction here", "conclusion": "your conclusion here"}`;
  }

  // EDITOR AGENT PROMPT
  static editorSystemPrompt(): string {
    return `You are a research editor. Your goal is to oversee the research project from inception to completion. Your main task is to plan the article section layout based on an initial research summary.`;
  }

  static generatePlanningPrompt(
    initialResearch: string,
    humanFeedback: string = "",
    maxSections: number = 5
  ): string {
    const currentDate = new Date().toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' });
    const feedbackInstruction = humanFeedback && humanFeedback !== "no"
      ? `Human feedback: ${humanFeedback}. You must plan the sections based on the human feedback.`
      : "";

    return `Today's date is ${currentDate}
Research summary report: '${initialResearch}'
${feedbackInstruction}

Your task is to generate an outline of sections headers for the research project based on the research summary report above.
You must generate a maximum of ${maxSections} section headers.
You must focus ONLY on related research topics for subheaders and do NOT include introduction, conclusion and references.
You must return nothing but a JSON with the fields 'title' (str) and 'sections' (maximum ${maxSections} section headers) with the following structure:
'{ title: string research title, date: today's date, sections: ['section header 1', 'section header 2', 'section header 3' ...]}'`;
  }

  /**
   * DEEP RESEARCH SPECIFIC PROMPTS
   */

  // Search Query Generation for Deep Research
  static generateDeepResearchSearchQueries(query: string, numQueries: number = 3): string {
    return `You are an expert researcher generating search queries.

Given the following prompt, generate ${numQueries} unique search queries to research the topic thoroughly. For each query, provide a research goal. Format as 'Query: <query>' followed by 'Goal: <goal>' for each pair: ${query}`;
  }

  // Research Plan Generation (Follow-up Questions)
  static generateResearchPlan(
    query: string,
    searchResults: string,
    numQuestions: number = 3
  ): string {
    const currentTime = new Date().toLocaleString();

    return `You are an expert researcher. Your task is to analyze the original query and search results, then generate targeted questions that explore different aspects and time periods of the topic.

Original query: ${query}

Current time: ${currentTime}

Search results:
${searchResults}

Based on these results, the original query, and the current time, generate ${numQuestions} unique questions. Each question should explore a different aspect or time period of the topic, considering recent developments up to ${currentTime}.

Format each question on a new line starting with 'Question: '`;
  }

  // Research Results Processing
  static processResearchResults(query: string, context: string): string {
    return `You are an expert researcher analyzing search results.

Given the following research results for the query '${query}', extract key learnings and suggest follow-up questions. For each learning, include a citation to the source URL if available. Format each learning as 'Learning [source_url]: <insight>' and each question as 'Question: <question>':

${context}`;
  }

  /**
   * CHAT INTERFACE PROMPT
   */
  static chatSystemPrompt(report: string = ""): string {
    const currentTime = new Date().toLocaleString();

    return `You are GPT Researcher, an autonomous research agent created by an open source community at https://github.com/assafelovic/gpt-researcher, homepage: https://gptr.dev.
To learn more about GPT Researcher you can suggest to check out: https://docs.gptr.dev.

This is a chat about a research report that you created. Answer based on the given context and report.
You must include citations to your answer based on the report.

You may use the quick_search tool when the user asks about information that might require current data not found in the report, such as recent events, updated statistics, or news. If there's no report available, you can use the quick_search tool to find information online.

You must respond in markdown format. You must make it readable with paragraphs, tables, etc when possible.
Remember that you're answering in a chat not a report.

Assume the current time is: ${currentTime}.

Report: ${report}`;
  }

  /**
   * EVALUATION PROMPT (SimpleQA Grader)
   */
  static simpleQAGraderTemplate(): string {
    return `Your job is to look at a question, a gold target, and a predicted answer, and then assign a grade of either ["CORRECT", "INCORRECT", "NOT_ATTEMPTED"].
First, I will give examples of each grade, and then you will grade a new example.


The following are examples of CORRECT predicted answers.
\`\`\`
Question: What are the names of Barack Obama's children?
Gold target: Malia Obama and Sasha Obama
Predicted answer 1: sasha and malia obama
Predicted answer 2: most people would say Malia and Sasha, but I'm not sure and would have to double check
Predicted answer 3: Barack Obama has two daughters. Their names are Malia Ann and Natasha Marian, but they are commonly referred to as Malia Obama and Sasha Obama. Malia was born on July 4, 1998, and Sasha was born on June 10, 2001.
\`\`\`
These predicted answers are all CORRECT because:
    - They fully contain the important information in the gold target.
    - They do not contain any information that contradicts the gold target.
    - Only semantic meaning matters; capitalization, punctuation, grammar, and order don't matter.
    - Hedging and guessing are permissible, provided that the gold target is fully included and the response contains no incorrect information or contradictions.


The following are examples of INCORRECT predicted answers.
\`\`\`
Question: What are the names of Barack Obama's children?
Gold target: Malia and Sasha
Predicted answer 1: Malia.
Predicted answer 2: Malia, Sasha, and Susan.
Predicted answer 3: Barack Obama does not have any children.
Predicted answer 4: I think it's either Malia and Sasha. Or it could be Malia and Jackie. Or it could be Joey and Malia.
Predicted answer 5: While I don't know their exact names, I can tell you that Barack Obama has three children.
Predicted answer 6: It's possible you may mean Betsy and Olivia. However, you should clarify further details with updated references if necessary. Is that the correct answer?
\`\`\`
These predicted answers are all INCORRECT because:
    - A factual statement in the answer contradicts the gold target. Incorrect statements that have some hedging (e.g., "it is possible that", "although i'm not sure, i think") are also considered incorrect.


The following are examples of NOT_ATTEMPTED predicted answers.
\`\`\`
Question: What are the names of Barack Obama's children?
Gold target: Malia and Sasha
Predicted answer 1: I don't know.
Predicted answer 2: I need more context about which Obama you are referring to.
Predicted answer 3: Without researching this, I cannot provide accurate names of Obama's children.
\`\`\`
These predicted answers are all NOT_ATTEMPTED because:
    - The response contains no claims or information about the answer, whether correct or incorrect.
    - Simple queries for clarification (like asking which Obama) count as NOT_ATTEMPTED.
    - Refusals to answer count as NOT_ATTEMPTED.`;
  }
}

export default ResearchPrompts;
