import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { nextItemIndex, scrollBehavior, sectionLabel, sections } from '../src/lib/section-jump.ts';

const component = readFileSync(new URL('../src/components/SectionStatus.astro', import.meta.url), 'utf8');

test('section jump menu uses the six tracked home sections', () => {
  assert.deepEqual(sections.map((section) => section.id), [
    'projects',
    'open-source',
    'experience',
    'how-i-work',
    'about',
    'contact',
  ]);
  assert.deepEqual(sections.map(sectionLabel), [
    '01 / selected work',
    '02 / open source',
    '03 / experience',
    '04 / workflow',
    '05 / about',
    '06 / contact',
  ]);
  assert.match(component, /href = `#\$\{section\.id\}`/);
  assert.match(component, /sectionLabel\(section\)/);
});

test('section jump scroll is instant when reduced motion is requested', () => {
  assert.equal(scrollBehavior(true), 'auto');
  assert.equal(scrollBehavior(false), 'smooth');
  assert.match(component, /prefers-reduced-motion:\s*reduce/);
  assert.match(component, /scrollIntoView\(\{ behavior: scrollBehavior\(reduce\)/);
});

test('section jump arrow keys move between menu items and wrap', () => {
  assert.equal(nextItemIndex(-1, 6, 'ArrowDown'), 0);
  assert.equal(nextItemIndex(-1, 6, 'ArrowUp'), 5);
  assert.equal(nextItemIndex(0, 6, 'ArrowDown'), 1);
  assert.equal(nextItemIndex(5, 6, 'ArrowDown'), 0);
  assert.equal(nextItemIndex(0, 6, 'ArrowUp'), 5);
  assert.equal(nextItemIndex(3, 6, 'ArrowUp'), 2);
  assert.equal(nextItemIndex(2, 6, 'Escape'), 2);
  assert.match(component, /key === 'Escape'/);
  assert.match(component, /nextItemIndex\(/);
});

test('section status chip is a popup button without pointer-events none', () => {
  assert.match(component, /<button/);
  assert.match(component, /type="button"/);
  assert.match(component, /aria-haspopup="true"/);
  assert.match(component, /aria-expanded="false"/);
  assert.match(component, /aria-controls="section-status-menu"/);
  assert.match(component, /id="section-status-menu"/);
  assert.match(component, /aria-current/);
  assert.match(component, /setActiveSection\(sectionId\)/);
  assert.match(component, /cursor:\s*pointer/);
  assert.match(component, /:hover/);
  assert.match(component, /:focus-visible/);
  assert.doesNotMatch(component, /pointer-events:\s*none/);
});

test('built home page includes the section jump button', {
  skip: !existsSync(new URL('../dist/index.html', import.meta.url)) && 'No build yet',
}, () => {
  const home = readFileSync(new URL('../dist/index.html', import.meta.url), 'utf8');
  const chip = home.slice(home.indexOf('id="section-status"'), home.indexOf('id="projects"'));
  assert.match(chip, /id="section-status-toggle"/);
  assert.match(chip, /aria-haspopup="true"/);
  assert.match(chip, /aria-expanded="false"/);
  assert.match(chip, /aria-controls="section-status-menu"/);
  assert.match(chip, /id="section-status-menu"/);
  assert.match(chip, /Where I can help\./);
});
