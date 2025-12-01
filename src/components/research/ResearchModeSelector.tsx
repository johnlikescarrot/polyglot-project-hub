import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Settings2, Layers, FileText, BookOpen, Search } from "lucide-react";
import { ReportType, Tone, REPORT_FORMATS } from "@/lib/researchTypes";

interface ResearchModeSettings {
  reportType: ReportType;
  reportFormat: string;
  tone: Tone;
  totalWords: number;
  language: string;
}

interface ResearchModeSelectorProps {
  settings: ResearchModeSettings;
  onSettingsChange: (settings: ResearchModeSettings) => void;
}

const RESEARCH_MODES = [
  {
    value: ReportType.ResearchReport,
    label: "Standard Research",
    description: "Comprehensive research report",
    icon: FileText,
  },
  {
    value: ReportType.DeepResearch,
    label: "Deep Research",
    description: "Hierarchical, multi-level analysis",
    icon: Layers,
  },
  {
    value: ReportType.DetailedReport,
    label: "Detailed Report",
    description: "In-depth analysis with subtopics",
    icon: BookOpen,
  },
  {
    value: ReportType.OutlineReport,
    label: "Outline Only",
    description: "Structured research outline",
    icon: Search,
  },
];

const TONES = [
  { value: Tone.Objective, label: "Objective" },
  { value: Tone.Analytical, label: "Analytical" },
  { value: Tone.Formal, label: "Formal" },
  { value: Tone.Informative, label: "Informative" },
  { value: Tone.Critical, label: "Critical" },
];

const LANGUAGES = [
  { value: "english", label: "English" },
  { value: "spanish", label: "Spanish" },
  { value: "french", label: "French" },
  { value: "german", label: "German" },
  { value: "chinese", label: "Chinese" },
];

export function ResearchModeSelector({
  settings,
  onSettingsChange,
}: ResearchModeSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  const updateSettings = (updates: Partial<ResearchModeSettings>) => {
    onSettingsChange({ ...settings, ...updates });
  };

  const currentMode = RESEARCH_MODES.find((m) => m.value === settings.reportType);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Settings2 className="h-4 w-4" />
          <span className="hidden sm:inline">Research Settings</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Research Configuration</SheetTitle>
          <SheetDescription>
            Configure your research parameters for optimal results
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-6 py-6">
          {/* Research Mode */}
          <div className="space-y-3">
            <Label>Research Mode</Label>
            <div className="grid gap-2">
              {RESEARCH_MODES.map((mode) => {
                const Icon = mode.icon;
                return (
                  <button
                    key={mode.value}
                    onClick={() => updateSettings({ reportType: mode.value })}
                    className={`flex items-start gap-3 p-3 rounded-lg border-2 transition-colors text-left ${
                      settings.reportType === mode.value
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <Icon className="h-5 w-5 mt-0.5 text-primary" />
                    <div className="flex-1">
                      <div className="font-medium">{mode.label}</div>
                      <div className="text-sm text-muted-foreground">
                        {mode.description}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Report Format */}
          <div className="space-y-2">
            <Label htmlFor="format">Citation Format</Label>
            <Select
              value={settings.reportFormat}
              onValueChange={(value) => updateSettings({ reportFormat: value })}
            >
              <SelectTrigger id="format">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {REPORT_FORMATS.map((format) => (
                  <SelectItem key={format} value={format}>
                    {format.toUpperCase()}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Tone */}
          <div className="space-y-2">
            <Label htmlFor="tone">Writing Tone</Label>
            <Select
              value={settings.tone}
              onValueChange={(value) => updateSettings({ tone: value as Tone })}
            >
              <SelectTrigger id="tone">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {TONES.map((tone) => (
                  <SelectItem key={tone.value} value={tone.value}>
                    {tone.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Word Count */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Target Word Count</Label>
              <span className="text-sm text-muted-foreground">
                {settings.totalWords} words
              </span>
            </div>
            <Slider
              value={[settings.totalWords]}
              onValueChange={([value]) => updateSettings({ totalWords: value })}
              min={500}
              max={5000}
              step={250}
              className="py-4"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>500</span>
              <span>2,750</span>
              <span>5,000</span>
            </div>
          </div>

          {/* Language */}
          <div className="space-y-2">
            <Label htmlFor="language">Output Language</Label>
            <Select
              value={settings.language}
              onValueChange={(value) => updateSettings({ language: value })}
            >
              <SelectTrigger id="language">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {LANGUAGES.map((lang) => (
                  <SelectItem key={lang.value} value={lang.value}>
                    {lang.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Mode Description */}
          {currentMode && (
            <div className="p-4 rounded-lg bg-muted/50 border">
              <div className="flex items-center gap-2 mb-2">
                <currentMode.icon className="h-4 w-4 text-primary" />
                <span className="font-medium">About {currentMode.label}</span>
              </div>
              <p className="text-sm text-muted-foreground">
                {currentMode.value === ReportType.DeepResearch &&
                  "Conducts multi-level hierarchical research, following interesting threads and synthesizing insights from multiple research depths."}
                {currentMode.value === ReportType.ResearchReport &&
                  "Generates a comprehensive, well-structured research report with citations and references."}
                {currentMode.value === ReportType.DetailedReport &&
                  "Creates an in-depth report with multiple subtopics, each thoroughly researched and analyzed."}
                {currentMode.value === ReportType.OutlineReport &&
                  "Provides a structured outline for your research topic, perfect for planning further investigation."}
              </p>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
