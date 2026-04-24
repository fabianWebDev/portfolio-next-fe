/**
 * Canonical site URL for metadata, sitemap, and Open Graph.
 * Set NEXT_PUBLIC_SITE_URL in production (e.g. https://wizofcode.com).
 */
export function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (fromEnv) {
    return fromEnv.replace(/\/$/, "");
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL.replace(/\/$/, "")}`;
  }
  return "http://localhost:3000";
}

export const siteName = "WizOfCode";

export const defaultDescription =
  "Software engineering portfolio — projects, stack, and contact. Full-stack development with a focus on clean, maintainable code.";
