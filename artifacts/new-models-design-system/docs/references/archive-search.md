# Archive search and filters

## Source

- `artifacts/new-models/src/components/Search.jsx`
- `artifacts/new-models/src/components/Filter.jsx`

## Export

Import `ArchiveSearch` or `ArchiveFilter` from
`@workspace/new-models-design-system/components/ui/archive-search`.

`ArchiveSearch` keeps the source prop shape:

```ts
type ArchiveSearchData = {
  archive: Array<{
    link: string;
    published: string;
    tags: string;
    title: string;
    type?: string;
  }>;
};
```

It searches by title and filters by publication year, comma-separated tags, and
media type. Category facets appear when used by at least ten archive entries,
are sorted by frequency, and are capped at thirty. Results use a three-column
layout on wide screens and a single column on smaller screens.

## Visual rules

- Search input is centered and uppercase.
- Year, Category, and Type facets are uppercase and separated by thin rules.
- Counts stay adjacent to the matching filter.
- Results show publication metadata before the title.
- Audio and video entries use the source's small media indicators.

## Behavior and safety

The source replaced results on each filter action and could drop a selected
facet when the query changed. The pilot tracks the selected facet and query
independently. Filter controls are native buttons with `aria-pressed`, and an
empty result set announces “No results found.”

Titles and publication metadata preserve the source's raw HTML contract. Sanitize
untrusted values before rendering. External links include
`rel="noopener noreferrer"`.