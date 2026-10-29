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
npm test
npm run build
npm run preview
```

`test` uses Node's built-in test runner with no additional dependencies. It checks JSON fields, project states, URLs, approval flags, prohibited links, and the link checker's root and subpath handling. `build` checks Astro and TypeScript, validates the content data, generates static files in `dist/`, and checks local links.

Run `npm run check:links` to recheck existing build output. The checker reads the built canonical URL and checks local page links, fragments, assets, sitemap entries, and manifest URLs, including links on the 404 page. It does not request external services or verify project demos. CI runs it as part of `npm run build`.

The print stylesheet formats the home page as a two-page summary on A4 and Letter paper in Chrome at 100% scale, with browser headers and footers disabled. It retains project verification badges, experience, education, and contact details. Project detail pages also have compact print layouts. The site's manifest uses the configured base path and existing SVG favicon; it adds no service worker or offline behavior.

## Edit content

Use `/Users/natalie/Development/portfolio-brief/facts.md` as the only source of biographical and experience facts. Use `portfolio-brief/v2/verified-projects.md` for the approved project list, evidence, and media. It supersedes the earlier seeds. Treat `triage.md` as untested context. See the [data guide](src/data/README.md) for the full editing rules.

### Projects

Edit [src/data/projects.json](src/data/projects.json). Each object becomes a project card and a detail page at `/projects/<id>/` under the configured base path. Cards sort by ascending `order`.

| Field | How to edit it |
| --- | --- |
| `id` | Keep a unique lowercase ID with optional hyphens. |
| `title`, `oneLiner`, `description` | Use approved public copy. |
| `verification`, `verificationDate` | Short evidence summary and check date, shown on cards and detail pages. |
| `verificationNote` | Detailed evidence and limits, shown on the detail page. |
| `statusLabel` | Optional evidence-specific badge for verified projects, such as `Build checked`. |
| `demoLabel` | Optional link label. swift-ship uses `Live sign-in page`. |
| `tech` | Supply an array of technology labels. |
| `github` | Use the approved HTTPS repository or upstream PR search URL. |
| `status` | Use `pending-verification`, `verified`, or `demo-down`. |
| `demo` | Use the tested HTTPS demo URL, or `null` to hide the demo link. |
| `featured`, `order` | Set visual emphasis and card order. |
| `images` | An array of genuine approved captures, or `[]` for a text-only card. Each capture has `src`, `srcSmall`, `width`, `height`, `alt`, and `caption`. |
| `notes` | Record internal verification evidence and remaining work. This field is never rendered. |

Keep new projects `pending-verification`. Their cards show "Verifying", and any demo link carries a "pending" label. The supplied Oct 29 project checks are recorded in the data. Eyrie has build and test evidence; swift-ship has build evidence only; codex-video-vision and ChatGenius have test evidence. codex-skills remains pending with known native test failures, and Tono4's simulator build remains unverified. ChatGenius is code only, with `demo: null`.

A `verified` status applies only to the checks recorded in `verification` and `verificationNote`. It does not establish that every workflow works. A successful portfolio build does not verify a project. For live demo updates, test the public URL and the relevant user flow first. Keep a sign-in-only link labeled `Live sign-in page`.

Eyrie is the featured, full-width card. Its preview links to all four first-run captures on the detail page. The approved source PNGs were resized without cropping and converted to WebP at 720px and 1440px. Captions describe their first-run state. swift-ship's detail-page capture shows sign-in only.

Keep private and Superbuilders projects out of the project cards. Never fabricate screenshots. For approved media, follow the paths and alt-text instructions in the data guide.

### Record new project verification

After completing the project's actual checks, record the evidence with the local helper:

```sh
npm run project:verify -- tono4 --demo https://example.com/demo --verification "Describe the checks you completed" --note "Describe any remaining limits" --label "Build checked"
```

Replace the example URL and evidence before running. `--verification` is required to prevent a status change without recorded evidence. The helper sets `status: verified`, the HTTPS demo URL, evidence summary, current date, public verification note, and an internal audit note. It rejects unknown IDs, unsafe URLs, and prohibited links before writing. Other projects stay unchanged. It does not run builds, access the demo, or prove that the evidence is accurate.

Use `--demo-label "Live sign-in page"` for a sign-in-only link. The existing label is preserved if the demo URL is unchanged. For a local-only project, edit the evidence and status manually and keep `demo: null`. Run `npm test` and `npm run build`, then inspect the affected card and detail page. Append the checks and limits to `PASS_NOTES.md`.

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

Canonical URLs, Open Graph and Twitter image URLs, `sitemap.xml`, and `robots.txt` use these settings. The sitemap lists the home page and all generated project pages. The custom `404.html` has `noindex` and links back to the portfolio.

Search engines read `robots.txt` at the origin root. A root build includes it there. A subpath build includes it under that path; before any approved publication, the host's root `robots.txt` must point to the subpath sitemap. The host must also serve `404.html` for missing pages with HTTP status 404.

Styles are inlined at build time to avoid a blocking stylesheet request. System fonts need no downloads. The only browser JavaScript restores and cycles the theme. Navigation works without JavaScript.

## Deployment, awaiting approval

[.github/workflows/ci.yml](.github/workflows/ci.yml) runs `npm ci`, `npm test`, and `npm run build` on `pull_request`. It has read-only repository permissions.

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
