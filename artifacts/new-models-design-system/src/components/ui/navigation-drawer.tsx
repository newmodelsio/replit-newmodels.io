import { useEffect, useRef, useState } from 'react';
import {
  EditorialBlock,
  type EditorialBlockData,
} from './editorial-content';

export function NavigationDrawer({
  data,
  inlineTrigger = false,
}: {
  data: { about: EditorialBlockData[] };
  inlineTrigger?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);

  useEffect(() => {
    if (isOpen) {
      wasOpen.current = true;
      closeRef.current?.focus();
      const closeOnEscape = (event: KeyboardEvent) => {
        if (event.key === 'Escape') setIsOpen(false);
      };
      window.addEventListener('keydown', closeOnEscape);
      return () => window.removeEventListener('keydown', closeOnEscape);
    }

    if (wasOpen.current) {
      wasOpen.current = false;
      triggerRef.current?.focus();
    }
  }, [isOpen]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className={`${inlineTrigger ? 'relative z-30' : 'fixed right-3 top-3 z-30 md:right-5 md:top-5'} rounded-full bg-secondary p-2 text-secondary-foreground`}
        aria-label={isOpen ? 'Close navigation' : 'Open navigation'}
        aria-expanded={isOpen}
        aria-controls="new-models-navigation-drawer"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <svg
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
            />
          </svg>
        )}
      </button>

      {isOpen ? (
        <>
          <button
            type="button"
            className="fixed inset-0 z-10 cursor-pointer bg-black/10"
            aria-label="Close navigation"
            onClick={() => setIsOpen(false)}
          />
          <aside
            id="new-models-navigation-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="About New Models"
            className="fixed right-0 top-0 z-20 flex h-screen w-full flex-col gap-5 overflow-y-auto border-l bg-background p-5 ease-in-out md:w-1/3 md:p-10"
          >
            <button
              ref={closeRef}
              type="button"
              className="sr-only focus:not-sr-only"
              onClick={() => setIsOpen(false)}
            >
              Close about panel
            </button>
            <div className="flex flex-col gap-5">
              {data.about.map((block, index) => (
                <EditorialBlock
                  key={block.id ?? `${block.type ?? 'block'}-${index}`}
                  block={block}
                />
              ))}
            </div>
          </aside>
        </>
      ) : null}
    </>
  );
}