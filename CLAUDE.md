# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Essential Commands

### Development

```bash
npm run dev         # Start development server on http://localhost:3000
npm run dev:debug   # Start with Node.js debugger enabled
npm run build       # Build production bundle
npm run start       # Start production server
```

### Code Quality

```bash
npm run lint        # Run ESLint (Next.js, TypeScript, Prettier rules)
npm test            # Run Jest tests
npm test:watch      # Run tests in watch mode
npm run test -- path/to/test.test.ts  # Run specific test file
```

### Bundle Analysis

```bash
ANALYZE=true npm run build  # Build with bundle analyzer
```

## Architecture Overview

### Core Technologies

- **Next.js 14** (App Router) - React framework with SSR/SSG
- **Zustand** - Global state management (persisted to localStorage)
- **Tiptap** - Rich text editor for notes and annotations
- **Radix UI** - Headless UI components
- **TypeScript** - Type safety throughout
- **Tailwind CSS** - Utility-first styling with `tailwind-merge` and `clsx`

### Project Structure

#### State Management Pattern

The app uses Zustand stores with localStorage persistence:

- `useReaderStore` - Main application state (chapter navigation, highlights, theme)
- `useEditorStore` - Text editor state management
- Stores export selective hooks (e.g., `useCurrentChapter`, `useTheme`) for optimized re-renders

#### Key Architectural Decisions

1. **Route Structure**: `/(reader)/[chapter]/page.tsx` - Dynamic routing for chapters with automatic redirection from root to chapter-1
2. **Data Fetching**: Server-side data fetching in page components, passed down via props
3. **Error Handling**: Dedicated error boundaries for chapters and storage operations
4. **Optimistic Updates**: UI updates immediately with rollback on failure (see highlight operations)
5. **Component Organization**:
   - `/components/ui/` - Reusable UI primitives (shadcn/ui pattern)
   - `/components/[feature]/` - Feature-specific components
   - `/lib/utils/` - Utility functions and API helpers

### Testing Strategy

- **Jest** for unit and component tests with React Testing Library
- **Storybook** for component development and visual testing
- Test files colocated with components (`.test.ts`, `.test.tsx`)
- Mocks in `__mocks__` directories

### Performance Considerations

- Bundle analyzer configured for optimization analysis
- Lighthouse CI integration with performance budgets
- Web Vitals monitoring
- React Suspense for progressive loading

### Development Workflow

- **Husky** pre-commit hooks run `lint-staged` (Prettier formatting)
- All files auto-formatted on commit
- ESLint extends Next.js, TypeScript, and Prettier configs
