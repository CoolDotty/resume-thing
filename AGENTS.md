# AGENTS.md

Coding agent instructions for this repository.

## Project Overview

Minimal Vite + React + TypeScript app that converts OpenResume JSON state into downloadable PDFs using `@react-pdf/renderer`. React is pinned to `18.2.0` for PDF library compatibility.

## Build/Lint/Test Commands

```bash
npm run dev          # Start Vite dev server
npm run build        # TypeScript compile + Vite build (production)
npm run lint         # ESLint + TypeScript type check
npm run format       # Prettier format all files
npm run preview      # Preview production build locally
```

**Note:** No test framework is configured. Consider adding Vitest if tests are needed.

## Code Style Guidelines

### Formatting (Prettier)

- **No semicolons**
- **Double quotes** for strings
- **No trailing commas**
- **Print width:** 100 characters
- **Indentation:** 2 spaces (no tabs)

### TypeScript

- Strict mode enabled with `noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch`
- Use `type` keyword for type-only imports: `import type { Foo } from "bar"`
- Prefer `interface` for object shapes; use `type` for unions, utilities, or when extending is not needed
- Explicit return types optional but encouraged for exported functions

### Imports

```typescript
import { useMemo, useState } from "react"
import { pdf } from "@react-pdf/renderer"
import { ResumePDF } from "components/Resume/ResumePDF"
import { initialAppState } from "lib/redux/resumeDefaults"
import type { Resume, Settings } from "lib/redux/types"
```

1. React/external packages first
2. Internal imports using path aliases (`components/*`, `lib/*`)
3. Type imports last with `type` keyword

### Path Aliases

Configured in `tsconfig.app.json` and `vite.config.ts`:

- `components/*` → `src/openresume/components/*`
- `lib/*` → `src/openresume/lib/*`

Always use these aliases instead of relative paths when importing across directories.

### Naming Conventions

| Element      | Convention                                         | Example                   |
| ------------ | -------------------------------------------------- | ------------------------- |
| Components   | PascalCase                                         | `ResumePDFWorkExperience` |
| Functions    | camelCase                                          | `normalizeProfile`        |
| Variables    | camelCase                                          | `workExperiences`         |
| Constants    | SCREAMING_SNAKE_CASE                               | `DEFAULT_THEME_COLOR`     |
| Interfaces   | PascalCase (no `I` prefix)                         | `ResumeProfile`           |
| Type aliases | PascalCase                                         | `ShowForm`                |
| Files        | PascalCase for components, camelCase for utilities |                           |

### React

- Functional components only
- Use `const ComponentName = (...) => { ... }` or `export const ComponentName = (...) => (...)`
- Default exports for main component files: `export default App`
- Named exports for reusable components: `export const ResumePDFText = ...`
- Hooks at component top; custom hooks prefixed with `use`

### Error Handling

- Use try-catch for async operations; empty catch blocks acceptable when intentionally ignoring errors
- Provide user-facing error messages for parse/validation failures
- Use defensive programming with type guards and fallback values

```typescript
const parseAppState = (raw: string): { value: NormalizedAppState | null; error: string | null } => {
  try {
    const parsed = JSON.parse(raw) as unknown
    return { value: normalizeAppState(parsed), error: null }
  } catch {
    return { value: null, error: "Invalid JSON. Fix syntax before downloading." }
  }
}
```

### File Organization

```
src/
├── main.tsx                 # Entry point
├── App.tsx                  # Main application component
├── App.css                  # Application styles
└── openresume/
    ├── components/
    │   ├── fonts/           # Font registration hooks and constants
    │   └── Resume/
    │       └── ResumePDF/   # PDF rendering components
    └── lib/
        ├── constants.ts     # Shared constants
        └── redux/
            ├── types.ts     # TypeScript interfaces
            ├── settingsSlice.ts
            └── resumeDefaults.ts
```

## Dependencies

- **React 18.2.0** - Pinned version (do not upgrade; required for `@react-pdf/renderer@3.1.10`)
- **@react-pdf/renderer** - PDF generation
- **Vite 7** - Build tooling
- **ESLint 9** - Flat config format
- **Prettier 3** - Code formatting
- **TypeScript 5.9** - Type checking

## Before Committing

1. Run `npm run lint` and fix all errors
2. Run `npm run build` to ensure TypeScript compiles
3. Run `npm run format` if modifying formatting

## Notes

- Font files must exist in `public/fonts/` for PDF rendering (e.g., `Roboto-Regular.ttf`, `Roboto-Bold.ttf`)
- The app normalizes input JSON leniently—missing fields receive default values
- Use `DEBUG_RESUME_PDF_FLAG` in `lib/constants.ts` for debugging PDF layouts
