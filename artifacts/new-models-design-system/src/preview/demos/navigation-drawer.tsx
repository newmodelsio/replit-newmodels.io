import { NavigationDrawer } from '../../components/ui/navigation-drawer';
import { Guidelines } from '../parts';
import { sampleAbout } from '../samples';

export function NavigationDrawerDemo() {
  return (
    <div className="space-y-6">
      <section className="relative min-h-[20rem] overflow-hidden rounded border bg-card p-6 text-card-foreground">
        <p className="text-xs uppercase text-muted-foreground">
          Fixed, right-aligned drawer
        </p>
        <p className="mt-3 max-w-md text-sm leading-relaxed">
          Use the three-dot control in the upper-right corner to open the
          navigation panel. Click the dimmed overlay or the close control to
          dismiss it.
        </p>
        <NavigationDrawer data={{ about: sampleAbout }} />
      </section>
      <Guidelines
        items={[
          {
            kind: 'do',
            text: 'Keep the drawer content column narrow and use the editorial block system inside it.',
          },
          {
            kind: 'do',
            text: 'Provide an explicit close control and a dimmed backdrop.',
          },
          {
            kind: 'dont',
            text: 'Use the drawer for dense primary navigation; the source pattern is a compact about panel.',
          },
        ]}
      />
    </div>
  );
}