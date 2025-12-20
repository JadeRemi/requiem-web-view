/**
 * WebGL Context Manager
 * Manages WebGL contexts to prevent "Too many active WebGL contexts" warnings
 * Browser limit is typically 8-16 contexts depending on browser/GPU
 */

const MAX_CONTEXTS = 8

interface ContextEntry {
  id: string
  priority: number
  timestamp: number
  dispose: () => void
}

class WebGLContextManager {
  private contexts: Map<string, ContextEntry> = new Map()
  private waitingQueue: Array<{
    id: string
    priority: number
    resolve: () => void
  }> = []

  /**
   * Request permission to create a WebGL context
   * Returns a dispose function that MUST be called when context is no longer needed
   */
  async requestContext(id: string, priority: number = 0): Promise<() => void> {
    // If we already have this context registered, return existing dispose
    const existing = this.contexts.get(id)
    if (existing) {
      existing.timestamp = Date.now()
      existing.priority = priority
      return existing.dispose
    }

    // If we're at capacity, wait for a slot or dispose lowest priority
    if (this.contexts.size >= MAX_CONTEXTS) {
      // Find lowest priority context
      let lowestEntry: ContextEntry | null = null
      let lowestId: string | null = null

      for (const [contextId, entry] of this.contexts) {
        if (!lowestEntry || entry.priority < lowestEntry.priority) {
          lowestEntry = entry
          lowestId = contextId
        }
      }

      // If our priority is higher than lowest, dispose it
      if (lowestEntry && lowestId && priority > lowestEntry.priority) {
        lowestEntry.dispose()
        this.contexts.delete(lowestId)
      } else {
        // Wait in queue
        await new Promise<void>((resolve) => {
          this.waitingQueue.push({ id, priority, resolve })
          this.waitingQueue.sort((a, b) => b.priority - a.priority)
        })
      }
    }

    // Create dispose function
    const dispose = () => {
      this.contexts.delete(id)
      this.processQueue()
    }

    // Register context
    this.contexts.set(id, {
      id,
      priority,
      timestamp: Date.now(),
      dispose,
    })

    return dispose
  }

  /**
   * Release a context by ID
   */
  releaseContext(id: string): void {
    const entry = this.contexts.get(id)
    if (entry) {
      this.contexts.delete(id)
      this.processQueue()
    }
  }

  /**
   * Check if a context slot is available
   */
  hasAvailableSlot(): boolean {
    return this.contexts.size < MAX_CONTEXTS
  }

  /**
   * Get current context count
   */
  getContextCount(): number {
    return this.contexts.size
  }

  private processQueue(): void {
    if (this.waitingQueue.length > 0 && this.contexts.size < MAX_CONTEXTS) {
      const next = this.waitingQueue.shift()
      if (next) {
        next.resolve()
      }
    }
  }
}

export const webglContextManager = new WebGLContextManager()
