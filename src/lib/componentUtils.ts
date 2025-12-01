import { cn } from './utils';

// NavLink utility - extract line 18 ternary to testable function
export function getNavLinkClassName(
  className: string | undefined,
  isActive: boolean,
  activeClassName: string | undefined,
  isPending: boolean,
  pendingClassName: string | undefined
): string {
  return cn(
    className,
    isActive && activeClassName,
    isPending && pendingClassName
  );
}

// ChatInput utility - extract line 15 condition
export function shouldSendMessage(message: string, disabled: boolean | undefined): boolean {
  return message.trim().length > 0 && !disabled;
}

// ModelSelector utility - extract line 23 category badge logic
export function getBadgeVariant(category: string): 'default' | 'secondary' {
  return category === 'premium' ? 'default' : 'secondary';
}

// UsageStats utility - extract line 14 duration ternary
export function calculateSessionDuration(startTime: number | undefined): number {
  return startTime ? Math.floor((Date.now() - startTime) / 1000 / 60) : 0;
}

// UsageStats utility - token calculation
export function calculateTokenEstimate(messages: Array<{ content: string }>): number {
  return messages.reduce((acc, msg) => {
    return acc + Math.ceil(msg.content.length / 4);
  }, 0);
}

// ResearchModeSelector utility - extract line 119 condition
export function isReportTypeSelected(currentType: string, compareType: string): boolean {
  return currentType === compareType;
}

// ResearchModeSelector utility - extract line 228-235 conditions
export function getModeDescription(reportType: string): string {
  const descriptions: Record<string, string> = {
    'deep-research': 'Conducts multi-level hierarchical research',
    'research-report': 'Generates comprehensive, well-structured report',
    'detailed-report': 'Creates in-depth report with subtopics',
    'outline-report': 'Provides structured outline for planning',
  };
  return descriptions[reportType] || '';
}

// use-mobile utility - extract line 11 condition
export function isWindowMobile(breakpoint: number = 768): boolean {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < breakpoint;
}

// use-toast utility - extract line 173 dismiss logic
export function createToastDismissAction(onDismiss: () => void): { onClick: () => void; label: string } {
  return {
    onClick: onDismiss,
    label: 'Dismiss',
  };
}

// useStreamingChat utility - extract line 122 filter condition
export function shouldFilterEmptyAssistant(
  message: { role: string; content: string },
  index: number,
  length: number
): boolean {
  return !(index === length - 1 && message.role === 'assistant' && !message.content);
}

// Index page utility - extract line 31 condition
export function shouldShowInitialState(messagesLength: number): boolean {
  return messagesLength === 0;
}

// Complete comparative operators for researchPrompts
export function isDeepResearch(reportType: string): boolean {
  return reportType === 'deep-research';
}

export function isResearchReport(reportType: string): boolean {
  return reportType === 'research-report';
}

export function isDetailedReport(reportType: string): boolean {
  return reportType === 'detailed-report';
}

export function isOutlineReport(reportType: string): boolean {
  return reportType === 'outline-report';
}

export function isToneObjective(tone: string): boolean {
  return tone === 'objective';
}

export function isToneAnalytical(tone: string): boolean {
  return tone === 'analytical';
}
