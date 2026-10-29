# Edit portfolio data

Use `/Users/natalie/Development/portfolio-brief/facts.md` for biographical and experience facts. `portfolio-brief/v2/verified-projects.md` supplies the current approved project list, evidence, and media, superseding earlier seeds. Treat the triage document as untested context. Do not infer verified behavior from a repository README or the portfolio build.

## Update projects

Edit `projects.json`. The page sorts projects by ascending `order`. Each object has these fields:

| Field | Meaning |
| --- | --- |
| `id` | Unique lowercase ID with optional hyphens. |
| `title`, `oneLiner`, `description` | Public project copy. |
| `verification`, `verificationDate` | Public check summary and date, shown on cards and detail pages. |
| `verificationNote` | Detailed evidence and limitations on the detail page. |
| `caseStudy` | Required detail-page copy: `problem`, `built`, `architecture`, and `limitations`. `sourceNotes` records nonempty internal source references and is never rendered. |
| `statusLabel` | Optional evidence-specific label for a verified badge. Pending projects always show "Verifying". |
| `demoLabel` | Optional demo-link label. Keep swift-ship labeled `Live sign-in page`. |
| `tech` | Array of short technology labels. |
| `github` | HTTPS repository or filtered upstream PR URL. |
| `demo` | HTTPS demo URL, or `null` to hide the demo button. |
| `status` | `pending-verification`, `verified`, or `demo-down`. |
| `featured` | Adds visual emphasis without changing the sort order. |
| `order` | Positive integer controlling the card position. |
| `notes` | Internal editing notes. Never rendered. |
| `images` | Array of genuine approved images, or `[]` for a text-only card. |

Keep projects `pending-verification` until the owning verification pass supplies evidence. Use `demo-down` with `demo: null` for unavailable demos. A successful HTTP response alone does not verify login or application behavior.

Each project generates `/projects/<id>/` under the configured base path and appears in the sitemap. Cards link to those pages. Keep `verificationNote` consistent with the status and actual checks. Internal `notes` never appear on the page. No separate page file is needed when adding a project.

Source case studies only from the verified project list, the project's `PORTFOLIO_REPORT.md` and READMEs under `/Users/dan/portfolio-triage/`, or its public repository README. Record the source file and relevant sections in `caseStudy.sourceNotes`. Distinguish capabilities found in source from behavior that was actually checked. Preserve upstream attribution, known failures, and the original check date. The public verification section attributes these checks to Eyrie; editing a case study does not reverify the project.

Eyrie and swift-ship also have `caseStudy.diagram`. Each simplified inline SVG has four `steps`, two detail lines per step, and three `connections` with two label lines each. `summary` supplies its screen-reader description. Visible `description` paragraphs explain the flow and omitted paths; `caveat` preserves the verification limits. The shared component keeps the diagram vertical so its labels remain readable on phones. Record the inspected source files in `caseStudy.sourceNotes`. These diagrams come from read-only code inspection authorized for the architecture pass; they do not establish working runtime behavior.

Approved media lives in `public/images/projects/`. Each image has `src` for its 1440px WebP, `srcSmall` for its 720px WebP, the full image's `width` and `height`, descriptive `alt` text, and an honest `caption`. Paths begin with `/images/` and omit the deployment base, which the component adds. Keep the whole captured screen. Do not crop, retouch, or fabricate content. Captures link to their full-size files. The flagship card previews its first image. Detail pages show all images.

The current approved captures are Eyrie's four empty first-run screens and swift-ship's sign-in page. The current project checks date to Oct 29, 2026 and come from Eyrie's supplied report, not this portfolio build. Preserve known native-test failures for codex-skills, the frontend-only scope for ChatGenius, and swift-ship's unverified authenticated workflows. Keep Tono4 pending until its simulator build is checked.

To swap a project, replace its entire object and preserve unique IDs and the intended order. Keep private and employer-owned projects out of this file.

### Record new project verification

After completing the project's actual checks, record the evidence with the local helper:

```sh
npm run project:verify -- tono4 --demo https://example.com/demo --verification "Describe the checks you completed" --note "Describe any remaining limits" --label "Build checked"
```

Replace the example URL and evidence before running. `--verification` is required to prevent a status change without recorded evidence. The helper sets `status: verified`, the HTTPS demo URL, evidence summary, current date, public verification note, and an internal audit note. It rejects unknown IDs, unsafe URLs, and employer links before writing. Run `npm test` afterward to check all content exclusions. Other projects stay unchanged. The helper does not run builds, access the demo, or prove that the evidence is accurate.

Use `--demo-label "Live sign-in page"` for a sign-in-only link. The existing label is preserved if the demo URL is unchanged. For a local-only project, edit the evidence and status manually and keep `demo: null`. Run `npm test` and `npm run build`, then inspect the affected card and detail page. Append the checks and limits to `PASS_NOTES.md`.

## Update experience

Re-read `facts.md` every pass, then reconcile `experience.json` and all experience copy. `roles` controls the timeline order. `summary` and `highlights` are public copy. `notes` is internal.

Keep the top-level `reviewStatus` as `needs-dan-ok`. Keep each unapproved client name inside a `[CLIENT: ..., needs Dan OK]` placeholder, with `needsDanOk: true`. Put the neutral description approved in `facts.md` in `publicFallback`. The component renders that fallback while approval is pending. Never render a placeholder. Change approval flags and client names only after explicit approval.

Keep Superbuilders' role-level `needsDanOk: true`. Its employer name is shown as instructed in `facts.md`, but still awaits Dan's approval. TODO: obtain approval before publication. Do not put client names in summaries or highlights. Include only contract project names and headline results allowed by `facts.md`, and state that they were demoed or piloted, not shipped to production. Keep contract project cards, links, screenshots, and videos out of the site.

## Update open-source work

Edit `opensource.json` to update the selected merged PR cards and verification date. Keep PR numbers, URLs, dates, and claims tied to approved evidence.

The `count` field has `display: true` and the approved label `750+ merged pull requests`, linked to the filtered upstream search. The build enforces that flag and label. Keep the exact `value` and notes internal. Do not render another total. This approval comes from the Oct 29 update in `facts.md`.

## Check changes

Run `npm test` and `npm run build` after edits. The dependency-free Node tests check JSON shapes, required fields, allowed statuses, demo and GitHub URLs, unique IDs and order values, approval flags, and prohibited contract/private links. CI runs these tests before building. `content.ts` also validates required fields, HTTPS links, statuses, unique project IDs, and the approved count flag and label during the build. Validation cannot establish whether a factual claim or demo is correct. Append the pass outcome and remaining verification work to `PASS_NOTES.md`.
