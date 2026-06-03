---
name: Always build and serve after changes
description: After every code change, run build then start dev server for local testing
type: feedback
---

After making any code change, always:
1. Run `npm run build` to verify it compiles without errors
2. Start the dev server (`npm run dev`) so the user can test locally

**Why:** User wants to verify changes work before deploying. Caught issues early (e.g. broken images, 404s).

**How to apply:** Every time a file edit is made in this project, follow up with build + dev server without waiting to be asked.
