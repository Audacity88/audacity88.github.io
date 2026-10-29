# Edit portfolio data

Use `/Users/natalie/Development/portfolio-brief/facts.md` for biographical and experience facts. The project seed in the task supplies the initial project descriptions and links. Treat the triage document as untested context. Do not infer verified behavior from a repository README or the portfolio build.

## Update projects

Edit `projects.json`. The page sorts projects by ascending `order`. Each object has these fields:

| Field | Meaning |
| --- | --- |
| `id` | Unique lowercase ID with optional hyphens. |
| `title`, `oneLiner`, `description` | Public project copy. |
| `verificationNote` | Public evidence and limitations, shown under "What's verified" on the detail page. |
| `tech` | Array of short technology labels. |
| `github` | HTTPS repository or filtered upstream PR URL. |
| `demo` | HTTPS demo URL, or `null` to hide the demo button. |
| `status` | `pending-verification`, `verified`, or `demo-down`. |
| `featured` | Adds visual emphasis without changing the sort order. |
| `order` | Positive integer controlling the card position. |
| `notes` | Internal editing notes. Never rendered. |
| `images` | Optional array of genuine, approved images. An empty array renders a clearly labeled placeholder. |

Keep projects `pending-verification` until the owning verification pass supplies evidence. Use `demo-down` with `demo: null` for unavailable demos. A successful HTTP response alone does not verify login or application behavior.

Each project generates `/projects/<id>/` under the configured base path and appears in the sitemap. Cards link to those pages. Keep `verificationNote` consistent with the status and actual checks. Internal `notes` never appear on the page. No separate page file is needed when adding a project.

To add media, put genuine captures in `public/images/`. Add objects such as `{ "src": "/images/eyrie-dashboard.png", "alt": "Describe the actual captured screen" }` to `images`. Image paths omit the deployment base, which the component adds. Replace this example path and description with the real asset. Never use fabricated screenshots.

To swap a project, replace its entire object and preserve unique IDs and the intended order. Keep private and employer-owned projects out of this file.

## Update experience

Re-read `facts.md` every pass, then reconcile `experience.json` and all experience copy. `roles` controls the timeline order. `summary` and `highlights` are public copy. `notes` is internal.

Keep the top-level `reviewStatus` as `needs-dan-ok`. Keep each unapproved client name inside a `[CLIENT: ..., needs Dan OK]` placeholder, with `needsDanOk: true`. Put the neutral description approved in `facts.md` in `publicFallback`. The component renders that fallback while approval is pending. Never render a placeholder. Change approval flags and client names only after explicit approval.

Keep Superbuilders' role-level `needsDanOk: true`. Its employer name is shown as instructed in `facts.md`, but still awaits Dan's approval. TODO: obtain approval before publication. Do not put client names in summaries or highlights. Include only contract project names and headline results allowed by `facts.md`, and state that they were demoed or piloted, not shipped to production. Keep contract project cards, links, screenshots, and videos out of the site.

## Update open-source work

Edit `opensource.json` to update the selected merged PR cards and verification date. Keep PR numbers, URLs, dates, and claims tied to approved evidence.

The `count` field has `display: true` and the approved label `750+ merged pull requests`, linked to the filtered upstream search. The build enforces that flag and label. Keep the exact `value` and notes internal. Do not render another total. This approval comes from the Oct 29 update in `facts.md`.

## Check changes

Run `npm test` and `npm run build` after edits. The dependency-free Node tests check JSON shapes, required fields, allowed statuses, demo and GitHub URLs, unique IDs and order values, approval flags, and prohibited contract/private links. CI runs these tests before building. `content.ts` also validates required fields, HTTPS links, statuses, unique project IDs, and the approved count flag and label during the build. Validation cannot establish whether a factual claim or demo is correct. Append the pass outcome and remaining verification work to `PASS_NOTES.md`.
