import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { parseArgs } from 'node:util';

const dataFile = new URL('../src/data/projects.json', import.meta.url);
const usage = 'npm run project:verify -- <id> --demo <https-url> --verification "Checks actually completed" [--note "Limits"] [--label "Build checked"] [--demo-label "Live sign-in page"]';

// This records a maintainer's evidence. It does not run the project's checks.
export function verifyProject(projects, id, options, date = new Date().toISOString().slice(0, 10)) {
  if (!Array.isArray(projects)) throw new Error('Projects must be an array.');
  if (projects.filter((project) => project.id === id).length !== 1) throw new Error(`Unknown or duplicate project ID: ${id}`);
  if (typeof options.verification !== 'string' || !options.verification.trim()) throw new Error('--verification must describe checks you completed.');
  const demo = new URL(options.demo);
  if (demo.protocol !== 'https:' || demo.username || demo.password) throw new Error('Demo must be an HTTPS URL without credentials.');
  if (/superbuilders|ctm-system|witness-lexington/i.test(decodeURIComponent(demo.href))) throw new Error('Contract and private project links are prohibited.');
  for (const field of ['note', 'label', 'demo-label']) {
    if (options[field] !== undefined && !options[field].trim()) throw new Error(`--${field} must not be empty.`);
  }
  return projects.map((project) => project.id !== id ? project : {
    ...project,
    status: 'verified',
    statusLabel: options.label ?? 'Checks recorded',
    demo: demo.href,
    demoLabel: options['demo-label'] ?? (project.demo && new URL(project.demo).href === demo.href ? project.demoLabel : undefined) ?? 'View demo',
    verification: options.verification.trim(),
    verificationDate: date,
    verificationNote: options.note?.trim() ?? options.verification.trim(),
    notes: `${project.notes}\nMaintainer verification recorded ${date}: ${options.verification.trim()}${options.note ? ` Limits: ${options.note.trim()}` : ''}`,
  });
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  try {
    const { values, positionals } = parseArgs({
      allowPositionals: true,
      options: Object.fromEntries(['demo', 'verification', 'note', 'label', 'demo-label'].map((name) => [name, { type: 'string' }])),
    });
    if (positionals.length !== 1 || !values.demo) throw new Error(usage);
    const projects = JSON.parse(readFileSync(dataFile, 'utf8'));
    const updated = verifyProject(projects, positionals[0], values);
    writeFileSync(dataFile, `${JSON.stringify(updated, null, 2)}\n`);
    console.log(`Recorded verification for ${positionals[0]}. No remote checks were run. Run npm test and npm run build, then inspect the pages.`);
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
