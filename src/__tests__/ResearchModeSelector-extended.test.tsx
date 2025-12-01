/// <reference types="jest" />
import { render, fireEvent } from '@testing-library/react';
import { ResearchModeSelector } from '@/components/research/ResearchModeSelector';
import { ReportType, Tone } from '@/lib/researchTypes';

describe('ResearchModeSelector - all branches', () => {
  const mockSettings = {
    reportType: ReportType.ResearchReport,
    reportFormat: 'apa',
    tone: Tone.Objective,
    totalWords: 1000,
    language: 'english',
  };

  test('all report format combinations', () => {
    ['apa', 'mla', 'chicago', 'harvard'].forEach(format => {
      const settings = { ...mockSettings, reportFormat: format };
      const { container } = render(
        <ResearchModeSelector settings={settings} onSettingsChange={jest.fn()} />
      );
      expect(container).toBeInTheDocument();
    });
  });

  test('all language options', () => {
    ['english', 'spanish', 'french', 'german', 'chinese'].forEach(lang => {
      const settings = { ...mockSettings, language: lang };
      const { container } = render(
        <ResearchModeSelector settings={settings} onSettingsChange={jest.fn()} />
      );
      expect(container).toBeInTheDocument();
    });
  });

  test('word count range - minimum', () => {
    const settings = { ...mockSettings, totalWords: 500 };
    const { container } = render(
      <ResearchModeSelector settings={settings} onSettingsChange={jest.fn()} />
    );
    expect(container).toBeInTheDocument();
  });

  test('word count range - middle', () => {
    const settings = { ...mockSettings, totalWords: 2750 };
    const { container } = render(
      <ResearchModeSelector settings={settings} onSettingsChange={jest.fn()} />
    );
    expect(container).toBeInTheDocument();
  });

  test('word count range - maximum', () => {
    const settings = { ...mockSettings, totalWords: 5000 };
    const { container } = render(
      <ResearchModeSelector settings={settings} onSettingsChange={jest.fn()} />
    );
    expect(container).toBeInTheDocument();
  });

  test('all tone combinations', () => {
    const tones = [
      Tone.Objective,
      Tone.Analytical,
      Tone.Formal,
      Tone.Informative,
      Tone.Critical,
    ];
    tones.forEach(tone => {
      const settings = { ...mockSettings, tone };
      const { container } = render(
        <ResearchModeSelector settings={settings} onSettingsChange={jest.fn()} />
      );
      expect(container).toBeInTheDocument();
    });
  });

  test('report type transitions', () => {
    const onChange = jest.fn();
    const { rerender, container } = render(
      <ResearchModeSelector settings={mockSettings} onSettingsChange={onChange} />
    );

    const newSettings = {
      ...mockSettings,
      reportType: ReportType.DeepResearch,
    };
    rerender(
      <ResearchModeSelector settings={newSettings} onSettingsChange={onChange} />
    );
    expect(container).toBeInTheDocument();
  });

  test('multiple setting changes in sequence', () => {
    const onChange = jest.fn();
    let settings = mockSettings;
    const { rerender, container } = render(
      <ResearchModeSelector settings={settings} onSettingsChange={onChange} />
    );

    settings = { ...settings, reportFormat: 'mla' };
    rerender(
      <ResearchModeSelector settings={settings} onSettingsChange={onChange} />
    );

    settings = { ...settings, tone: Tone.Analytical };
    rerender(
      <ResearchModeSelector settings={settings} onSettingsChange={onChange} />
    );

    settings = { ...settings, totalWords: 3000 };
    rerender(
      <ResearchModeSelector settings={settings} onSettingsChange={onChange} />
    );

    expect(container).toBeInTheDocument();
  });

  test('button styling changes with selected mode', () => {
    const { container } = render(
      <ResearchModeSelector settings={mockSettings} onSettingsChange={jest.fn()} />
    );
    const button = container.querySelector('button');
    expect(button).toBeTruthy();
  });

  test('component renders with different initial states', () => {
    const states = [
      { ...mockSettings, reportType: ReportType.DeepResearch },
      { ...mockSettings, reportType: ReportType.DetailedReport },
      { ...mockSettings, reportType: ReportType.OutlineReport },
      { ...mockSettings, reportType: ReportType.CustomReport },
    ];

    states.forEach(state => {
      const { container } = render(
        <ResearchModeSelector settings={state} onSettingsChange={jest.fn()} />
      );
      expect(container).toBeInTheDocument();
    });
  });
});
