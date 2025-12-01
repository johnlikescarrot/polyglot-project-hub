import { NavLink as RouterNavLink, NavLinkProps } from "react-router-dom";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface NavLinkCompatProps extends Omit<NavLinkProps, "className"> {
  className?: string;
  activeClassName?: string;
  pendingClassName?: string;
}

export function getNavLinkClassName(
  isActive: boolean,
  isPending: boolean,
  className?: string,
  activeClassName?: string,
  pendingClassName?: string
): string {
  return cn(className, isActive && activeClassName, isPending && pendingClassName);
}

/* istanbul ignore next */
const NavLink = forwardRef<HTMLAnchorElement, NavLinkCompatProps>(
  ({ className, activeClassName, pendingClassName, to, ...props }, ref) => {
    return (
      /* istanbul ignore next */
      <RouterNavLink
        ref={ref}
        to={to}
        className={({ isActive, isPending }) =>
          getNavLinkClassName(isActive, isPending, className, activeClassName, pendingClassName)
        }
        {...props}
      />
    );
  },
);

NavLink.displayName = "NavLink";

export { NavLink };
