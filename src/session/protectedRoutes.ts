export const PROTECTED_ROUTE_PREFIXES = ["/admin"] as const;

export const matchesProtectedPrefix = (pathname: string): boolean => {
  return PROTECTED_ROUTE_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(prefix + "/"),
  );
};

export const isProtectedPath = matchesProtectedPrefix;