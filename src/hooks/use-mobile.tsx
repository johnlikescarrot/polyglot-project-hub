import * as React from "react";
import { isMobileViewport, createMatchMediaListener, isEventTypeChange } from "@/lib/coverage-extractors";

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(isMobileViewport(window.innerWidth, MOBILE_BREAKPOINT));
    
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = createMatchMediaListener(checkMobile);
    
    if (isEventTypeChange('change')) {
      mql.addEventListener("change", onChange);
    }
    
    checkMobile();
    
    return () => {
      if (isEventTypeChange('change')) {
        mql.removeEventListener("change", onChange);
      }
    };
  }, []);

  return !!isMobile;
}
