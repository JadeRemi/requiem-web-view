/**
 * Date formatting utilities
 */

interface TimeUnit {
  unit: Intl.RelativeTimeFormatUnit
  ms: number
}

const TIME_UNITS: TimeUnit[] = [
  { unit: 'year', ms: 365 * 24 * 60 * 60 * 1000 },
  { unit: 'month', ms: 30 * 24 * 60 * 60 * 1000 },
  { unit: 'week', ms: 7 * 24 * 60 * 60 * 1000 },
  { unit: 'day', ms: 24 * 60 * 60 * 1000 },
  { unit: 'hour', ms: 60 * 60 * 1000 },
  { unit: 'minute', ms: 60 * 1000 },
  { unit: 'second', ms: 1000 },
]

/**
 * Format a timestamp as relative time (e.g., "2 hours ago", "3 months ago")
 * @param timestamp - Date string or Date object
 * @returns Formatted relative time string
 */
export function formatRelativeTime(timestamp: string | Date): string {
  const date = typeof timestamp === 'string' ? new Date(timestamp) : timestamp
  const now = Date.now()
  const diffMs = now - date.getTime()

  // Handle future dates
  if (diffMs < 0) {
    return 'just now'
  }

  // Find the appropriate unit
  for (const { unit, ms } of TIME_UNITS) {
    const value = Math.floor(diffMs / ms)
    if (value >= 1) {
      const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'always' })
      return rtf.format(-value, unit)
    }
  }

  return 'just now'
}

/**
 * Format a timestamp as full local date and time
 * @param timestamp - Date string or Date object
 * @returns Formatted full date and time string in user's locale
 */
export function formatFullDateTime(timestamp: string | Date): string {
  const date = typeof timestamp === 'string' ? new Date(timestamp) : timestamp
  
  return date.toLocaleString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  })
}

/**
 * Format a timestamp as short date (e.g., "Dec 4, 2025")
 * @param timestamp - Date string or Date object
 * @returns Formatted short date string
 */
export function formatShortDate(timestamp: string | Date): string {
  const date = typeof timestamp === 'string' ? new Date(timestamp) : timestamp
  
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

