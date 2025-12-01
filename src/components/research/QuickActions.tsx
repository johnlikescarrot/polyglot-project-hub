import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Lightbulb, TrendingUp, BookOpen, Code } from "lucide-react";

interface QuickActionsProps {
  onQuickQuery: (query: string) => void;
  disabled?: boolean;
}

const QUICK_QUERIES = [
  {
    icon: Lightbulb,
    label: "Latest AI Trends",
    query: "What are the latest breakthroughs in artificial intelligence and machine learning in 2025?",
  },
  {
    icon: TrendingUp,
    label: "Market Analysis",
    query: "Analyze the current state of the AI industry and emerging market opportunities.",
  },
  {
    icon: BookOpen,
    label: "Research Summary",
    query: "Provide a comprehensive overview of recent advances in large language models.",
  },
  {
    icon: Code,
    label: "Technical Deep Dive",
    query: "Explain the architecture and capabilities of modern transformer models in detail.",
  },
];

export const QuickActions = ({ onQuickQuery, disabled }: QuickActionsProps) => {
  return (
    <Card className="p-4">
      <h3 className="font-semibold mb-3">Quick Research Topics</h3>
      <div className="grid grid-cols-1 gap-2">
        {QUICK_QUERIES.map((action, index) => {
          const Icon = action.icon;
          return (
            <Button
              key={index}
              variant="outline"
              className="justify-start h-auto py-3 text-left"
              onClick={() => onQuickQuery(action.query)}
              disabled={disabled}
            >
              <Icon className="h-4 w-4 mr-2 shrink-0" />
              <span className="text-sm">{action.label}</span>
            </Button>
          );
        })}
      </div>
    </Card>
  );
};
