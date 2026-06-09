# Running Escape To Asia Locally

## Quick Start

```bash
npm run dev
```

This starts the Vite development server on **http://localhost:5173/**

## What You Get

### Local Development Mode
When you run `npm run dev`, the app runs in **development mode** and:
- ✅ **Uses mock data** (no Base44 backend needed)
- ✅ **Full UI testing** with sample destinations
- ✅ **Hot Module Reloading (HMR)** - changes refresh instantly
- ✅ **Mock destinations**: Bali, Jaipur, Ho Chi Minh, Singapore, Dubai, Kuala Lumpur

### Key Features Available
- ✅ Browse destinations with filtering
- ✅ View destination details
- ✅ UI testing of all pages
- ✅ Contact form (EmailJS still works if configured)
- ✅ Cookie consent banner
- ⚠️ Form submissions to Base44 won't work (backend not available)
- ⚠️ Analytics (requires consent + GA env vars)
- ⚠️ Chat widget (requires consent + Tawk config)

## How It Works

**Development Mode** (`npm run dev`):
- `src/lib/mockData.js` provides sample data
- `src/lib/AuthContext.jsx` skips Base44 checks when env vars are missing
- Destinations page uses mock data instead of Base44 API
- Perfect for UI development and testing

**Production Mode** (`npm run build`):
- Requires `.env.production` with Base44 credentials
- Uses real Base44 backend
- Deployed to GitHub Pages at https://escapetoasia.co.uk

## Environment

### `.env.local` (Development)
Currently empty or with Base44 vars (ignored in dev mode)

### `.env.production` (Deployment)
```
VITE_BASE44_APP_ID=697faa16ebf3a00280377605
VITE_BASE44_APP_BASE_URL=https://escape-to-asia-travel.base44.app
```

## Other Useful Commands

```bash
npm run dev           # Start dev server on localhost:5173
npm run build         # Production build (requires .env.production)
npm run preview       # Preview production build
npm run lint          # Check code quality
npm run lint:fix      # Auto-fix lint issues
npm run deploy        # Deploy to GitHub Pages
npm run typecheck     # TypeScript validation
```

## Troubleshooting

**Port 5173 already in use?**
```bash
lsof -i :5173        # Find what's using port 5173
kill -9 <PID>        # Kill the process
npm run dev          # Try again
```

**Node modules issues?**
```bash
rm -rf node_modules
npm install
npm run dev
```

**Still seeing Base44 errors?**
- Clear browser localStorage
- Hard refresh (Cmd+Shift+R or Ctrl+Shift+R)
- Check console for specific errors

## File Structure for Local Dev

```
src/
├── lib/
│   ├── mockData.js              ← Mock destinations for dev
│   ├── AuthContext.jsx          ← Handles dev mode gracefully
│   └── CookieConsent.js         ← Cookie banner logic
├── pages/
│   ├── Destinations.jsx         ← Uses mockData if no Base44
│   ├── DestinationDetail.jsx    ← Uses mockData if no Base44
│   └── ...other pages
└── ...rest of app
```

## Development Tips

1. **Add the app to your hosts file** (optional, for custom domain testing):
   ```bash
   echo "127.0.0.1 escapetoasia.local" >> /etc/hosts
   # Then open http://escapetoasia.local:5173
   ```

2. **Test mobile view**: Use Chrome DevTools device emulation (F12 → toggle device toolbar)

3. **Debug Redux/State**: React DevTools browser extension

4. **Check what API calls are being made**: Open DevTools Network tab

## When You're Ready to Deploy

1. Set real Base44 credentials in `.env.production`
2. Run `npm run deploy`
3. Check live at https://escapetoasia.co.uk

