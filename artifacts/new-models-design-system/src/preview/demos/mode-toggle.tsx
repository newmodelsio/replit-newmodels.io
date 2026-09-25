import { useState } from 'react';
import { ModeToggle } from '../../components/ui/mode-toggle';
import { Guidelines } from '../parts';

export function ModeToggleDemo() {
  const [mode, setMode] = useState('Clear');

  return (
    <div className="space-y-6">
      <section className="rounded border bg-card p-6 text-card-foreground">
        <p className="mb-2 text-xs uppercase text-muted-foreground">
          Current view
        </p>
        <p className="mb-3 text-lg font-bold">{mode}</p>
        <ModeToggle toggle={mode} setToggle={setMode} />
      </section>
      <Guidelines
        items={[
          {
            kind: 'do',
            text: 'Keep the three view labels short and let the selected pill carry the emphasis.',
          },
          {
            kind: 'dont',
            text: 'Use the product view toggle as a substitute for the separate light/dark theme setting.',
          },
        ]}
      />
    </div>
  );
}