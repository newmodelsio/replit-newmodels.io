# Consuming New Models Design System in web apps

Read `artifacts/new-models-design-system/docs/AGENTS.md` first. This guide covers
React/Vite and other Tailwind web consumers. If the app already contains a local
theme or one of the same component families, also read
`artifacts/new-models-design-system/docs/migrating-web.md`.

## Theme

Import this package's theme once from the app's main CSS:

```css
@import "@workspace/new-models-design-system/styles.css";
```

`styles.css` imports Tailwind and the generated token theme, and registers this
package's web component sources. Do not add a second Tailwind import or a
`node_modules` source path in a Tailwind v4 consumer. Tailwind v3 consumers keep
their existing `@tailwind` directives and add
`node_modules/@workspace/new-models-design-system/src/components` to `content`.

## Components

The web component pilot provides editorial content, archive search, a view
selector, and an about drawer. Import a family directly:

```tsx
import { ModeToggle } from
  "@workspace/new-models-design-system/components/ui/mode-toggle";
import { EditorialBlock } from
  "@workspace/new-models-design-system/components/ui/editorial-content";
```

See `docs/references/` for each family's data shape, behavior, and source notes.
The pilot does not export generic buttons, utility helpers, toast APIs, or a
native component library. Keep product-specific compositions, data fetching,
and application state in the consuming app.

## Verify

After adding the workspace dependency and importing the theme, render one of
the four available families and run the app's typecheck and dev server. The
import must resolve and the component must use the package's token theme before
broader integration work begins.

## Ongoing rules

- Keep one source of theme variables.
- Import package-provided families from their package path.
- Keep app-specific data and page compositions in the app.
- For a non-Tailwind app, use the exported tokens as the source of truth and
  adapt existing components without copying token values.