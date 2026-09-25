import { useMemo, useState } from 'react';

export interface ArchiveEntry {
  link: string;
  published: string;
  tags: string;
  title: string;
  type?: string;
}

export interface ArchiveSearchData {
  archive: ArchiveEntry[];
}

type FilterField = 'published' | 'tags' | 'type';
type FilterOption = { slug: string; text: string };

function ArchiveFilter({
  allResults,
  filterByYear,
  filterByCategory,
  filterByType,
  handleChange,
  input,
  activeFilter,
}: {
  allResults: ArchiveEntry[];
  filterByYear: FilterOption[];
  filterByCategory: FilterOption[];
  filterByType: FilterOption[];
  handleChange: (key: FilterField, value: string) => void;
  input: string;
  activeFilter: { key: FilterField; value: string } | null;
}) {
  function countItems(key: FilterField, value: string) {
    return allResults.filter((item) => {
      return (
        item[key]?.toLowerCase().includes(value.toLowerCase()) &&
        item.title.toLowerCase().includes(input.toLowerCase())
      );
    }).length;
  }

  function optionsFor(
    title: string,
    key: FilterField,
    options: FilterOption[],
  ) {
    return (
      <div className="flex flex-col p-5">
        <h3 className="mb-1 font-bold">{title}</h3>
        {options.map((item) => {
          const selected =
            activeFilter?.key === key && activeFilter.value === item.slug;
          return (
            <button
              key={item.slug}
              type="button"
              aria-pressed={selected}
              className="flex w-fit gap-[4px] text-left hover:underline aria-pressed:font-bold"
              onClick={() => handleChange(key, item.slug)}
            >
              <span>{item.text}</span>
              <span>({countItems(key, item.slug)})</span>
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div className="grid w-full grid-cols-1 divide-y border-b uppercase text-sm md:grid-cols-3 md:divide-x md:divide-y-0">
      {optionsFor('Year', 'published', filterByYear)}
      {optionsFor('Category', 'tags', filterByCategory)}
      <div className="flex flex-col p-5">
        <h3 className="mb-1 font-bold">Type</h3>
        <button
          type="button"
          aria-pressed={!activeFilter}
          className="flex w-fit gap-[4px] text-left hover:underline aria-pressed:font-bold"
          onClick={() => handleChange('type', '')}
        >
          <span>All</span>
          <span>({countItems('type', '')})</span>
        </button>
        {filterByType.map((item) => {
          const selected =
            activeFilter?.key === 'type' && activeFilter.value === item.slug;
          return (
            <button
              key={item.slug}
              type="button"
              aria-pressed={selected}
              className="flex w-fit gap-[4px] text-left hover:underline aria-pressed:font-bold"
              onClick={() => handleChange('type', item.slug)}
            >
              <span>{item.text}</span>
              <span>({countItems('type', item.slug)})</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function ArchiveSearch({ data }: { data: ArchiveSearchData }) {
  const [input, setInput] = useState('');
  const [activeFilter, setActiveFilter] = useState<{
    key: FilterField;
    value: string;
  } | null>(null);
  const archive = data.archive;

  const filterByYear = useMemo(() => {
    const years = new Set(
      archive
        .map((item) => item.published.match(/^\d{4}/)?.[0])
        .filter((year): year is string => Boolean(year)),
    );
    return [...years]
      .sort((a, b) => b.localeCompare(a))
      .map((year) => ({ slug: year, text: year }));
  }, [archive]);

  const filterByCategory = useMemo(() => {
    const counts = new Map<string, number>();
    archive.forEach((item) => {
      item.tags.split(',').forEach((tag) => {
        const normalized = tag.trim();
        if (normalized) counts.set(normalized, (counts.get(normalized) ?? 0) + 1);
      });
    });
    return [...counts]
      .filter(([, count]) => count >= 10)
      .sort(([a, countA], [b, countB]) => countB - countA || a.localeCompare(b))
      .slice(0, 30)
      .map(([tag]) => ({ slug: tag, text: tag }));
  }, [archive]);

  const filterByType = useMemo(() => {
    const types = new Set(archive.map((item) => item.type).filter(Boolean));
    return [...types]
      .sort()
      .map((type) => ({ slug: type as string, text: type as string }));
  }, [archive]);

  const results = useMemo(
    () =>
      archive.filter((item) => {
        const matchesQuery = item.title
          .toLowerCase()
          .includes(input.toLowerCase());
        const matchesFacet =
          !activeFilter ||
          item[activeFilter.key]
            ?.toLowerCase()
            .includes(activeFilter.value.toLowerCase());
        return matchesQuery && matchesFacet;
      }),
    [activeFilter, archive, input],
  );

  function handleChange(key: FilterField, value: string) {
    setActiveFilter(value ? { key, value } : null);
  }

  return (
    <>
      <div className="w-full border-b">
        <div className="flex justify-center">
          <div className="flex w-full items-center px-5 md:w-1/3">
            <input
              className="w-full p-5 text-center text-sm uppercase outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
              type="search"
              value={input}
              aria-label="Search the New Models archive"
              placeholder="Search New Models"
              onChange={(event) => setInput(event.target.value)}
            />
            <svg
              aria-hidden="true"
              className="w-[20px] shrink-0 opacity-40"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16.5 11a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0Zm-.797 5.61a8 8 0 1 1 .948-1.163l5.331 4.479-.964 1.148-5.315-4.464Z"
              />
            </svg>
          </div>
        </div>
      </div>
      <ArchiveFilter
        allResults={archive}
        filterByYear={filterByYear}
        filterByCategory={filterByCategory}
        filterByType={filterByType}
        handleChange={handleChange}
        input={input}
        activeFilter={activeFilter}
      />
      <div className="min-h-screen columns-1 gap-5 p-5 md:columns-3">
        {results.length ? (
          results.map((result) => (
            <article
              key={result.link}
              className="mb-5 break-inside-avoid-column"
            >
              <a
                href={result.link}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                <div className="flex gap-2">
                  <div
                    className="text-xs"
                    dangerouslySetInnerHTML={{ __html: result.published }}
                  />
                  <div className="flex gap-2 text-xs uppercase">
                    {result.type?.includes('audio') ? <span>🎧</span> : null}
                    {result.type?.includes('video') ? <span>📹</span> : null}
                  </div>
                </div>
                <div dangerouslySetInnerHTML={{ __html: result.title }} />
              </a>
            </article>
          ))
        ) : (
          <p className="text-sm text-muted-foreground" role="status">
            No results found.
          </p>
        )}
      </div>
    </>
  );
}

export { ArchiveFilter };