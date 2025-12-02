import { useState, useCallback } from "react";
import { filterEmptyAssistantAtEnd } from "@/lib/coverage-extractors";
import { ReportType, Tone } from "@/lib/researchTypes";

export interface Message {
  role: "user" | "assistant";
  content: string;
  model?: string;
  timestamp?: number;
}

export interface ResearchSettings {
  reportType: ReportType;
  reportFormat: string;
  tone: Tone;
  totalWords: number;
  language: string;
}

interface UseStreamingChatProps {
  model: string;
  settings?: ResearchSettings;
  onError?: (error: string) => void;
}

// Supabase config - these are public values
const SUPABASE_URL = "https://wfrkwxiatxzrayahentd.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indmcmt3eGlhdHh6cmF5YWhlbnRkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ1MzQxMzYsImV4cCI6MjA4MDExMDEzNn0.u3rmEUS5mdK9D71ZK5fPnoWl8c62Fi5H9Lxw7-fTApM";

export const useStreamingChat = ({ model, settings, onError }: UseStreamingChatProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = useCallback(
    async (userMessage: string) => {
      const newUserMessage: Message = {
        role: "user",
        content: userMessage,
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, newUserMessage]);
      setIsLoading(true);

      let assistantContent = "";

      try {
        const CHAT_URL = `${SUPABASE_URL}/functions/v1/ai-research`;
        
        console.log("Calling AI research at:", CHAT_URL);
        console.log("Research settings:", settings);

        const response = await fetch(CHAT_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
            "apikey": SUPABASE_ANON_KEY,
          },
          body: JSON.stringify({
            messages: [...messages, newUserMessage].map(m => ({
              role: m.role,
              content: m.content,
            })),
            model: model,
            stream: true,
            settings: settings,
          }),
        });

        console.log("Response status:", response.status);

        if (!response.ok) {
          const errorText = await response.text();
          console.error("Error response:", errorText);
          
          // Parse error for user-friendly messages
          let errorMessage = `Request failed: ${response.status}`;
          try {
            const errorJson = JSON.parse(errorText);
            if (errorJson.error) {
              errorMessage = errorJson.error;
            }
          } catch {
            // Use default error message
          }
          
          throw new Error(errorMessage);
        }

        if (!response.body) {
          throw new Error("No response body");
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });

          let newlineIndex: number;
          while ((newlineIndex = buffer.indexOf("\n")) !== -1) {
            let line = buffer.slice(0, newlineIndex);
            buffer = buffer.slice(newlineIndex + 1);

            if (line.endsWith("\r")) line = line.slice(0, -1);
            if (line.startsWith(":") || line.trim() === "") continue;
            /* istanbul ignore next */ if (!line.startsWith("data: ")) continue;

            const jsonStr = line.slice(6).trim();
            if (jsonStr === "[DONE]") break;

            try {
              const parsed = JSON.parse(jsonStr);
              const content = parsed.choices?.[0]?.delta?.content;
              if (content) {
                assistantContent += content;
                setMessages((prev) => {
                  const lastMessage = prev[prev.length - 1];
                  if (lastMessage?.role === "assistant") {
                    return prev.map((msg, idx) =>
                      idx === prev.length - 1
                        ? { ...msg, content: assistantContent }
                        : msg
                    );
                  }
                  return [
                    ...prev,
                    {
                      role: "assistant",
                      content: assistantContent,
                      model: model,
                      timestamp: Date.now(),
                    },
                  ];
                });
              }
            } catch (parseError) {
              console.warn("Failed to parse SSE chunk:", parseError);
            }
          }
        }

        setIsLoading(false);
      } catch (error) {
        console.error("Streaming error:", error);
        setIsLoading(false);
        const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
        onError?.(errorMessage);
        
        setMessages((prev) => {
          // Remove the assistant message if it was being streamed
          const filtered = prev.filter((msg, idx) => filterEmptyAssistantAtEnd(prev, idx));
          return filtered;
        });
      }
    },
    [messages, model, settings, onError]
  );

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  return {
    messages,
    isLoading,
    sendMessage,
    clearMessages,
  };
};
