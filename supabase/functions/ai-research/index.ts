import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface Message {
  role: "user" | "assistant" | "system";
  content: string;
}

interface RequestBody {
  messages: Message[];
  model: string;
  stream?: boolean;
}

serve(async (req) => {
  console.log("AI Research function called");
  console.log("Method:", req.method);
  
  if (req.method === "OPTIONS") {
    console.log("Handling CORS preflight");
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    console.log("Request body:", JSON.stringify(body));
    
    const { messages, model, stream = true }: RequestBody = body;

    if (!messages || !model) {
      console.error("Missing messages or model");
      throw new Error("Messages and model are required");
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      console.error("LOVABLE_API_KEY not configured");
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log("Using model:", model);
    console.log("Stream mode:", stream);

    // Enhanced system prompt for comprehensive research
    const researchMessages: Message[] = [
      {
        role: "system",
        content: `You are GPT Researcher, an expert AI research assistant with advanced research capabilities.

Your primary goal is to provide comprehensive, well-researched, accurate, and insightful responses with:

RESEARCH APPROACH:
- Conduct thorough analysis from multiple perspectives
- Synthesize information hierarchically (foundational to advanced insights)
- Prioritize credible sources and recent information
- Include statistics, data, and concrete examples
- Form concrete, valid opinions based on evidence

RESPONSE STRUCTURE:
- Use clear markdown headers (# for title, ## for major sections, ### for subsections)
- Present information in well-organized sections
- Use markdown tables for comparative data and structured information
- Include bullet points and lists for clarity
- Maintain logical flow from introduction to conclusion

CITATION REQUIREMENTS:
- Include in-text citations with markdown hyperlinks: ([source](url))
- Cite sources at the end of relevant paragraphs
- Provide a references section at the end
- Prioritize authoritative and recent sources

CONTENT QUALITY:
- Be informative, in-depth, and comprehensive
- Include factual information, numbers, and statistics when available
- Provide multiple perspectives when relevant
- Offer key insights and actionable recommendations
- Avoid vague or meaningless conclusions

FORMATTING:
- Use markdown syntax throughout
- Apply appropriate formatting (bold, italic, code blocks)
- Create visual hierarchy with headers
- Ensure readability and professional presentation

You are part of an open-source research project: https://github.com/assafelovic/gpt-researcher
Homepage: https://gptr.dev | Documentation: https://docs.gptr.dev

Provide exceptional research quality in every response.`,
      },
      ...messages,
    ];

    console.log("Calling Lovable AI gateway...");
    
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
        max_tokens: 4096,
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

    console.log("Streaming response back to client...");
    
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
