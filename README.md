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

## Configure site URLs

`PUBLIC_SITE_URL` sets the site origin, defaulting to `https://audacity88.github.io`. `PUBLIC_BASE_PATH` sets the path, defaulting to `/portfolio/`. To build for the root instead, run:

```sh
PUBLIC_BASE_PATH=/ npm run build
```

Use the same environment variable for `dev` and `preview` when changing the base. Internal assets and the optional resume link use Astro's base URL. No deployment or GitHub Pages workflow is configured.

Canonical URLs, Open Graph and Twitter image URLs, `sitemap.xml`, and `robots.txt` use these settings. The sitemap lists only the home page. The custom `404.html` has `noindex` and links back to the portfolio.

Search engines read `robots.txt` at the origin root. A root build includes it there. A subpath build includes it under that path; before any approved publication, the host's root `robots.txt` must point to the subpath sitemap. The host must also serve `404.html` for missing pages with HTTP status 404.

Styles are inlined at build time to avoid a blocking stylesheet request. System fonts need no downloads. The only browser JavaScript restores and cycles the theme. Navigation works without JavaScript.

`public/og-card.png` is a text-only social card made from `public/og-card.svg`, not a project screenshot. If the SVG copy changes, run `npm run generate:og` before rebuilding. This uses installed Google Chrome on macOS; set `CHROME_PATH` to use another Chrome executable. The PNG is 1200 × 630 and is metadata-only, so it does not load during a normal page visit.

## Add the resume

Place an approved PDF at `public/resume.pdf`, then rebuild. The hero renders the resume link only when that file exists at build time.
