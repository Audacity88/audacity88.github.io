import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, mkdtempSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { assertHiddenProjectsAbsent } from '../scripts/check-hidden-projects.mjs';

const directory = new URL('../src/data/', import.meta.url);
const read = (name) => JSON.parse(readFileSync(new URL(`${name}.json`, directory), 'utf8'));
const text = (value, label) => assert.ok(typeof value === 'string' && value.trim(), `${label} must be a nonempty string`);
const object = (value) => assert.ok(value && typeof value === 'object' && !Array.isArray(value), 'Expected an object');
const texts = (value, label) => {
  assert.ok(Array.isArray(value), `${label} must be an array`);
  value.forEach((item) => text(item, label));
};
const unique = (items, field) => assert.equal(new Set(items.map((item) => item[field])).size, items.length, `${field} must be unique`);
const excludedText = /ctm-system|cliktok/i;
const excludedProjectText = /superbuilders|ctm-system|cliktok/i;
const date = (value) => {
  assert.match(value, /^\d{4}-\d{2}-\d{2}$/);
  assert.equal(new Date(value).toISOString().slice(0, 10), value);
};
const github = (value) => {
  const url = new URL(value);
  assert.equal(url.protocol, 'https:');
  assert.equal(url.host, 'github.com');
  assert.equal(url.username + url.password, '');
  assert.match(url.pathname, /^\/[\w.-]+\/[\w.-]+(?:\/|$)/, 'GitHub links must identify a repository');
};

// Check links in every JSON field, including prose notes and future data files.
function checkLinks(value) {
  if (typeof value === 'string') {
    for (const link of value.matchAll(/https?:\/\/[^\s"<>]+/gi)) {
      const url = new URL(link[0]);
      assert.equal(url.protocol, 'https:', `Use HTTPS: ${link[0]}`);
      assert.equal(url.username + url.password, '', 'Do not embed credentials in URLs');
      const decoded = decodeURIComponent(url.href).toLowerCase();
      assert.doesNotMatch(decoded, excludedProjectText, 'Private and contract project links are prohibited');
    }
  } else if (value && typeof value === 'object') {
    Object.values(value).forEach(checkLinks);
  }
}

test('all data files parse and contain no prohibited links', () => {
  for (const name of readdirSync(directory).filter((name) => name.endsWith('.json'))) {
    checkLinks(JSON.parse(readFileSync(new URL(name, directory), 'utf8')));
  }
});

test('source files and pass notes retain the content exclusions', () => {
  const root = new URL('../', import.meta.url);
  const ignored = new Set(['.git', '.astro', 'node_modules', 'dist']);
  function inspect(directory) {
    for (const entry of readdirSync(directory, { withFileTypes: true })) {
      const file = new URL(entry.name, directory);
      if (entry.isDirectory()) {
        if (!ignored.has(entry.name)) inspect(new URL(`${entry.name}/`, directory));
      } else if (entry.isFile() && /\.(?:md|mjs|ts|json|astro|css|yml|yaml|svg|txt)$/.test(entry.name)
        && file.href !== import.meta.url && entry.name !== 'package-lock.json') {
        const content = file.href === new URL('projects.json', directory).href
          ? JSON.stringify(read('projects').filter((project) => project.hidden !== true))
          : readFileSync(file, 'utf8');
        assert.doesNotMatch(content, excludedText, `Excluded content in ${file.pathname}`);
      }
    }
  }
  inspect(root);
});

test('projects have complete cards and detail pages with valid states and URLs', () => {
  const allProjects = read('projects');
  assert.ok(Array.isArray(allProjects) && allProjects.length);
  unique(allProjects, 'id');
  assert.ok(allProjects.every((project) => project.hidden !== true), 'The locked list contains only visible projects');
  const projects = allProjects.filter((project) => project.hidden !== true);
  assert.deepEqual(projects.map((project) => project.id), ['eyrie', 'swift-ship', 'witness-lexington', 'model-picker', 'codex-video-vision', 'codex-skills', 'chatgenius', 'tono4']);
  assert.deepEqual([...projects].sort((a, b) => a.order - b.order).map((project) => project.id), projects.map((project) => project.id), 'Rendered order must match the locked list');
  unique(projects, 'order');
  for (const project of projects) {
    object(project);
    for (const field of ['id', 'title', 'oneLiner', 'description', 'verification', 'verificationNote', 'notes']) text(project[field], field);
    object(project.caseStudy);
    for (const field of ['problem', 'built', 'architecture', 'limitations']) text(project.caseStudy[field], `case study ${field}`);
    texts(project.caseStudy.sourceNotes, 'case study sources');
    assert.ok(project.caseStudy.sourceNotes.length, 'Case studies need source provenance');
    date(project.verificationDate);
    for (const field of ['statusLabel', 'demoLabel']) if (project[field] !== undefined) text(project[field], field);
    if (project.demoLabel !== undefined) assert.notEqual(project.demo, null);
    assert.match(project.id, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    assert.doesNotMatch(JSON.stringify(project), excludedProjectText, 'Project IDs and all project text must respect exclusions');
    texts(project.tech, 'tech');
    assert.ok(project.tech.length);
    if (project.id === 'model-picker') assert.equal(project.github, null, 'Model Picker code is local only; no repo link');
    else github(project.github);
    assert.ok(['pending-verification', 'verified', 'demo-down'].includes(project.status));
    assert.equal(typeof project.featured, 'boolean');
    assert.ok(Number.isInteger(project.order) && project.order > 0);
    assert.ok(project.demo === null || typeof project.demo === 'string');
    if (project.demo !== null) assert.equal(new URL(project.demo).protocol, 'https:');
    if (project.status === 'demo-down') assert.equal(project.demo, null);
    {
      assert.ok(Array.isArray(project.images));
      for (const image of project.images) {
        assert.ok(Array.isArray(image.sources) && image.sources.length);
        unique(image.sources, 'width');
        for (const source of image.sources) {
          assert.ok(Number.isInteger(source.width) && source.width > 0 && source.width <= image.width);
        }
        for (const src of [image.src, ...image.sources.map((source) => source.src)]) {
          assert.match(src, /^\/(?!\/)/);
          assert.ok(!src.split('/').includes('..'), 'Image paths must stay within public/');
          assert.ok(statSync(new URL(`../public${src}`, import.meta.url)).isFile(), 'Image must exist');
        }
        text(image.alt, 'image alt');
        text(image.caption, 'image caption');
        for (const field of ['width', 'height']) assert.ok(Number.isInteger(image[field]) && image[field] > 0);
      }
    }
  }
});

test('generated-output guard rejects hidden titles, IDs, metadata, and routes', (t) => {
  const root = mkdtempSync(join(tmpdir(), 'portfolio-hidden-'));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  // Use a synthetic hidden record so the guard runs even when every real project is visible.
  const projects = [{ id: 'fixture-private', title: 'Private fixture', hidden: true, status: 'draft' }];
  for (const project of projects) {
    for (const [name, content] of [
      ['index.html', `<h1>${project.title}</h1>`],
      ['index.html', `<meta property="og:title" content="${project.title}">`],
      ['index.html', `<a href="/projects/${project.id}/">Project</a>`],
      ['sitemap.xml', `<loc>https://example.com/projects/${project.id}/</loc>`],
    ]) {
      const file = join(root, name);
      writeFileSync(file, content);
      assert.throws(() => assertHiddenProjectsAbsent(root, projects), /Hidden project/);
      rmSync(file);
    }
    const route = join(root, project.id);
    mkdirSync(route);
    assert.throws(() => assertHiddenProjectsAbsent(root, projects), /Hidden project path/);
    rmSync(route, { recursive: true });
  }
  writeFileSync(join(root, 'index.html'), '<h1>Selected work</h1>');
  assert.doesNotThrow(() => assertHiddenProjectsAbsent(root, projects));
});

test('built HTML and other generated text contain no hidden project titles or IDs', {
  skip: !existsSync(new URL('../dist/', import.meta.url)) && 'No build yet; every build also runs this guard through check:links',
}, () => {
  const root = fileURLToPath(new URL('../dist/', import.meta.url));
  assertHiddenProjectsAbsent(root, read('projects'));
  function inspect(folder) {
    for (const entry of readdirSync(folder, { withFileTypes: true })) {
      const path = join(folder, entry.name);
      if (entry.isDirectory()) inspect(path);
      else if (/\.(?:html|xml|json|webmanifest|svg|txt|js|css)$/i.test(entry.name)) {
        assert.doesNotMatch(readFileSync(path, 'utf8'), excludedText, 'Excluded content in generated output');
      }
    }
  }
  inspect(root);
});

test('experience retains its required fields and approval safeguards', () => {
  const experience = read('experience');
  object(experience);
  assert.equal(experience.reviewStatus, 'approved');
  text(experience.notes, 'experience notes');
  assert.ok(Array.isArray(experience.roles) && experience.roles.length);
  unique(experience.roles, 'id');
  for (const role of experience.roles) {
    object(role);
    for (const field of ['id', 'role', 'organization', 'period', 'summary']) text(role[field], field);
    assert.equal(typeof role.notes, 'string');
    if (role.needsDanOk !== undefined) assert.equal(typeof role.needsDanOk, 'boolean');
    if (role.id === 'superbuilders') {
      assert.equal(role.needsDanOk, false);
      assert.deepEqual(role.clients.map((client) => client.name), ['Bill of Rights Institute'], 'Only the approved client may be named');
      assert.ok(role.highlights.some((item) => item.includes('39 students')));
    }
    texts(role.highlights, 'highlights');
    assert.ok(Array.isArray(role.clients));
    for (const client of role.clients) {
      object(client);
      text(client.name, 'client name');
      text(client.publicFallback, 'client fallback');
      assert.equal(typeof client.needsDanOk, 'boolean');
      assert.doesNotMatch(client.publicFallback, /\[CLIENT:|needs Dan OK/i);
      if (client.name.includes('[CLIENT:')) assert.equal(client.needsDanOk, true);
    }
  }
});

test('built home and resume preserve experience copy and client approval fallbacks', {
  skip: !existsSync(new URL('../dist/', import.meta.url)) && 'No build yet',
}, () => {
  const experience = read('experience');
  for (const path of ['index.html', 'resume/index.html']) {
    const html = readFileSync(new URL(`../dist/${path}`, import.meta.url), 'utf8');
    assert.doesNotMatch(html, /\[CLIENT:|needs Dan OK/i, 'Never render approval placeholders');
    for (const role of experience.roles) {
      for (const value of [role.role, role.organization, role.period, role.summary, ...role.highlights]) {
        assert.ok(html.includes(value), `${path} must retain approved experience copy`);
      }
      for (const client of role.clients) {
        if (client.needsDanOk) {
          assert.ok(html.includes(client.publicFallback), `${path} must use the neutral client fallback`);
          const name = client.name.replace(/^\[CLIENT:\s*|,\s*needs Dan OK\]$/g, '');
          assert.ok(!html.includes(name), `${path} must not disclose a pending client name`);
        }
      }
    }
  }
});

test('open-source data uses the approved total and matching upstream PR links', () => {
  const source = read('opensource');
  assert.equal(source.repository, 'zeroclaw-labs/zeroclaw');
  assert.equal(source.url, `https://github.com/${source.repository}`);
  assert.equal(source.mergedList, `${source.url}/pulls?q=is%3Apr+author%3AAudacity88+is%3Amerged`);
  date(source.verifiedAsOf);
  object(source.count);
  assert.ok(Number.isInteger(source.count.value) && source.count.value >= 0);
  assert.equal(source.count.display, true);
  assert.equal(source.count.label, '750+ merged pull requests');
  text(source.count.notes, 'count notes');
  assert.ok(Array.isArray(source.pullRequests) && source.pullRequests.length);
  unique(source.pullRequests, 'number');
  for (const pr of source.pullRequests) {
    assert.ok(Number.isInteger(pr.number) && pr.number > 0);
    text(pr.title, 'PR title');
    text(pr.area, 'PR area');
    date(pr.mergedAt);
    assert.equal(pr.url, `${source.url}/pull/${pr.number}`);
    if (pr.summary !== undefined) text(pr.summary, 'PR explanation');
  }
});

test('Model Picker and Witness Lexington stay neutral', () => {
  const projects = read('projects');
  for (const id of ['model-picker', 'witness-lexington']) {
    const project = projects.find((item) => item.id === id);
    assert.ok(project && project.hidden !== true, `${id} must be visible`);
    assert.doesNotMatch(JSON.stringify(project), /superbuilders|teammate|bill of rights|[\u201c\u201d]/i);
  }
  const picker = projects.find((item) => item.id === 'model-picker');
  assert.equal(picker.github, null);
  assert.equal(picker.demo, null);
  assert.doesNotMatch(JSON.stringify(picker), /https?:\/\//i, 'No repository or demo links embedded in Model Picker copy');
});

test('built pages retain the locked project list, evidence, attribution, and approved total', {
  skip: !existsSync(new URL('../dist/', import.meta.url)) && 'No build yet',
}, () => {
  const root = new URL('../dist/', import.meta.url);
  const projects = read('projects');
  const source = read('opensource');
  const home = readFileSync(new URL('index.html', root), 'utf8');
  const base = new URL(home.match(/<link rel="canonical" href="([^"]+)"/)[1]);
  const sitemap = readFileSync(new URL('sitemap.xml', root), 'utf8');
  const expectedIds = projects.map((project) => project.id);
  assert.deepEqual([...home.matchAll(/data-project="([^"]+)"/g)].map((match) => match[1]), expectedIds);
  assert.deepEqual(readdirSync(new URL('projects/', root)).sort(), [...expectedIds].sort());
  assert.deepEqual([...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]),
    ['', 'resume/', ...expectedIds.map((id) => `projects/${id}/`)].map((path) => new URL(path, base).href));
  const escape = (text) => text.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#39;');
  for (const project of projects) {
    const html = readFileSync(new URL(`projects/${project.id}/index.html`, root), 'utf8');
    assert.ok(home.includes(escape(project.verification)), `${project.id} card must retain its evidence`);
    for (const claim of [project.verification, project.verificationNote, project.caseStudy.limitations]) {
      assert.ok(html.includes(escape(claim)), `${project.id} must retain its evidence and limits`);
    }
    assert.ok(html.includes(`data-status="${project.status}"`));
    if (project.status === 'pending-verification') assert.ok(html.includes('Verifying'));
    const links = [...html.matchAll(/<a\b[^>]*href="([^"]+)"/g)].map((match) => match[1]);
    if (project.demo) assert.ok(links.includes(escape(project.demo)));
    else assert.ok(!html.includes('View demo'), `${project.id} must hide a null demo`);
    if (!project.github && !project.demo) {
      assert.ok(!html.includes('id="links-title"'), 'Do not render an empty Links section');
      assert.ok(!html.includes('class="project-links"'), 'Do not render empty project links');
    }
    for (const note of [project.notes, ...project.caseStudy.sourceNotes]) {
      assert.ok(!html.includes(escape(note)), 'Internal source notes must stay out of generated pages');
    }
  }
  const portLabel = 'credited port of an MIT-licensed project';
  assert.ok(home.includes(portLabel));
  assert.ok(readFileSync(new URL('projects/codex-video-vision/index.html', root), 'utf8').includes(portLabel));
  function inspect(folder) {
    for (const entry of readdirSync(folder, { withFileTypes: true })) {
      const file = new URL(entry.name, folder);
      if (entry.isDirectory()) inspect(new URL(`${entry.name}/`, folder));
      else if (/\.(?:html|xml|json|webmanifest|svg|txt|js|css)$/i.test(entry.name)) {
        const content = readFileSync(file, 'utf8');
        assert.doesNotMatch(content, new RegExp(`\\b${source.count.value}\\b`), 'Do not render the internal PR total');
        assert.doesNotMatch(content, /\/Users\/|\[CLIENT:|needs Dan OK/i, 'No local source paths or approval placeholders');
        for (const match of content.matchAll(/\b[\d,]+\+?\s+merged\s+(?:pull requests|PRs)\b/gi)) {
          assert.equal(match[0], source.count.label, 'Only the approved total label may appear');
        }
        if (content.includes(source.count.label)) {
          const totalLinks = [...content.matchAll(/<a\b[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g)]
            .filter(([, , label]) => label.includes(source.count.label));
          assert.equal(totalLinks.length, content.split(source.count.label).length - 1, 'Every total label must be a link');
          for (const [, href] of totalLinks) assert.equal(href, escape(source.mergedList), 'Total links must use the upstream search');
        }
      }
    }
  }
  inspect(root);
});
