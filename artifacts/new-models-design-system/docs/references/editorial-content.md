# Editorial content family

## Source

- `artifacts/new-models/src/components/Block.jsx`
- `artifacts/new-models/src/components/Section.jsx`
- `artifacts/new-models/src/components/Post.jsx`
- Used by `Clear.jsx` and the about drawer in `Nav.jsx`.

## Export

Import `EditorialBlock`, `EditorialSection`, or `EditorialPost` from
`@workspace/new-models-design-system/components/ui/editorial-content`.

Each component accepts a source-shaped `block` or `section` object. The object
can include `id`, `type`, `title`, `description`, `text`, `url`, `link`, `src`,
`alt`, `caption`, `iframe`, `thumbnail`, `modifiers`, and nested `posts`.

`EditorialBlock` handles `section`, `text`, `image`, `post`, `hr`, `heading`,
`embed`, and `quote` types. Unknown types render nothing. `EditorialSection`
shows three posts first, adds ten per “View More” action, and returns to the
first three with “Hide”. `EditorialPost` renders its thumbnail when supplied.

Example:

```tsx
import { EditorialBlock } from
  '@workspace/new-models-design-system/components/ui/editorial-content';

<EditorialBlock
  block={{
    id: 'selected-stories',
    type: 'section',
    title: 'Selected stories',
    description: 'Ideas and people shaping contemporary culture.',
    posts: [
      {
        id: 'story-1',
        type: 'post',
        url: 'https://example.com/story-1',
        text: 'A field note on public space',
      },
    ],
  }}
/>;
```

## Visual rules

- Section labels are bold and uppercase.
- Descriptions use muted gray and tight leading.
- Editorial sections end with a thin rule.
- Thumbnails are square and 125px wide.
- `red` and `yellow` in the block-level `modifiers` field map to the source's
  editorial emphasis treatments.

## Safety and accessibility

Rich text fields preserve the source's HTML contract. Sanitize untrusted content
before rendering. Embedded iframe markup must be trusted and allow-listed.
External links use `rel="noopener noreferrer"`. Image alternative text defaults
to empty, so provide `alt` when an image conveys meaning.

The pilot replaces the source's non-keyboard View More/Hide `<div>` controls
with buttons, and removes mount-time random thumbnail selection so previews are
stable.