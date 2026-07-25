/* ══════════════════════════════════════════════
   DIHA FS7TK — Theme Types
   ══════════════════════════════════════════════ */

export interface ThemeColors {
  primaryBlue: string;
  primaryGreen: string;
  lightBlue: string;
  background: string;
  lightGreen: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  textInverse: string;
  surfacePrimary: string;
  surfaceSecondary: string;
  surfaceTertiary: string;
  borderLight: string;
  border: string;
  borderFocus: string;
  success: string;
  info: string;
  warning: string;
  error: string;
}

export interface ThemeSpacing {
  4: string;
  8: string;
  12: string;
  16: string;
  24: string;
  32: string;
  48: string;
  64: string;
}

export interface ThemeBorderRadius {
  card: string;
  button: string;
  input: string;
  sm: string;
  full: string;
}

export interface ThemeTypography {
  fontFamily: {
    title: string;
    body: string;
  };
  fontSize: {
    xs: string;
    sm: string;
    base: string;
    lg: string;
    xl: string;
    "2xl": string;
    "3xl": string;
    "4xl": string;
    "5xl": string;
  };
  fontWeight: {
    regular: number;
    medium: number;
    semibold: number;
    bold: number;
    extrabold: number;
  };
  lineHeight: {
    tight: number;
    normal: number;
    relaxed: number;
  };
}

export type ThemeMode = "light" | "dark" | "system";
