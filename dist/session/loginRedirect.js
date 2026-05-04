import { authRoutes } from "@katebtech/admin";
export const buildLoginHrefWithNext = (next) => {
    return `${authRoutes.login()}?next=${encodeURIComponent(next)}`;
};
