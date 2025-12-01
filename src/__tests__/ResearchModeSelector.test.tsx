/// <reference types="jest" />
import { render, fireEvent } from '@testing-library/react';
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
    const button = container.querySelector('button');
    expect(button).toBeInTheDocument();
  });

  test('displays Research Settings label', () => {
    const { container } = render(
      <ResearchModeSelector settings={mockSettings} onSettingsChange={jest.fn()} />
    );
    expect(container.textContent).toContain('Research Settings');
  });

  test('opens sheet when button clicked', () => {
    const { container } = render(
      <ResearchModeSelector settings={mockSettings} onSettingsChange={jest.fn()} />
    );
    const button = container.querySelector('button');
    fireEvent.click(button!);
    expect(container.textContent).toContain('Research Configuration');
  });

  test('displays current research mode', () => {
    const { container } = render(
      <ResearchModeSelector settings={mockSettings} onSettingsChange={jest.fn()} />
    );
    const button = container.querySelector('button');
    fireEvent.click(button!);
    expect(container.textContent).toContain('Research Mode');
  });

  test('calls onSettingsChange when mode is selected', () => {
    const onSettingsChange = jest.fn();
    const { container } = render(
      <ResearchModeSelector settings={mockSettings} onSettingsChange={onSettingsChange} />
    );
    const button = container.querySelector('button');
    fireEvent.click(button!);
    
    const modeButtons = container.querySelectorAll('button');
    if (modeButtons.length > 1) {
      fireEvent.click(modeButtons[1]);
      expect(onSettingsChange).toHaveBeenCalled();
    }
  });

  test('renders with multiple research modes available', () => {
    const { container } = render(
      <ResearchModeSelector settings={mockSettings} onSettingsChange={jest.fn()} />
    );
    const button = container.querySelector('button');
    fireEvent.click(button!);
    expect(container.textContent).toContain('Standard Research');
  });

  test('displays sheet description', () => {
    const { container } = render(
      <ResearchModeSelector settings={mockSettings} onSettingsChange={jest.fn()} />
    );
    const button = container.querySelector('button');
    fireEvent.click(button!);
    expect(container.textContent).toContain('Configure your research parameters');
  });
});
