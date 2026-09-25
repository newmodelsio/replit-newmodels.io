import { lazy, type ComponentType } from 'react';
import {
  ColorsPage,
  FontsPage,
  LayoutPage,
  OverviewPage,
} from './foundations';

function lazyPage(load: () => Promise<ComponentType>) {
  return lazy(async () => ({ default: await load() }));
}

const EditorialContentDemo = lazyPage(() =>
  import('./demos/editorial-content').then(
    ({ EditorialContentDemo }) => EditorialContentDemo,
  ),
);
const ArchiveSearchDemo = lazyPage(() =>
  import('./demos/archive-search').then(
    ({ ArchiveSearchDemo }) => ArchiveSearchDemo,
  ),
);
const ModeToggleDemo = lazyPage(() =>
  import('./demos/mode-toggle').then(({ ModeToggleDemo }) => ModeToggleDemo),
);
const NavigationDrawerDemo = lazyPage(() =>
  import('./demos/navigation-drawer').then(
    ({ NavigationDrawerDemo }) => NavigationDrawerDemo,
  ),
);

export type PreviewEntry = {
  id: string;
  name: string;
  description: string;
  Page: ComponentType;
};

export type NavGroup = {
  name: string;
  entries: PreviewEntry[];
};

export const DESIGN_SYSTEM = {
  title: 'New Models Design System',
  description:
    'A sparse editorial system built from the New Models interface: Helvetica, black-and-white surfaces, fine rules, and focused blue links.',
} as const;

export const OVERVIEW_ENTRY: PreviewEntry = {
  id: 'overview',
  name: 'Overview',
  description:
    'Source-derived foundations and the first reusable New Models component families.',
  Page: OverviewPage,
};

export const NAV_GROUPS: NavGroup[] = [
  {
    name: 'Colors',
    entries: [
      {
        id: 'color-palette',
        name: 'Color palette',
        description: 'The complete light and dark token roles with exact values.',
        Page: ColorsPage,
      },
    ],
  },
  {
    name: 'Fonts',
    entries: [
      {
        id: 'type-scale',
        name: 'Typography',
        description: 'Helvetica, editorial headings, body copy, and metadata.',
        Page: FontsPage,
      },
    ],
  },
  {
    name: 'Layout',
    entries: [
      {
        id: 'spacing-and-corners',
        name: 'Spacing and corners',
        description: 'The 4px spacing step, compact radii, and hairline separators.',
        Page: LayoutPage,
      },
    ],
  },
  {
    name: 'Content',
    entries: [
      {
        id: 'editorial-content',
        name: 'Editorial content',
        description:
          'Content blocks, sections, posts, images, captions, quotes, and embeds.',
        Page: EditorialContentDemo,
      },
    ],
  },
  {
    name: 'Search and filters',
    entries: [
      {
        id: 'archive-search',
        name: 'Archive search',
        description:
          'Centered search with year, category, type, and result-count filters.',
        Page: ArchiveSearchDemo,
      },
    ],
  },
  {
    name: 'Navigation',
    entries: [
      {
        id: 'mode-toggle',
        name: 'View selector',
        description: 'The Clear, Dark, and Archive product modes.',
        Page: ModeToggleDemo,
      },
      {
        id: 'navigation-drawer',
        name: 'About drawer',
        description: 'A right-side panel with an overlay and editorial content.',
        Page: NavigationDrawerDemo,
      },
    ],
  },
];

export const ALL_ENTRIES: PreviewEntry[] = [
  OVERVIEW_ENTRY,
  ...NAV_GROUPS.flatMap((group) => group.entries),
];

const duplicateIds = ALL_ENTRIES.map((entry) => entry.id).filter(
  (id, index, ids) => ids.indexOf(id) !== index,
);
if (duplicateIds.length > 0) {
  throw new Error(
    `Duplicate preview page id(s): ${[...new Set(duplicateIds)].join(
      ', ',
    )}. Every page id must be unique across all nav groups.`,
  );
}