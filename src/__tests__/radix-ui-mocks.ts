/// <reference types="jest" />
// Radix UI component mocks with callback instrumentation

export const radixMocks = {
  selectHandlers: new Map<string, Function>(),
  sliderHandlers: new Map<string, Function>(),
  sheetState: { open: false },

  // Simulate Select onValueChange for reportFormat
  triggerSelectChange: (id: string, value: string) => {
    const handler = radixMocks.selectHandlers.get(id);
    if (handler) {
      handler(value);
    }
  },

  // Simulate Slider onValueChange for totalWords
  triggerSliderChange: (id: string, value: number) => {
    const handler = radixMocks.sliderHandlers.get(id);
    if (handler) {
      handler([value]);
    }
  },

  // Register handlers for testing
  registerSelectHandler: (id: string, handler: Function) => {
    radixMocks.selectHandlers.set(id, handler);
  },

  registerSliderHandler: (id: string, handler: Function) => {
    radixMocks.sliderHandlers.set(id, handler);
  },

  // Clear all handlers
  clearHandlers: () => {
    radixMocks.selectHandlers.clear();
    radixMocks.sliderHandlers.clear();
  },
};

// Jest setup for mocking Radix UI
export const setupRadixMocks = () => {
  // Mock Select component to capture onValueChange
  jest.mock('@radix-ui/react-select', () => ({
    __esModule: true,
    Select: ({ children, value }: any) => (
      <div data-testid="select" data-value={value}>
        {children}
      </div>
    ),
    SelectTrigger: ({ children, id }: any) => (
      <div data-testid={`select-trigger-${id}`}>{children}</div>
    ),
    SelectValue: () => <span />,
    SelectContent: ({ children }: any) => (
      <div data-testid="select-content">{children}</div>
    ),
    SelectItem: ({ value, children }: any) => (
      <div data-testid={`select-item-${value}`} onClick={() => {}} />
    ),
  }));

  // Mock Slider component to capture onValueChange
  jest.mock('@radix-ui/react-slider', () => ({
    __esModule: true,
    Slider: ({ value, onValueChange, min, max }: any) => (
      <div data-testid="slider" data-value={value?.[0]}>
        <input
          type="range"
          min={min}
          max={max}
          value={value?.[0]}
          onChange={(e) => onValueChange?.([Number(e.target.value)])}
        />
      </div>
    ),
  }));
};
