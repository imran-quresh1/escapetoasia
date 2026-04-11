# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

"Escape To Asia" is a travel agency website built in the **Base44** low-code platform (base44.com) and exported as a React app. It uses Base44's SDK for auth, database entities, and AI agent chat — the backend lives entirely in the Base44 cloud at `https://escape-to-asia-travel.base44.app`.

## Commands

```bash
npm run dev          # Start Vite dev server
npm run build        # Production build
npm run preview      # Preview production build locally
npm run lint         # ESLint (quiet mode)
npm run lint:fix     # Auto-fix ESLint issues
npm run typecheck    # TypeScript type check (no emit)
npm run deploy       # Build + deploy to GitHub Pages (runs predeploy → build first)
```

## Build & Deployment

**Local build**: `npm run build` outputs to `dist/`. Vite is configured with `base: '/escapetoasia/'` to match the GitHub Pages subdirectory path.

**GitHub Pages (manual)**: `npm run deploy` uses `gh-pages` to push the `dist/` folder to the `gh-pages` branch. Live at `https://imran-quresh1.github.io/escapetoasia/`.

**GitHub Actions (automatic)**: `.github/workflows/deploy.yml` triggers on push to `master`. It builds and deploys via the official GitHub Pages action (not `gh-pages` package). Uses `actions/upload-pages-artifact` and `actions/deploy-pages`.

**Environment variables** (in `.env.local` and `.env.production`):
```
VITE_BASE44_APP_ID=697faa16ebf3a00280377605
VITE_BASE44_APP_BASE_URL=https://escape-to-asia-travel.base44.app
```

## Architecture

### Base44 Integration

The entire backend (database, auth, AI agents) is provided by Base44's cloud SDK.

**Client** (`src/api/base44Client.js`): Initializes the Base44 SDK with the app ID and server URL. Exports entity and agent handles used throughout the app.

**Auth flow** (`src/lib/AuthContext.jsx`): On load, checks `base44.auth.me()`. If unauthenticated and the app requires auth (from public settings), redirects to Base44's hosted login. Access tokens can be passed via `?access_token=` URL param (captured and stored in localStorage, then stripped from URL).

**Data entities** (used in components via React Query):
- `base44.entities.Destination.list()` — destination records
- `base44.entities.Inquiry.create(data)` — contact/booking inquiries

**AI Chat** (`src/components/chat/ChatWidget.jsx`): Uses `base44.agents.createConversation()`, `subscribeToConversation()`, and `addMessage()` for real-time customer support chat with business-hours-aware human escalation.

**App params** (`src/lib/app-params.js`): Reads config from env vars and URL params, persists in localStorage with `base44_` prefix. Supports `app_id`, `access_token`, `app_base_url`, `clear_access_token` URL params.

### React App Structure

**Entry**: `main.jsx` → `App.jsx` wraps everything in `AuthProvider`, `QueryClientProvider`, and `BrowserRouter`. Routes are defined in `App.jsx` and use `Layout.jsx` (nav + footer wrapper).

**Pages** (`src/pages/`): `Home`, `Destinations`, `DestinationDetail`, `Services`, `Contact`. Route config is auto-generated in `pages.config.js`.

**State**: Auth via Context API; server data via TanStack React Query; forms via React Hook Form + Zod.

**UI**: shadcn/ui components (Radix UI primitives + Tailwind). Custom color palette — teal `#0F4C5C`, gold `#D4A574`, cream `#F5F1EB` — defined in `tailwind.config.js`.

**Path alias**: `@/*` maps to `src/*` (configured in `jsconfig.json` and `vite.config.js`).

### External Images

Background images are loaded from **Unsplash** (hardcoded URLs in component files). Destination card images come from the Base44 backend (`destination.image_url`). The favicon references `https://base44.com/logo_v2.svg`.

### Vite Plugin

`@base44/vite-plugin` in `vite.config.js` enables HMR notifications, navigation tracking, and a visual editing agent — features used when developing inside the Base44 portal. These are no-ops when running locally outside Base44.