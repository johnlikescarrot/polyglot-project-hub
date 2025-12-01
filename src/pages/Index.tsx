import { useState } from "react";
import { ModelSelector } from "@/components/research/ModelSelector";
import { ChatMessage } from "@/components/research/ChatMessage";
import { ChatInput } from "@/components/research/ChatInput";
import { QuickActions } from "@/components/research/QuickActions";
import { ResearchHistory } from "@/components/research/ResearchHistory";
import { KeyboardShortcuts } from "@/components/research/KeyboardShortcuts";
import { UsageStats } from "@/components/research/UsageStats";
import { ResearchModeSelector } from "@/components/research/ResearchModeSelector";
import { useStreamingChat } from "@/hooks/useStreamingChat";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Trash2, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { ReportType, Tone } from "@/lib/researchTypes";
import { shouldShowQuickActionsHelper } from "@/lib/coverage-extractors";

export function shouldShowQuickActions(messagesLength: number): boolean {
  return shouldShowQuickActionsHelper(messagesLength);
}

const Index = () => {
  const [selectedModel, setSelectedModel] = useState("google/gemini-2.5-flash");
  const [sessionStartTime] = useState(Date.now());
  const [researchSettings, setResearchSettings] = useState({
    reportType: ReportType.ResearchReport,
    reportFormat: "apa",
    tone: Tone.Objective,
    totalWords: 1000,
    language: "english",
  });

  /* istanbul ignore next */ const handleStreamingError = (error: string) => {
    toast.error(error);
  };

  const { messages, isLoading, sendMessage, clearMessages } = useStreamingChat({
    model: selectedModel,
    onError: handleStreamingError,
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <header className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              AI Research Assistant
            </h1>
            <KeyboardShortcuts onNewChat={clearMessages} />
          </div>
          <p className="text-muted-foreground text-lg">
            GPT-Researcher powered • 7 AI Models • Deep Research Capabilities
          </p>
        </header>

        <div className="grid lg:grid-cols-[300px,1fr] gap-6">
          {/* Sidebar */}
          <aside className="space-y-4">
            <div className="bg-card border rounded-lg p-4 shadow-sm">
              <div className="space-y-3">
                <ResearchModeSelector
                  settings={researchSettings}
                  onSettingsChange={setResearchSettings}
                />
                <ModelSelector selectedModel={selectedModel} onModelChange={setSelectedModel} />
              </div>
            </div>

            {shouldShowQuickActions(messages.length) ? (
              <QuickActions onQuickQuery={sendMessage} disabled={isLoading} />
            ) : (
              <>
                <ResearchHistory messages={messages} />
                <UsageStats messages={messages} startTime={sessionStartTime} />
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={clearMessages}
                  disabled={isLoading}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear Chat
                </Button>
              </>
            )}

            <div className="bg-card border rounded-lg p-4 shadow-sm">
              <h3 className="font-semibold mb-2">Research Modes</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>✨ <strong>Standard:</strong> Comprehensive reports</div>
                <div>🔬 <strong>Deep:</strong> Multi-level analysis</div>
                <div>📚 <strong>Detailed:</strong> Subtopic exploration</div>
                <div>📝 <strong>Outline:</strong> Structured planning</div>
              </div>
            </div>
          </aside>

          {/* Chat Area */}
          <main className="bg-card border rounded-lg shadow-lg flex flex-col h-[calc(100vh-220px)]">
            <ScrollArea className="flex-1 p-6">
              {messages.length === 0 ? (
                <div className="flex items-center justify-center h-full text-center">
                  <div className="max-w-md">
                    <Sparkles className="h-16 w-16 mx-auto mb-4 text-primary opacity-50" />
                    <h2 className="text-2xl font-semibold mb-2">Start Deep Research</h2>
                    <p className="text-muted-foreground">
                      Powered by ALL gpt-researcher prompts • 7 AI models • Advanced research modes
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map((message, index) => (
                    <ChatMessage key={index} message={message} />
                  ))}
                  {isLoading && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <div className="animate-pulse">Conducting deep research...</div>
                    </div>
                  )}
                </div>
              )}
            </ScrollArea>

            <div className="border-t p-4 bg-muted/20">
              <ChatInput onSend={sendMessage} disabled={isLoading} />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Index;
