import fs from "fs";
import path from "path";
import base44 from "@base44/vite-plugin";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const SITE_URL = "https://escapetoasia.co.uk";

// Per-route static pages so SPA deep links return HTTP 200 (not 404) and ship
// correct per-page meta for crawlers that don't execute JS. The React bundle
// still hydrates the interactive content on top.
const ROUTE_PAGES = [
  {
    file: "Destinations",
    path: "/Destinations",
    title: "Asia Holiday Destinations | Escape To Asia",
    description:
      "Explore handpicked holiday destinations across Dubai, India, Vietnam, Indonesia, Malaysia and Singapore — all-inclusive packages with flights, hotels, transfers and tours.",
  },
  {
    file: "Services",
    path: "/Services",
    title: "Our Travel Services | Escape To Asia",
    description:
      "Flights, airport transfers, hand-picked hotels, curated excursions, personal tour guides and custom itineraries — complete home-to-home Asia travel packages.",
  },
  {
    file: "Contact",
    path: "/Contact",
    title: "Plan Your Trip — Contact Us | Escape To Asia",
    description:
      "Get in touch with Escape To Asia to plan your all-inclusive Asia holiday. Call, WhatsApp or email our UK travel experts for a free, no-obligation quote.",
  },
  {
    file: "DestinationDetail",
    // Canonicalise the parameter-less stub to the Destinations hub; the client
    // sets the per-destination canonical via react-helmet when an id is present.
    path: "/Destinations",
    title: "Asia Holiday Packages | Escape To Asia",
    description:
      "Discover all-inclusive Asia holiday packages with flights, hotels, transfers, personal tour guides and curated excursions — tailored by Escape To Asia.",
  },
];

function setMeta(html, { title, description, url }) {
  // Replace whole tags (tolerant of the multi-line formatting Vite preserves
  // and of attribute order). Function replacements avoid $-pattern surprises.
  const repl = (re, value) => {
    if (re.test(html)) html = html.replace(re, () => value);
  };
  // <meta> identified by one attribute (name=/property=), replaced wholesale.
  const metaTag = (attr, key) =>
    new RegExp(`<meta\\b[^>]*\\b${attr}="${key}"[^>]*>`);

  repl(/<title>[\s\S]*?<\/title>/, `<title>${title}</title>`);
  repl(
    metaTag("name", "description"),
    `<meta name="description" content="${description}" />`,
  );
  repl(
    /<link\b[^>]*\brel="canonical"[^>]*>/,
    `<link rel="canonical" href="${url}" />`,
  );
  repl(
    metaTag("property", "og:title"),
    `<meta property="og:title" content="${title}" />`,
  );
  repl(
    metaTag("property", "og:description"),
    `<meta property="og:description" content="${description}" />`,
  );
  repl(
    metaTag("property", "og:url"),
    `<meta property="og:url" content="${url}" />`,
  );
  repl(
    metaTag("name", "twitter:title"),
    `<meta name="twitter:title" content="${title}" />`,
  );
  repl(
    metaTag("name", "twitter:description"),
    `<meta name="twitter:description" content="${description}" />`,
  );
  return html;
}

function staticRoutePages() {
  let outDir = "dist";
  return {
    name: "static-route-pages",
    apply: "build",
    configResolved(config) {
      outDir = config.build.outDir;
    },
    closeBundle() {
      const indexPath = path.resolve(outDir, "index.html");
      if (!fs.existsSync(indexPath)) return;
      const template = fs.readFileSync(indexPath, "utf-8");
      for (const page of ROUTE_PAGES) {
        const url = SITE_URL + page.path;
        const html = setMeta(template, {
          title: page.title,
          description: page.description,
          url,
        });
        fs.writeFileSync(path.resolve(outDir, `${page.file}.html`), html);
      }
    },
  };
}

export default defineConfig({
  base: "/",
  logLevel: "error",
  plugins: [
    base44({
      legacySDKImports: process.env.BASE44_LEGACY_SDK_IMPORTS === "true",
      hmrNotifier: true,
      navigationNotifier: true,
      visualEditAgent: true,
    }),
    react(),
    staticRoutePages(),
  ],
});
