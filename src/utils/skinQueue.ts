import { SKIN_QUEUE } from '../config'
import { decodeSkinHash } from './skinHash'

type QueueItem = {
  skinHash: string
  resolve: (url: string | null) => void
}

/**
 * Skin loading queue with rate limiting
 * Processes skin hash decoding one at a time with configurable delay
 */
class SkinQueueManager {
  private queue: QueueItem[] = []
  private processing = false
  private cache = new Map<string, string | null>()

  /**
   * Queue a skin hash for URL resolution
   * Returns cached result immediately if available
   */
  async getSkinUrl(skinHash: string): Promise<string | null> {
    // Check cache first
    if (this.cache.has(skinHash)) {
      return this.cache.get(skinHash) ?? null
    }

    // Add to queue and wait for processing
    return new Promise((resolve) => {
      this.queue.push({ skinHash, resolve })
      this.processQueue()
    })
  }

  private async processQueue(): Promise<void> {
    if (this.processing || this.queue.length === 0) return

    this.processing = true

    while (this.queue.length > 0) {
      const item = this.queue.shift()
      if (!item) continue

      // Check cache again (might have been processed while waiting)
      if (this.cache.has(item.skinHash)) {
        item.resolve(this.cache.get(item.skinHash) ?? null)
        continue
      }

      // Decode and cache
      const decoded = decodeSkinHash(item.skinHash)
      const url = decoded?.skinUrl ?? null
      this.cache.set(item.skinHash, url)
      item.resolve(url)

      // Rate limit delay before next item
      if (this.queue.length > 0) {
        await this.delay(SKIN_QUEUE.LOAD_DELAY_MS)
      }
    }

    this.processing = false
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  /** Clear the cache (useful for testing) */
  clearCache(): void {
    this.cache.clear()
  }
}

/** Global skin queue instance */
export const skinQueue = new SkinQueueManager()

