import { defineConfig } from 'astro/config';

// Set PUBLIC_BASE_PATH=/ to build for audacity88.github.io at the root.
const base = process.env.PUBLIC_BASE_PATH || '/portfolio/';

export default defineConfig({
  site: 'https://audacity88.github.io',
  base,
  output: 'static',
  trailingSlash: 'always',
});
