# Migrating web UI to New Models Design System

Read `artifacts/new-models-design-system/docs/AGENTS.md` and
`artifacts/new-models-design-system/docs/consuming-web.md` first. This guide is
for an app that already has local theme or component implementations matching
the source-backed New Models families.

## Replace the local theme

Replace the app's duplicate Tailwind/token theme with the package stylesheet:

- Remove duplicate Tailwind imports, plugin imports, and `:root`/`.dark` token
  definitions after verifying the package stylesheet supplies them.
- Keep app-specific CSS that is not a theme or one of the component families.
- Keep Tailwind v3 directives and configure the package component source as
  described in the web consumption guide.

## Rewrite matching component imports

The current web exports are:

- Editorial content → `@workspace/new-models-design-system/components/ui/editorial-content`
- Archive search → `@workspace/new-models-design-system/components/ui/archive-search`
- View selector → `@workspace/new-models-design-system/components/ui/mode-toggle`
- About drawer → `@workspace/new-models-design-system/components/ui/navigation-drawer`

Do not rewrite unrelated app components to nonexistent generic button, toast,
or utility exports. Keep app-specific page compositions and service calls local.

## Remove superseded implementations carefully

Replace or delete only local implementations that are fully covered by one of
the exports above. Retain app-specific data flows and API routes. Remove
dependencies only when they are no longer used anywhere else in the app.

## Verify migration

Check that matching component callsites import the package, then run the
consumer's typecheck and dev server. Confirm that the package stylesheet loads
and that the migrated family retains its source-shaped props and interactions.