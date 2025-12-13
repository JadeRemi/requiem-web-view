/**
 * Simplex-like noise implementation for procedural patterns
 * Creates coherent random noise that can be used for visual effects
 */

// Permutation table for noise generation
function createPermutation(seed: number): number[] {
  const perm: number[] = []
  for (let i = 0; i < 256; i++) {
    perm[i] = i
  }
  
  // Fisher-Yates shuffle with seed
  let s = seed
  for (let i = 255; i > 0; i--) {
    // Simple PRNG based on seed
    s = (s * 1103515245 + 12345) & 0x7fffffff
    const j = s % (i + 1)
    const tmp = perm[i]!
    perm[i] = perm[j]!
    perm[j] = tmp
  }
  
  // Duplicate for overflow
  return [...perm, ...perm]
}

// Gradient vectors for 2D
const GRAD2 = [
  [1, 1], [-1, 1], [1, -1], [-1, -1],
  [1, 0], [-1, 0], [0, 1], [0, -1],
]

function dot2(g: number[], x: number, y: number): number {
  return g[0]! * x + g[1]! * y
}

function fade(t: number): number {
  return t * t * t * (t * (t * 6 - 15) + 10)
}

function lerp(a: number, b: number, t: number): number {
  return a + t * (b - a)
}

export interface NoiseOptions {
  /** Seed for random generation. Same seed = same pattern */
  seed?: number
  /** Scale of the noise (higher = more zoomed out, larger features). Default: 1 */
  scale?: number
  /** Threshold for binary output (0-1). Values below threshold = hole. Default: 0.5 */
  threshold?: number
  /** Invert the pattern (holes become filled, filled become holes). Default: false */
  invert?: boolean
}

/**
 * 2D Perlin-like noise generator
 */
export class Noise2D {
  private perm: number[]
  private scale: number
  private threshold: number
  private invert: boolean

  constructor(options: NoiseOptions = {}) {
    const { seed = 12345, scale = 1, threshold = 0.5, invert = false } = options
    this.perm = createPermutation(seed)
    this.scale = scale
    this.threshold = threshold
    this.invert = invert
  }

  /**
   * Get raw noise value at position (-1 to 1 range)
   */
  getValue(x: number, y: number): number {
    const sx = x / this.scale
    const sy = y / this.scale

    const X = Math.floor(sx) & 255
    const Y = Math.floor(sy) & 255
    
    const xf = sx - Math.floor(sx)
    const yf = sy - Math.floor(sy)
    
    const u = fade(xf)
    const v = fade(yf)
    
    const aa = this.perm[this.perm[X]! + Y]! & 7
    const ab = this.perm[this.perm[X]! + Y + 1]! & 7
    const ba = this.perm[this.perm[X + 1]! + Y]! & 7
    const bb = this.perm[this.perm[X + 1]! + Y + 1]! & 7
    
    const x1 = lerp(dot2(GRAD2[aa]!, xf, yf), dot2(GRAD2[ba]!, xf - 1, yf), u)
    const x2 = lerp(dot2(GRAD2[ab]!, xf, yf - 1), dot2(GRAD2[bb]!, xf - 1, yf - 1), u)
    
    return lerp(x1, x2, v)
  }

  /**
   * Get normalized noise value (0 to 1 range)
   */
  getNormalized(x: number, y: number): number {
    return (this.getValue(x, y) + 1) / 2
  }

  /**
   * Check if position should be visible based on threshold
   * Returns true if the hexagon should be shown, false if it's a "hole"
   */
  isVisible(x: number, y: number): boolean {
    const value = this.getNormalized(x, y)
    const visible = value >= this.threshold
    return this.invert ? !visible : visible
  }

  /**
   * Update noise parameters
   */
  setOptions(options: Partial<NoiseOptions>): void {
    if (options.seed !== undefined) {
      this.perm = createPermutation(options.seed)
    }
    if (options.scale !== undefined) {
      this.scale = options.scale
    }
    if (options.threshold !== undefined) {
      this.threshold = options.threshold
    }
    if (options.invert !== undefined) {
      this.invert = options.invert
    }
  }
}

/**
 * Create a simple seeded random number generator
 */
export function seededRandom(seed: number): () => number {
  let s = seed
  return () => {
    s = (s * 1103515245 + 12345) & 0x7fffffff
    return s / 0x7fffffff
  }
}

/**
 * Create a noise-based visibility checker
 */
export function createNoiseFilter(options: NoiseOptions = {}): (x: number, y: number) => boolean {
  const noise = new Noise2D(options)
  return (x: number, y: number) => noise.isVisible(x, y)
}

