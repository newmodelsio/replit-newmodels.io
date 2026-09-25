# About drawer

## Source

- `artifacts/new-models/src/components/Nav.jsx`
- Uses `Block.jsx` to render `data.about`.

## Export

Import `NavigationDrawer` from
`@workspace/new-models-design-system/components/ui/navigation-drawer`.

```tsx
<NavigationDrawer data={{ about: aboutBlocks }} />
```

The `data.about` value is an array of editorial block objects. The optional
`inlineTrigger` prop is for style-guide previews; the default trigger remains
fixed at the upper-right corner, as in the source app.

## Visual rules and behavior

- The panel enters from the right, fills the viewport height, and is one-third
  of the desktop width.
- A light dimming layer covers the page and closes the drawer when clicked.
- The panel reuses the editorial content family.
- The menu control switches between the source's three-dot and close icons.
- Escape closes the panel and focus returns to the trigger.

The drawer is an about panel, not a replacement for dense primary navigation.