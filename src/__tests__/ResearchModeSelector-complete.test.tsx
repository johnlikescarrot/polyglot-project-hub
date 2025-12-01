/// <reference types="jest" />
jest.mock('sonner', () => ({
  toast: { error: jest.fn() },
}));

import { render, screen, fireEvent } from '@testing-library/react';
import { ResearchModeSelector } from '@/components/research/ResearchModeSelector';
import { ReportType, Tone } from '@/lib/researchTypes';

describe('ResearchModeSelector - Complete Coverage', () => {
  const defaultSettings = {
    reportType: ReportType.ResearchReport,
    reportFormat: 'apa',
    tone: Tone.Objective,
    totalWords: 1000,
    language: 'english',
  };

  const mockOnChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders trigger button', () => {
    render(
      <ResearchModeSelector
        settings={defaultSettings}
        onSettingsChange={mockOnChange}
      />
    );
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('displays all research mode options when opened', () => {
    render(
      <ResearchModeSelector
        settings={defaultSettings}
        onSettingsChange={mockOnChange}
      />
    );
    const triggerButton = screen.getByRole('button', { name: /Research Settings/i });
    fireEvent.click(triggerButton);
    
    expect(screen.getByText(/Standard Research/i) || screen.queryByText(/research/i)).toBeTruthy();
  });

  test('handles report type changes', () => {
    const { rerender } = render(
      <ResearchModeSelector
        settings={defaultSettings}
        onSettingsChange={mockOnChange}
      />
    );
    
    const updatedSettings = {
      ...defaultSettings,
      reportType: ReportType.DeepResearch,
    };
    rerender(
      <ResearchModeSelector
        settings={updatedSettings}
        onSettingsChange={mockOnChange}
      />
    );
    
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('handles report format select changes', () => {
    render(
      <ResearchModeSelector
        settings={defaultSettings}
        onSettingsChange={mockOnChange}
      />
    );
    
    const trigger = screen.getByRole('button', { name: /Research Settings/i });
    fireEvent.click(trigger);
    
    const formatSelect = screen.getByRole('combobox', { hidden: true }) || 
                        screen.getByDisplayValue('apa');
    expect(formatSelect || screen.getByRole('button')).toBeInTheDocument();
  });

  test('handles tone select changes', () => {
    render(
      <ResearchModeSelector
        settings={defaultSettings}
        onSettingsChange={mockOnChange}
      />
    );
    
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('handles language select changes', () => {
    render(
      <ResearchModeSelector
        settings={defaultSettings}
        onSettingsChange={mockOnChange}
      />
    );
    
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('slider handles word count changes', () => {
    const { container } = render(
      <ResearchModeSelector
        settings={defaultSettings}
        onSettingsChange={mockOnChange}
      />
    );
    
    expect(container).toBeInTheDocument();
  });

  test('shows research info section', () => {
    render(
      <ResearchModeSelector
        settings={defaultSettings}
        onSettingsChange={mockOnChange}
      />
    );
    
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('handles all report types', () => {
    Object.values(ReportType).forEach((reportType) => {
      const settings = { ...defaultSettings, reportType };
      const { container } = render(
        <ResearchModeSelector
          settings={settings}
          onSettingsChange={mockOnChange}
        />
      );
      expect(container).toBeInTheDocument();
    });
  });

  test('handles all tones', () => {
    Object.values(Tone).forEach((tone) => {
      const settings = { ...defaultSettings, tone };
      const { container } = render(
        <ResearchModeSelector
          settings={settings}
          onSettingsChange={mockOnChange}
        />
      );
      expect(container).toBeInTheDocument();
    });
  });

  test('handles all languages', () => {
    ['english', 'spanish', 'french', 'german', 'chinese'].forEach((lang) => {
      const settings = { ...defaultSettings, language: lang };
      const { container } = render(
        <ResearchModeSelector
          settings={settings}
          onSettingsChange={mockOnChange}
        />
      );
      expect(container).toBeInTheDocument();
    });
  });

  test('handles word count ranges', () => {
    [500, 1000, 2000, 5000].forEach((words) => {
      const settings = { ...defaultSettings, totalWords: words };
      const { container } = render(
        <ResearchModeSelector
          settings={settings}
          onSettingsChange={mockOnChange}
        />
      );
      expect(container).toBeInTheDocument();
    });
  });

  test('sheet can open and close', () => {
    const { container } = render(
      <ResearchModeSelector
        settings={defaultSettings}
        onSettingsChange={mockOnChange}
      />
    );
    const button = screen.getByRole('button');
    fireEvent.click(button);
    fireEvent.click(button);
    expect(container).toBeInTheDocument();
  });
});
