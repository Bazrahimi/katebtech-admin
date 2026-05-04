export const PROTECTED_ROUTE_PREFIXES = ["/admin"];
export const matchesProtectedPrefix = (pathname) => {
    return PROTECTED_ROUTE_PREFIXES.some((prefix) => pathname === prefix || pathname.startsWith(prefix + "/"));
};
export const isProtectedPath = matchesProtectedPrefix;
