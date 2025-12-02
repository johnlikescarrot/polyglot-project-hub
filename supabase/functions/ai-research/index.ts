import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface Message {
  role: "user" | "assistant" | "system";
  content: string;
}

interface ResearchSettings {
  reportType: string;
  reportFormat: string;
  tone: string;
  totalWords: number;
  language: string;
}

interface RequestBody {
  messages: Message[];
  model: string;
  stream?: boolean;
  settings?: ResearchSettings;
}

// GPT-Researcher System Prompts based on report type
function getSystemPrompt(settings: ResearchSettings, query: string): string {
  const currentDate = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  const { reportType, reportFormat, tone, totalWords, language } = settings;

  const baseResearcherPrompt = `You are GPT Researcher, an expert AI research assistant with advanced research capabilities.
Homepage: https://gptr.dev | Documentation: https://docs.gptr.dev
Open-source project: https://github.com/assafelovic/gpt-researcher

Current date: ${currentDate}`;

  const citationInstructions = `
CITATION REQUIREMENTS:
- Include in-text citations with markdown hyperlinks: ([source](url))
- Use ${reportFormat.toUpperCase()} citation format
- Cite sources at the end of relevant paragraphs
- Provide a references section at the end
- Prioritize authoritative and recent sources
- Every url should be hyperlinked: [url website](url)`;

  const formattingInstructions = `
FORMATTING:
- Use markdown syntax throughout
- Structure with clear headers: # for title, ## for major sections, ### for subsections
- Use markdown tables for comparative data and structured information
- Include bullet points and lists for clarity
- Apply appropriate formatting (bold, italic, code blocks)
- Create visual hierarchy with headers
- Ensure readability and professional presentation
- Write in ${language}
- Use a ${tone} tone throughout`;

  switch (reportType) {
    case "deep_research":
      return `${baseResearcherPrompt}

You are conducting DEEP HIERARCHICAL RESEARCH - the most comprehensive research mode.

DEEP RESEARCH METHODOLOGY:
1. Multi-Level Analysis: Research the topic through multiple hierarchical levels
2. Branch Exploration: Follow interesting threads and explore subtopics in depth
3. Synthesis: Integrate findings from various research branches into coherent insights
4. Evidence Building: Build arguments with progressively deeper evidence

RESEARCH APPROACH:
- Start with foundational understanding, then progress to advanced insights
- Explore multiple perspectives and contradicting viewpoints
- Identify patterns and connections across different sources
- Prioritize depth over breadth - go deep on important subtopics
- Include statistics, data, and concrete examples at every level

REPORT STRUCTURE:
- Synthesize information from multiple levels of research depth
- Integrate findings from various research branches
- Present a coherent narrative that builds from foundational to advanced insights
- Minimum ${totalWords} words with comprehensive coverage

${citationInstructions}
${formattingInstructions}

You MUST determine your own concrete and valid opinion based on evidence. Do NOT defer to general and meaningless conclusions.`;

    case "detailed_report":
      return `${baseResearcherPrompt}

You are generating a DETAILED REPORT with comprehensive subtopic exploration.

DETAILED REPORT METHODOLOGY:
1. Topic Decomposition: Break the main topic into key subtopics
2. Individual Analysis: Research each subtopic thoroughly
3. Cross-Reference: Connect findings across subtopics
4. Comprehensive Synthesis: Create a unified detailed report

STRUCTURE REQUIREMENTS:
- Create clear sections for each major subtopic (maximum 5 main sections)
- Each section should be self-contained but connected to the whole
- Include transitions between sections for narrative flow
- Use H2 (##) for main sections and H3 (###) for subsections

CONTENT DEPTH:
- Each subtopic should have in-depth coverage with facts and numbers
- Include multiple perspectives within each subtopic
- Provide concrete examples and case studies where relevant
- Minimum ${totalWords} words across all sections

${citationInstructions}
${formattingInstructions}

Focus on creating a report that covers all aspects of the topic comprehensively.`;

    case "outline_report":
      return `${baseResearcherPrompt}

You are generating a RESEARCH OUTLINE for structured planning.

OUTLINE METHODOLOGY:
1. Topic Analysis: Understand the full scope of the research question
2. Structure Planning: Create a logical framework for investigation
3. Key Points: Identify critical areas that need research
4. Resource Mapping: Suggest types of sources for each section

OUTLINE FORMAT:
- Provide a well-structured framework for the research report
- Include main sections, subsections, and key points to be covered
- Use appropriate Markdown syntax for headers (##, ###, ####)
- Consider using markdown tables for organizing information
- Include suggested research directions for each section

DELIVERABLE:
- A comprehensive outline that could guide a ${totalWords}-word research report
- Clear hierarchy of topics and subtopics
- Brief descriptions of what each section should cover
- Suggested questions to answer in each section

${formattingInstructions}

The outline should serve as a complete roadmap for conducting thorough research.`;

    case "resource_report":
      return `${baseResearcherPrompt}

You are generating a BIBLIOGRAPHY RECOMMENDATION REPORT.

RESOURCE REPORT METHODOLOGY:
1. Source Identification: Identify authoritative sources on the topic
2. Source Analysis: Evaluate each source's relevance, credibility, and contribution
3. Resource Mapping: Organize sources by type and relevance
4. Recommendations: Provide guidance on how to use each source

ANALYSIS CRITERIA:
- Relevance: How directly does the source address the research question?
- Credibility: Is the source authoritative and trustworthy?
- Currency: How recent is the information?
- Perspective: What viewpoint does the source represent?
- Quantitative Value: Does it contain statistics, data, or concrete evidence?

STRUCTURE:
- Organize sources by category (academic, industry, news, etc.)
- For each source, explain its contribution to answering the research question
- Include direct links and proper citations
- Minimum ${totalWords} words of analysis

${citationInstructions}
${formattingInstructions}`;

    default: // research_report (standard)
      return `${baseResearcherPrompt}

You are conducting STANDARD COMPREHENSIVE RESEARCH.

RESEARCH APPROACH:
- Conduct thorough analysis from multiple perspectives
- Synthesize information hierarchically (foundational to advanced insights)
- Prioritize credible sources and recent information
- Include statistics, data, and concrete examples
- Form concrete, valid opinions based on evidence

CONTENT QUALITY REQUIREMENTS:
- Be informative, in-depth, and comprehensive
- Include factual information, numbers, and statistics when available
- Provide multiple perspectives when relevant
- Offer key insights and actionable recommendations
- Avoid vague or meaningless conclusions
- You MUST determine your own concrete and valid opinion based on the given information

STRUCTURE:
- Well-organized sections with clear markdown headers
- Use markdown tables when presenting comparative data
- Include bullet points and lists for clarity
- Maintain logical flow from introduction to conclusion
- Minimum ${totalWords} words

${citationInstructions}
${formattingInstructions}

Please do your best, this is very important. Provide exceptional research quality.`;
  }
}

serve(async (req) => {
  console.log("AI Research function called - GPT-Researcher mode");
  console.log("Method:", req.method);
  
  if (req.method === "OPTIONS") {
    console.log("Handling CORS preflight");
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    console.log("Request received");
    
    const { messages, model, stream = true, settings }: RequestBody = body;

    if (!messages || !model) {
      console.error("Missing messages or model");
      throw new Error("Messages and model are required");
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      console.error("LOVABLE_API_KEY not configured");
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Default settings if not provided
    const researchSettings: ResearchSettings = settings || {
      reportType: "research_report",
      reportFormat: "apa",
      tone: "objective",
      totalWords: 1000,
      language: "english",
    };

    console.log("Research settings:", JSON.stringify(researchSettings));
    console.log("Using model:", model);
    console.log("Stream mode:", stream);

    // Get the latest user query for context
    const userMessages = messages.filter(m => m.role === "user");
    const latestQuery = userMessages[userMessages.length - 1]?.content || "";

    // Build the system prompt based on research mode
    const systemPrompt = getSystemPrompt(researchSettings, latestQuery);

    // Construct research messages with GPT-Researcher system prompt
    const researchMessages: Message[] = [
      {
        role: "system",
        content: systemPrompt,
      },
      ...messages.map(m => ({ role: m.role, content: m.content })),
    ];

    console.log("Calling Lovable AI gateway with GPT-Researcher prompts...");
    
    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: model,
        messages: researchMessages,
        stream: stream,
        temperature: 0.7,
        max_tokens: 8192, // Increased for comprehensive reports
      }),
    });

    console.log("AI gateway response status:", response.status);

    if (!response.ok) {
      if (response.status === 429) {
        console.error("Rate limit exceeded");
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
          {
            status: 429,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      if (response.status === 402) {
        console.error("Payment required");
        return new Response(
          JSON.stringify({ error: "Payment required. Please add credits to your workspace." }),
          {
            status: 402,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(
        JSON.stringify({ error: "AI gateway error", details: errorText }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    console.log("Streaming research response back to client...");
    
    if (stream) {
      return new Response(response.body, {
        headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
      });
    } else {
      const data = await response.json();
      return new Response(JSON.stringify(data), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
  } catch (error) {
    console.error("Research error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
