# Dan Gilles's portfolio

Dan Gilles's personal portfolio for his job search, with selected projects, open-source contributions, experience, and contact links.

The site uses Astro, TypeScript, and plain CSS. Astro generates static HTML with inline styles, system fonts, and a small theme script. The theme follows the system preference unless the visitor saves an explicit choice. Navigation works without JavaScript. There is no server runtime or backend to configure.

Content approval and project verification are still in progress. GitHub Pages is not enabled as part of this work. See [pass notes](PASS_NOTES.md) for validation limits.

## Run locally

Use Node.js 24 and npm. CI uses Node 24 too. From the repository root, install the locked dependencies and start the development server:

```sh
npm ci
npm run dev
```

The default local URL is `http://localhost:4321/portfolio/`.

## Build locally

```sh
npm run build
npm run preview
```

`build` checks Astro and TypeScript, validates the content data, and generates static files in `dist/`.

## Edit content

Use `/Users/natalie/Development/portfolio-brief/facts.md` as the only source of biographical and experience facts. Preserve the supplied project seeds. Treat `triage.md` as untested context. See the [data guide](src/data/README.md) for the full editing rules.

### Projects

Edit [src/data/projects.json](src/data/projects.json). Each object becomes a project card, sorted by ascending `order`.

| Field | How to edit it |
| --- | --- |
| `id` | Keep a unique lowercase ID with optional hyphens. |
| `title`, `oneLiner`, `description` | Use approved public copy. |
| `tech` | Supply an array of technology labels. |
| `github` | Use the approved HTTPS repository or upstream PR search URL. |
| `status` | Use `pending-verification`, `verified`, or `demo-down`. |
| `demo` | Use the tested HTTPS demo URL, or `null` to hide the demo link. |
| `featured`, `order` | Set visual emphasis and card order. |
| `images` | Omit it for a text-only card, or use an empty array for a labeled placeholder. Add only genuine, approved captures. |
| `notes` | Record internal verification evidence and remaining work. This field is never rendered. |

Keep a new project `pending-verification`. Its card shows "Verifying", and any demo link carries a "pending" label. ChatGenius stays `demo-down` with `demo: null` until its replacement demo is verified.

To mark a project verified:

1. Verify the project itself with the relevant build and a representative functional check. For a live demo, test the public URL and its main user flow, including login when required. An HTTP response or a successful portfolio build is insufficient.
2. Record the date, version, checks, and limitations in `notes` and the current pass notes. Keep biographical claims tied to `facts.md`.
3. Change `status` to `verified`. To add a demo link, set `demo` to the exact tested HTTPS URL. A verified local project can keep `demo: null`.
4. Run `npm run build` and inspect the card with `npm run preview`.

For example, only after verifying swift-ship and its existing demo, update these fields on its existing object:

```json
{
	"status": "verified",
	"demo": "https://swift-ship-pi.vercel.app"
}
```

This is a partial example, not a replacement object or a claim that swift-ship has been verified. If a demo becomes unavailable, set `status` to `demo-down` and `demo` to `null`, then update any availability copy.

Keep private and Superbuilders projects out of the project cards. Never fabricate screenshots. For approved media, follow the paths and alt-text instructions in the data guide.

### Open-source contributions

Edit [src/data/opensource.json](src/data/opensource.json). `repository` and `url` identify the upstream repository. `mergedList` is the filtered upstream search. `pullRequests` supplies the selected cards, each with `number`, `title`, `area`, `mergedAt`, and `url`.

Use only PRs and claims supported by `facts.md`. Keep `mergedAt` in `YYYY-MM-DD` format and each URL pointed at the matching upstream PR. Update `verifiedAsOf` only after checking the evidence, and record the check in the pass notes.

Keep `count.display` as `true` and `count.label` exactly `750+ merged pull requests`. Link that label through `mergedList` to the approved search in `facts.md`. Keep `count.value` and `count.notes` internal. Never render the exact value or another total. The build enforces the approved display flag and label.

### Experience and approval

Every pass, re-read `facts.md` and reconcile [src/data/experience.json](src/data/experience.json) and the rendered copy in [src/pages/index.astro](src/pages/index.astro).

TODO before publication: obtain Dan's approval for employer and client details. Keep `reviewStatus: "needs-dan-ok"` and the Superbuilders `needsDanOk: true` flag. Keep unapproved client names in flagged placeholders. Render only their approved `publicFallback` descriptions. Describe contract work as demoed or piloted, not shipped to production, and preserve Dan's team and solo roles.

Do not add phone numbers, addresses, family details, private repository links, or contract project media.

## Configure site URLs

In [astro.config.mjs](astro.config.mjs), `PUBLIC_SITE_URL` sets the site origin, defaulting to `https://audacity88.github.io`. `PUBLIC_BASE_PATH` sets the path, defaulting to `/portfolio/`. To build for the account site's root instead, run:

```sh
PUBLIC_BASE_PATH=/ npm run build
```

For another repository subpath, set `PUBLIC_BASE_PATH` to its path with leading and trailing slashes. For a custom domain, set `PUBLIC_SITE_URL` to its HTTPS origin and `PUBLIC_BASE_PATH=/`. These variables configure the build; they do not publish anything or configure a domain.

Use the same environment variables for `dev`, `build`, and `preview`. For example, after the root build above, run `PUBLIC_BASE_PATH=/ npm run preview` and open the root URL printed by Astro. Internal assets and the optional resume link use Astro's base URL.

Canonical URLs, Open Graph and Twitter image URLs, `sitemap.xml`, and `robots.txt` use these settings. The sitemap lists only the home page. The custom `404.html` has `noindex` and links back to the portfolio.

Search engines read `robots.txt` at the origin root. A root build includes it there. A subpath build includes it under that path; before any approved publication, the host's root `robots.txt` must point to the subpath sitemap. The host must also serve `404.html` for missing pages with HTTP status 404.

Styles are inlined at build time to avoid a blocking stylesheet request. System fonts need no downloads. The only browser JavaScript restores and cycles the theme. Navigation works without JavaScript.

## Deployment, awaiting approval

[.github/workflows/ci.yml](.github/workflows/ci.yml) runs `npm ci` and `npm run build` on `pull_request`. It builds only and has read-only repository permissions.

[.github/workflows/deploy.yml](.github/workflows/deploy.yml) is prepared for GitHub Pages, triggered only by `workflow_dispatch`. Push and pull-request deployment triggers are intentionally absent until Dan approves publishing. The workflow explicitly disables automatic Pages enablement.

After Dan separately approves publication and the content review is complete:

1. Confirm the intended repository, domain, and path. Publishing at an account-site root replaces any content already served there; confirm any replacement with Dan.
2. With approval to change repository settings, enable Pages using **Settings > Pages > Build and deployment > Source > GitHub Actions**. Follow [GitHub's custom workflow guide](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).
3. Make the reviewed workflow available on the default branch through separately approved commits and pushes. Configure any `github-pages` environment protection rules before publication.
4. With approval to deploy that version, open **Actions > Deploy portfolio to GitHub Pages > Run workflow** and select the approved branch.
5. Check the published home page, theme, project links, social metadata, sitemap, and missing-page response at the final URL.

The build job uses `actions/configure-pages` to read the configured origin and base path, then passes them as `PUBLIC_SITE_URL` and `PUBLIC_BASE_PATH` to `npm run build`. An empty Pages base path becomes `/`, overriding the local `/portfolio/` default. `actions/upload-pages-artifact` uploads `dist/`; a dependent job uses `actions/deploy-pages` with the `github-pages` environment. Only that deploy job gets Pages write and OIDC permissions.

The workflow expects Pages to be enabled beforehand and fails if that prerequisite is missing. Creating these files does not enable Pages or run a deployment. Remote CI and deployment still need validation after the relevant approvals.

## Update the social card

`public/og-card.png` is a text-only social card made from `public/og-card.svg`, not a project screenshot. If the SVG copy changes, run `npm run generate:og` before rebuilding. This uses installed Google Chrome on macOS; set `CHROME_PATH` to use another Chrome executable. The PNG is 1200 × 630 and is metadata-only, so it does not load during a normal page visit.

## Add the resume

Place an approved PDF at `public/resume.pdf`, then rebuild. The hero renders the resume link only when that file exists at build time.
