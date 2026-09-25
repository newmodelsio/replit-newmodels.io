import type {
  ArchiveSearchData,
} from '../components/ui/archive-search';
import type { EditorialBlockData } from '../components/ui/editorial-content';

const titles = [
  'A field note on public space',
  'An interview about independent publishing',
  'The quiet architecture of everyday life',
  'On collecting images and memories',
  'A conversation about making things slowly',
  'Notes from a changing city',
  'The culture of looking closer',
  'An archive of small gestures',
  'A studio visit about process',
  'The value of an unfinished idea',
  'A short history of shared spaces',
  'The people behind the print',
];

export const sampleArchive: ArchiveSearchData = {
  archive: titles.map((title, index) => ({
    link: `#archive-item-${index + 1}`,
    published: `${2025 - Math.floor(index / 4)}-${String((index % 12) + 1).padStart(2, '0')}-12`,
    tags: index % 2 === 0 ? 'research, culture' : 'research, process',
    title,
    type: ['video', 'audio', 'essay'][index % 3],
  })),
};

export const sampleEditorialSection: EditorialBlockData = {
  id: 'editorial-featured',
  type: 'section',
  title: 'Selected stories',
  description: 'Ideas, people, and places shaping contemporary culture.',
  posts: titles.slice(0, 5).map((text, index) => ({
    id: `editorial-post-${index + 1}`,
    type: 'post',
    url: `#editorial-post-${index + 1}`,
    text,
    modifiers: index === 1 ? 'yellow' : '',
    thumbnail:
      index === 0
        ? 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 250 250%22%3E%3Crect width=%22250%22 height=%22250%22 fill=%22%23e5e7eb%22/%3E%3Cpath d=%22M0 190 90 80l60 70 35-40 65 80v60H0z%22 fill=%22%239ca3af%22/%3E%3C/svg%3E'
        : undefined,
  })),
};

export const sampleAbout: EditorialBlockData[] = [
  {
    id: 'about-title',
    type: 'heading',
    text: 'New Models',
  },
  {
    id: 'about-copy',
    type: 'text',
    text: 'An independent platform for ideas, people, and creative work.',
  },
  {
    id: 'about-link',
    type: 'post',
    url: '#about-archive',
    text: 'Explore the archive',
  },
];