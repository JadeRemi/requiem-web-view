# AI Guidelines for requiem-web-view

This document contains project preferences and guidelines for AI assistants working on this codebase.

## Project Overview

**requiem-web-view** is a React TypeScript web application built with Vite. The project is an analytics portal for a game project, featuring data tables, graphs, and 3D rendering.

## Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite (builds to `/dist`)
- **Package Manager**: **Yarn** (always use `yarn add --exact`, never npm)
- **Routing**: React Router v6
- **State Management**: Zustand
- **3D Graphics**: Three.js (with @react-three/fiber and @react-three/drei)
- **Unit Testing**: Vitest
- **E2E Testing**: Playwright

## AI Interaction Rules

- **Never prompt to run the project** - user will run it themselves
- **Never suggest `rm -rf` commands** - use file deletion tools or let user handle manually
- **Never provide "getting started" instructions** at the end of responses
- **Install all dependencies with `yarn add --exact`** - no ^ or ~ version prefixes
- **Use yarn, not npm** - all commands should use yarn
- **NEVER add unrequested changes** - Only implement exactly what is asked. Do not add "improvements", extra features, or style changes that were not requested.
- **Ask before making assumptions** - If requirements are unclear, ask for clarification rather than making assumptions.
- **Preserve existing styles when refactoring** - When splitting or reorganizing CSS files, do not modify any style values. Only reorganize the structure.
- **No duplicate page headers** - Pages should NOT have their own H1 headers with the page title. The sidebar already shows the current page, so adding "Settings" heading to Settings page is redundant. Exception: pages where the header adds context beyond just the page name.

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
- Run `yarn typecheck` to verify type safety

### Mock Data

Mock data for development lives in `/src/mock/`:
- Use `satisfies` keyword to reference DTO-like interfaces
- Use `as const` to freeze mock data
- Example: `export const MOCK_PLAYERS = [...] as const satisfies readonly PlayerDTO[]`

### Testing

- Unit tests with Vitest in `__tests__` directories or `*.test.ts` files
- E2E tests with Playwright in `e2e/` directory
- No tests required for simple utility functions unless business-critical

### Three.js / 3D

- Use @react-three/fiber for React integration
- Use @react-three/drei for common abstractions and helpers
- Keep 3D scene logic separate from UI components

#### Making 3D Models Face the Camera

When creating a new 3D model viewer and the model appears invisible or faces away from the camera, the **key fix** is using `OrbitControls` with an explicit `target` prop. Without `target`, the camera doesn't automatically look at the model.

**What works (EnemyViewer pattern):**
```tsx
<PerspectiveCamera
  makeDefault
  position={[0, 0.8, -4]}  // Camera at NEGATIVE Z
  fov={50}
/>
<OrbitControls
  enablePan={false}
  enableZoom={false}
  enableRotate={false}  // Disable if non-interactive
  target={[0, 0.8, 0]}  // CRITICAL: Makes camera look at this point
/>
```

**What doesn't work:**
- `PerspectiveCamera` alone without `OrbitControls` - camera won't look at model
- `OrbitControls` without explicit `target` prop - unpredictable behavior
- Trying to fix with `<Center>`, axis inversion, or model `rotation` props - these don't address the core issue
- Camera at positive Z without target - model faces away

**Reference implementations:**
- `EnemyViewer.tsx` - Camera at negative Z + OrbitControls with target (model faces camera)
- `SkinViewer.tsx` - Camera at positive Z + OrbitControls with target (model faces camera)
- `EquipmentViewer.tsx` - Uses model rotation props (requires per-model tuning)

## File Structure

```
src/
├── api/            # API client and backend communication
├── components/     # React components
│   ├── ErrorBoundary.tsx
│   ├── Icon.tsx    # Colorable SVG icons
│   ├── Sidebar.tsx # Navigation sidebar
│   ├── Table.tsx   # Reusable data table
│   └── Toast.tsx   # Notification system
├── config/         # Global configuration and constants
│   └── index.ts    # All project-wide constants
├── hooks/          # Custom React hooks
├── mock/           # Mock data for development
├── pages/          # Page components (route targets)
├── scenes/         # Three.js scene components
├── styles/         # CSS files and style utilities
│   └── palette.css # Color palette CSS variables
├── types/          # TypeScript types, interfaces, enums
│   ├── api.ts      # API DTOs and interfaces
│   └── skin.ts     # 3D model types
├── utils/          # Reusable utility functions
├── legacy/         # INSPECTION ONLY - do not execute or import
e2e/                # Playwright E2E tests
dist/               # Production build output
```

### Folder Conventions

| Folder | Contents |
|--------|----------|
| `/api` | API client functions and backend communication |
| `/config` | **All global project constants** - routes, presets, dimensions, etc. |
| `/mock` | **Mock data** - uses `satisfies` + `as const` pattern |
| `/utils` | All reusable utility functions |
| `/types` | All TypeScript types, interfaces, and enums |
| `/styles` | CSS files including `palette.css` for design tokens |
| `/components` | Reusable React components |
| `/pages` | Route page components |
| `/hooks` | Custom React hooks |
| `/scenes` | Three.js scene-specific components |
| `/legacy` | **Inspection only** - dump of reference files, never import or execute |

## Configuration (`/config`)

All global project constants must be defined in `/config/index.ts`:

- **Route paths**: `ROUTES.HOME`, `ROUTES.PROFILE`, `ROUTES.LADDER`, `ROUTES.MAP`
- **Preset values**: `PRESET_SKINS`, default UUIDs
- **External URLs**: API bases, texture servers
- **Model dimensions**: `MODEL_DIMENSIONS`, `TEXTURE_DIMENSIONS`
- **Animation constants**: `ANIMATION` timing values
- **Viewer defaults**: `SKIN_VIEWER_DEFAULTS`

```typescript
// Example usage
import { ROUTES, PRESET_SKINS, ANIMATION } from '../config'
```

## Components

### Icon Component (`/components/Icon.tsx`)

Colorable SVG icon component. Use instead of FontAwesome:

```tsx
import { Icon } from '../components/Icon'

<Icon name="home" size={24} color="var(--grey-400)" />
```

Available icons: `home`, `user`, `trophy`, `map`, `menu`, `close`, `chevron-up`, `chevron-down`, `chevron-left`, `chevron-right`, `chart`, `settings`

### Table Component (`/components/Table.tsx`)

Reusable data table with:
- Sortable columns (chevron icons)
- Fixed header
- Infinite scroll support
- Loading states

### Toast Component (`/components/Toast.tsx`)

Notification system:
```tsx
const toast = useToast()
toast.success('Operation completed')
toast.error('Something went wrong')
```

### Sidebar (`/components/Sidebar.tsx`)

Collapsible navigation sidebar. Add new pages to `SIDEBAR_ITEMS` array.

## CSS Palette

The project uses CSS custom properties defined in `src/styles/palette.css`:

- **Grey scale**: `--grey-0` (white) to `--grey-1000` (black) - **grey tones only for now**
- **Semantic colors**: `--color-bg-*`, `--color-text-*`, `--color-border-*`
- **Interactive colors**: `--color-interactive-*` (using light greys)
- **Spacing**: `--space-1` through `--space-16`
- **Shadows**: `--shadow-sm`, `--shadow-md`, `--shadow-lg`, `--shadow-xl`

### Color Rules

- **No orange/yellow colors for interactive elements** - Never use orange or yellow colors for hover effects, link colors, active states, or badges/highlights
- **Hover interactions should use underline** - For links and clickable text, use `text-decoration: underline` on hover, not color changes. Match the ladder page pattern.
- Use grey scale (grey-100 to grey-500) for hover states
- Use magenta for accent colors when needed

### Fonts

Available font variables:
- `--font-ethnocentric` - Ethnocentric - **H1 headings**
- `--font-orbitron` - Orbitron (Google Fonts) - UI elements, profile page
- `--font-pixelify` - Pixelify Sans (Google Fonts)
- `--font-nirmala` - Nirmala UI (system font)
- `--font-mono` - Monospace fallback stack
- `--font-sans` - System sans-serif fallback

**H1 Rule**: All `<h1>` elements use Ethnocentric font automatically (set in index.css)

### Typography Sizes

`--text-xs` through `--text-5xl`

Always use these CSS variables instead of hardcoded values.
**Do not use accent/colored styles** - grey palette only until magenta is added later.

## Routing

Routes are defined in `/config/index.ts` and used in `App.tsx`:

| Route | Page | Description |
|-------|------|-------------|
| `/` | HomePage | Landing page |
| `/profile` | ProfilePage | 3D skin viewer |
| `/ladder` | LadderPage | Player rankings table |
| `/map` | MapPage | World map (iframe) |
| `*` | NotFoundPage | 404 with auto-redirect |

Base URL is dynamic:
- Development: `/`
- Production (GitHub Pages): `/requiem-web-view/`

## API Architecture

The `/api/client.ts` provides a prototype for the future Go backend:
- Currently returns mock data from `/mock/`
- Uses typed interfaces from `/types/api.ts`
- Pagination, sorting, and filtering support built-in

## Commands

- `yarn dev` - Start development server (opens browser automatically)
- `yarn build` - Build for production (outputs to /dist)
- `yarn preview` - Preview production build locally
- `yarn lint` - Run ESLint
- `yarn typecheck` - TypeScript type checking
- `yarn test` - Run unit tests
- `yarn test:e2e` - Run Playwright tests
- `yarn test:e2e:ui` - Run Playwright with UI
- `yarn deploy` - Deploy to GitHub Pages (runs build first)

## Deployment

- **Platform**: GitHub Pages via gh-pages package
- **Base URL**: `/requiem-web-view/` (configured in vite.config.ts for production)
