import React from 'react';
import { Helmet } from 'react-helmet-async';
import {
  SITE_URL,
  SITE_NAME,
  DEFAULT_DESCRIPTION,
  DEFAULT_OG_IMAGE,
} from '@/lib/seo-config';

/**
 * Per-page SEO tags (title, description, canonical, Open Graph, Twitter, JSON-LD).
 * Overrides the static defaults in index.html on the client.
 *
 * Props:
 *  - title:        page title (brand name is appended automatically)
 *  - description:  meta description
 *  - path:         path portion of the canonical URL, e.g. "/Services"
 *  - image:        absolute OG/Twitter image URL
 *  - type:         og:type (default "website")
 *  - noindex:      add <meta name="robots" content="noindex">
 *  - jsonLd:       a structured-data object or array of objects
 */
export default function SEO({
  title,
  description,
  path = '',
  image,
  type = 'website',
  noindex = false,
  jsonLd,
}) {
  const fullTitle = title
    ? `${title} | ${SITE_NAME}`
    : `${SITE_NAME} | All-Inclusive Asia Holiday Packages`;
  const desc = description || DEFAULT_DESCRIPTION;
  const url = SITE_URL + path;
  const img = image || DEFAULT_OG_IMAGE;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex" />}

      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={img} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={img} />

      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
    </Helmet>
  );
}
