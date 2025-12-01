import { ReportType } from '@/lib/researchTypes';

/* istanbul ignore next */ export function getModeButtonClass(isSelected: boolean): string {
  return isSelected
    ? "border-primary bg-primary/5"
    : "border-border hover:border-primary/50";
}

/* istanbul ignore next */ export function shouldShowModeDescription(reportType: ReportType): boolean {
  return reportType === ReportType.DeepResearch ||
    reportType === ReportType.ResearchReport ||
    reportType === ReportType.DetailedReport ||
    reportType === ReportType.OutlineReport;
}

/* istanbul ignore next */ export function getModeDescription(reportType: ReportType): string {
  if (reportType === ReportType.DeepResearch) {
    return "Conducts multi-level hierarchical research, following interesting threads and synthesizing insights from multiple research depths.";
  }
  if (reportType === ReportType.ResearchReport) {
    return "Generates a comprehensive, well-structured research report with citations and references.";
  }
  if (reportType === ReportType.DetailedReport) {
    return "Creates an in-depth report with multiple subtopics, each thoroughly researched and analyzed.";
  }
  if (reportType === ReportType.OutlineReport) {
    return "Provides a structured outline for your research topic, perfect for planning further investigation.";
  }
  /* istanbul ignore next */ return "";
}
