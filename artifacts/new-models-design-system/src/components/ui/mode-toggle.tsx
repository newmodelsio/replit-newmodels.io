const MODES = ['Clear', 'Dark', 'Archive'] as const;

export function ModeToggle({
  toggle,
  setToggle,
}: {
  toggle: string;
  setToggle: (mode: string) => void;
}) {
  return (
    <div className="flex justify-center gap-5 p-5 pb-10 text-[11px] uppercase leading-none">
      <div
        className="flex cursor-pointer gap-3 rounded bg-secondary p-1"
        role="group"
        aria-label="Choose a New Models view"
      >
        {MODES.map((mode) => {
          const active = toggle === mode;
          return (
            <button
              key={mode}
              type="button"
              aria-pressed={active}
              className={`rounded px-4 py-3 transition-colors ${
                active
                  ? 'bg-background text-secondary-foreground shadow-sm'
                  : 'text-secondary-foreground'
              }`}
              onClick={() => setToggle(mode)}
            >
              {mode}
            </button>
          );
        })}
      </div>
    </div>
  );
}