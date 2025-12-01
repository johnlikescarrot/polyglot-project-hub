import { useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Keyboard } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface KeyboardShortcutsProps {
  onNewChat?: () => void;
}

export const KeyboardShortcuts = ({ onNewChat }: KeyboardShortcutsProps) => {
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Ctrl/Cmd + K for new chat
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        onNewChat?.();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [onNewChat]);

  const shortcuts = [
    { keys: ["Ctrl", "K"], description: "New chat / Clear messages" },
    { keys: ["Enter"], description: "Send message" },
    { keys: ["Shift", "Enter"], description: "New line in message" },
    { keys: ["Esc"], description: "Close dialog" },
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Keyboard className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Keyboard Shortcuts</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          {shortcuts.map((shortcut, index) => (
            <div key={index} className="flex items-center justify-between py-2">
              <span className="text-sm text-muted-foreground">{shortcut.description}</span>
              <div className="flex gap-1">
                {shortcut.keys.map((key, i) => (
                  <Badge key={i} variant="secondary" className="font-mono">
                    {key}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};
