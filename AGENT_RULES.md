# [SYSTEM ARCHITECTURE & CONSTRAINTS]
YOU MUST READ AND OBEY THESE RULES BEFORE GENERATING ANY CODE.

## 1. FSD Strict Rules
- CRITICAL: Cross-imports from higher or equal layers are STRICTLY FORBIDDEN.
- Entities CANNOT import from Features, Widgets, or Views.
- Shared layer MUST remain completely stateless.

## 2. State Management (React Query + Zustand)
- FORBIDDEN: Storing server data (API responses, tasks) in Zustand.
- REQUIRED: Use React Query for all async data and server state.
- REQUIRED: Implement Optimistic Updates via `queryClient.setQueryData()`.
- REQUIRED: Zustand is EXCLUSIVELY for ephemeral UI state. No bulk destructuring.

## 3. Execution & Tooling Safety
- FORBIDDEN: Do not use `sed`, `awk`, or regex-based bash scripts to modify React/TypeScript files. You must edit AST or use native file writing.
- FORBIDDEN: You cannot disable linter rules globally or use `eslint-disable` to bypass architectural errors.

## 4. QA & Validation Protocol
- REQUIRED: Autonomously run `npm run lint` and `npm run typecheck` after every logical block of changes.
- REQUIRED: Fix all TypeScript and ESLint errors architecturally. Do not hide them.
