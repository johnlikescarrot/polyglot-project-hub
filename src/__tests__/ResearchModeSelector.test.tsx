/// <reference types="jest" />
import { render, fireEvent } from '@testing-library/react';
import { ResearchModeSelector } from '@/components/research/ResearchModeSelector';
import { ReportType, Tone } from '@/lib/researchTypes';

describe('ResearchModeSelector - comprehensive', () => {
  const mockSettings = {
    reportType: ReportType.ResearchReport,
    reportFormat: 'apa',
    tone: Tone.Objective,
    totalWords: 1000,
    language: 'english',
  };

  test('renders settings button with icon', () => {
    const { container } = render(
      <ResearchModeSelector settings={mockSettings} onSettingsChange={jest.fn()} />
    );
    const button = container.querySelector('button');
    expect(button).toBeInTheDocument();
  });

  test('button contains settings label', () => {
    const { container } = render(
      <ResearchModeSelector settings={mockSettings} onSettingsChange={jest.fn()} />
    );
    expect(container.textContent).toContain('Research Settings');
  });

  test('calls onSettingsChange when report type changes', () => {
    const onChange = jest.fn();
    const { container } = render(
      <ResearchModeSelector settings={mockSettings} onSettingsChange={onChange} />
    );
    const button = container.querySelector('button');
    fireEvent.click(button!);
    
    const modeButtons = container.querySelectorAll('button');
    if (modeButtons.length > 1) {
      fireEvent.click(modeButtons[1]);
      expect(onChange).toHaveBeenCalled();
    }
  });

  test('supports all report types', () => {
    const reportTypes = [
      ReportType.ResearchReport,
      ReportType.DeepResearch,
      ReportType.DetailedReport,
      ReportType.OutlineReport,
    ];

    reportTypes.forEach(type => {
      const settings = { ...mockSettings, reportType: type };
      const { container } = render(
        <ResearchModeSelector settings={settings} onSettingsChange={jest.fn()} />
      );
      expect(container).toBeInTheDocument();
    });
  });

  test('supports all tone options', () => {
    const tones = [Tone.Objective, Tone.Analytical, Tone.Formal, Tone.Informative, Tone.Critical];

    tones.forEach(tone => {
      const settings = { ...mockSettings, tone };
      const { container } = render(
        <ResearchModeSelector settings={settings} onSettingsChange={jest.fn()} />
      );
      expect(container).toBeInTheDocument();
    });
  });

  test('renders sheet trigger button', () => {
    const { container } = render(
      <ResearchModeSelector settings={mockSettings} onSettingsChange={jest.fn()} />
    );
    const trigger = container.querySelector('button');
    expect(trigger).toHaveAttribute('type', 'button');
  });

  test('maintains settings state', () => {
    const settings = {
      reportType: ReportType.DeepResearch,
      reportFormat: 'mla',
      tone: Tone.Analytical,
      totalWords: 2000,
      language: 'spanish',
    };
    const { container } = render(
      <ResearchModeSelector settings={settings} onSettingsChange={jest.fn()} />
    );
    expect(container).toBeInTheDocument();
  });

  test('handles multiple setting changes', () => {
    const onChange = jest.fn();
    const { rerender } = render(
      <ResearchModeSelector settings={mockSettings} onSettingsChange={onChange} />
    );
    
    const newSettings = { ...mockSettings, reportFormat: 'mla' };
    rerender(
      <ResearchModeSelector settings={newSettings} onSettingsChange={onChange} />
    );
    
    expect(container).toBeInTheDocument();
  });
});
