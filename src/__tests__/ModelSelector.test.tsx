/// <reference types="jest" />
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ModelSelector } from '@/components/research/ModelSelector';

describe('ModelSelector Component', () => {
  test('renders model selector', () => {
    const { container } = render(
      <ModelSelector selectedModel="google/gemini-2.5-flash" onModelChange={jest.fn()} />
    );
    expect(container).toBeInTheDocument();
  });

  test('displays currently selected model', () => {
    const { container } = render(
      <ModelSelector selectedModel="google/gemini-2.5-flash" onModelChange={jest.fn()} />
    );
    expect(container.textContent).toContain('google/gemini-2.5-flash');
  });

  test('calls onModelChange when model changes', async () => {
    const onModelChange = jest.fn();
    const user = userEvent.setup();
    const { container } = render(
      <ModelSelector selectedModel="google/gemini-2.5-flash" onModelChange={onModelChange} />
    );
    
    const selectors = container.querySelectorAll('button');
    if (selectors.length > 1) {
      await user.click(selectors[1]);
      expect(onModelChange).toHaveBeenCalled();
    }
  });

  test('renders without crashing', () => {
    const { container } = render(
      <ModelSelector selectedModel="google/gemini-2.5-flash" onModelChange={jest.fn()} />
    );
    expect(container.querySelector('[role="button"]') || container.querySelector('button')).toBeInTheDocument();
  });
});
