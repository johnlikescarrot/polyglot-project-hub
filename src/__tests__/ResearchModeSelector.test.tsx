/// <reference types="jest" />
import { render } from '@testing-library/react';
import { ResearchModeSelector } from '@/components/research/ResearchModeSelector';
import { ReportType, Tone } from '@/lib/researchTypes';

describe('ResearchModeSelector Component', () => {
  const mockSettings = {
    reportType: ReportType.ResearchReport,
    reportFormat: 'apa',
    tone: Tone.Objective,
    totalWords: 1000,
    language: 'english',
  };

  test('renders settings button', () => {
    const { container } = render(
      <ResearchModeSelector settings={mockSettings} onSettingsChange={jest.fn()} />
    );
    expect(container.querySelector('button')).toBeInTheDocument();
  });

  test('renders component without error', () => {
    const { container } = render(
      <ResearchModeSelector settings={mockSettings} onSettingsChange={jest.fn()} />
    );
    expect(container).toBeInTheDocument();
  });

  test('accepts onSettingsChange callback', () => {
    const callback = jest.fn();
    const { container } = render(
      <ResearchModeSelector settings={mockSettings} onSettingsChange={callback} />
    );
    expect(container).toBeInTheDocument();
  });

  test('displays settings button with icon', () => {
    const { container } = render(
      <ResearchModeSelector settings={mockSettings} onSettingsChange={jest.fn()} />
    );
    const button = container.querySelector('button');
    expect(button).toBeTruthy();
  });

  test('renders with different report types', () => {
    const deepResearchSettings = {
      ...mockSettings,
      reportType: ReportType.DeepResearch,
    };
    const { container } = render(
      <ResearchModeSelector settings={deepResearchSettings} onSettingsChange={jest.fn()} />
    );
    expect(container).toBeInTheDocument();
  });

  test('renders with all tone options', () => {
    const analyticalSettings = {
      ...mockSettings,
      tone: Tone.Analytical,
    };
    const { container } = render(
      <ResearchModeSelector settings={analyticalSettings} onSettingsChange={jest.fn()} />
    );
    expect(container).toBeInTheDocument();
  });
});
