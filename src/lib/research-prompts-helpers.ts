// Pure enum comparison functions extracted from researchPrompts.ts

export function isDeepResearchType(type: string): boolean {
  return type === 'deep-research';
}

export function isResearchReportType(type: string): boolean {
  return type === 'research-report';
}

export function isDetailedReportType(type: string): boolean {
  return type === 'detailed-report';
}

export function isOutlineReportType(type: string): boolean {
  return type === 'outline-report';
}

export function isObjectiveTone(tone: string): boolean {
  return tone === 'objective';
}

export function isAnalyticalTone(tone: string): boolean {
  return tone === 'analytical';
}

export function isFormalTone(tone: string): boolean {
  return tone === 'formal';
}

export function getReportTypeName(type: string): string {
  if (isDeepResearchType(type)) return 'Deep Research';
  if (isResearchReportType(type)) return 'Research Report';
  if (isDetailedReportType(type)) return 'Detailed Report';
  if (isOutlineReportType(type)) return 'Outline Report';
  return 'Unknown';
}

export function getToneName(tone: string): string {
  if (isObjectiveTone(tone)) return 'Objective';
  if (isAnalyticalTone(tone)) return 'Analytical';
  if (isFormalTone(tone)) return 'Formal';
  return 'Unknown';
}
