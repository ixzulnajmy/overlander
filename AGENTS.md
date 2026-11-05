# AGENTS.md

## House coding rules (Nov 2026)

Sources: Ash https://x.com/ash_uxi/status/2117459181636829650 and Jarred Sumner https://x.com/jarredsumner/status/2117037940031496252

**UI (every user-facing change)**
1. Before building, find existing tokens and components and use them.
2. Design every state: hover, focus, loading, empty, error, very long name.
3. Animate only transform and opacity; ease-out for entering; under 250ms.
4. Reserve space for images and async content; no layout shift.
5. Nested corners are concentric: outer radius = inner radius + padding.
6. Every tap target at least 44px.

**PERF (judgment, not dogma; adapt to Next.js/Supabase)**
7. When slow, redesign before adding a cache; no new cache without a stated reason (CDN/HTTP caching can be legitimate).
8. Prefer data-oriented design where it fits: flat arrays over maps, indices over pointers, structure-of-arrays in hot loops.
9. Small lists inline; bitsets over bool arrays where it matters.

**PROCESS**
10. Work in small, reviewable steps and report progress so the reviewer can sample the work mid-run. The coder never verifies its own work; independent QA checks rules 2-6 on the preview.

## Harness, Loop, Graph (house workflow, Nov 2026)
These rules apply to every coding agent in this repo: Claude CLI (reads CLAUDE.md, which imports this file), Codex CLI (reads AGENTS.md), and T3 Code. Locks: Sonnet 5.5 only, no Opus, no parallel agents, and the coder never verifies its own work.

### Harness: what the coder sees, touches, and is checked by
- **Guides:** the 10 rules above plus the per-task brief. If the brief and these rules conflict, stop and ask.
- **Sensors (all must pass before claiming done):** `npm run typecheck`, `npm run lint`, `npm run build` (there is no test script or CI yet). Paste the last lines of each result into progress.md. "It should work" doesn't count as a pass.
- **Never touch:** `.env*` files and secrets, production config (Vercel project/env settings, DNS, prod database URLs), applying migrations to any shared database (writing migration files is fine), and pushing to or force-pushing `main`. Work only on the brief's branch.
- **Trace:** keep `progress.md` at the repo root on the branch, with sections **Done / Failed / Next** and one entry per lap. Delete it in the final squash, or leave it if the reviewer asks.

### Loop: how each run is bounded
- **Goal:** the brief lists acceptance checks that a command or a click can prove ("`/admin/view-as` returns 200 for Super Admin"), never "make it better".
- **Lap:** read progress.md, then make one small change, run the sensors, commit (one commit per lap, message `lap N: <what>`), and update progress.md. Start each lap from progress.md plus git log, not from chat memory (fresh context).
- **Feedback:** sensor errors from lap N are the first input to lap N+1. Don't silence a check (no `@ts-ignore`, no skipped tests, no lint-disable) to make it pass.
- **Stops:** about 8 laps, about 30 minutes, or the brief's token cap, whichever comes first. Also stop if the same error survives 2 laps. On a stop, push the branch, write the blocker in progress.md under Failed, and report. Don't grind.

### Graph: who hands off to whom
`PM brief -> Linus writes T3 brief -> T3 loop -> (sensors green) PR + Vercel preview -> Sherlock/Linus QA on the preview`
- QA **fail** goes back to T3, with the QA report pasted into the next brief as input.
- A **UI change** also goes to Picasso for design review.
- QA **pass** means a PR comment beginning `QA PASS` from a reviewer who isn't the coder. No merge happens without it.
- **Human gate:** migrations, risky prod changes, and anything touching money, auth or user data wait on Izzul's explicit go (Danial for Jalin business decisions). An agent's own say-so is never approval.
- **Ship:** after the gate, Linus/T3 merges and deploys. Deploy goes through Vercel from main after merge.
