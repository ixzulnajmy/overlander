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
