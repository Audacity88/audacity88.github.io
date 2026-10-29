# Dan Gilles's portfolio

Static Astro site with TypeScript and plain CSS. Content approval and verification are still in progress. See [pass notes](PASS_NOTES.md) for validation limits and [data editing instructions](src/data/README.md) for content changes.

## Run locally

Use a Node version supported by the installed Astro release, then run these commands in this directory:

```sh
npm install
npm run dev
```

The default local URL is `http://localhost:4321/portfolio/`.

## Build locally

```sh
npm run build
npm run preview
```

`build` checks Astro and TypeScript, validates the content data, and generates static files in `dist/`.

## Change the base path

`astro.config.mjs` sets the site origin to `https://audacity88.github.io` and defaults to `/portfolio/`. To build for the root instead, run:

```sh
PUBLIC_BASE_PATH=/ npm run build
```

Use the same environment variable for `dev` and `preview` when changing the base. Internal assets and the optional resume link use Astro's base URL. No deployment or GitHub Pages workflow is configured.

## Add the resume

Place an approved PDF at `public/resume.pdf`, then rebuild. The hero renders the resume link only when that file exists at build time.
