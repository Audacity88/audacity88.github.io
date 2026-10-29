import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { checkSite } from '../scripts/check-links.mjs';

test('built links resolve for root and subpath sites, including 404, assets, and fragments', (t) => {
  for (const base of ['/', '/portfolio/']) {
    const root = mkdtempSync(join(tmpdir(), 'portfolio-links-'));
    t.after(() => rmSync(root, { recursive: true, force: true }));
    const write = (name, text) => writeFileSync(join(root, name), text);
    const site = `https://example.com${base}`;
    write('index.html', `<link rel="canonical" href="${site}"><main id="main"><a href="${base}projects/example/">Project</a><img src="${base}favicon.svg"></main>`);
    mkdirSync(join(root, 'projects/example'), { recursive: true });
    write('projects/example/index.html', `<a href="${base}#main">Home</a><a href="../../#main">Relative home</a><a href="https://external.example/">External</a>`);
    write('404.html', `<a href="${base}#main">Return home</a>`);
    write('favicon.svg', '<svg/>');
    write('sitemap.xml', `<loc>${site}</loc><loc>${site}projects/example/</loc>`);
    write('site.webmanifest', JSON.stringify({ id: base, scope: base, start_url: base, icons: [{ src: `${base}favicon.svg` }] }));
    assert.equal(checkSite(root).pages, 3);
    for (const href of [`${base}missing/`, `${base}#missing`, '/wrong-base/', `${base}missing.svg`]) {
      write('404.html', `<a href="${href}">Broken</a>`);
      assert.throws(() => checkSite(root), /Broken built-site references/);
    }
    write('404.html', `<img src="${base}favicon.svg" srcset="${base}favicon.svg 360w, ${base}missing.webp 720w">`);
    assert.throws(() => checkSite(root), /Broken built-site references:[\s\S]*missing\.webp/);
    write('404.html', `<img src="${base}favicon.svg" srcset="${base}favicon.svg 360w, ${base}favicon.svg 720w">`);
    assert.equal(checkSite(root).pages, 3);
    write('site.webmanifest', JSON.stringify({ id: base, scope: base, start_url: '/wrong-base/', icons: [{ src: `${base}missing.svg` }] }));
    assert.throws(() => checkSite(root), /start_url must equal built base[\s\S]*missing\.svg/);
  }
});
