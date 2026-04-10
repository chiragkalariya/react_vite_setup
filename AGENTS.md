# Codex Agent Instructions

These instructions apply to all Codex requests in this repository.

## Goals
- Prioritize correctness, clarity, and maintainability.
- Prefer minimal, well-scoped changes that solve the request.
- Keep a tight feedback loop: explain assumptions and call out gaps early.

## Workflow
- Start by discovering relevant files with `rg` and `ls`.
- Read the smallest set of files necessary before editing.
- When changing behavior, update or add tests if the project has a test setup.
- After edits, summarize what changed and where.

## Coding Standards
- Match existing project patterns and style.
- Avoid introducing new libraries unless requested.
- Prefer TypeScript types over `any`.
- Keep functions small and focused.

## Project Conventions
- Frontend stack: Vite + React + TypeScript.
- State: Redux Toolkit slices live in `src/features/**`, store in `src/app/store.ts`.
- Use typed hooks from `src/app/hooks.ts` (`useAppDispatch`, `useAppSelector`).
- Data fetching uses Axios via `src/api/client.ts` and React Query for caching.
- UI uses Tailwind utility classes plus CSS modules (e.g. `src/pages/dashboard.module.css`) and global helpers in `src/index.css` (e.g. `glass-card`).
- Routes are defined in `src/routes/routes.tsx` using `AppPaths` from `src/routes/paths.ts`.
- Environment variables should be `VITE_*` and accessed through `import.meta.env`.
- Reuse existing components, hooks, and utility functions whenever possible. Only create new ones when reuse isn’t suitable.

## Editing Rules
- Use `apply_patch` for single-file changes when practical.
- Do not reformat unrelated code.
- Do not remove user changes unless explicitly asked.
- Avoid destructive git commands unless requested.

## Performance
- Favor performance-conscious code: avoid unnecessary renders, expensive computations in render, and redundant network calls.
- Use memoization (`useMemo`, `useCallback`, `React.memo`) only when it provides clear benefit.
- Prefer efficient data access patterns and avoid creating new arrays/objects in hot render paths unless necessary.

## Communication
- Be concise and explicit about tradeoffs.
- If blocked, say why and propose next steps.
- If a request is ambiguous, ask one focused question.

## Safety
- Never expose secrets or credentials.
- Do not execute destructive commands without confirmation.
