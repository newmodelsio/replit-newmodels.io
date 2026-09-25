# Migrating Expo UI to New Models Design System

Read `artifacts/new-models-design-system/docs/AGENTS.md` and
`artifacts/new-models-design-system/docs/consuming-expo.md` first. The current
package exposes design tokens to Expo, but it does not export native themes,
hooks, or React Native components.

## Move token values to the shared source

- Add `@workspace/new-models-design-system` as a workspace dependency.
- Replace duplicated app color, font-family, radius, and spacing values with
  imports from `@workspace/new-models-design-system/tokens`.
- Keep app-specific theme mapping in the Expo app.

## Keep native implementations app-owned

Do not redirect imports to nonexistent `lib/native-theme`, native hooks, or
`components/native/*` paths. Keep local hooks and components, and remove them
only when a matching native package export exists in a future version.
Never import the web stylesheet or DOM/Tailwind component modules into Expo.

## Verify migration

Typecheck the token imports and app-owned theme mapping, then run the Expo
development preview. Confirm that native components render from the app's
theme values before applying the change to more screens.