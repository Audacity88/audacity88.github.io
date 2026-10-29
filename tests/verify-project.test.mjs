import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { verifyProject } from '../scripts/verify-project.mjs';

const projects = JSON.parse(readFileSync(new URL('../src/data/projects.json', import.meta.url), 'utf8'));

test('verification helper requires evidence and safe URLs before changing project data', () => {
  const original = structuredClone(projects);
  const valid = { demo: 'https://example.com/demo', verification: 'Simulator build and demo flow checked.' };
  for (const options of [
    { ...valid, verification: '' }, { ...valid, verification: undefined },
    { ...valid, demo: 'http://example.com' }, { ...valid, demo: 'https://secret@example.com' },
    { ...valid, demo: 'https://example.com/%73uperbuilders' },
    { ...valid, demo: 'https://superbuilders.example' }, { ...valid, label: ' ' },
  ]) assert.throws(() => verifyProject(projects, 'tono4', options));
  assert.throws(() => verifyProject(projects, 'missing', valid));
  assert.throws(() => verifyProject(projects, 'model-picker', valid), /must remain local only/);
  const hidden = [{ id: 'fixture-private', hidden: true, status: 'draft' }];
  assert.throws(() => verifyProject(hidden, 'fixture-private', valid), /Hidden projects cannot be verified/);
  assert.deepEqual(projects, original);
  const updated = verifyProject(projects, 'tono4', { ...valid, note: 'Device behavior remains unchecked.', label: 'Build checked' }, '2026-10-30');
  const target = updated.find((project) => project.id === 'tono4');
  assert.equal(target.status, 'verified');
  assert.equal(target.demo, valid.demo);
  assert.equal(target.verification, valid.verification);
  assert.equal(target.verificationNote, 'Device behavior remains unchecked.');
  assert.equal(target.verificationDate, '2026-10-30');
  assert.equal(target.statusLabel, 'Build checked');
  assert.match(target.notes, /Maintainer verification recorded 2026-10-30/);
  assert.deepEqual(updated.filter((project) => project.id !== 'tono4'), projects.filter((project) => project.id !== 'tono4'));
  assert.deepEqual(projects, original, 'Input data must stay unchanged');
  const signIn = projects.find((project) => project.id === 'swift-ship');
  const preserved = verifyProject(projects, signIn.id, { ...valid, demo: signIn.demo }).find((project) => project.id === signIn.id);
  assert.equal(preserved.demoLabel, 'Live sign-in page');
});
