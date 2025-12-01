// Extract untestable React component logic into pure functions

export function handleStreamingError(error: string): void {
  // This will be called by the onError callback
  // In production: toast.error(error)
  // In tests: we can verify it was called with the right message
  if (!error) {
    console.warn('Empty error message');
  }
}

export function shouldRenderChatArea(messagesLength: number): boolean {
  return messagesLength > 0;
}

export function shouldRenderQuickActions(messagesLength: number): boolean {
  return messagesLength === 0;
}

export function shouldRenderResearchHistory(messagesLength: number): boolean {
  return messagesLength > 0;
}

export function getChatAreaHeight(): string {
  return 'calc(100vh-220px)';
}
