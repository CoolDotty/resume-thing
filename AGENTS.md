# AGENTS.md

Guide for agentic coding agents working in this repository.

## Project Overview

This is a React 19 + TypeScript + Vite application that generates PDF files. It uses modern ES modules and follows strict TypeScript configuration.

## Build/Lint/Test Commands

```bash
npm run dev          # Start Vite dev server with hot reload
npm run build        # TypeScript compile + Vite build (tsc -b && vite build)
npm run lint         # Run TypeScript check + ESLint (tsc --noEmit && eslint .)
npm run format       # Format all files with Prettier
npm run format:check # Check formatting without making changes
npm run preview      # Preview production build locally
```

**Note:** No test framework is currently configured. Consider adding Vitest for unit tests if testing is needed.

## Code Style Guidelines

### Formatting (Prettier)

- **No semicolons** - Do not use semicolons at end of statements
- **Single quotes** - Use single quotes for strings, not double quotes
- **Trailing commas** - Use trailing commas where valid in ES5 (arrays, objects)
- **Indentation** - 2 spaces (no tabs)
- **Print width** - 100 characters max line length

```typescript
// Correct
const greeting = 'hello'
const items = [
  'one',
  'two',
]

// Incorrect
const greeting = "hello";
const items = ["one", "two"];
```

### Imports

- Use ES module syntax (`import`/`export`)
- Import React hooks and functions at the top of files
- Import CSS files directly (e.g., `import './App.css'`)
- Keep imports organized: external packages first, then local imports

```typescript
import { useEffect, useMemo } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
```

### TypeScript

- **Strict mode enabled** - All strict type checking options are on
- **No unused locals/parameters** - Will cause build errors
- **Use explicit types** - Avoid `any`; prefer explicit type annotations
- **File extensions** - Use `.ts` for pure TypeScript, `.tsx` for React components

```typescript
// Explicit function return types preferred for exported functions
export function buildPdfWithText(text: string): Blob {
  // ...
}
```

### React Conventions

- **Functional components only** - Use function declarations, not arrow functions
- **Default exports** for components
- **Named exports** for utilities and helper functions
- Use `useMemo` for expensive computations
- Use `useEffect` for side effects with proper cleanup

```typescript
function MyComponent() {
  const value = useMemo(() => computeExpensive(), [])
  
  useEffect(() => {
    return () => cleanup()
  }, [deps])

  return (
    // JSX
  )
}

export default MyComponent
```

### Naming Conventions

- **Components**: PascalCase (e.g., `App`, `PdfPreview`)
- **Functions/variables**: camelCase (e.g., `buildPdfBody`, `handleDownload`)
- **Files**: Match primary export (Component.tsx for components, utility.ts for utilities)
- **CSS classes**: kebab-case lowercase (e.g., `.preview`, `.literal`)

### JSX Style

- Use parentheses for multi-line JSX
- Self-close tags for elements without children
- Use `type` attribute on buttons
- Use `className` for CSS classes

```typescript
return (
  <main className="app">
    <section className="controls">
      <h1>Title</h1>
      <button type="button" onClick={handleClick}>
        Click me
      </button>
    </section>
  </main>
)
```

### File Organization

```
src/
  App.tsx       # Main application component
  App.css       # Component-specific styles
  main.tsx      # Application entry point
  index.css     # Global styles
  pdf.ts        # PDF generation utilities
```

## Important Notes

- **No test framework**: Tests are not configured; add Vitest if testing is needed
- **React 19**: Using React 19 with StrictMode enabled
- **Vite 7**: Modern build tooling with Fast Refresh
- **ESLint flat config**: Using the new flat config format (eslint.config.js)
- **Binary handling**: PDF generation uses ArrayBuffer/Uint8Array for binary content

## Pre-commit Checklist

1. Run `npm run lint` - Fix all TypeScript and ESLint errors
2. Run `npm run format:check` - Ensure formatting is correct
3. Run `npm run build` - Verify the build succeeds