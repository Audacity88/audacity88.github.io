import { defineConfig } from 'astro/config';

// The site serves at the root of audacity88.github.io. Set PUBLIC_BASE_PATH for a subpath build.
const base = process.env.PUBLIC_BASE_PATH || '/';

export default defineConfig({
  site: process.env.PUBLIC_SITE_URL || 'https://audacity88.github.io',
  base,
  output: 'static',
  trailingSlash: 'always',
  build: { inlineStylesheets: 'always' },
});
