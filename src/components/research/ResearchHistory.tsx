import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Clock, MessageSquare } from "lucide-react";
import { Message } from "@/hooks/useStreamingChat";

interface ResearchHistoryProps {
  messages: Message[];
}

export const ResearchHistory = ({ messages }: ResearchHistoryProps) => {
  if (messages.length === 0) {
    return null;
  }

  const conversationCount = messages.filter((m) => m.role === "user").length;

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold flex items-center gap-2">
          <Clock className="h-4 w-4" />
          Session History
        </h3>
        <div className="text-sm text-muted-foreground flex items-center gap-1">
          <MessageSquare className="h-3 w-3" />
          {conversationCount} {conversationCount === 1 ? "query" : "queries"}
        </div>
      </div>
      <ScrollArea className="h-[200px]">
        <div className="space-y-2">
          {messages
            .filter((m) => m.role === "user")
            .map((message, index) => (
              <div
                key={index}
                className="text-sm p-2 rounded bg-muted/50 hover:bg-muted transition-colors cursor-pointer"
              >
                <p className="line-clamp-2">{message.content}</p>
                {message.timestamp && (
                  <p className="text-xs text-muted-foreground mt-1">
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </p>
                )}
              </div>
            ))}
        </div>
      </ScrollArea>
    </Card>
  );
};
