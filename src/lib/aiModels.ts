export interface AIModel {
  id: string;
  name: string;
  description: string;
  provider: "google" | "openai";
  category: "premium" | "balanced" | "fast";
  icon: string;
  color: string;
}

export const AI_MODELS: AIModel[] = [
  {
    id: "google/gemini-3-pro-preview",
    name: "Gemini 3 Pro",
    description: "Next-generation flagship model with superior reasoning",
    provider: "google",
    category: "premium",
    icon: "✨",
    color: "hsl(var(--primary))",
  },
  {
    id: "google/gemini-2.5-pro",
    name: "Gemini 2.5 Pro",
    description: "Top-tier with exceptional multimodal capabilities",
    provider: "google",
    category: "premium",
    icon: "🚀",
    color: "hsl(var(--primary))",
  },
  {
    id: "google/gemini-2.5-flash",
    name: "Gemini 2.5 Flash",
    description: "Balanced speed and intelligence for research",
    provider: "google",
    category: "balanced",
    icon: "⚡",
    color: "hsl(var(--accent))",
  },
  {
    id: "google/gemini-2.5-flash-lite",
    name: "Gemini 2.5 Flash Lite",
    description: "Fast responses for quick queries",
    provider: "google",
    category: "fast",
    icon: "🔥",
    color: "hsl(var(--muted))",
  },
  {
    id: "openai/gpt-5",
    name: "GPT-5",
    description: "OpenAI's most capable model with deep reasoning",
    provider: "openai",
    category: "premium",
    icon: "🧠",
    color: "hsl(var(--primary))",
  },
  {
    id: "openai/gpt-5-mini",
    name: "GPT-5 Mini",
    description: "Efficient balance of performance and speed",
    provider: "openai",
    category: "balanced",
    icon: "💡",
    color: "hsl(var(--accent))",
  },
  {
    id: "openai/gpt-5-nano",
    name: "GPT-5 Nano",
    description: "Ultra-fast for high-volume queries",
    provider: "openai",
    category: "fast",
    icon: "⚡",
    color: "hsl(var(--muted))",
  },
];

export const getModelById = (id: string): AIModel | undefined => {
  return AI_MODELS.find((model) => model.id === id);
};

export const getModelsByCategory = (category: string): AIModel[] => {
  return AI_MODELS.filter((model) => model.category === category);
};
