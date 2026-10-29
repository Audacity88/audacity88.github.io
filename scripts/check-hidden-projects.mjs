import { readFileSync, readdirSync } from 'node:fs';
import { join, relative } from 'node:path';

// Check raw generated text too, so metadata, sitemaps, and serialized data cannot leak placeholders.
export function assertHiddenProjectsAbsent(directory, projects) {
  const hidden = projects.filter((project) => project.hidden === true);
  const markers = hidden.flatMap((project) => [project.id, project.title]).map((text) => text.toLowerCase());
  function inspect(folder) {
    for (const entry of readdirSync(folder, { withFileTypes: true })) {
      const file = join(folder, entry.name);
      const path = relative(directory, file).toLowerCase();
      if (markers.some((marker) => path.includes(marker))) throw new Error(`Hidden project path in output: ${path}`);
      if (entry.isDirectory()) inspect(file);
      else if (/\.(?:html|xml|json|webmanifest|svg|txt|js|css)$/i.test(entry.name)) {
        const text = readFileSync(file, 'utf8').toLowerCase();
        if (markers.some((marker) => text.includes(marker))) throw new Error(`Hidden project content in output: ${path}`);
      }
    }
  }
  inspect(directory);
}
