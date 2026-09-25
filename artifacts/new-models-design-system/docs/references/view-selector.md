# View selector

## Source

- `artifacts/new-models/src/components/Toggle.jsx`
- Rendered by the app shell to choose Clear, Dark, or Archive.

## Export

Import `ModeToggle` from
`@workspace/new-models-design-system/components/ui/mode-toggle`.

```tsx
<ModeToggle toggle={mode} setToggle={setMode} />
```

The `toggle` value is a string and `setToggle` receives one of the source labels:
`Clear`, `Dark`, or `Archive`.

## Visual rules

- Keep the labels uppercase.
- Use a zinc-gray track, compact padding, and a white selected segment.
- Keep all three options visible as one grouped control.

Each option is a native button and exposes its state with `aria-pressed`.