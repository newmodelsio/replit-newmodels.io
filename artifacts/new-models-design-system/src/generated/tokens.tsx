/* GENERATED FROM tokens.json -- DO NOT EDIT. Run scripts/build-tokens.mjs. */
// Portable design tokens (colors as hex). Web consumes the theme via
// src/index.css; mobile (Expo) and any other platform import this object so the
// whole product shares one source of truth.
export const tokens = {
  "color": {
    "light": {
      "background": "#ffffff",
      "foreground": "#111111",
      "border": "#eeeeee",
      "card": "#ffffff",
      "cardForeground": "#111111",
      "popover": "#ffffff",
      "popoverForeground": "#111111",
      "primary": "#000000",
      "primaryForeground": "#ffffff",
      "secondary": "#f4f4f5",
      "secondaryForeground": "#27272a",
      "muted": "#f4f4f5",
      "mutedForeground": "#a1a1aa",
      "accent": "#1daaf9",
      "accentForeground": "#07131b",
      "destructive": "#d00000",
      "destructiveForeground": "#ffffff",
      "input": "#eeeeee",
      "ring": "#1daaf9",
      "chart1": "#1daaf9",
      "chart2": "#111111",
      "chart3": "#71717a",
      "chart4": "#facc15",
      "chart5": "#d00000",
      "sidebar": "#fafafa",
      "sidebarForeground": "#3f3f46",
      "sidebarBorder": "#eeeeee",
      "sidebarPrimary": "#000000",
      "sidebarPrimaryForeground": "#ffffff",
      "sidebarAccent": "#f4f4f5",
      "sidebarAccentForeground": "#27272a",
      "sidebarRing": "#1daaf9"
    },
    "dark": {
      "background": "#36393f",
      "foreground": "#f4f4f5",
      "border": "#2b2d31",
      "card": "#2b2d31",
      "cardForeground": "#f4f4f5",
      "popover": "#2b2d31",
      "popoverForeground": "#f4f4f5",
      "primary": "#748bd9",
      "primaryForeground": "#ffffff",
      "secondary": "#40454b",
      "secondaryForeground": "#f4f4f5",
      "muted": "#2b2d31",
      "mutedForeground": "#d1d5db",
      "accent": "#1daaf9",
      "accentForeground": "#07131b",
      "destructive": "#7f1d1d",
      "destructiveForeground": "#ffffff",
      "input": "#40454b",
      "ring": "#748bd9",
      "chart1": "#1daaf9",
      "chart2": "#748bd9",
      "chart3": "#a1a1aa",
      "chart4": "#facc15",
      "chart5": "#f87171",
      "sidebar": "#2b2d31",
      "sidebarForeground": "#f4f4f5",
      "sidebarBorder": "#40454b",
      "sidebarPrimary": "#748bd9",
      "sidebarPrimaryForeground": "#ffffff",
      "sidebarAccent": "#40454b",
      "sidebarAccentForeground": "#f4f4f5",
      "sidebarRing": "#748bd9"
    }
  },
  "fontFamily": {
    "sans": [
      "Helvetica",
      "sans-serif"
    ],
    "serif": [
      "Georgia",
      "serif"
    ],
    "mono": [
      "Menlo",
      "monospace"
    ]
  },
  "radius": "0.25rem",
  "spacing": "0.25rem"
} as const;

export type Tokens = typeof tokens;
export default tokens;
