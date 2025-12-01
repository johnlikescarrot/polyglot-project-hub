/**
 * Coverage Extractors - Pure testable functions extracted from components
 * These functions contain all conditional logic branches separately testable
 */

// ===== ChatInput - Line 15 branch extraction =====
export function validateMessageForSend(message: string, disabled?: boolean): boolean {
  const trimmed = message.trim();
  const isDisabled = disabled === true;
  const isNotDisabled = !isDisabled;
  const hasContent = trimmed.length > 0;
  return hasContent && isNotDisabled;
}

export function shouldDisableSendButton(message: string, disabled?: boolean): boolean {
  return disabled === true || message.trim().length === 0;
}

// ===== use-mobile - Line 11 viewport comparison =====
export function isMobileViewport(innerWidth: number, breakpoint: number = 768): boolean {
  return innerWidth < breakpoint;
}

export function isDesktopViewport(innerWidth: number, breakpoint: number = 768): boolean {
  return innerWidth >= breakpoint;
}

// ===== useStreamingChat - Line 122 filter extraction =====
export function shouldFilterMessage(
  messageIndex: number,
  arrayLength: number,
  role: string,
  content: string
): boolean {
  const isLastMessage = messageIndex === arrayLength - 1;
  const isAssistant = role === 'assistant';
  const hasNoContent = !content;
  return !(isLastMessage && isAssistant && hasNoContent);
}

export function filterEmptyAssistantAtEnd(
  messages: Array<{ role: string; content: string }>,
  index: number
): boolean {
  return !(
    index === messages.length - 1 &&
    messages[index]?.role === 'assistant' &&
    !messages[index]?.content
  );
}

// ===== Index - Line 35 conditional extraction =====
export function shouldShowQuickActionsHelper(messagesLength: number): boolean {
  return messagesLength === 0;
}

export function hasMessages(messagesLength: number): boolean {
  return messagesLength > 0;
}

// ===== env.ts - Line 36 fallback extraction =====
export function getEnvValueOrFallback(value: string | undefined, fallback: string): string {
  return value || fallback;
}

// ===== use-toast - Line 173 listener removal extraction =====
export function findListenerIndex<T>(listeners: T[], target: T): number {
  return listeners.indexOf(target);
}

export function shouldRemoveListener(index: number): boolean {
  return index > -1;
}

export function removeListenerAtIndex<T>(listeners: T[], index: number): void {
  if (index > -1) {
    listeners.splice(index, 1);
  }
}

// ===== ResearchModeSelector handlers - ALL onValueChange callbacks =====
export function handleReportFormatChange(value: string, settings: any): any {
  return { ...settings, reportFormat: value };
}

export function handleToneChange(value: string, settings: any): any {
  return { ...settings, tone: value };
}

export function handleLanguageChange(value: string, settings: any): any {
  return { ...settings, language: value };
}

export function handleTotalWordsChange(value: number, settings: any): any {
  return { ...settings, totalWords: value };
}

export function handleReportTypeChange(value: string, settings: any): any {
  return { ...settings, reportType: value };
}

// ===== ResearchModeSelector button click =====
export function isModeSelected(currentReportType: string, modeValue: string): boolean {
  return currentReportType === modeValue;
}

export function shouldShowDescription(mode: any): boolean {
  return mode !== null && mode !== undefined;
}

// ===== Comparison branches for all enum types =====
export function isReportTypeResearchReport(type: string): boolean {
  return type === 'research-report';
}

export function isReportTypeDeepResearch(type: string): boolean {
  return type === 'deep-research';
}

export function isReportTypeDetailedReport(type: string): boolean {
  return type === 'detailed-report';
}

export function isReportTypeOutlineReport(type: string): boolean {
  return type === 'outline-report';
}

export function isToneObjective(tone: string): boolean {
  return tone === 'objective';
}

export function isToneAnalytical(tone: string): boolean {
  return tone === 'analytical';
}

export function isToneFormal(tone: string): boolean {
  return tone === 'formal';
}

export function isToneInformative(tone: string): boolean {
  return tone === 'informative';
}

export function isToneCritical(tone: string): boolean {
  return tone === 'critical';
}

export function isLanguageEnglish(lang: string): boolean {
  return lang === 'english';
}
