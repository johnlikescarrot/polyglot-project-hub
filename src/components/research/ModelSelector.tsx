import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AI_MODELS, AIModel } from "@/lib/aiModels";
import { Badge } from "@/components/ui/badge";

interface ModelSelectorProps {
  selectedModel: string;
  onModelChange: (model: string) => void;
}

export const ModelSelector = ({ selectedModel, onModelChange }: ModelSelectorProps) => {
  const selectedModelData = AI_MODELS.find((m) => m.id === selectedModel);

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">AI Model</label>
      <Select value={selectedModel} onValueChange={onModelChange}>
        <SelectTrigger className="w-full">
          <SelectValue>
            {selectedModelData && (
              <div className="flex items-center gap-2">
                <span>{selectedModelData.icon}</span>
                <span>{selectedModelData.name}</span>
                <Badge variant={selectedModelData.category === "premium" ? "default" : "secondary"} className="ml-auto">
                  {selectedModelData.category}
                </Badge>
              </div>
            )}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {AI_MODELS.map((model) => (
            <SelectItem key={model.id} value={model.id}>
              <div className="flex items-center justify-between w-full gap-4">
                <div className="flex items-center gap-2">
                  <span>{model.icon}</span>
                  <div>
                    <div className="font-medium">{model.name}</div>
                    <div className="text-xs text-muted-foreground">{model.description}</div>
                  </div>
                </div>
                <Badge variant={model.category === "premium" ? "default" : "secondary"}>
                  {model.category}
                </Badge>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
