# Edit portfolio data

Use `/Users/natalie/Development/portfolio-brief/facts.md` for biographical and experience facts. The project seed in the task supplies the initial project descriptions and links. Treat the triage document as untested context. Do not infer verified behavior from a repository README or the portfolio build.

## Update projects

Edit `projects.json`. The page sorts projects by ascending `order`. Each object has these fields:

| Field | Meaning |
| --- | --- |
| `id` | Unique lowercase ID with optional hyphens. |
| `title`, `oneLiner`, `description` | Public project copy. |
| `tech` | Array of short technology labels. |
| `github` | HTTPS repository or filtered upstream PR URL. |
| `demo` | HTTPS demo URL, or `null` to hide the demo button. |
| `status` | `pending-verification`, `verified`, or `demo-down`. |
| `featured` | Adds visual emphasis without changing the sort order. |
| `order` | Positive integer controlling the card position. |
| `notes` | Internal editing notes. Never rendered. |
| `images` | Optional array of genuine, approved images. An empty array renders a clearly labeled placeholder. |

Keep projects `pending-verification` until the owning verification pass supplies evidence. Use `demo-down` with `demo: null` for unavailable demos. A successful HTTP response alone does not verify login or application behavior.

To add media, put genuine captures in `public/images/`. Add objects such as `{ "src": "/images/eyrie-dashboard.png", "alt": "Describe the actual captured screen" }` to `images`. Image paths omit the deployment base, which the component adds. Replace this example path and description with the real asset. Never use fabricated screenshots.

To swap a project, replace its entire object and preserve unique IDs and the intended order. Keep private and employer-owned projects out of this file.

## Update experience

Edit `experience.json`. `roles` controls the timeline order. `summary` and `highlights` are public copy. `notes` is internal.

Keep each unapproved client name as `[CLIENT: needs Dan OK]`, with `needsDanOk: true`. Leave `publicDescription` as `null` to hide it. If an approved neutral description is available, put that phrase in `publicDescription`. The component uses that description when `needsDanOk` is true and hides the placeholder. Change the flag and name only after explicit approval.

Do not put client names in summaries or highlights. Keep private project names and links out of the public timeline. The top-level TODO records the pending achievements source.

## Update open-source work

Edit `opensource.json` to update the selected merged PR cards and verification date. Keep PR numbers, URLs, dates, and claims tied to approved evidence. The page links to the filtered merged-PR list without a total.

The hidden `count` field is internal. Keep `display: false`. The build rejects another value, and no component renders the count or its notes.

## Check changes

Run `npm run build` after edits. `content.ts` validates required fields, HTTPS links, allowed statuses, unique project IDs, and the hidden count flag. Validation cannot establish whether a factual claim or demo is correct. Append the pass outcome and remaining verification work to `PASS_NOTES.md`.
