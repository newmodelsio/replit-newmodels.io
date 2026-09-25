# Consuming New Models Design System in Expo

Read `artifacts/new-models-design-system/docs/AGENTS.md` first. The current
design-system package exports tokens and web components; it does not yet contain
native themes, hooks, or React Native components.

## Use the tokens

Expo apps can import generated token values:

```tsx
import { tokens } from
  "@workspace/new-models-design-system/tokens";

const archiveBackground = tokens.color.light.background;
const discordSurface = tokens.color.dark.background;
```

Use these values from an app-owned NativeWind, StyleSheet, or other native theme.
Do not copy token values into a second source of truth.

## Keep native UI local

Do not import `styles.css` or `components/ui/*` into React Native. The current
package has no native component or hook exports, so retain or author
app-specific native themes, hooks, and components in the Expo app.

## Verify

After adding the workspace dependency, import the token object and render an
app-owned native primitive using it. Run the Expo typecheck and development
preview before applying tokens to additional screens.