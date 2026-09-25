import { ArchiveSearch } from '../../components/ui/archive-search';
import { Guidelines } from '../parts';
import { sampleArchive } from '../samples';

export function ArchiveSearchDemo() {
  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded border bg-card text-card-foreground">
        <ArchiveSearch data={sampleArchive} />
      </section>
      <Guidelines
        items={[
          {
            kind: 'do',
            text: 'Place result counts beside filters so browsing stays quick.',
          },
          {
            kind: 'do',
            text: 'Keep the search field centered and use a three-column result layout on wide screens.',
          },
          {
            kind: 'dont',
            text: 'Hide the selected filter state; selection should remain visible and keyboard-operable.',
          },
        ]}
      />
    </div>
  );
}