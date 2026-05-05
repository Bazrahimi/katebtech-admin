// export const buildFullName = (
//   maybeFullName: string | null,
//   email: string,
// ): string => {
//   const trimmed = (maybeFullName ?? "").trim();
//   if (trimmed.length > 0) return trimmed;
//   return email.split("@")[0];
// };

export const generate6DigitCode = () =>
  String(Math.floor(Math.random() * 1_000_000)).padStart(6, "0");
