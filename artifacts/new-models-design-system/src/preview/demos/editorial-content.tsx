import { EditorialBlock } from '../../components/ui/editorial-content';
import { Guidelines, Stack } from '../parts';
import { sampleEditorialSection } from '../samples';

export function EditorialContentDemo() {
  return (
    <div className="space-y-8">
      <section className="rounded border bg-card p-5 text-card-foreground">
        <Stack label="Section and post blocks">
          <EditorialBlock block={sampleEditorialSection} />
        </Stack>
      </section>

      <section className="rounded border bg-card p-5 text-card-foreground">
        <Stack label="Other content types">
          <EditorialBlock
            block={{
              type: 'heading',
              text: 'A clear point of view',
            }}
          />
          <EditorialBlock
            block={{
              type: 'text',
              modifiers: 'yellow',
              text: 'A short highlighted block can add emphasis.',
            }}
          />
          <EditorialBlock
            block={{
              type: 'quote',
              text: '<blockquote>“Good ideas become clearer when there is room around them.”</blockquote>',
            }}
          />
          <EditorialBlock block={{ type: 'hr' }} />
          <EditorialBlock
            block={{
              type: 'image',
              src: 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 800 240%22%3E%3Crect width=%22800%22 height=%22240%22 fill=%22%23f4f4f5%22/%3E%3Cpath d=%22M0 190 180 50l110 90 105-65 160 115 95-60 150 110H0z%22 fill=%22%23d4d4d8%22/%3E%3C/svg%3E',
              alt: 'Abstract landscape used as an editorial image example',
              caption: 'Image blocks sit flush with the content column.',
            }}
          />
        </Stack>
      </section>

      <section className="rounded border bg-card p-5 text-card-foreground">
        <h2 className="mb-3 text-sm font-bold uppercase">Usage</h2>
        <Guidelines
          items={[
            {
              kind: 'do',
              text: 'Use uppercase section labels and thin rules to organize long editorial pages.',
            },
            {
              kind: 'do',
              text: 'Keep thumbnail crops square and let text remain the primary content.',
            },
            {
              kind: 'dont',
              text: 'Use untrusted HTML in text, captions, descriptions, or embeds; sanitize it before rendering.',
            },
          ]}
        />
      </section>
    </div>
  );
}