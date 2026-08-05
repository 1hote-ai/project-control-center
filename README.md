# Project Control Center

Next.js dashboard scaffold for managing project workflows, tasks, and UI state.

## Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- React Query
- Zustand
- dnd-kit
- Framer Motion
- Recharts

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run typecheck
npm run test
```

## Current structure

```text
src/
├── app/
├── views/
├── widgets/
├── features/
├── entities/
└── shared/
    ├── api/
    ├── constants/
    ├── hooks/
    ├── lib/
    ├── types/
    └── ui/
```

## Conventions

- `app/` is the routing and shell layer.
- `views/` contains page compositions.
- `widgets/` contains reusable dashboard blocks.
- `features/` contains user-facing actions and flows.
- `entities/` contains domain objects and their model logic.
- `shared/` contains reusable low-level utilities, UI, and types.

## Notes

- `typecheck` is enabled in `package.json`.
- Architectural boundaries are enforced through ESLint.
- Empty folders are kept with `.gitkeep` until real modules are added.
