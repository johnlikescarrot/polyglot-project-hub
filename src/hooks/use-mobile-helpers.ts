// Pure functions extracted from use-mobile hook

const MOBILE_BREAKPOINT = 768;

export function checkIsMobile(innerWidth: number): boolean {
  return innerWidth < MOBILE_BREAKPOINT;
}

export function getBreakpoint(): number {
  return MOBILE_BREAKPOINT;
}

export function handleMediaQueryChange(innerWidth: number): boolean {
  return checkIsMobile(innerWidth);
}

export function createMediaQueryString(): string {
  return `(max-width: ${MOBILE_BREAKPOINT - 1}px)`;
}
