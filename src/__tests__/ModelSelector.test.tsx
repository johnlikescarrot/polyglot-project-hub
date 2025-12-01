/// <reference types="jest" />
import { render } from '@testing-library/react';
import { ModelSelector } from '@/components/research/ModelSelector';

describe('ModelSelector Component', () => {
  test('renders model selector', () => {
    const { container } = render(
      <ModelSelector selectedModel="google/gemini-2.5-flash" onModelChange={jest.fn()} />
    );
    expect(container).toBeInTheDocument();
  });

  test('displays selected model name', () => {
    const { container } = render(
      <ModelSelector selectedModel="google/gemini-2.5-flash" onModelChange={jest.fn()} />
    );
    expect(container.textContent).toContain('Gemini 2.5 Flash');
  });

  test('displays balanced category badge', () => {
    const { container } = render(
      <ModelSelector selectedModel="google/gemini-2.5-flash" onModelChange={jest.fn()} />
    );
    expect(container.textContent).toContain('balanced');
  });

  test('renders without crashing', () => {
    const { container } = render(
      <ModelSelector selectedModel="google/gemini-2.5-flash" onModelChange={jest.fn()} />
    );
    expect(container.querySelector('button') || container.querySelector('[role="combobox"]')).toBeInTheDocument();
  });

  test('has label text', () => {
    const { container } = render(
      <ModelSelector selectedModel="google/gemini-2.5-flash" onModelChange={jest.fn()} />
    );
    expect(container.textContent).toContain('AI Model');
  });
});
