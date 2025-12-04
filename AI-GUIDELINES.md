# AI Guidelines for requiem-web-view

This document contains project preferences and guidelines for AI assistants working on this codebase.

## Project Overview

**requiem-web-view** is a React TypeScript web application built with Vite. The project will utilize Three.js for 3D rendering.

## Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite (builds to `/dist`)
- **Routing**: React Router v6
- **3D Graphics**: Three.js (with @react-three/fiber and @react-three/drei)
- **Unit Testing**: Vitest
- **E2E Testing**: Playwright

## AI Interaction Rules

- **Never prompt to run the project** - user will run it themselves
- **Never suggest `rm -rf` commands** - use file deletion tools or let user handle manually
- **Never provide "getting started" instructions** at the end of responses
- **Install all dependencies with `--exact`** - no ^ or ~ version prefixes

## Development Preferences

### General

- **No dark mode implementation needed** - single theme only
- **No internationalization (i18n)** - English only
- Keep dependencies minimal and intentional
- Prefer functional components with hooks
- Keep `ErrorBoundary` component - it's a useful utility
- **Minimize "Minecraft" references** - avoid in file names, visible text, and component names where possible

### Code Style

- Use TypeScript strict mode
- Prefer `const` over `let` when possible
- Use named exports for components
- Keep components small and focused
- **Never use `any`, `never`, or `unknown` types** - always provide explicit types
- Run `npm run typecheck` to verify type safety

### Testing

- Unit tests with Vitest in `__tests__` directories or `*.test.ts` files
- E2E tests with Playwright in `e2e/` directory
- No tests required for simple utility functions unless business-critical

### Three.js / 3D

- Use @react-three/fiber for React integration
- Use @react-three/drei for common abstractions and helpers
- Keep 3D scene logic separate from UI components

## File Structure

```
src/
├── components/     # React components (includes ErrorBoundary)
├── config/         # Global configuration and constants
│   └── index.ts    # All project-wide constants
├── hooks/          # Custom React hooks
├── pages/          # Page components (route targets)
├── scenes/         # Three.js scene components
├── styles/         # CSS files and style utilities
│   └── palette.css # Color palette CSS variables
├── types/          # TypeScript types, interfaces, enums
├── utils/          # Reusable utility functions
├── legacy/         # INSPECTION ONLY - do not execute or import
e2e/                # Playwright E2E tests
dist/               # Production build output
```

### Folder Conventions

| Folder | Contents |
|--------|----------|
| `/config` | **All global project constants** - routes, presets, dimensions, etc. |
| `/utils` | All reusable utility functions |
| `/types` | All TypeScript types, interfaces, and enums |
| `/styles` | CSS files including `palette.css` for design tokens |
| `/components` | Reusable React components |
| `/pages` | Route page components |
| `/hooks` | Custom React hooks |
| `/scenes` | Three.js scene-specific components |
| `/legacy` | **Inspection only** - dump of reference files, never import or execute. Contains commented legacy code for UV mapping and animation reference. |

## Configuration (`/config`)

All global project constants must be defined in `/config/index.ts`:

- **Route paths**: `ROUTES.HOME`, `ROUTES.PROFILE`, etc.
- **Preset values**: `PRESET_SKINS`, default UUIDs
- **External URLs**: API bases, texture servers
- **Model dimensions**: `MODEL_DIMENSIONS`, `TEXTURE_DIMENSIONS`
- **Animation constants**: `ANIMATION` timing values
- **Viewer defaults**: `SKIN_VIEWER_DEFAULTS`

```typescript
// Example usage
import { ROUTES, PRESET_SKINS, ANIMATION } from '../config'
```

## CSS Palette

The project uses CSS custom properties defined in `src/styles/palette.css`:

- **Grey scale**: `--grey-0` (white) to `--grey-1000` (black) - **grey tones only for now**
- **Semantic colors**: `--color-bg-*`, `--color-text-*`, `--color-border-*`
- **Interactive colors**: `--color-interactive-*` (using light greys)
- **Spacing**: `--space-1` through `--space-16`
- **Shadows**: `--shadow-sm`, `--shadow-md`, `--shadow-lg`, `--shadow-xl`

### Fonts

Available font variables:
- `--font-orbitron` - Orbitron (Google Fonts) - **primary for /profile**
- `--font-pixelify` - Pixelify Sans (Google Fonts)
- `--font-ethnocentric` - Ethnocentric (requires local install)
- `--font-nirmala` - Nirmala UI (system font)
- `--font-mono` - Monospace fallback stack
- `--font-sans` - System sans-serif fallback

### Typography Sizes

`--text-xs` through `--text-5xl`

Always use these CSS variables instead of hardcoded values.
**Do not use accent/colored styles** - grey palette only until magenta is added later.

## Routing

Routes are defined in `/config/index.ts` and used in `App.tsx`:

| Route | Page | Description |
|-------|------|-------------|
| `/` | HomePage | Landing page |
| `/profile` | ProfilePage | Skin viewer page |

Base URL is `/requiem-web-view/` for GitHub Pages deployment.

## Commands

- `npm run dev` - Start development server (opens browser automatically)
- `npm run build` - Build for production (outputs to /dist)
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint
- `npm run typecheck` - TypeScript type checking
- `npm run test` - Run unit tests
- `npm run test:e2e` - Run Playwright tests
- `npm run test:e2e:ui` - Run Playwright with UI
- `npm run deploy` - Deploy to GitHub Pages (runs build first)

## Deployment

- **Platform**: GitHub Pages via gh-pages package
- **Base URL**: `/requiem-web-view/` (configured in vite.config.ts)
