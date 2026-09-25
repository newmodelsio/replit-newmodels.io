import { useState } from 'react';

export interface EditorialBlockData {
  id?: string;
  type?: string;
  title?: string;
  description?: string;
  text?: string;
  url?: string;
  link?: string;
  src?: string;
  alt?: string;
  caption?: string;
  iframe?: string;
  thumbnail?: string;
  modifiers?: string;
  posts?: EditorialBlockData[];
}

function modifierClasses(modifiers?: string) {
  if (!modifiers) return '';

  return modifiers
    .split(/\s+/)
    .filter(Boolean)
    .map((modifier) => {
      if (modifier === 'red') return 'text-[#ff0000]';
      if (modifier === 'yellow') return 'inline bg-[#ffff00] py-[3px]';
      return modifier;
    })
    .join(' ');
}

export function EditorialPost({ block }: { block: EditorialBlockData }) {
  const postText = (block.text ?? '').replace('<br>', '');

  return (
    <div className="hover:underline">
      <a
        href={block.url ?? '#'}
        target="_blank"
        rel="noopener noreferrer"
        className={modifierClasses(block.modifiers)}
      >
        {block.thumbnail ? (
          <div className="mb-1 aspect-square w-[125px] bg-muted">
            <img
              src={block.thumbnail}
              className="h-full w-full object-cover opacity-0 transition-opacity"
              onLoad={(event) => event.currentTarget.classList.remove('opacity-0')}
              alt={block.alt ?? ''}
            />
          </div>
        ) : null}
        <div dangerouslySetInnerHTML={{ __html: postText }} />
      </a>
    </div>
  );
}

export function EditorialSection({
  section,
}: {
  section: EditorialBlockData;
}) {
  const [offset, setOffset] = useState(3);
  const posts = section.posts ?? [];
  const hasMore = posts.length > 3;
  const canExpand = posts.length - offset > 0;

  return (
    <section className="section flex flex-col gap-5 border-b pb-5">
      {section.title ? (
        <div>
          <h3 className="font-bold uppercase">{section.title}</h3>
          {section.description ? (
            <div
              className="leading-snug text-muted-foreground"
              dangerouslySetInnerHTML={{ __html: section.description }}
            />
          ) : null}
        </div>
      ) : null}

      {section.posts ? (
        <>
          {posts.slice(0, offset).map((block, index) => (
            <EditorialBlock
              key={block.id ?? `${block.type ?? 'block'}-${index}`}
              block={block}
            />
          ))}
          {hasMore ? (
            <div className="flex justify-end">
              {canExpand ? (
                <button
                  type="button"
                  className="flex cursor-pointer items-center text-[10px] uppercase text-foreground"
                  aria-expanded={offset > 3}
                  onClick={() => setOffset(offset + 10)}
                >
                  View More
                  <span className="ml-2 flex items-center justify-center rounded-full bg-primary px-1 pl-[5px] font-bold text-primary-foreground">
                    {posts.length - offset}+
                  </span>
                </button>
              ) : (
                <button
                  type="button"
                  className="cursor-pointer text-[10px] uppercase text-foreground"
                  aria-expanded="true"
                  onClick={() => setOffset(3)}
                >
                  Hide
                </button>
              )}
            </div>
          ) : null}
        </>
      ) : null}
    </section>
  );
}

export function EditorialBlock({ block }: { block: EditorialBlockData }) {
  switch (block.type) {
    case 'section':
      return <EditorialSection section={block} />;
    case 'text':
      return (
        <div
          className={`${modifierClasses(block.modifiers)} leading-[1.55]`}
          dangerouslySetInnerHTML={{ __html: block.text ?? '' }}
        />
      );
    case 'image': {
      const image = (
        <img className="w-full" src={block.src ?? ''} alt={block.alt ?? ''} />
      );
      return (
        <div className="flex flex-wrap">
          {block.link ? (
            <a href={block.link} target="_blank" rel="noopener noreferrer">
              {image}
            </a>
          ) : (
            image
          )}
          {block.caption ? (
            <div
              className="my-2 text-xs"
              dangerouslySetInnerHTML={{ __html: block.caption }}
            />
          ) : null}
        </div>
      );
    }
    case 'post':
      return <EditorialPost block={block} />;
    case 'hr':
      return <hr className="border-0 border-t" />;
    case 'heading':
      return (
        <div
          className="mb-5 text-center text-4xl font-bold leading-tight tracking-[-0.01em] text-[#ff0000]"
          dangerouslySetInnerHTML={{ __html: block.text ?? '' }}
        />
      );
    case 'embed':
      return (
        <div>
          <div dangerouslySetInnerHTML={{ __html: block.iframe ?? '' }} />
        </div>
      );
    case 'quote':
      return (
        <div
          className="p-10"
          dangerouslySetInnerHTML={{ __html: block.text ?? '' }}
        />
      );
    default:
      return null;
  }
}