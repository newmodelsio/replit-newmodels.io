# New Models source inventory

This inventory records the project components and visual evidence used to build
the design-system pilot. The source is the existing `artifacts/new-models`
artifact. The pilot is a reusable component library, not a migration of that
application.

## Visual evidence

- `artifacts/new-models/src/globals.css` is the active global style source:
  Helvetica, a 14px body size, and approximately 1.5 line height.
- `artifacts/new-models/src/modifiers.css` defines the editorial red and yellow
  emphasis treatments.
- The active interface uses white backgrounds, black text, fine `#eeeeee`
  borders, zinc-gray secondary surfaces, and `#1daaf9` links.
- The separate Discord view uses `#36393f`, `#2b2d31`, `#40454b`, and a
  `#748bd9` submit action. That palette is represented by the dark token mode;
  the main archive does not have a separate dark theme. The Discord page also
  applies a custom font at the page-composition level; that community family is
  deferred, so the custom font is not part of the current component pilot.
- `artifacts/new-models/src/index.css` is inactive scaffold CSS and is not used
  as the visual source.
- No verified static New Models logo is available. The inline wordmark is
  data-driven, while the public favicon is generic and does not match it. The
  style guide therefore uses a text heading, not either asset.

## Component families

| Priority | Family | Source | Public family | Status |
| --- | --- | --- | --- | --- |
| 1 | Editorial content | `src/components/Block.jsx`, `Section.jsx`, `Post.jsx` | `EditorialBlock`, `EditorialSection`, `EditorialPost` | Pilot |
| 2 | Archive search and filters | `src/components/Search.jsx`, `Filter.jsx` | `ArchiveSearch`, `ArchiveFilter` | Pilot |
| 3 | View selector | `src/components/Toggle.jsx` | `ModeToggle` | Pilot |
| 4 | About drawer | `src/components/Nav.jsx` | `NavigationDrawer` | Pilot |
| 5 | Discord messages and submission | `src/components/DiscordPost.jsx`, `DiscordSubmit.jsx`, `src/api/discord.js` | To be defined after pilot approval | Deferred |

## App-specific items not included

- `Clear.jsx`, `Dark.jsx`, and `Aggregate.jsx` are page compositions and data
  flows, not reusable primitives.
- `Dark.jsx` loads Discord data and coordinates replies and bulletin posts. The
  API-backed composition is not part of this component pilot.
- The dynamic wordmark and generic favicon are not presented as a retained
  brand asset.
- The generated shadcn component scaffold was not used by the app and is not
  treated as the New Models design system.
- No chart, motion, or voice-and-tone system is documented by the source.

## Porting notes

- The pilot keeps the source components' core data shapes and interactions,
  while adding native buttons, pressed states, `rel="noopener noreferrer"`,
  drawer Escape handling, and focus restoration.
- Editorial thumbnails render deterministically when supplied. The source used
  random selection on mount; the style guide uses a predictable component
  preview instead.
- Archive search keeps the source filter dimensions and result layout, while
  storing the active facet explicitly so search and selection do not overwrite
  each other. An explicit no-results message is added.
- Editorial text, descriptions, captions, dates, titles, and embeds may contain
  raw HTML, matching the source data contract. Consumers must sanitize untrusted
  HTML before passing it to these components. Do not pass untrusted iframe
  markup.
- The components are exported from
  `@workspace/new-models-design-system/components/ui/<family>`.