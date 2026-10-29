# Portfolio instructions

- Use `/Users/natalie/Development/portfolio-brief/facts.md` as the only source of biographical and experience facts. Preserve the project seeds explicitly supplied in the task. Treat triage as untested context.
- Keep work local. Do not commit, push, mutate GitHub state, deploy, or enable GitHub Pages without explicit approval for that action.
- Do not publish phone numbers, addresses, family details, private repository links, or Superbuilders project cards, links, or screenshots.
- Keep client and partner names as approval placeholders in `src/data/experience.json`. Render only neutral approved descriptions when `needsDanOk` is true. Never render the placeholder itself.
- Keep projects in `src/data/projects.json`. Use the exact list and order in `/Users/natalie/Development/portfolio-brief/v2/verified-projects.md`, which supersedes earlier project seeds. New projects default to `pending-verification`. Preserve supplied verification evidence and limits; ChatGenius is code only with no demo. Hide demo links when `demo` is null. Do not treat a successful portfolio build as project verification.
- Never fabricate screenshots or demo images. Use only the genuine captures approved in `portfolio-brief/v2/verified-projects.md`, with honest first-run or sign-in captions. Resize or convert formats without changing content. Leave other media slots empty or use clearly labeled CSS or SVG placeholders.
- Display only the approved total label `750+ merged pull requests`, linked to the upstream search in `facts.md`. Keep `src/data/opensource.json` count `display: true`; never render the exact internal value or another total.
- Keep the site static, accessible, responsive, and lightweight. Respect system color preferences and persist explicit theme choices.
- Run `npm run build` and resolve all build errors before completing a pass. Append its changes and validation limits to `PASS_NOTES.md`.
- Every pass, re-read `facts.md` and reconcile `src/data/experience.json` and all rendered experience copy, including approval flags and explicit demo/pilot, not-production wording.
