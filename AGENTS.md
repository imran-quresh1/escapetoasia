# AGENTS.md

Guidance for AI coding agents working on the **Escape To Asia** travel website.

## Architecture Essentials

This is a **React SPA with a headless backend**. The entire backend (database, auth, AI agents) lives in Base44's cloud at `https://escape-to-asia-travel.base44.app`. The frontend is a Vite + React app deployed to GitHub Pages and live at **`https://escapetoasia.co.uk`** (custom domain via CNAME in `public/CNAME`). GitHub Pages URL is `https://imran-quresh1.github.io/escapetoasia/` but users access the custom domain.

**Key insight**: Client and server are decoupled. All data calls go through the Base44 SDK; there's no Express or custom backend repo.

### Data Flow Overview

1. **Auth**: `src/lib/AuthContext.jsx` checks `base44.auth.me()` on app load. If auth is required (from app.public_settings) and user lacks a token, redirects to Base44's hosted login.
2. **Data**: Components fetch via `base44.entities.Destination.list()` (etc.) wrapped in React Query hooks (never direct fetch calls).
3. **Forms**: The contact form uses EmailJS client-side for sending; Base44 entities use `base44.entities.Inquiry.create()` for database writes.

### Pages & Routing

Pages live in `src/pages/` and are auto-registered in `src/pages.config.js`:
- **Home** (index)
- **Destinations** (list + filtering)
- **DestinationDetail** (per-destination page, accepts `?id=` query param)
- **Services**
- **Contact** (contact form + inquiry submission)
- **Layout** wraps all with nav + footer

**Change the landing page**: Edit `mainPage: "Home"` in `pages.config.js` only. Do NOT modify imports—they are auto-generated.

### Base44 Entities

Exposed via `src/api/base44Client.js`:

```javascript
base44.entities.Destination.list()        // → Promise<Array>
base44.entities.Inquiry.create(data)      // → Promise<Object>
base44.auth.me()                          // → Promise<User> or throw 401
base44.auth.redirectToLogin(returnUrl)    // Browser redirect
base44.agents.createConversation()        // For AI chat (not currently used in UI)
```

Use these in React Query `queryFn` callbacks, never in loops or non-reactive code.

## Developer Workflows

### Development
```bash
npm run dev                 # Vite HMR server on localhost:5173
npm run typecheck           # TypeScript validation (jsconfig.json)
npm run lint                # ESLint (quiet, enforces react-refresh rules)
npm run lint:fix            # Auto-fix linting issues
```

**Development Mode** (no Base44 backend required):
- Runs on `http://localhost:5173/`
- Auto-uses mock destination data (`src/lib/mockData.js`)
- AuthContext bypasses Base44 checks when env vars are missing
- Perfect for UI testing and development
- See `RUNNING_LOCALLY.md` for detailed setup

### Building & Deployment

**Local build:**
```bash
npm run build               # → dist/ folder
npm run preview             # Preview local build
```

**Deploy:**
```bash
npm run deploy              # Build + push dist/ to gh-pages branch
# GitHub Pages auto-serves at custom domain https://escapetoasia.co.uk (via CNAME)
# OR: GitHub Actions auto-deploys on master push via .github/workflows/deploy.yml
```

**Environment** (`.env.local`, `.env.production`):
```
VITE_BASE44_APP_ID=697faa16ebf3a00280377605
VITE_BASE44_APP_BASE_URL=https://escape-to-asia-travel.base44.app
```

**SEO**: Vite plugin (`vite.config.js` → `staticRoutePages()`) generates static HTML per route (Destinations.html, Contact.html, etc.) so crawlers get proper meta tags without JS execution.

## Key Code Patterns

### Data Fetching with React Query

```javascript
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';

const { data: destinations = [], isLoading, error } = useQuery({
  queryKey: ['destinations'],
  queryFn: () => base44.entities.Destination.list(),
});
```

**Query client config** (`src/lib/query-client.js`): `refetchOnWindowFocus: false`, `retry: 1`.

### State Management

- **Auth state**: via `AuthContext` hook (`useAuth()`) — exports `user`, `isAuthenticated`, `authError`, `navigateToLogin()`, `logout()`.
- **Server state**: React Query (never Redux; never useState for API data).
- **UI state**: useState for local form fields, filters, modals (e.g., mobileMenuOpen in Layout).

### Component Conventions

**Styled with Tailwind only** (no CSS modules, no inline style objects except rare exceptions). Color palette is hardcoded in `src/components` and `Layout.jsx`:

```
Teal: #0F4C5C (primary)
Gold: #D4A574 (accent, CTA buttons)
Cream: #F5F1EB (background)
Brown: #5C4033 (text, secondary)
```

**Animations**: Framer Motion (`motion.div`, `AnimatePresence`). Example:
```jsx
<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ delay: index * 0.1 }}
>
```

**Images**:
- Background images: Imported from `public/images/` or hardcoded Unsplash URLs.
- Destination images: From `destination.image_url` (Base44 field); include `onError` fallback to public image.
- Lazy load & async decode:
```jsx
<img src={url} alt="desc" loading="lazy" decoding="async" onError={fallback} />
```

### SEO & Meta Tags

Use the `SEO` component in every page:
```jsx
import SEO from '@/components/SEO';

<SEO
  title="Page Title"
  description="40–160 character description"
  path="/PagePath"
  jsonLd={...structured data object...}
/>
```

Helmet injects tags into `<head>`, overriding static index.html defaults. `title` gets "| Escape To Asia" appended automatically.

### Form Handling

**Contact form** (EmailJS):
```javascript
import emailjs from '@emailjs/browser';

emailjs.send(SERVICE_ID, TEMPLATE_ID, formData, PUBLIC_KEY)
  .then(() => setSubmitted(true))
  .catch(err => setError(err.message));
```

**Base44 entity creation** (not used in current UI but pattern):
```javascript
await base44.entities.Inquiry.create({
  name: 'John',
  email: 'john@example.com',
  ...
});
```

### Error Handling

Auth errors are handled in `AuthContext.jsx`:
- `auth_required`: Redirect to login.
- `user_not_registered`: Show `UserNotRegisteredError` component.
- Unknown errors: Log and display generic "failed to load" message.

For data fetches, React Query queries expose `error` state; UI renders a fallback or retry button.

## Critical Files & Their Purposes

| File | Purpose |
|------|---------|
| `src/api/base44Client.js` | SDK initialization; exports `base44` singleton |
| `src/lib/AuthContext.jsx` | Auth state, login redirect, user check logic |
| `src/pages.config.js` | Page registry (auto-generated except `mainPage`) |
| `src/lib/app-params.js` | Env var + URL param resolution; localStorage persistence |
| `src/components/SEO.jsx` | Per-page OpenGraph, Twitter, canonical, JSON-LD |
| `src/Layout.jsx` | Global nav, footer, mobile menu (wraps all pages) |
| `tailwind.config.js` | Custom color palette, animations, plugins |
| `vite.config.js` | Base44 plugin, React plugin, static page generation |

## Path Aliases & Imports

`@/*` resolves to `src/*`. Use it everywhere:
```javascript
import { useAuth } from '@/lib/AuthContext';
import DestinationCard from '@/components/destinations/DestinationCard';
```

Configured in `jsconfig.json` and `vite.config.js`.

## Common Tasks

**Add a new page**: Create `src/pages/NewPage.jsx`, export default component. It auto-registers in pages.config.js on next reload.

**Add a new API entity**: Use `base44.entities.NewEntity.list()` (or `.create()`, etc.) just like Destination and Inquiry. No SDK changes needed; entity is already defined in Base44 app.

**Change brand colors**: Edit `#0F4C5C`, `#D4A574`, `#F5F1EB` in `Layout.jsx` inline styles and any hardcoded Tailwind classes. Consider also updating `index.css` theme vars if using CSS VARs.

**Debug auth flow**: Check browser localStorage for `base44_app_id`, `base44_access_token`, etc. (set by `app-params.js`). Verify `.env.local` has correct `VITE_BASE44_APP_ID` and `VITE_BASE44_APP_BASE_URL`.

**Test form submissions**: Contact form uses EmailJS (hardcoded credentials visible in Contact.jsx). Inquiry form would post via Base44 entity create.

## Gotchas & Conventions

1. **App initialization is async**: AuthContext checks app public settings and user auth on mount. Pages inside `<AuthProvider>` wrap render in `useAuth()` to get loading states.
2. **URL-based page params**: Pass state via query string (e.g., `?id=123`). Use `new URLSearchParams(location.search)` or extract manually.
3. **localStorage & env vars**: `app-params.js` merges env vars, URL params, and localStorage. Calling `getAppParamValue()` with `removeFromUrl: true` cleans tokens from URL after reading (security).
3. **Static image imports vs URLs**: Use `import.meta.env.BASE_URL + 'images/...'` for relative paths. Since the custom domain is the root (`https://escapetoasia.co.uk/`), BASE_URL is `/`. Unsplash URLs are absolute, no prefix needed.
5. **React Query cache**: Queries keyed by `['destinations']`, `['inquiry']` etc. Change key to invalidate cache or trigger refetch.
6. **ESLint strict**: Enforces React hooks rules, unused import cleanup, react-refresh HMR compat. `npm run lint:fix` auto-corrects most issues.

## External Dependencies & Integrations

- **Base44 SDK** (`@base44/sdk`): SDK client, auth, entities.
- **React Query** (`@tanstack/react-query`): Server state management.
- **Framer Motion** (`framer-motion`): Page transitions and animations.
- **Tailwind + shadcn/ui**: Responsive, accessible component library.
- **react-helmet-async**: Per-page SEO meta tags.
- **EmailJS** (`@emailjs/browser`): Client-side form submission (Contact page).
- **lucide-react**: Icon library (used for nav icons, buttons).
- **react-router-dom**: Client routing.
- **date-fns**, **moment**, **recharts**: Utilities (imported but may not be fully used).

## UK PECR Cookie Compliance

This site is **UK-compliant** for cookie consent:

### How It Works

1. **Cookie Consent Banner** (`src/components/CookieConsentBanner.jsx`): Appears on first visit with equal-prominence "Accept All" and "Decline" buttons
2. **Consent Storage** (`src/lib/CookieConsent.js`): Manages localStorage-based user preferences
3. **Conditional Loading**:
   - **Google Analytics** (`src/lib/Analytics.jsx`): Only loads GA4 script if `analytics` consent is true
   - **Tawk Chat** (`src/components/chat/ChatWidget.jsx`): Only loads if `chat` consent is true
4. **No Cookie Wall**: Site remains fully accessible if user declines

### Consent Types

```javascript
COOKIE_TYPES = {
  ANALYTICS: 'analytics',  // Google Analytics 4
  CHAT: 'chat'             // Tawk live chat widget
}
```

### Managing Consent

```javascript
import { hasConsent, acceptAllCookies, declineNonEssentialCookies, resetConsent, COOKIE_TYPES } from '@/lib/CookieConsent';

// Check if user consented to analytics
if (hasConsent(COOKIE_TYPES.ANALYTICS)) { /* use GA */ }

// Accept all cookies
acceptAllCookies();

// Decline non-essential
declineNonEssentialCookies();

// Reset user's choice (e.g., for settings page)
resetConsent();
```

### Adding New Consent Types

1. Add to `COOKIE_TYPES` in `src/lib/CookieConsent.js`
2. Update `CookieConsentBanner.jsx` UI to include checkbox/description
3. Check `hasConsent()` before loading external scripts

### Compliance Checklist

✅ **Active Consent**: Banner on first visit (not pre-checked)
✅ **Equal-Prominence Buttons**: Accept/Decline buttons equally prominent
✅ **No Cookie Wall**: Site fully accessible if user declines
✅ **Privacy Policy**: `/Privacy` page explains all cookies used
✅ **Withdraw Consent**: "Cookie Settings" link in footer reopens banner
✅ **Consent Activation**: Analytics/Chat load immediately after acceptance (page reloads)
✅ **SEO Compliant**: Privacy page in `ROUTE_PAGES`, sitemap, and prerendered

### Key Files for Cookie Compliance

| File | Purpose |
|------|---------|
| `src/lib/CookieConsent.js` | Consent API (save/check/reset preferences) |
| `src/components/CookieConsentBanner.jsx` | Banner UI + auto-reload on choice |
| `src/pages/Privacy.jsx` | Full privacy & cookie policy |
| `src/Layout.jsx` | "Cookie Settings" link in footer |
| `public/sitemap.xml` | Privacy page indexed for SEO |
| `vite.config.js` | Privacy page added to `ROUTE_PAGES` for prerendering |









