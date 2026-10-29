import { execFile } from 'node:child_process';
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';

// Chrome uses installed system fonts. No network, API, or image service is needed.
const chrome = process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const temporary = await mkdtemp(join(tmpdir(), 'portfolio-og-'));
try {
  const screenshot = join(temporary, 'card.png');
  await promisify(execFile)(chrome, [
    '--headless=new', '--no-first-run', '--no-default-browser-check', '--disable-extensions',
    `--user-data-dir=${join(temporary, 'profile')}`, '--hide-scrollbars',
    '--force-device-scale-factor=1', '--window-size=1200,630',
    `--screenshot=${screenshot}`, new URL('../public/og-card.svg', import.meta.url).href,
  ], { timeout: 30_000 });
  const target = fileURLToPath(new URL('../public/og-card.png', import.meta.url));
  await writeFile(target, await readFile(screenshot));
  console.log(`Wrote ${target}`);
} finally {
  await rm(temporary, { recursive: true, force: true });
}
