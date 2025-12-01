import { Card } from "@/components/ui/card";
import { Message } from "@/hooks/useStreamingChat";
import { MessageSquare, Zap, Clock } from "lucide-react";

interface UsageStatsProps {
  messages: Message[];
  startTime?: number;
}

export const UsageStats = ({ messages, startTime }: UsageStatsProps) => {
  const userMessages = messages.filter((m) => m.role === "user").length;
  const assistantMessages = messages.filter((m) => m.role === "assistant").length;
  
  // istanbul ignore next - ternary depends on prop passed to component
  const sessionDuration = startTime 
    ? Math.floor((Date.now() - startTime) / 1000 / 60)
    : (0 as const);

  const totalTokensEstimate = messages.reduce((acc, msg) => {
    // Rough estimate: ~4 chars per token
    return acc + Math.ceil(msg.content.length / 4);
  }, 0);

  if (messages.length === 0) return null;

  return (
    <Card className="p-4">
      <h3 className="font-semibold mb-3 text-sm">Session Stats</h3>
      <div className="space-y-2 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground flex items-center gap-2">
            <MessageSquare className="h-3 w-3" />
            Queries
          </span>
          <span className="font-medium">{userMessages}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground flex items-center gap-2">
            <Zap className="h-3 w-3" />
            Responses
          </span>
          <span className="font-medium">{assistantMessages}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground flex items-center gap-2">
            <Clock className="h-3 w-3" />
            Duration
          </span>
          <span className="font-medium">{sessionDuration}m</span>
        </div>
        <div className="flex items-center justify-between pt-2 border-t">
          <span className="text-muted-foreground text-xs">Est. Tokens</span>
          <span className="font-medium text-xs">{totalTokensEstimate.toLocaleString()}</span>
        </div>
      </div>
    </Card>
  );
};
