/**
 * Single source of truth for the production URL and default social
 * preview image. Update SITE_URL once the real domain is live — every
 * page's canonical link, OpenGraph URL, and the sitemap all derive from
 * this one constant instead of being hardcoded per file.
 */
export const SITE_URL = "https://foxtheta.com";
export const SITE_NAME = "Foxtheta";
export const DEFAULT_OG_IMAGE = "/assets/au-og.png";

// Every public, indexable route — used to generate sitemap.xml. Keep in
// sync with app/ as routes are added; there is no automatic discovery
// here on purpose, so a draft/internal route is never accidentally
// published to search engines by just existing in app/.
export const PUBLIC_ROUTES = [
  "/",
  "/industries",
  "/industries/banking",
  "/industries/insurance",
  "/industries/healthcare",
  "/industries/manufacturing",
  "/industries/retail",
  "/industries/logistics",
  "/technology",
  "/platform",
  "/case-studies",
  "/process",
  "/about",
  "/insights",
  "/insights/hiring-agents",
  "/insights/autonomy",
  "/insights/shadow-mode",
  "/insights/real-cost-of-an-ai-feature",
  "/contact",
  "/privacy",
  "/terms",
];
