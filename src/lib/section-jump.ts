export const sections = [
  { id: 'projects', number: '01', label: 'selected work' },
  { id: 'open-source', number: '02', label: 'open source' },
  { id: 'experience', number: '03', label: 'experience' },
  { id: 'how-i-work', number: '04', label: 'workflow' },
  { id: 'about', number: '05', label: 'about' },
  { id: 'contact', number: '06', label: 'contact' },
] as const;

export type Section = (typeof sections)[number];

export function sectionLabel(section: Pick<Section, 'number' | 'label'>): string {
  return `${section.number} / ${section.label}`;
}

export function scrollBehavior(prefersReducedMotion: boolean): 'smooth' | 'auto' {
  return prefersReducedMotion ? 'auto' : 'smooth';
}

/** Arrow keys move through menu items. A negative index means focus is still on the chip. */
export function nextItemIndex(current: number, count: number, key: string): number {
  if (count < 1) return -1;
  if (key === 'ArrowDown') {
    if (current < 0 || current >= count - 1) return 0;
    return current + 1;
  }
  if (key === 'ArrowUp') {
    if (current <= 0) return count - 1;
    return current - 1;
  }
  return current;
}
