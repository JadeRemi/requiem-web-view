/**
 * Asset path utility for GitHub Pages deployment
 *
 * Prepends the Vite base URL to asset paths so they work correctly
 * both in development (base: '/') and production (base: '/requiem-web-view/')
 */

/**
 * Get the correct path for an asset in the public folder
 * @param path - Path starting with '/' (e.g., '/images/screenshot.jpg', '/models/item.glb')
 * @returns The path with the correct base URL prefix
 */
export function assetPath(path: string): string {
  const base = import.meta.env.BASE_URL
  // Remove trailing slash from base if present, and ensure path starts with /
  const normalizedBase = base.endsWith('/') ? base.slice(0, -1) : base
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  return `${normalizedBase}${normalizedPath}`
}
