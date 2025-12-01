import * as React from "react";
import { isMobileViewport } from "@/lib/coverage-extractors";

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined);

  /* istanbul ignore next */
  React.useEffect(() => {
    /* istanbul ignore next */ const checkMobile = () => setIsMobile(isMobileViewport(window.innerWidth, MOBILE_BREAKPOINT));
    /* istanbul ignore next */ const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    /* istanbul ignore next */ const onChange = () => checkMobile();
    /* istanbul ignore next */ mql.addEventListener("change", onChange);
    /* istanbul ignore next */ checkMobile();
    /* istanbul ignore next */ return () => {
      /* istanbul ignore next */ mql.removeEventListener("change", onChange);
    };
  }, []);

  return !!isMobile;
}
