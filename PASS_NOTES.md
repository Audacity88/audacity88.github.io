# Pass notes

## Pass 1: Scaffold and content, 2026-10-29

Created a static Astro 7.4.4 site with TypeScript, plain CSS, all requested sections, and the ranked eight-project grid. Added editable project, experience, and upstream PR JSON files with build-time validation and a data editing guide. Added system-aware light and dark themes with a persistent toggle, responsive layouts, keyboard focus states, a skip link, and reduced-motion support. The resume link appears only when `public/resume.pdf` exists.

Kept the supplied project verification states, hid null demo links, labeled empty media slots, identified the video plugin as a credited MIT-licensed port, and kept client names behind approval placeholders. The merged-PR count remains internal with `display: false`; it never enters generated page content. Recorded the task's local-only and content rules in `AGENTS.md`.

Validation on `Mac-mini.local`, working directory `/Users/natalie/Development/portfolio`:

- `npm install --cache /private/tmp/dan-portfolio-npm-cache` passed, with zero reported vulnerabilities. The initial plain install could not write the existing user cache; no cache permissions were changed.
- `PUBLIC_BASE_PATH=/ ASTRO_TELEMETRY_DISABLED=1 npm run build` passed. Generated canonical and asset paths used the site root.
- Final `ASTRO_TELEMETRY_DISABLED=1 npm run build` passed with zero errors, warnings, or hints. Static output is in `dist/`, configured for `/portfolio/`.
- Inspected generated markup for the default canonical, favicon, and CSS paths, project statuses, demo links, and hidden resume link. Found no client placeholder, private repository link, or merged-PR total in `dist/`. `git diff --check` passed.

Still pending: browser and phone visual review, interactive theme verification, individual project builds and demo flows, iOS device verification, genuine screenshots or video, an approved resume, and approved client details or additional experience facts. The portfolio build does not verify the projects. All changes remain local; nothing was committed, pushed, or deployed.

## Pass 2: Design polish, 2026-10-29

Added a warm light palette and an ink dark palette with cobalt/periwinkle accents, larger system typography, an italic serif accent, more space between sections, and coordinated abstract SVG illustrations. Polished featured project cards, technology chips, verification badges, buttons, link states, contact section, and footer. Kept mobile section navigation visible, with 44px-tall controls. Added brief entrance motion and hover transitions that respect reduced-motion preferences. No external fonts or new dependencies.

Re-read `facts.md` and reconciled every experience entry and rendered experience claim. Added `reviewStatus: needs-dan-ok`, the employer approval flag, and the client approval placeholder with its neutral `publicFallback`. Clarified demo/pilot and not-shipped wording, the team role on Flying Colors, and the solo role on Civics Time Machine. Added the approved prompt-cache comparison. Updated the data guide and recorded the required per-pass facts check in `AGENTS.md`. Preserved the project seeds, verification states, hidden null demo links, and hidden merged-PR count.

Validation on `Mac-mini.local`, working directory `/Users/natalie/Development/portfolio`:

- Final `ASTRO_TELEMETRY_DISABLED=1 npm run build` passed with zero errors, warnings, or hints.
- Inspected static output for eight project cards and badges, unique IDs, working section-anchor targets, approval flags, and local stylesheet assets. No hidden PR total, client placeholder/name, or private links appeared in output.
- Executed the built theme scripts with a mocked DOM and storage. Checked auto/light/dark cycling, persisted choices on reload, invalid stored values, accessible button labels, and unavailable storage.
- Calculated text contrast for the main palette pairs. Minimum checked ratios were 5.02:1 in light mode and 6.49:1 in dark mode. This does not replace a browser accessibility audit.
- `git diff --check` passed. Static HTML, CSS, and favicon total about 38 KB uncompressed.

Browser visual and interactive review remains pending: computer-use access to Chrome was not approved. Responsive layout and reduced-motion behavior were checked in source only. Individual project builds, demo flows, iOS behavior, genuine media, and publication approvals remain pending. All changes are local; nothing was committed, pushed, or deployed.

## Pass 3: Responsive and accessibility audit, 2026-10-29

Reserved the theme control's space before JavaScript reveals it. Fixed skip-link hover contrast, enlarged the contact-email and explore-work targets to at least 44px tall, and excluded decorative SVGs from keyboard focus. Added screen-reader text so the prompt-cache comparison reads "From 81.8% to 93.1%".

Re-read `facts.md` and the untested triage. Reconciled `experience.json` and every rendered experience claim. No content corrections were needed. Employer and client approval flags, neutral partner wording, team and solo roles, and explicit demo/pilot rather than production wording remain intact. Preserved project verification states, hidden null demo links, empty media slots, and the hidden PR total.

Validation ran on `Mac-mini.local` in `/Users/natalie/Development/portfolio`. Used installed headless Chrome with a temporary profile and Node scripts over the Chrome DevTools Protocol against `http://127.0.0.1:4321/portfolio/`:

- Checked all components in CSS and reviewed full-page captures at 360, 768, and 1280px in both light and dark themes. Browser measurements found no horizontal overflow in any of the six combinations. Mobile navigation stays visible, so there is no collapsed menu or menu-toggle interaction.
- Checked `lang="en"`, header/main/footer landmarks, navigation labels, one H1, heading order, unique IDs, and section-anchor targets. All passed. There are no raster images to audit for alt text. All four decorative SVGs are hidden from assistive technology and have `focusable="false"`; future project images still require alt text and declared dimensions.
- Tabbed through all 35 links and buttons in each combination. All were reachable with a visible 2px focus outline. Activated the skip link and four section links with the keyboard at each width. The skip link focused `main`.
- Calculated contrast from computed text colors and ancestor backgrounds, including gradient endpoint colors and the featured-label pseudo-element. The minimum was 5.02:1 in light mode and 6.49:1 in dark mode, above WCAG AA text thresholds. Also checked the focused skip link with pointer hover in both themes.
- Used Enter and Space to cycle the theme control at each width. Checked accessible labels, persistence after reload, live system preference changes, explicit overrides, invalid stored values, and unavailable storage. All passed.
- Verified reduced motion disables entrance animations, transitions, and smooth scrolling. Normal entrance motion remains available. Compared header, navigation, and hero geometry with JavaScript disabled and enabled at each width; revealing the theme control moved none of them. The six measured page loads recorded zero cumulative layout shift.
- Inspected Chrome's accessibility tree for the cache comparison's spoken direction. Generated markup retained eight project cards and omitted client placeholders, private links, and the PR total.
- Final `ASTRO_TELEMETRY_DISABLED=1 npm run build` passed with zero errors, warnings, or hints. `git diff --check` passed.

Temporary audit scripts, JSON results, and page captures are in `/private/tmp/dan-portfolio-audit/`. No dependencies or project screenshots were added. Axe was unavailable offline, and its registry request timed out, so no axe result is claimed. This audit does not establish full WCAG conformance; VoiceOver, physical phones, and other browser engines remain untested. Individual projects and demo flows remain unverified. Nothing was committed, pushed, or deployed.

## Pass 4: Performance and SEO, 2026-10-29

Inlined the stylesheet, retained the tiny theme scripts and JavaScript-free navigation, and minified the SVG favicon. Added configurable `PUBLIC_SITE_URL` alongside `PUBLIC_BASE_PATH`, complete Open Graph and Twitter metadata, a text-only 1200 × 630 PNG social card with an SVG source and `npm run generate:og` helper, static `robots.txt` and `sitemap.xml`, and a custom noindex 404 page. Fixed shared navigation to return to home-page sections from the 404. No new dependencies.

Re-read `facts.md` and the untested triage, then reconciled `experience.json` and all rendered experience copy. No experience corrections were needed; approval flags, neutral partner wording, team/solo roles, and explicit demo/pilot rather than production wording remain intact. Applied the newly approved `750+ merged pull requests` label, linked to the upstream search. Updated the data schema, editing guide, and `AGENTS.md` to replace the obsolete hidden-count rule. The exact internal total stays out of markup. Project verification states and null demo links remain unchanged.

Validation on `Mac-mini.local`, working directory `/Users/natalie/Development/portfolio`:

- `PUBLIC_SITE_URL=https://portfolio.example PUBLIC_BASE_PATH=/ ASTRO_TELEMETRY_DISABLED=1 npm run build` passed. Verified canonical, social image, favicon, sitemap, robots, and 404 navigation with this alternate origin and root base.
- Final `ASTRO_TELEMETRY_DISABLED=1 npm run build` passed with zero errors, warnings, or hints. Restored the default origin and `/portfolio/` base. Static checks passed for metadata, sitemap exclusion of the 404, approval fallbacks, project states, and the approved count label. `git diff --check` passed.
- The home HTML is 38,686 bytes, or 10,135 bytes with local gzip compression. It contains 941 bytes of inline JavaScript and 15,673 bytes of inline CSS, with no external scripts, stylesheets, fonts, or hydration runtime. The favicon is 264 bytes. The metadata-only PNG is 31,667 bytes; visually inspected it after correcting an initial renderer that omitted text.
- Headless Chrome against `npm run preview` at 360px and 1280px found no horizontal overflow or runtime exceptions, working theme persistence, and zero measured CLS. Unthrottled local LCP samples were 100ms and 28ms respectively. These are local samples, not Lighthouse scores or field measurements. Normal home visits requested only the document and favicon.
- Verified missing URLs return HTTP 404 with the custom page, `noindex`, no canonical, and correct home/section links. Stopped the preview server started for this pass, PID 99931, and closed the isolated audit browser; confirmed their ports were released.

Lighthouse was not installed or cached. `npx --offline --cache /private/tmp/dan-portfolio-npm-cache lighthouse --version` returned `ENOTCACHED`; the online download choice was still pending. No Lighthouse scores or 95+ result are claimed. Audit results and captures are in `/private/tmp/portfolio-pass4-*`.

Before any separately approved publication, a subpath host needs an origin-root `robots.txt` pointing to the subpath sitemap and must serve `404.html` with status 404. Individual project builds, demos, physical phones, and production hosting remain unverified. All changes are local; nothing was committed, pushed, or deployed.

## Pass 5: README and deployment preparation, 2026-10-29

Expanded `README.md` with the site purpose, stack, Node 24 setup, local commands, project fields, evidence required before changing a project to `verified`, demo-link handling, open-source editing rules, experience approvals, base-path configuration, and deployment instructions. Retained the resume and social-card instructions.

Added `.github/workflows/ci.yml` to run `npm ci` and `npm run build` on `pull_request` with read-only repository permissions. Added `.github/workflows/deploy.yml` with only `workflow_dispatch`, an explicit comment that Pages is not enabled and push triggers await Dan's publishing approval, and `configure-pages` automatic enablement set to false. The build reads Pages origin/base metadata, checks and builds the site, and uploads `dist/`. A dependent job deploys through the `github-pages` environment with Pages write and OIDC permissions. No dependencies changed.

Re-read `facts.md` and the untested triage, then reconciled `experience.json` and all rendered experience copy. No experience corrections were needed. Employer/client approval flags, neutral partner fallback, team/solo roles, and explicit demo/pilot and not-shipped wording remain intact. Project states, null demo links, and the approved linked `750+ merged pull requests` label remain intact.

Validation on `Mac-mini.local`, working directory `/Users/natalie/Development/portfolio`:

- `ASTRO_TELEMETRY_DISABLED=1 npm run build` passed with zero errors, warnings, or hints, using the installed Node v23.5.0 and npm 11.6.2. The new remote workflows select Node 24; that runner has not been exercised.
- Parsed both workflow files with the installed YAML parser and checked unique keys, exact event triggers, install/build commands, Node selection, disabled Pages enablement, artifact path, job dependency, environment, and permissions. README relative file links resolved.
- Inspected built HTML for neutral client fallbacks, explicit pilot wording, team/solo attribution, unchanged project verification badges, hidden null demo links, and the approved count linked to the upstream search. The client name, placeholder, and exact internal total are absent.
- `git diff --check` passed.

Remote Actions, clean `npm ci` installation, Node 24 execution, and deployment remain untested. Existing dependencies sufficed for local validation. No workflows were dispatched, Pages settings were not changed, and nothing was committed, pushed, or deployed. Individual project builds and demo flows remain unverified.

## Pass 6: Content, data tests, and project details, 2026-10-29

Completed refinement items **a, b, and c**:

- **a:** Re-read `facts.md` and the untested triage, then checked public copy and `experience.json`. Approval flags, neutral client fallback, team/solo attribution, and explicit demo/pilot and not-production wording match the facts. Tightened the hero to describe working pilots and agent infrastructure; removed the video plugin's historical CI claim from public copy. The approved linked `750+ merged pull requests` label appears once on the home page. No private links, client placeholders, disallowed student count, or exact internal PR total appear in generated HTML.
- **b:** Added four dependency-free Node tests behind `npm test` for all JSON data shapes, required fields, statuses, HTTPS demo/GitHub URLs, approval flags, count rules, and prohibited links. CI runs them before the build. Updated the editing guides. No dependencies changed.
- **c:** Generated eight `/projects/<id>/` pages from `projects.json`, with descriptions, technologies, links, shared status badges, and a required public `verificationNote`. Cards link to the pages; the sitemap includes them. Internal editing notes stay private. Preserved all project statuses and hidden null demo links.

Validation on `Mac-mini.local`, working directory `/Users/natalie/Development/portfolio`:

- `npm test` passed all four tests. Twelve malformed-data fixtures in a temporary copy were rejected, including invalid states, URLs, approval flags, missing fields, and prohibited encoded links.
- `PUBLIC_SITE_URL=https://portfolio.example PUBLIC_BASE_PATH=/ ASTRO_TELEMETRY_DISABLED=1 npm run build` passed. The final default `ASTRO_TELEMETRY_DISABLED=1 npm run build` passed with zero errors, warnings, or hints. Both base configurations passed static checks for 136 local links, fragment targets, ten HTML pages, eight detail pages, nine sitemap URLs, canonical URLs, experience copy, and privacy rules. Parsed CI YAML and confirmed install/test/build order and read-only permissions. `git diff --check` passed.
- Headless Chrome over CDP checked home and every detail page at 360/768/1280px in light and dark mode, 54 combinations. No horizontal overflow or console/runtime errors. Card/return navigation, theme persistence across pages and reload, and missing-project HTTP 404 passed. Inspected detail-page captures at all three widths in both themes, plus the updated cards. Temporary scripts, captures, and results are in `/private/tmp/portfolio-refinement-qa/`; none were added to the repo.
- Stopped the preview listener PID 21994 and isolated Chrome PID 24580. The npm launcher PID 21959 had already exited. Confirmed ports 4326 and 9346 were released.

Individual project builds, demo flows, genuine media, physical devices, other browser engines, remote CI, clean installation, and Node 24 execution remain unverified. This portfolio build changes no project verification state. All work remains local; nothing was committed, pushed, or deployed.

## Pass 7: Hiring copy, print summary, and link checks, 2026-10-29

Completed refinement items **e, f, and g**:

- **e:** Made the hero explicit about AI agents and developer tools, brought ZeroClaw code ownership into the introduction, and put Dan's review and testing process first in About. Replaced vague open-source headings with the work itself. Fixed the alignment of the two current-work links on phones.
- **f:** Added a print stylesheet with a two-page home summary and compact project detail layouts. Kept every project title and status badge, experience, education, and contact details. Removed decorative graphics and controls from print. Print review caught and fixed joined heading words and Letter pagination overflow.
- **g:** Added a dependency-free `npm run check:links` command and included it at the end of `npm run build`, so existing CI and deployment build steps also run it. It checks built local href/src references, fragments, social images, sitemap entries, and manifest URLs against the built canonical origin and base. Added root/subpath fixtures that reject missing pages, assets, fragments, and incorrect manifest paths. Added a generated manifest that uses the configured base and existing SVG favicon. Documented the commands and print settings.

Re-read `facts.md` and the untested triage. Reconciled `experience.json` and all rendered experience copy. Employer/client approval flags, neutral partner fallback, team/solo attribution, and explicit demo/pilot and not-production wording match the brief. No experience data changes were needed. The approved linked `750+ merged pull requests` label appears once on the home page. Built-copy checks found no client placeholder/name, prohibited links, disallowed student count, or exact internal PR total. Project statuses and demo links remain unchanged.

Validation on `Mac-mini.local`, working directory `/Users/natalie/Development/portfolio`:

- `npm test` passed all five tests. `PUBLIC_SITE_URL=https://portfolio.example PUBLIC_BASE_PATH=/ ASTRO_TELEMETRY_DISABLED=1 npm run build` passed. Final `ASTRO_TELEMETRY_DISABLED=1 npm run build` passed with zero errors, warnings, or hints. Both base configurations passed 179 local-reference checks across ten HTML pages. `git diff --check` passed. No dependencies changed.
- Used `npm run preview -- --host 127.0.0.1 --port 4337` and isolated headless Chrome over CDP. Checked home and all eight project pages at 360/768/1280px in light and dark, 54 combinations. No horizontal overflow, broken images, or console/runtime errors. Card/return navigation, theme persistence across pages and reload, manifest URLs, and missing-project HTTP 404 with noindex and base-correct return links passed. Inspected updated hero captures and the mobile alignment fix.
- Printed from the dark theme at 100% scale with browser headers/footers disabled. Home output is two pages on both A4 and Letter; the swift-ship detail is one Letter page. Rendered QA PDFs with macOS PDFKit because Poppler was unavailable, and visually inspected the pages for spacing and clipping. Temporary scripts, captures, PDFs, and results are under `/private/tmp/portfolio-pass7-qa/`; none were added to the repo.
- Stopped exactly preview PID `34453` and isolated Chrome PID `34553`. Confirmed ports 4337 and 9347 were released.

Project builds and demo flows, physical devices and printers, other browser engines, remote CI, clean installation, and Node 24 execution remain unverified. The link checker checks static local output, not external service availability. Nothing was committed, pushed, or deployed, and no GitHub or Pages settings changed.

## Pass 8: Verified project update and refinement, 2026-10-30

verified-projects applied

Replaced the project list with the six approved entries in the supplied order. Removed cliktok and the duplicate ZeroClaw project card; ZeroClaw remains in open source and experience with the approved linked total. Added dated, scoped verification text, honest build/test badges, a full-width Eyrie flagship, and detail-page capture galleries. Added only the five approved genuine captures as responsive WebP files, without cropping or content edits. Captions identify empty first-run screens and the public sign-in page. swift-ship's link says "Live sign-in page"; ChatGenius has no demo link. codex-skills and Tono4 remain pending.

Verified all six repository URLs with read-only `gh repo view <owner/name> --json url`. Re-read facts.md and reconciled experience.json and all rendered experience copy; approval flags, neutral client fallback, team/solo roles, and explicit demo/pilot and not-production wording remain correct. Updated AGENTS.md and the data guides to remove superseded seeds and preserve the supplied verification rules.

Completed refinement items **d and h**:

- **d:** Used Playwright with installed Chrome against `npm run preview -- --host 127.0.0.1 --port 4338`. Captured home, project cards, Eyrie galleries, and swift-ship details at 360/768/1280px in light and dark under `/private/tmp/portfolio-qa/`, which is `/tmp/portfolio-qa` on this host. Inspected all six card captures and representative galleries. Removed the oversized swift-ship card preview after visual review; its genuine capture remains on its detail page. Kept the flagship preview on home. Preserved the MIT-port credit in the printable card copy. The print summary still fits two pages on A4 and Letter, with Letter pages visually inspected.
- **h:** Added documented `npm run project:verify -- <id> --demo <url> --verification "Checks completed"`, with optional limitation, badge, and demo-label arguments. The helper records maintainer evidence and the date, sets verified status and the HTTPS demo link, and preserves other projects. It requires evidence and rejects unknown IDs, credentials, HTTP URLs, and prohibited project links before writing. It does not run remote checks or prove project behavior. Added a focused test for those safeguards and sign-in-label preservation, plus a CLI smoke in a temporary copy. Real project data was not changed by helper tests.

Validation on `Mac-mini.local`, working directory `/Users/natalie/Development/portfolio`:

- `npm test` passed all six tests. `PUBLIC_SITE_URL=https://portfolio.example PUBLIC_BASE_PATH=/ ASTRO_TELEMETRY_DISABLED=1 npm run build` passed. Final `ASTRO_TELEMETRY_DISABLED=1 npm run build` passed with zero errors, warnings, or hints; its link checker passed 155 local references across eight HTML pages. `git diff --check` passed. No repository dependencies changed. Playwright was installed only in `/private/tmp/portfolio-playwright/`, with no browser download.
- Extended data checks for dated verification evidence, status/demo labels, image dimensions, captions, and both image assets. All ten responsive WebP files total 228,502 bytes, converted only from the five approved PNGs. No image content was cropped or retouched.

Project build and test evidence comes from the supplied Eyrie report dated Oct 29, 2026. This pass verified the portfolio, repository URL resolution, and supplied media, not the projects themselves. swift-ship authenticated workflows, ChatGenius backend/live flows, codex-skills native test failures, Tono4 simulator/device behavior, physical phones, other browser engines, remote CI, clean installation, and Node 24 execution remain outside this validation. Nothing was committed, pushed, deployed, or changed on GitHub or Pages.


Final Playwright run passed all 42 page/width/theme combinations with no horizontal overflow, broken images, console errors, or runtime exceptions. Card/detail navigation, theme persistence across pages and reload, the approved count/link, client fallback, and missing-project HTTP 404 passed. Final screenshots were inspected at all three widths in both themes. Stopped exactly preview listener PID `61073`, confirmed port 4338 was released, and closed Playwright's isolated browser. The npm launcher was PID `61043`; Astro detached the preview listener. QA files remain only in `/private/tmp/portfolio-qa/`.

## Pass 9: Content exclusions and current-output QA, 2026-10-30

Confirmed that Pass 8 already records "verified-projects applied". All refinement items a through h were previously completed. Rechecked **a and b** for this pass and fixed the remaining exclusion-policy gaps.

Removed excluded references from the verification helper and its fixtures. Extended the permitted data-test guard to cover project IDs and every project text field. Added a repository text check for source files, guides, and pass notes, with literal guard patterns confined to the permitted test file. Existing CI runs these checks through `npm test`. Recorded the content-exclusion rule in `AGENTS.md`. Updated both editing guides to distinguish the helper's URL checks from the full content checks in `npm test`.

Re-read `facts.md`, the untested triage, the verified project list, and the supplied support-desk README. Reconciled `experience.json` and every rendered experience claim. No biographical or experience corrections were needed. Employer and client approval flags, neutral partner wording, team and solo roles, and explicit demo or pilot rather than production wording remain correct. Preserved the six approved projects, supplied images, evidence limits, pending statuses, hidden null demo links, credited-port attribution, and sign-in-only label.

Validation on `Mac-mini.local`, working directory `/Users/natalie/Development/portfolio`:

- `npm test` passed all seven tests, including the new repository content check.
- `ASTRO_TELEMETRY_DISABLED=1 npm run build` passed with zero errors, warnings, or hints. Its link checker passed 155 local references across eight HTML pages.
- Checked the built HTML against the current data. All six detail pages contain their descriptions, verification summaries, limitations, and repository links. The home page contains every experience summary and highlight, the neutral client fallback, and exactly one approved linked merged-PR label. Client placeholders and the internal total are absent from rendered text.
- `git diff --check` passed. No dependencies, project evidence, media, or visual layouts changed.

Browser screenshots and external project checks were not repeated for these policy, test, and documentation changes. Pass 8's project evidence remains a supplied report dated Oct 29, 2026, not a result of this portfolio build. Authenticated workflows, native test failures, simulator and device behavior, remote CI, and production hosting retain their recorded validation limits. All changes remain local; nothing was committed, pushed, deployed, or changed on GitHub or Pages.

## Pass 10: Current content and browser QA, 2026-10-30

Confirmed that "verified-projects applied" is already recorded and refinement items a through h were completed in earlier passes. Rechecked **a, d, and g** against the current checkout. No source, content, data, dependency, or layout changes were needed; this pass adds the current validation record only.

Re-read facts.md, the untested triage, and v2/verified-projects.md. Reconciled experience.json and all rendered experience copy. Employer/client approval flags, the neutral partner fallback, team/solo attribution, and explicit demo/pilot and not-production wording still match the facts. Preserved the exact six-project list and order, approved genuine captures, scoped verification evidence, pending statuses, null demo links, credited-port attribution, and sign-in-only label. The approved merged-PR label appears once on home and links to the supplied upstream search. Exclusion checks pass.

Validation on Mac-mini.local, working directory /Users/natalie/Development/portfolio:

- `npm test` passed all seven tests. `ASTRO_TELEMETRY_DISABLED=1 npm run build` passed with zero errors, warnings, or hints. Its link checker passed 155 local references across eight HTML pages.
- Ran `npm run preview -- --host 127.0.0.1 --port 4339`, listener PID 73049. Playwright used installed Chrome in an isolated profile against localhost. The sandboxed browser launch aborted; the authorized retry outside the sandbox succeeded. No packages or browsers were downloaded.
- All 42 home/detail-page combinations at 360/768/1280px in light and dark passed with no horizontal overflow, broken images, console errors, or runtime exceptions. Card/detail return navigation, saved theme across pages and reload, flagship width, sign-in-only label, hidden ChatGenius demo, approved count/link, neutral client fallback, and missing-project HTTP 404 with noindex passed.
- Captures and JSON results are only in /private/tmp/portfolio-qa/pass10/, equivalent to /tmp/portfolio-qa/pass10/ on this host. Visually inspected project-card captures at every requested width and theme, plus the mobile dark Eyrie gallery. No spacing, clipping, or alignment fixes were needed.
- Closed the isolated browser and stopped exactly preview PID 73049. No unrelated process was stopped.

Project verification remains the supplied report dated Oct 29, 2026. Authenticated service workflows, native-test failures, simulator/device behavior, physical phones, other browser engines, remote CI, and production hosting retain their earlier validation limits. Nothing was committed, pushed, deployed, or changed on GitHub or Pages.

## Pass 11: Project case studies, 2026-10-30

deep item 1 done

Added a short case study to each of the six project detail pages, with the problem, Dan's contribution, architecture, reported verification, and remaining limits. Used only v2/verified-projects.md and the corresponding local project reports and READMEs under /Users/dan/portfolio-triage/. Stored file and section references in caseStudy.sourceNotes, which are never rendered. The shared page attributes verification to Eyrie's dated report. Existing project order, statuses, evidence, demo links, and approved captures remain unchanged.

The copy preserves the video tool's credited MIT-port attribution and Tono4's upstream foundation. It explains swift-ship's sign-in-only link, skipped build checks and failing standalone checks, ChatGenius's separate vector-retrieval package and frontend-only test evidence, codex-skills' native schema incompatibility, and Tono4's failed simulator build. No claims of users, adoption, or production outcomes were added.

Extended the existing data schema and data test to require complete case-study fields and source references. Documented editing and sourcing in src/data/README.md and AGENTS.md. Re-read facts.md and reconciled experience.json and all rendered experience copy. No experience corrections were needed; approval flags, neutral client fallback, team/solo attribution, and demo/pilot and not-production wording remain correct.

Validation on Mac-mini.local, working directory /Users/natalie/Development/portfolio:

- `npm test` passed all seven tests, including project text and repository exclusion checks.
- Final `ASTRO_TELEMETRY_DISABLED=1 npm run build` passed with zero errors, warnings, or hints. Its link checker passed 155 local references across eight HTML pages.
- Inspected generated HTML for all six complete case studies, original verification copy, unique heading IDs, one H1 per page, repository/demo links, and absence of internal source paths. Compared project data against HEAD to confirm existing project fields were preserved. Home checks passed for all experience copy, neutral partner wording, and exactly one approved linked merged-PR label.
- `git diff --check` passed. No dependencies, CSS, media, or client JavaScript were added.

Project build and test results remain Eyrie's October 29 evidence; they were not repeated in this portfolio pass. Browser visual, axe, and Lighthouse rounds were not run. Authenticated services, native integrations, and physical-device behavior retain the stated limits. All changes remain local; nothing was committed, pushed, deployed, or changed on GitHub or Pages.

## Pass 12: Architecture diagrams, 2026-10-30

deep item 2 done

Added simplified inline SVG diagrams to the Eyrie and swift-ship detail pages. Eyrie's diagram follows the embedded React dashboard, local Go server, discovery and adapter interface, and framework runtimes. Its description distinguishes local JSON stores from the ZeroClaw adapter's SQLite history access. swift-ship's diagram follows the main AI route through Next.js and Supabase Edge Functions to OpenAI and document retrieval. It identifies the separate application paths and retains the sign-in-only and unverified-workflow limits.

Traced the diagrams through read-only source inspection in the two project checkouts. Recorded files and symbols in caseStudy.sourceNotes. Added shared rendering, optional build-time data validation, SVG titles and descriptions, visible text explanations, theme-aware colors, and phone and print layouts. No new dependencies, images, or client JavaScript. Existing project fields, verification evidence, statuses, and demo links are unchanged.

Re-read facts.md, the untested triage, and verified-projects.md. Reconciled experience.json and all rendered experience copy. No corrections were needed. Approval flags, neutral client fallback, team and solo roles, demo/pilot and not-production wording, and the single approved linked merged-PR total remain correct.

Validation on Mac-mini.local, working directory /Users/natalie/Development/portfolio:

- `npm test` passed all seven tests, including content exclusions. Final `ASTRO_TELEMETRY_DISABLED=1 npm run build` passed with zero errors, warnings, or hints; 155 local references passed across eight HTML pages. `git diff --check` passed.
- Playwright with installed Chrome checked both updated pages at 360/768/1280px in light and dark, twelve combinations. No horizontal overflow, clipped SVG text, console errors, or runtime exceptions. SVG accessible names and descriptions resolve. Reviewed mobile, tablet, desktop, and print captures; print diagram labels remain above 8pt. A Chrome element-capture artifact disappeared with a taller capture viewport; normal viewport captures showed no overlay.
- QA captures and results remain only in /private/tmp/portfolio-qa/pass12/. The isolated browsers are closed. Stopped exactly preview PID 92691 and verified port 4340 was released. Browser launch and preview shutdown required sandbox escalation.

The diagrams describe selected source paths, not verified runtime behavior. Project evidence remains Eyrie's October 29 report. Full-site visual, axe, Lighthouse, physical-device, and remote checks remain for their respective passes. Nothing was committed, pushed, deployed, or changed on GitHub or Pages.

## Pass 13: Hidden records and open-source explanations, 2026-10-30

hidden placeholders added

Added the two reserved draft records with `hidden: true` and empty or null content fields. The shared public project export excludes them before cards, static routes, sitemap entries, and page metadata are generated. The social card remains a static approved asset with no project-data input. The verification helper refuses hidden records. Added a generated-output guard to the build's link check, covering hidden titles, IDs, paths, HTML, sitemap, metadata, and serialized text. Tests require the exact two empty placeholders, preserve the six public projects in their approved order, reject content or visibility changes, and check the actual built output. Updated AGENTS.md and the editing guide to preserve this policy without repeating the reserved names outside their allowed files.

deep item 3 done

Added three short problem-and-fix explanations to the linked ZeroClaw cards in `opensource.json`. Read PRs #10801, #11725, and #11617 directly with `gh pr view <number> -R zeroclaw-labs/zeroclaw --json title,body,mergedAt,additions,deletions`. Their returned merge dates match the existing data. The copy explains notification-lag recovery without cancelling running turns, next-step steering delivery, and closing the late-message race. It preserves reconnect cancellation behavior, the long-tool-call limit, and the client's ordinary-prompt fallback. No adoption, user, or production metrics were added. The other PR cards and the approved linked total remain unchanged.

Re-read facts.md, the untested triage, and verified-projects.md. Reconciled experience.json and all rendered experience copy. No experience corrections were needed. Employer and client approval flags, the neutral partner fallback, team and solo roles, and explicit demo/pilot and not-production wording remain correct. Existing public project content, verification evidence, links, and approved captures are unchanged.

Validation on Mac-mini.local, working directory /Users/natalie/Development/portfolio:

- `npm test` passed all ten tests, including malformed hidden-record fixtures, generated-output leak fixtures, verification-helper refusal, and the built-output exclusions.
- `ASTRO_TELEMETRY_DISABLED=1 npm run build` passed with zero errors, warnings, or hints. Only the six public project detail pages were generated. The output guard and all 155 local-reference checks passed across eight HTML pages. `git diff --check` passed. No dependencies or media were added.
- Ran `npm run preview -- --host 127.0.0.1 --port 4341`, listener PID 14074. Playwright with installed Chrome checked the updated home section at 360/768/1280px in light and dark, six combinations. All three explanations match their data and source links, with no horizontal overflow, clipped paragraphs, console errors, or runtime exceptions. Reviewed all six final viewport captures. An element-capture artifact was absent from normal viewport captures; the skip link's bounds remained above the viewport when unfocused.
- Browser checks confirmed both hidden project URLs return 404 with no hidden content, six public cards remain, every experience summary and highlight is present, client placeholders are absent, and the approved linked total appears exactly once. Captures, the audit script, and results remain only in /private/tmp/portfolio-qa/pass13/, equivalent to /tmp/portfolio-qa/pass13/ on this host.
- Closed the isolated browser, stopped exactly preview PID 14074, and confirmed port 4341 was released. Browser launch and preview shutdown required sandbox escalation.

This pass verified the portfolio output and read merged PR descriptions; it did not rerun ZeroClaw or project tests. The full-site visual, axe, and Lighthouse rounds remain pending, starting with deep item 4. Existing authenticated-service, native-test, device, remote-CI, and hosting limits remain. Nothing was committed, pushed, deployed, or changed on GitHub or Pages.

## Pass 14: Full-site visual QA, 2026-10-30

deep item 4 done

Tightened the hero's spacing and replaced its repeated subtitle with the approved brief-to-pilot theme. Gave Eyrie's flagship card a larger title and a restrained accent border. Stacked its content and genuine first-run capture through tablet widths so the image is easier to inspect. Fixed the mobile card's inherited center alignment, the detached period in the footer wordmark, and the doubled top border on the 404 page. No dependencies, media, or client JavaScript were added.

Re-read facts.md, the untested triage, and verified-projects.md. Reconciled experience.json and all rendered experience copy. No experience corrections were needed. Approval flags, neutral client wording, team and solo attribution, demo/pilot and not-production wording, the approved linked merged-PR label, public project order, verification limits, and hidden-record exclusions remain intact.

Validation on Mac-mini.local, working directory /Users/natalie/Development/portfolio:

- `ASTRO_TELEMETRY_DISABLED=1 npm run build` passed with zero errors, warnings, or hints. All 155 local references across eight HTML pages passed, including the generated-output exclusion guard. `npm test` passed all ten tests. `git diff --check` passed.
- Ran `npm run preview -- --host 127.0.0.1 --port 4342`, listener PID 19238. Playwright used installed Chrome with isolated profiles. Captured and visually reviewed home, all six detail pages, and the custom 404 at 360/768/1280px in light and dark, 48 combinations. Reviewed full-page captures as tiles and inspected normal viewport captures of the hero and flagship card. All captures were refreshed after the final layout change.
- All 48 combinations passed browser checks for horizontal overflow, off-screen content, clipped text, broken images, overlapping controls, header alignment, and unexpected console/runtime errors. Ten additional home-page checks at 320/760/761/960/961px in both themes passed the responsive card transition and mobile alignment checks.
- Theme choice persisted across reload and navigation; returning to system mode passed. Card/detail return navigation, six public cards, missing-page HTTP 404 and noindex, hidden-route 404 responses with no hidden content, experience text, neutral client fallback, and exactly one approved linked total passed.
- Captures, audit scripts, and JSON results remain only in /private/tmp/portfolio-qa/pass14/, equivalent to /tmp/portfolio-qa/pass14/ on this host. No packages or browsers were downloaded. Closed the isolated browsers, stopped exactly preview PID 19238, and confirmed its listener was gone. Browser launch and preview shutdown required sandbox escalation.

This was a local Chrome visual review. Axe and Lighthouse remain for their respective passes, starting with deep item 5. It does not verify physical phones, other browser engines, project runtime behavior, authenticated workflows, remote CI, or production hosting. Nothing was committed, pushed, deployed, or changed on GitHub or Pages.

## Pass 15: Accessibility round 2, 2026-10-30

deep item 5 done

Fixed the shared theme button's accessible name. Its visible Auto label previously conflicted with the word system in its accessible name, which failed axe's label-content-name-mismatch rule on every page. Both labels now use the same theme name, with an explanation that Auto follows the system preference. The accessible name still announces the next theme. No visual styles, site dependencies, or content facts changed.

Re-read facts.md, the untested triage, and verified-projects.md. Reconciled experience.json and all rendered experience copy. No experience corrections were needed. Approval flags, neutral client wording, team and solo attribution, explicit demo/pilot and not-production wording, the approved linked merged-PR total, project verification limits, and hidden-record exclusions remain intact.

Validation on Mac-mini.local, working directory /Users/natalie/Development/portfolio:

- Ran axe-core 4.14.0 through the existing Playwright installation and isolated headless Chrome 158.0.8117.2 against the built site. Tested home, six project pages, and the custom 404 at 360/768/1280px in both system-selected themes, 48 combinations. All default-enabled rules ran with no disabled rules or excluded elements. The baseline reproduced the button failure in all 48 scans; the final scans reported zero violations.
- Axe retained color-contrast review items for gradients, SVG text, decorative arrows, and the short X link label. Reviewed all 450 element instances separately using computed text colors, actual SVG rectangle fills, and conservative color bounds across gradient stops and underlying backgrounds. All exceeded 4.5:1, with minima of 5.11:1 in light and 6.49:1 in dark. These are supplemental checks; the raw axe reports retain their incomplete results.
- In all 48 combinations, checked keyboard skip-link focus, Enter/Space theme cycling, visible focus outlines, accessible names containing Auto/Light/Dark, and persistence after reload. An additional 144 control-level axe scans passed across the three theme states. Diagram accessible names and descriptions resolved. Browser checks also confirmed experience summaries/highlights, neutral client fallbacks, six public cards, hidden-content exclusions, the approved linked total, and no runtime exceptions.
- Final `ASTRO_TELEMETRY_DISABLED=1 npm run build` passed with zero errors, warnings, or hints. All 155 local references across eight HTML pages and the generated-output exclusion guard passed. `npm test` passed all ten tests. `git diff --check` passed.
- Installed only axe-core into /private/tmp/portfolio-a11y with a temporary npm cache. Audit scripts and baseline/final reports remain only in /private/tmp/portfolio-qa/pass15/, equivalent to /tmp/portfolio-qa/pass15/ on this host. Closed the isolated browsers, stopped exactly preview PID 38702, and confirmed port 4343 was released. Browser launch and preview shutdown required sandbox escalation.

This local automated audit and supplemental review do not establish full WCAG conformance. VoiceOver, actual voice-control software, physical devices, and other browser engines remain untested. Project runtime behavior, remote CI, and hosting were outside this pass. Deep item 6 is next. Nothing was committed, pushed, deployed, or changed on GitHub or Pages.

## Pass 16: Responsive image performance, 2026-10-30

Deep item 6 remains in progress. Lighthouse is not installed or cached; the offline version check returned ENOTCACHED. Requested Dan's download-runner choice as required by the session instructions. No Lighthouse download or audit has run, so no score or completion is claimed.

Added 360px and 960px WebP versions of the five approved captures, converted directly from their original PNGs without cropping or content edits. Retained the existing 720px and 1440px versions, full-size links, dimensions, alt text, and honest captions. Replaced the two-size data field with an explicit responsive sources array. Added automatic lazy-image sizing with accurate breakpoint fallbacks, including the stacked tablet flagship. Updated the data guides and existing tests; the build now checks every srcset candidate and rejects a missing variant.

Re-read facts.md, the untested triage, and verified-projects.md. Reconciled experience.json and all rendered experience copy. No experience corrections were needed. Approval flags, neutral partner wording, team and solo roles, explicit demo/pilot and not-production wording, project evidence limits, and hidden-record exclusions remain intact.

Validation on Mac-mini.local, working directory /Users/natalie/Development/portfolio:

- Root-path and final default `ASTRO_TELEMETRY_DISABLED=1 npm run build` passed with zero errors, warnings, or hints. Each build passed 179 local-reference checks across eight HTML pages, including hidden-output exclusions. `npm test` passed all ten tests. `git diff --check` passed.
- Isolated Chrome checked home, Eyrie, and swift-ship at eight widths from 360px to 1440px and both 1x and 2x display densities. All 48 automatic-sizing combinations and 48 fallback combinations passed. Fallback hints matched rendered image content widths within 3px. Verified all 20 WebP files' dimensions and unchanged aspect ratios.
- Compared selected file bytes with the baseline. At 360px and 1x density, the flagship image decreased from 7,974 to 2,630 bytes, a 67% reduction. At 1280px and 1x density, Eyrie's four gallery images decreased from 146,340 to 82,014 bytes, a 44% reduction. These are image-file comparisons, not Lighthouse or field measurements.
- Checked the three affected pages at 360/768/1280px in both themes, 18 combinations. Zero axe violations, zero measured layout shift, no horizontal overflow, broken images, or runtime exceptions. Existing axe contrast-review limits still apply. Captured all combinations and visually inspected representative flagship and gallery captures. Experience copy, neutral client fallback, six public cards, hidden-content exclusions, and the approved linked total passed.
- Reports, scripts, and captures remain only in /private/tmp/portfolio-qa/pass16/, equivalent to /tmp/portfolio-qa/pass16/. No repository dependencies changed. Closed the isolated browsers, stopped exactly preview PID 47019, and confirmed port 4344 was released. Browser launch and preview shutdown required sandbox escalation.

Next: after Dan selects the download runner, install Lighthouse outside the repo, run mobile audits on home and Eyrie's detail page, fix scores below 95, and record actual results before marking deep item 6 complete. Project runtime behavior, physical devices, other browser engines, remote CI, and hosting remain outside this pass. Nothing was committed, pushed, deployed, or changed on GitHub or Pages.

## Pass 17: Performance audit prerequisites, 2026-10-30

Deep item 6 remains the first unfinished item. Confirmed that Lighthouse is absent from the dedicated temporary install and existing npx installations. Requested the required download-runner choice; no answer arrived during this pass. No download, preview server, browser, or Lighthouse audit was started. No scores or completion are claimed. Existing responsive WebP variants remain unchanged.

Re-read facts.md, the untested triage, and verified-projects.md. Reconciled experience.json and every rendered experience summary and highlight against facts.md. No corrections were needed. Employer/client approval flags, neutral partner wording, team/solo attribution, and demo/pilot and not-production wording remain correct. Hidden placeholders and deep items 1 through 5 were already completed in prior passes.

Validation on Mac-mini.local, working directory /Users/natalie/Development/portfolio:

- `ASTRO_TELEMETRY_DISABLED=1 npm run build` passed with zero errors, warnings, or hints. All 179 local references across eight HTML pages and the hidden-output guard passed.
- `npm test` passed all ten tests. No source, media, dependencies, or project evidence changed.

The pending download command, to run on Mac-mini.local in /private/tmp, is `npm install --prefix /private/tmp/portfolio-lighthouse --cache /private/tmp/portfolio-lighthouse-cache --no-audit --no-fund lighthouse`. After Dan chooses the runner and the install succeeds, continue item 6 with mobile Lighthouse audits of home and Eyrie, fix scores below 95, and stop any preview server by its recorded PID. All existing validation limits remain. Nothing was committed, pushed, deployed, or changed on GitHub or Pages.

## Pass 18: Performance readiness check, 2026-10-30

Deep item 6 remains unfinished. Reconfirmed Lighthouse is absent from the temporary install and checked temporary and npx installations. Asked for the download-runner choice required by the supplied global AGENTS.md instructions. The choice remains pending; no download, preview server, browser, or Lighthouse audit ran. No score or item completion is claimed. Site source, media, and dependencies are unchanged.

Re-read facts.md, the untested triage, and verified-projects.md. Reconciled experience.json and all rendered experience copy against facts.md. No corrections were needed. Employer/client approval flags, neutral partner fallback, team/solo attribution, and explicit demo/pilot and not-production wording remain correct. The existing hidden placeholders, public project list, and verification limits remain intact.

Validation on Mac-mini.local, working directory /Users/natalie/Development/portfolio:

- `ASTRO_TELEMETRY_DISABLED=1 npm run build` passed with zero errors, warnings, or hints. All 179 local references across eight HTML pages and the hidden-output guard passed.
- `npm test` passed all ten tests. `git diff --check` passed before this notes append.
- Inspected built home and Eyrie markup: no external scripts; all five image instances have lazy loading. Home HTML is 45,747 bytes, or 11,798 bytes with local gzip; Eyrie HTML is 38,835 bytes, or 9,508 bytes with local gzip. Confirmed all five approved captures have 360/720/960/1440px WebP variants and declared dimensions. These static checks are not Lighthouse scores or runtime measurements.

Next action remains the install command in Pass 17, after Dan selects the runner, followed by mobile Lighthouse audits of home and Eyrie and fixes for scores below 95. No project runtime, physical-device, remote-CI, or hosting validation is claimed. Nothing was committed, pushed, deployed, or changed on GitHub or Pages.

## Pass 19: Performance prerequisite and current validation, 2026-10-30

Deep item 6 is still the first unfinished item. Re-read facts.md, triage.md, verified-projects.md, and prior pass notes. Confirmed the hidden-record safeguards already cover public data, cards, detail routes, sitemap, metadata, link checking, verification, and generated output. Reconciled experience.json and all rendered experience copy against facts.md. Approval flags, neutral partner wording, team/solo roles, and demo/pilot and not-production wording remain correct. No site-content changes were needed.

Lighthouse remains absent from the dedicated temporary install and checked npx installations. Asked who should run the exact download command recorded in Pass 17, as required by the supplied global AGENTS.md instructions, and left the choice pending. No download, server, browser, or Lighthouse audit ran. No scores or item completion are claimed.

Validation on Mac-mini.local in /Users/natalie/Development/portfolio: `ASTRO_TELEMETRY_DISABLED=1 npm run build` passed with zero errors, warnings, or hints. The build checked 179 local references across eight HTML pages and passed the hidden-output guard. `npm test` passed all ten tests. Source, media, dependencies, and project-verification evidence remain unchanged. Nothing was committed, pushed, deployed, or changed on GitHub or Pages.

## Pass 20: Performance prerequisite and validation, 2026-10-30

Deep item 6 remains the first unfinished item. Lighthouse is absent from the temporary install. Requested a download-runner choice with the exact command, host, and directory, as required by the supplied global AGENTS.md instruction to wait for that choice. No answer arrived during validation and the subsequent wait. The choice remains pending. No download, preview server, browser, or Lighthouse audit ran; no scores or completion are claimed.

Re-read facts.md, the untested triage, verified-projects.md, and prior pass notes. Reconciled experience.json and rendered experience copy; approval flags, neutral partner wording, team/solo roles, and demo/pilot and not-production wording need no corrections. Existing hidden placeholders and their consumer/output safeguards remain intact. No source, media, dependency, or project-evidence changes were needed.

Validation on Mac-mini.local in /Users/natalie/Development/portfolio: `ASTRO_TELEMETRY_DISABLED=1 npm run build` passed with zero errors, warnings, or hints, including the hidden-output guard and 179 local references across eight HTML pages. `npm test` passed all ten tests. Only this pass record changed. Nothing was committed, pushed, deployed, or changed on GitHub or Pages. Continue item 6 after the pending runner choice; the exact install command is recorded in Pass 17.

## Pass 21: Mobile Lighthouse performance, 2026-10-30

deep item 6 done

Dan explicitly selected the assistant to run remaining performance downloads. Recorded that decision and the install-failure continuation rule in AGENTS.md. Ran the approved `npm install --prefix /private/tmp/portfolio-lighthouse --cache /private/tmp/portfolio-lighthouse-cache --no-audit --no-fund lighthouse` on Mac-mini.local from /private/tmp. It succeeded with 119 packages added in 25 seconds. No repository dependencies changed.

Ran Lighthouse 13.6.0 with installed headless Chrome 158.0.8117.2 against the built home and Eyrie pages. Used the default mobile preset, a 412 by 823 viewport at 1.75 device scale, simulated mobile network throttling and 4x CPU slowdown. Both pages scored 100 for performance, accessibility, best practices, and SEO. Neither report has run warnings or failed scored audits. Home measured FCP/LCP 0.7 seconds and speed index 1.0 seconds; Eyrie measured FCP/LCP and speed index 0.6 seconds. Both measured total blocking time 0 ms and cumulative layout shift 0. These are local simulated lab measurements, not field or production-hosting results. Lighthouse's manual accessibility and structured-data checks remain manual; a 100 accessibility score does not establish full WCAG conformance.

Existing responsive captures needed no further changes. Confirmed all five approved captures have 360/720/960/1440px WebP variants, 20 files total, with matching widths and original aspect ratios. The shared image component retains declared width/height, responsive srcset/sizes, lazy loading, genuine content, alt text, and first-run or sign-in captions. No source content, media, or project-verification evidence changed during this pass.

Re-read facts.md, the untested triage, verified-projects.md, and pass notes. Reconciled experience.json and all rendered experience summaries and highlights with facts.md. No corrections were needed. Employer/client approval flags, neutral partner fallback, team/solo attribution, and explicit demo/pilot and not-production wording remain correct. Existing hidden-record guards cover public data, cards, static routes, sitemap, metadata, link checking, verification, and generated output.

Validation on Mac-mini.local in /Users/natalie/Development/portfolio:

- `ASTRO_TELEMETRY_DISABLED=1 npm run build` passed with zero errors, warnings, or hints. The generated-output exclusion guard and 179 local references across eight HTML pages passed. `npm test` passed all ten tests. `git diff --check` passed.
- Started `npm run preview -- --host 127.0.0.1 --port 4345`, recorded listener PID 89532, and audited /portfolio/ and /portfolio/projects/eyrie/. The CLI used `--chrome-flags='--headless --no-first-run' --only-categories=performance,accessibility,best-practices,seo --output=json --output=html --no-enable-error-reporting --quiet` with the installed Chrome executable selected through CHROME_PATH.
- The first sandboxed Chrome launch failed with `Runtime error encountered: waiting for dynamic debugging port in chrome-err.log`. Retried with sandbox escalation; both audits succeeded. Stopped exactly preview PID 89532 with sandbox escalation and confirmed port 4345 was released. Lighthouse closed its isolated browser instances.
- Full HTML/JSON reports, extracted settings and metrics, and image-dimension evidence remain only in /private/tmp/portfolio-qa/pass21/, equivalent to /tmp/portfolio-qa/pass21/. The report names retain the baseline suffix because the initial successful scores already met the target and no site optimization was needed.

Deep item 7 is next. Physical-device performance, production network/hosting, other browser engines, project runtime behavior, authenticated services, and remote CI remain untested in this pass. Nothing was committed, pushed, deployed, or changed on GitHub or Pages.

## Pass 22: How I work, 2026-10-30

deep item 7 done

Gave the existing agent-assisted workflow statement its own short, labeled home-page section. The wording comes directly from facts.md, with the semicolon split into two sentences: coding agents write much of Dan's code; he specifies the problem, reviews every change, tests it live, and decides what ships. Kept biography and education in a separate About section and updated section numbering. Both sections share the existing responsive layout and print styling. No dependencies or project evidence changed.

Re-read facts.md, the untested triage, verified-projects.md, and prior pass notes. Reconciled experience.json and all rendered experience copy with facts.md. No corrections were needed. Employer/client approval flags, neutral client fallback, team/solo attribution, and explicit demo/pilot and not-production wording remain correct. Hidden placeholders and their consumer/output safeguards were already complete and remain intact.

Validation on Mac-mini.local in /Users/natalie/Development/portfolio:

- `ASTRO_TELEMETRY_DISABLED=1 npm run build` passed with zero errors, warnings, or hints, including 179 local references across eight HTML pages and the generated-output exclusion guard. `npm test` passed all ten tests. `git diff --check` passed.
- Used installed Playwright and isolated headless Chrome against `npm run preview -- --host 127.0.0.1 --port 4346`. Home-page checks passed at 360/768/1280px in both system-selected themes: the workflow matches the supplied facts, appears once, has a labeled section and heading, stacks on phones, fits side by side at wider widths, and causes no horizontal overflow or runtime errors. Rechecked rendered experience summaries, highlights, and approval fallbacks.
- Six full-home-page axe scans, with all default rules and no exclusions, reported zero violations. Existing color-contrast incomplete results remain in the reports; this pass does not claim full WCAG conformance. Captured both affected sections in all six combinations and visually inspected representative phone, tablet, desktop, and print-style captures. The print smoke check confirms the workflow remains visible in block layout, but does not verify pagination.
- Reports, captures, and the temporary audit script remain only in /private/tmp/portfolio-qa/pass22/. The first sandboxed browser launch failed with `Target page, context or browser has been closed` and `Error: kill EPERM`; the isolated audit succeeded with sandbox escalation. Closed the audit browser, stopped exactly preview PID 94538 with sandbox escalation, and confirmed port 4346 was released.

Deep item 8, the HTML resume, is next. Physical devices, other browser engines, project runtime behavior, authenticated services, remote CI, and hosting were outside this pass. Nothing was committed, pushed, deployed, or changed on GitHub or Pages.
