import { readFileSync, readdirSync, statSync } from 'node:fs';
import { resolve, join, relative } from 'node:path';
import { pathToFileURL } from 'node:url';

const decode = (text) => text.replace(/&(#x[\da-f]+|#\d+|amp|quot|apos|lt|gt);/gi, (_, entity) => {
  if (entity.startsWith('#')) return String.fromCodePoint(parseInt(entity.slice(entity[1].toLowerCase() === 'x' ? 2 : 1), entity[1].toLowerCase() === 'x' ? 16 : 10));
  return { amp: '&', quot: '"', apos: "'", lt: '<', gt: '>' }[entity.toLowerCase()];
});

// The generated site uses static attributes. Ignore script/style text and comments.
function tags(html) {
  return [...html.replace(/<!--[\s\S]*?-->|<(script|style)\b[^>]*>[\s\S]*?<\/\1\s*>/gi, '').matchAll(/<[a-z][^>]*>/gi)].map(([tag]) => {
    const attributes = {};
    for (const [, name, double, single, bare] of tag.matchAll(/\s([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/g)) {
      attributes[name.toLowerCase()] = decode(double ?? single ?? bare);
    }
    return attributes;
  });
}

export function checkSite(directory = 'dist') {
  const root = resolve(directory);
  const pages = new Map();
  function walk(folder) {
    for (const entry of readdirSync(folder, { withFileTypes: true })) {
      const file = join(folder, entry.name);
      if (entry.isDirectory()) walk(file);
      else if (file.endsWith('.html')) pages.set(file, tags(readFileSync(file, 'utf8')));
    }
  }
  walk(root);
  const home = pages.get(join(root, 'index.html'));
  const canonical = home?.find((tag) => tag.rel === 'canonical')?.href;
  if (!canonical) throw new Error('Home page must have a canonical URL to identify the built origin and base path');
  const site = new URL(canonical);
  const base = site.pathname;
  const errors = [];
  let checked = 0;
  function check(value, from) {
    const label = `${relative(root, from)}: ${value}`;
    try {
      const pagePath = relative(root, from).split('\\').join('/').replace(/index\.html$/, '');
      const url = new URL(value, new URL(pagePath, site));
      if (url.origin !== site.origin) return; // External services are not project verification.
      checked++;
      if (!url.pathname.startsWith(base)) throw new Error(`outside base ${base}`);
      const pathname = decodeURIComponent(url.pathname.slice(base.length));
      let target = resolve(root, pathname || 'index.html');
      if (target !== root && !target.startsWith(`${root}/`)) throw new Error('outside dist');
      if (statSync(target).isDirectory()) target = join(target, 'index.html');
      if (!statSync(target).isFile()) throw new Error('not a file');
      if (url.hash && pages.has(target)) {
        const fragment = decodeURIComponent(url.hash.slice(1));
        if (!pages.get(target).some((tag) => tag.id === fragment || tag.name === fragment)) throw new Error(`missing fragment ${fragment}`);
      }
    } catch (error) { errors.push(`${label} (${error.message})`); }
  }
  for (const [file, attributes] of pages) {
    for (const tag of attributes) {
      for (const field of ['href', 'src']) if (field in tag) check(tag[field], file);
      if (tag.property === 'og:image' || tag.name === 'twitter:image') check(tag.content, file);
    }
  }
  const sitemap = join(root, 'sitemap.xml');
  for (const [, url] of readFileSync(sitemap, 'utf8').matchAll(/<loc>(.*?)<\/loc>/g)) check(decode(url), sitemap);
  const manifestFile = join(root, 'site.webmanifest');
  const manifest = JSON.parse(readFileSync(manifestFile, 'utf8'));
  for (const field of ['id', 'start_url', 'scope']) {
    if (manifest[field] !== base) errors.push(`site.webmanifest: ${field} must equal built base ${base}`);
    check(manifest[field], manifestFile);
  }
  for (const icon of manifest.icons ?? []) check(icon.src, manifestFile);
  if (errors.length) throw new Error(`Broken built-site references:\n${errors.join('\n')}`);
  return { pages: pages.size, references: checked, base };
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  try {
    const result = checkSite(process.argv[2]);
    console.log(`Checked ${result.references} local references across ${result.pages} HTML pages at ${result.base}`);
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
