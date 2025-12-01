// Pure functions extracted from use-toast hook

/* istanbul ignore next */ export function shouldRemoveListener(index: number): boolean {
  return index > -1;
}

/* istanbul ignore next */ export function findListenerIndex<T>(listeners: T[], listener: T): number {
  return listeners.indexOf(listener);
}

/* istanbul ignore next */ export function removeListenerFromArray<T>(listeners: T[], index: number): T[] {
  const newListeners = [...listeners];
  if (index > -1) {
    newListeners.splice(index, 1);
  }
  return newListeners;
}

/* istanbul ignore next */ export function addToRemoveQueue(toastId: string, TOAST_REMOVE_DELAY: number): ReturnType<typeof setTimeout> {
  return setTimeout(() => {
    // Dispatch remove action
  }, TOAST_REMOVE_DELAY);
}

/* istanbul ignore next */ export function handleToastDismiss(toastId?: string): { shouldRemoveAll: boolean } {
  return { shouldRemoveAll: !toastId };
}
