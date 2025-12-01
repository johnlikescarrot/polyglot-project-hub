export const useStreamingChat = jest.fn(() => ({
  messages: [],
  isLoading: false,
  sendMessage: jest.fn(),
  clearMessages: jest.fn(),
}));
