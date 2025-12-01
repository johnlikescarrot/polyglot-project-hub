import { useState, useCallback } from "react";
import { getEnv } from "@/lib/env";
import { filterEmptyAssistantAtEnd } from "@/lib/coverage-extractors";

export interface Message {
  role: "user" | "assistant";
  content: string;
  model?: string;
  timestamp?: number;
}

interface UseStreamingChatProps {
  model: string;
  onError?: (error: string) => void;
}

export const useStreamingChat = ({ model, onError }: UseStreamingChatProps) => {
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
        const env = getEnv();
        const CHAT_URL = `${env.VITE_SUPABASE_URL}/functions/v1/ai-research`;

        const response = await fetch(CHAT_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({
            messages: [...messages, newUserMessage],
            model: model,
            stream: true,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error || `Request failed: ${response.status}`);
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
    [messages, model, onError]
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
