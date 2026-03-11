# EscapeToAsia (Vite + React + Base44) — Research Notes

## 1) What this app is
A brochure + lead-generation travel website for Asian package holidays. It has:
- Marketing pages: Home, Services
- Data-driven catalog pages: Destinations, DestinationDetail
- Lead capture: Contact form (creates inquiries)
- Embedded AI chat widget (Base44 agents)
- Lightweight auth/public-settings gate via Base44

Core stack:
- Vite 6 + React 18 + React Router
- TanStack Query for server state
- Tailwind + shadcn-style UI primitives + Framer Motion
- Base44 SDK as backend/data/auth/chat/logging provider

---

## 2) Runtime architecture
Entry and shell:
- `src/main.jsx` mounts `<App />`
- `src/App.jsx` wraps app with:
  - `AuthProvider` (`src/lib/AuthContext.jsx`)
  - `QueryClientProvider` (`src/lib/query-client.js`)
  - `BrowserRouter` using `basename={import.meta.env.BASE_URL}`
  - `NavigationTracker` for in-app analytics logs
  - `Toaster`

Routing model:
- Route map comes from `src/pages.config.js` (auto-generated pattern)
- Pages are registered by name and route path is `/${PageName}`
- Main page is `Home`
- Unknown paths render custom `PageNotFound`

Layout:
- `src/Layout.jsx` provides fixed nav, footer, and `ChatWidget`
- `createPageUrl()` (in `src/utils/index.ts`) returns `"/" + pageName.replace(/ /g, '-')`

Important routing specificity:
- Query strings are encoded by passing strings into `createPageUrl`, e.g. `DestinationDetail?id=...`
- Destination detail reads id from `window.location.search` (not path param)

---

## 3) Data model and backend coupling
Local entity schema files:
- `entities/Destination`
- `entities/Inquiry`

These describe expected object fields and indicate app-level dependence on Base44 entities.

Live data access in app:
- `Destinations` page calls `base44.entities.Destination.list()`
- `DestinationDetail` also calls `Destination.list()` then finds by id client-side
- `Contact` page submits with `base44.entities.Inquiry.create(...)`

Auth/public-settings flow:
- `AuthContext` first calls Base44 public settings endpoint:
  - `${appBaseUrl}/api/apps/public/prod/public-settings/by-id/${appId}`
- Then (if token exists) calls `base44.auth.me()`
- Handles `auth_required` and `user_not_registered`

Base44 client construction:
- `src/api/base44Client.js`
- Uses env/app params from `src/lib/app-params.js`
- **Critical:** `serverUrl` must resolve to Base44 host (`VITE_BASE44_APP_BASE_URL`), otherwise requests become same-origin `/api/...` and fail on static hosts.

---

## 4) External content dependencies (main focus)
The site depends heavily on external sources for content and behavior.

### A) External API/content backend (hard dependency)
Primary source:
- `VITE_BASE44_APP_BASE_URL=https://escape-to-asia-travel.base44.app`
- `VITE_BASE44_APP_ID=697faa16ebf3a00280377605`

Used for:
- Destination content (entity records)
- Inquiry submissions
- Auth/public app settings
- Chat agent conversations
- In-app activity logs (`base44.appLogs.logUserInApp`)

If unavailable/misconfigured:
- Destinations/Detail fail to load
- Contact submit fails
- Chat fails
- Auth/state checks fail

### B) External media/CDN images
A large amount of visual content is loaded from `images.unsplash.com` across:
- Home hero/sections
- Services hero
- Destinations hero
- Contact hero
- Activity and stay cards
- Sample testimonial avatars

Implication:
- Rendering quality/availability depends on Unsplash CDN reachability and URL validity.

### C) External links/integrations
- WhatsApp deep links (`https://wa.me/447343056344`) in footer/contact
- Favicon from `https://base44.com/logo_v2.svg` in `index.html`

### D) Browser/runtime-host derived content
- `from_url` and `x-origin-url` style context is derived from current host URL and sent in API interactions
- This affects auth redirect behavior and telemetry context

---

## 5) Static vs dynamic content split
Dynamic (from Base44):
- Destination list/details
- User/auth state
- Inquiry persistence
- Chat message exchange

Static/in-repo:
- Marketing copy for Services/Home sections
- Hardcoded activity/stay recommendation catalogs
- Contact destination dropdown options
- UI layout and visual structure

Note: destination cards combine dynamic entity data with static page scaffolding.

---

## 6) Deployment specifics and pitfalls
Current deployment methods in repo:
1. `gh-pages -d dist` (`npm run deploy`) from `package.json`
2. GitHub Actions Pages workflow (`.github/workflows/deploy.yml`)

Important specificity:
- `vite.config.js` currently has `base: "/"`
- `package.json` homepage points to project-path Pages URL (`.../escapetoasia/`)
- If hosted under a subpath, `base` may need to match subpath (or another strategy), otherwise asset/routing issues can appear.

API-host pitfall already observed:
- If Base44 client `serverUrl` falls back to empty string, browser calls host-relative `/api/...` on GitHub/custom domain and gets 404/405.

Caching caveat:
- Old JS bundles on client/CDN can preserve old API host behavior until hard refresh/cache clear.

---

## 7) UX/feature behavior details
- `ChatWidget`:
  - Creates one Base44 conversation on first open
  - Subscribes to live updates
  - Shows business-hours/off-hours state (UTC-based logic)
- `NavigationTracker`:
  - Logs page visits only when authenticated
  - Uses page-name matching against `pages.config.js`
- `PageNotFound`:
  - Includes admin hint panel when authenticated admin
  - Home action uses `import.meta.env.BASE_URL`

---

## 8) Code quality/maintenance observations
- `jsconfig.json` includes/excludes are narrow (many folders excluded from type-check); useful for speed, but reduces whole-app checking.
- `CountryFilter` defines per-country image URLs but does not render them in button UI (data present, unused).
- `Contact` page destination options are static; may drift from live Destination entity values.
- `DestinationDetail` fetches full destination list then filters locally; server-side get-by-id would scale better.

---

## 9) Short conclusion
This app is a hybrid marketing + transactional front-end whose **critical content source is Base44**. Most destination/business data, inquiry persistence, auth checks, chat behavior, and logging come from Base44 APIs, while visuals rely heavily on Unsplash-hosted media. In production, correctness depends on:
1) valid Base44 env variables baked into build, and
2) correct hosting/base-path configuration for static assets and routing.
