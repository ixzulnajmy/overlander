# progress.md: fix/next-security-patch

Base: origin/main @ 1b07cc6. Target: next + eslint-config-next 15.0.3 -> 15.0.8 (exact). react/react-dom stay 18.3.1.

## Done
- **Lap 1: bump Next.js 15.0.3 -> 15.0.8.** `npm install next@15.0.8 eslint-config-next@15.0.8 --save-exact`.
  - package.json: next + eslint-config-next exactly 15.0.8; react/react-dom still 18.3.1.
  - package-lock.json: next 15.0.8, eslint-config-next 15.0.8, @next/env + @next/eslint-plugin-next 15.0.8, @next/swc-* 15.0.5 (Next 15.0.8's own optionalDependencies pin). Lockfile written by npm, not hand-edited.
  - Diff scope: package.json, package-lock.json, progress.md. next-env.d.ts not regenerated.
  - Sensors (local, node v24.22.1 / npm 11.21.1):
    - `npm ci`: exit 0
    - `npm run typecheck`: exit 0 (tsc --noEmit, no output)
    - `npm run lint`: exit 0, one existing warning (components/TripCard.tsx 15:9 @next/next/no-img-element)
    - `npm run build`: exit 0, "Next.js 15.0.8", 17/17 static pages generated

## Failed
- Plain `npm run build` with no env exits 1 at prerender of /login ("@supabase/ssr: Your project's URL and API key are required"). Environmental, not caused by the bump: CI verify sets public placeholder `NEXT_PUBLIC_SUPABASE_*` / `NEXT_PUBLIC_SITE_URL` env vars (.github/workflows/ci.yml). Re-ran build with the same placeholders inline (no .env* touched) and it passed.

## Next
- Push branch, open PR to main (cite Vercel block + CVE-2025-55182 + GHSA-h25m-26qc-wcjf / CVE-2026-23864).
- Confirm CI `verify` green and Vercel preview READY with no "Vulnerable version of Next.js" message.
- Hand off to Sherlock for independent QA. No merge, no Prod.
