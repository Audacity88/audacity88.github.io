import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, statSync } from 'node:fs';

const directory = new URL('../src/data/', import.meta.url);
const read = (name) => JSON.parse(readFileSync(new URL(`${name}.json`, directory), 'utf8'));
const text = (value, label) => assert.ok(typeof value === 'string' && value.trim(), `${label} must be a nonempty string`);
const object = (value) => assert.ok(value && typeof value === 'object' && !Array.isArray(value), 'Expected an object');
const texts = (value, label) => {
  assert.ok(Array.isArray(value), `${label} must be an array`);
  value.forEach((item) => text(item, label));
};
const unique = (items, field) => assert.equal(new Set(items.map((item) => item[field])).size, items.length, `${field} must be unique`);
const excludedText = /ctm-system|witness-lexington|picker/i;
const excludedProjectText = /superbuilders|ctm-system|witness-lexington|picker/i;
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
        assert.doesNotMatch(readFileSync(file, 'utf8'), excludedText, `Excluded content in ${file.pathname}`);
      }
    }
  }
  inspect(root);
});

test('projects have complete cards and detail pages with valid states and URLs', () => {
  const projects = read('projects');
  assert.ok(Array.isArray(projects) && projects.length);
  unique(projects, 'id');
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
    github(project.github);
    assert.ok(['pending-verification', 'verified', 'demo-down'].includes(project.status));
    assert.equal(typeof project.featured, 'boolean');
    assert.ok(Number.isInteger(project.order) && project.order > 0);
    assert.ok(project.demo === null || typeof project.demo === 'string');
    if (project.demo !== null) assert.equal(new URL(project.demo).protocol, 'https:');
    if (project.status === 'demo-down') assert.equal(project.demo, null);
    {
      assert.ok(Array.isArray(project.images));
      for (const image of project.images) {
        for (const field of ['src', 'srcSmall']) {
          assert.match(image[field], /^\/(?!\/)/);
          assert.ok(!image[field].split('/').includes('..'), 'Image paths must stay within public/');
          assert.ok(statSync(new URL(`../public${image[field]}`, import.meta.url)).isFile(), 'Image must exist');
        }
        text(image.alt, 'image alt');
        text(image.caption, 'image caption');
        for (const field of ['width', 'height']) assert.ok(Number.isInteger(image[field]) && image[field] > 0);
      }
    }
  }
});

test('experience retains its required fields and approval safeguards', () => {
  const experience = read('experience');
  object(experience);
  assert.equal(experience.reviewStatus, 'needs-dan-ok');
  text(experience.notes, 'experience notes');
  assert.ok(Array.isArray(experience.roles) && experience.roles.length);
  unique(experience.roles, 'id');
  for (const role of experience.roles) {
    object(role);
    for (const field of ['id', 'role', 'organization', 'period', 'summary']) text(role[field], field);
    assert.equal(typeof role.notes, 'string');
    if (role.needsDanOk !== undefined) assert.equal(typeof role.needsDanOk, 'boolean');
    if (role.id === 'superbuilders') assert.equal(role.needsDanOk, true);
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
  }
});
