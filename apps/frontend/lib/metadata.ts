import type { Metadata } from "next";
import { DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL } from "./site-config";

/**
 * Every page should build its metadata through this helper rather than a
 * bare object literal. Next.js does NOT deep-merge a page's `openGraph`/
 * `twitter` objects with the root layout's — a page that only sets
 * `title`/`description` silently loses social-preview data entirely.
 * This is what the old static site's _template.html gave every page for
 * free via shared <meta> tags; the App Router requires it be explicit
 * per page instead.
 */
export function pageMetadata({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
}): Metadata {
  const url = `${SITE_URL}${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      type: "website",
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
