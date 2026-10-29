import { defineConfig } from 'astro/config';

// Set PUBLIC_BASE_PATH=/ to build for audacity88.github.io at the root.
const base = process.env.PUBLIC_BASE_PATH || '/portfolio/';

export default defineConfig({
  site: process.env.PUBLIC_SITE_URL || 'https://audacity88.github.io',
  base,
  output: 'static',
  trailingSlash: 'always',
  build: { inlineStylesheets: 'always' },
});
