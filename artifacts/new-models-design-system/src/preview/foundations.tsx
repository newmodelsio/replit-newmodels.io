import { useState } from 'react';
import { tokens } from '../generated/tokens';
import { ArchiveSearch } from '../components/ui/archive-search';
import { EditorialBlock } from '../components/ui/editorial-content';
import { ModeToggle } from '../components/ui/mode-toggle';
import { NavigationDrawer } from '../components/ui/navigation-drawer';
import { sampleAbout, sampleArchive, sampleEditorialSection } from './samples';

type ColorMode = keyof typeof tokens.color;
type ColorRole = keyof typeof tokens.color.light;

const COLOR_ROLES: ColorRole[] = [
  'background',
  'foreground',
  'border',
  'card',
  'cardForeground',
  'popover',
  'popoverForeground',
  'primary',
  'primaryForeground',
  'secondary',
  'secondaryForeground',
  'muted',
  'mutedForeground',
  'accent',
  'accentForeground',
  'destructive',
  'destructiveForeground',
  'input',
  'ring',
  'chart1',
  'chart2',
  'chart3',
  'chart4',
  'chart5',
  'sidebar',
  'sidebarForeground',
  'sidebarBorder',
  'sidebarPrimary',
  'sidebarPrimaryForeground',
  'sidebarAccent',
  'sidebarAccentForeground',
  'sidebarRing',
];

function prettyName(value: string) {
  return value
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (character) => character.toUpperCase());
}

function Palette({
  mode,
  roles,
}: {
  mode: ColorMode;
  roles: ColorRole[];
}) {
  const palette = tokens.color[mode];

  return (
    <section
      className="rounded border p-5"
      style={{
        backgroundColor: palette.background,
        color: palette.foreground,
        borderColor: palette.border,
      }}
    >
      <div className="mb-4 flex items-baseline justify-between gap-3">
        <h2 className="text-sm font-bold uppercase">{mode} palette</h2>
        <code className="text-xs opacity-70">color.{mode}.*</code>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {roles.map((role) => (
          <div key={role}>
            <div
              className="h-12 border"
              style={{
                backgroundColor: palette[role],
                borderColor: palette.border,
              }}
            />
            <p className="mt-2 text-xs font-medium">{prettyName(role)}</p>
            <code className="text-[11px] opacity-70">{palette[role]}</code>
          </div>
        ))}
      </div>
    </section>
  );
}

export function OverviewPage() {
  const [mode, setMode] = useState('Clear');

  return (
    <div className="space-y-6">
      <section className="rounded border bg-card p-5 text-card-foreground">
        <p className="text-xs font-bold uppercase text-muted-foreground">
          Source-derived system
        </p>
        <h2 className="mt-2 text-2xl font-bold">New Models</h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          A sparse editorial archive built around Helvetica, black-and-white
          surfaces, fine rules, and a focused blue link color. The dark palette
          comes from the separate Discord mode, rather than an alternate theme
          for the light archive.
        </p>
      </section>

      <section className="rounded border bg-card p-5 text-card-foreground">
        <div className="mb-3">
          <h2 className="text-sm font-bold uppercase">View selector</h2>
          <p className="mt-1 text-xs text-muted-foreground">
            Clear, Dark, and Archive are the source product modes.
          </p>
        </div>
        <ModeToggle toggle={mode} setToggle={setMode} />
      </section>

      <section className="rounded border bg-card p-5 text-card-foreground">
        <h2 className="mb-4 text-sm font-bold uppercase">Editorial content</h2>
        <EditorialBlock block={sampleEditorialSection} />
      </section>

      <section className="overflow-hidden rounded border bg-card text-card-foreground">
        <div className="border-b p-5">
          <h2 className="text-sm font-bold uppercase">Archive search</h2>
          <p className="mt-1 text-xs text-muted-foreground">
            Search by title, then narrow the list by year, category, or type.
          </p>
        </div>
        <div className="max-h-[34rem] overflow-y-auto">
          <ArchiveSearch data={sampleArchive} />
        </div>
      </section>

      <section className="relative rounded border bg-card p-5 text-card-foreground">
        <div className="flex items-center gap-4">
          <div>
            <h2 className="text-sm font-bold uppercase">About drawer</h2>
            <p className="mt-1 text-xs text-muted-foreground">
              Open the three-dot control to inspect the right-side panel.
            </p>
          </div>
          <NavigationDrawer data={{ about: sampleAbout }} inlineTrigger />
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <Palette mode="light" roles={['primary', 'secondary', 'accent', 'border']} />
        <Palette mode="dark" roles={['primary', 'secondary', 'accent', 'border']} />
      </section>
    </div>
  );
}

export function ColorsPage() {
  return (
    <div className="space-y-5">
      <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
        The palette is intentionally restrained. Light mode reflects the main
        archive; dark mode preserves the Discord surfaces and periwinkle action
        color. Each swatch displays the exact hex value generated from
        <code className="mx-1">tokens.json</code>.
      </p>
      <Palette mode="light" roles={COLOR_ROLES} />
      <Palette mode="dark" roles={COLOR_ROLES} />
    </div>
  );
}

export function FontsPage() {
  const sans = tokens.fontFamily.sans.join(', ');

  return (
    <div className="space-y-6 rounded border bg-card p-5 text-card-foreground">
      <section>
        <p className="text-xs font-bold uppercase text-muted-foreground">
          Primary family
        </p>
        <p className="mt-3 text-3xl font-bold" style={{ fontFamily: sans }}>
          Helvetica
        </p>
        <code className="mt-2 block text-xs text-muted-foreground">
          {sans}
        </code>
      </section>

      <section className="space-y-5 border-t pt-5">
        <p className="text-xs font-bold uppercase text-muted-foreground">
          Type in context
        </p>
        <div className="grid gap-2 sm:grid-cols-[7rem_1fr]">
          <span className="text-xs uppercase text-muted-foreground">Display</span>
          <p className="text-4xl font-bold leading-tight tracking-[-0.01em]">
            New Models
          </p>
        </div>
        <div className="grid gap-2 sm:grid-cols-[7rem_1fr]">
          <span className="text-xs uppercase text-muted-foreground">
            Section label
          </span>
          <p className="font-bold uppercase">Selected stories</p>
        </div>
        <div className="grid gap-2 sm:grid-cols-[7rem_1fr]">
          <span className="text-xs uppercase text-muted-foreground">Body</span>
          <p className="text-sm leading-[1.5]">
            The main interface uses a compact 14px body size with open line
            spacing and little decorative styling.
          </p>
        </div>
        <div className="grid gap-2 sm:grid-cols-[7rem_1fr]">
          <span className="text-xs uppercase text-muted-foreground">Caption</span>
          <p className="text-xs text-muted-foreground">
            Publication date · category · media type
          </p>
        </div>
        <div className="grid gap-2 sm:grid-cols-[7rem_1fr]">
          <span className="text-xs uppercase text-muted-foreground">Link</span>
          <p className="text-sm text-accent underline">Browse the archive</p>
        </div>
      </section>
    </div>
  );
}

export function LayoutPage() {
  const spacingSteps = [
    { label: '4px', multiplier: 1 },
    { label: '8px', multiplier: 2 },
    { label: '12px', multiplier: 3 },
    { label: '20px', multiplier: 5 },
    { label: '40px', multiplier: 10 },
  ];
  const spacingBase = Number.parseFloat(tokens.spacing);

  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <section className="rounded border bg-card p-5 text-card-foreground">
        <h2 className="text-sm font-bold uppercase">Spacing</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The source follows a 4px base step. Twenty-pixel padding and gaps are
          common for page sections.
        </p>
        <div className="mt-6 space-y-4">
          {spacingSteps.map((step) => (
            <div key={step.label} className="flex items-center gap-4">
              <span className="w-10 text-xs text-muted-foreground">
                {step.label}
              </span>
              <div
                className="h-3 bg-primary"
                style={{ width: `${spacingBase * step.multiplier}rem` }}
              />
            </div>
          ))}
        </div>
      </section>

      <section className="rounded border bg-card p-5 text-card-foreground">
        <h2 className="text-sm font-bold uppercase">Corners and rules</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Most surfaces are square-edged. Small rounded controls and full pills
          are reserved for compact counters and mode selection.
        </p>
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div
            className="flex h-24 items-end border bg-muted p-3"
            style={{ borderRadius: tokens.radius }}
          >
            <span className="text-xs font-medium">
              Base radius · {tokens.radius}
            </span>
          </div>
          <div className="flex h-24 items-end rounded-full border bg-muted p-3">
            <span className="text-xs font-medium">Pill · selected controls</span>
          </div>
          <div className="col-span-2 border-t pt-3 text-xs text-muted-foreground">
            Hairline separators use the border token.
          </div>
        </div>
      </section>
    </div>
  );
}