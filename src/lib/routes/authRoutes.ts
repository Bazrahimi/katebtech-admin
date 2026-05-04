const uAuth = "/u/auth";
export const authRoutes = {
  // Root
  root: () => uAuth,
  // Core auth
  login: () => `${uAuth}/login`,
  signUp: () => `${uAuth}/sign-up`,
  forgotPassword: () => `${uAuth}/forgot-password`,
  resetPassword: () => `${uAuth}/reset-password`,
  verifyEmail: () => `${uAuth}/verify`,
} as const;
