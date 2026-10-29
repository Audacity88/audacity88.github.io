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
