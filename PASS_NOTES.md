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
