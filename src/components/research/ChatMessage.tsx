import { Message } from "@/hooks/useStreamingChat";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { User, Bot, Copy, Check, ExternalLink } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { toast } from "sonner";

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage = ({ message }: ChatMessageProps) => {
  const isUser = message.role === "user";
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      setCopied(true);
      toast.success("Copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy");
    }
  };

  return (
    <div className={cn("flex gap-3", isUser ? "justify-end" : "justify-start")}>
      {!isUser && (
        <Avatar className="h-8 w-8 shrink-0">
          <AvatarFallback className="bg-primary text-primary-foreground">
            <Bot className="h-4 w-4" />
          </AvatarFallback>
        </Avatar>
      )}
      
      <Card className={cn(
        "max-w-[85%] p-4 relative group",
        isUser ? "bg-primary text-primary-foreground" : "bg-card"
      )}>
        {isUser ? (
          <p className="whitespace-pre-wrap">{message.content}</p>
        ) : (
          <>
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <ReactMarkdown
                components={{
                  // Enhanced link rendering with external icon
                  a: ({ href, children }) => (
                    <a 
                      href={href} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-primary underline hover:text-primary/80"
                    >
                      {children}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  ),
                  // Better table rendering
                  table: ({ children }) => (
                    <div className="overflow-x-auto my-4 rounded-lg border">
                      <table className="w-full">{children}</table>
                    </div>
                  ),
                  // Better code block rendering
                  pre: ({ children }) => (
                    <pre className="bg-muted/50 rounded-lg p-4 overflow-x-auto my-4 text-sm">
                      {children}
                    </pre>
                  ),
                  // Inline code
                  code: ({ className, children }) => {
                    const isInline = !className;
                    if (isInline) {
                      return (
                        <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono text-primary">
                          {children}
                        </code>
                      );
                    }
                    return <code className={className}>{children}</code>;
                  },
                  // Better heading rendering
                  h1: ({ children }) => (
                    <h1 className="text-xl font-bold mt-6 mb-3 pb-2 border-b border-border">
                      {children}
                    </h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-lg font-semibold mt-5 mb-2 pb-1 border-b border-border/50">
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-base font-semibold mt-4 mb-2">
                      {children}
                    </h3>
                  ),
                  // Better list rendering
                  ul: ({ children }) => (
                    <ul className="list-disc list-outside ml-4 my-2 space-y-1">
                      {children}
                    </ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="list-decimal list-outside ml-4 my-2 space-y-1">
                      {children}
                    </ol>
                  ),
                  // Better blockquote
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-primary/50 pl-4 my-4 italic text-muted-foreground">
                      {children}
                    </blockquote>
                  ),
                }}
              >
                {message.content}
              </ReactMarkdown>
            </div>
            
            {/* Copy button for assistant messages */}
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 p-0"
              onClick={handleCopy}
            >
              {copied ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </>
        )}
        
        {message.model && !isUser && (
          <div className="mt-3 pt-2 border-t border-border/50 text-xs text-muted-foreground flex items-center justify-between">
            <span>Model: {message.model.split("/")[1]}</span>
            {message.timestamp && (
              <span>{new Date(message.timestamp).toLocaleTimeString()}</span>
            )}
          </div>
        )}
      </Card>

      {isUser && (
        <Avatar className="h-8 w-8 shrink-0">
          <AvatarFallback className="bg-secondary">
            <User className="h-4 w-4" />
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
};
