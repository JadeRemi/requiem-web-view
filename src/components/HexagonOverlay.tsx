import { useRef, useEffect, useCallback, useMemo } from 'react'
import { Noise2D, type NoiseOptions } from '../utils/noise'

/** Default hexagon size (radius from center to vertex) */
const DEFAULT_HEX_SIZE = 9

/** Default opacity for hexagons */
const DEFAULT_OPACITY = 0.6

/** Default color (bright magenta) */
const DEFAULT_COLOR = '#ff00ff'

/** Default darker color for gradient (toward center) */
const DEFAULT_COLOR_DARK = '#1a0010'

/** Default gap between hexagons */
const DEFAULT_GAP = 6

interface PaddingConfig {
  top?: number
  right?: number
  bottom?: number
  left?: number
}

interface HexagonOverlayProps {
  /** Size of each hexagon (radius from center to vertex). Default: 9 */
  hexSize?: number
  /** Base opacity of hexagons. Default: 0.6 */
  opacity?: number
  /** Color of hexagons at edges. Default: magenta (#ff00ff) */
  color?: string
  /** Color of hexagons toward center (for radial gradient). Default: dark magenta (#800040) */
  colorDark?: string
  /** Gap between hexagons in pixels. Default: 6 */
  gap?: number
  /** Padding from canvas borders. Can be number (all sides) or object. Default: 0 */
  padding?: number | PaddingConfig
  /** Corner coverage radius in pixels (distance from corner where hexagons appear). Default: 150 */
  coverageRadius?: number
  /** Inner carve radius - hexagons within this distance from center are removed (frame effect). Default: 0 (disabled) */
  innerCarveRadius?: number
  /** Whether to use gradual fade at the inner edge (true) or hard cutoff (false). Default: false */
  gradientFade?: boolean
  /** Hexagon orientation: 'horizontal' (flat top) or 'vertical' (pointy top). Default: 'horizontal' */
  orientation?: 'horizontal' | 'vertical'
  /** Hide hexagons that would be cut off by canvas edges. Default: true */
  hidePartialHexagons?: boolean
  /** Noise options for creating holes in the pattern. If provided, enables noise-based holes */
  noise?: NoiseOptions
  /** Percentage of hexagons that should be holes (0-1). Overrides noise.threshold if provided. Default: undefined */
  holeDensity?: number
  /** Z-index for the overlay. Default: 1 */
  zIndex?: number
  /** Additional CSS class */
  className?: string
}

/**
 * A decorative hexagonal honeycomb overlay that covers corners of its parent.
 * Creates a "frame" effect with hexagons in corners, carved from the center.
 * Completely click-through and purely visual.
 * Parent must have position: relative for proper positioning.
 * 
 * Opacity can be controlled via:
 * - The `opacity` prop (base opacity of hexagons)
 * - CSS variable `--hexagon-overlay-opacity` on the component or parent
 * - Inline style `opacity` on the component wrapper
 */
export function HexagonOverlay({
  hexSize = DEFAULT_HEX_SIZE,
  opacity = DEFAULT_OPACITY,
  color = DEFAULT_COLOR,
  colorDark = DEFAULT_COLOR_DARK,
  gap = DEFAULT_GAP,
  padding = 0,
  coverageRadius = 150,
  innerCarveRadius = 0,
  gradientFade = false,
  orientation = 'horizontal',
  hidePartialHexagons = true,
  noise,
  holeDensity,
  zIndex = 1,
  className = '',
}: HexagonOverlayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Normalize padding to object form
  const normalizedPadding = useMemo((): Required<PaddingConfig> => {
    if (typeof padding === 'number') {
      return { top: padding, right: padding, bottom: padding, left: padding }
    }
    return {
      top: padding.top ?? 0,
      right: padding.right ?? 0,
      bottom: padding.bottom ?? 0,
      left: padding.left ?? 0,
    }
  }, [padding])

  // Create noise generator if options provided or holeDensity is set
  // Use random seed if not specified (changes on each mount)
  const noiseGenerator = useMemo(() => {
    // Enable noise if either noise options or holeDensity is provided
    if (!noise && holeDensity === undefined) return null
    
    const baseNoise = noise ?? {}
    const seedToUse = baseNoise.seed ?? Math.floor(Math.random() * 1000000)
    // holeDensity overrides threshold: holeDensity of 0.3 means 30% holes, so threshold = 0.3
    const thresholdToUse = holeDensity ?? baseNoise.threshold ?? 0.5
    
    return new Noise2D({ 
      ...baseNoise, 
      seed: seedToUse,
      threshold: thresholdToUse,
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [noise?.scale, noise?.threshold, noise?.invert, holeDensity]) // Don't re-create on seed change if random

  // Parse color to RGB for interpolation
  const parseColor = useCallback((hex: string): [number, number, number] => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    if (result && result[1] && result[2] && result[3]) {
      return [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16),
      ]
    }
    return [255, 0, 255] // fallback magenta
  }, [])

  const interpolateColor = useCallback(
    (color1: [number, number, number], color2: [number, number, number], t: number): string => {
      const r = Math.round(color1[0] + (color2[0] - color1[0]) * t)
      const g = Math.round(color1[1] + (color2[1] - color1[1]) * t)
      const b = Math.round(color1[2] + (color2[2] - color1[2]) * t)
      return `rgb(${r}, ${g}, ${b})`
    },
    []
  )

  const drawHexagon = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      centerX: number,
      centerY: number,
      size: number,
      isVertical: boolean
    ) => {
      ctx.beginPath()
      for (let i = 0; i < 6; i++) {
        const angleOffset = isVertical ? -Math.PI / 2 : 0
        const angle = (Math.PI / 3) * i + angleOffset
        const x = centerX + size * Math.cos(angle)
        const y = centerY + size * Math.sin(angle)
        if (i === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      }
      ctx.closePath()
      ctx.fill()
    },
    []
  )

  // Check if hexagon would be cut off by canvas edges (accounting for padding)
  const isHexagonFullyVisible = useCallback(
    (
      centerX: number,
      centerY: number,
      size: number,
      width: number,
      height: number,
      isVertical: boolean,
      pad: Required<PaddingConfig>
    ): boolean => {
      for (let i = 0; i < 6; i++) {
        const angleOffset = isVertical ? -Math.PI / 2 : 0
        const angle = (Math.PI / 3) * i + angleOffset
        const x = centerX + size * Math.cos(angle)
        const y = centerY + size * Math.sin(angle)
        if (x < pad.left || x > width - pad.right || y < pad.top || y > height - pad.bottom) {
          return false
        }
      }
      return true
    },
    []
  )

  const drawPattern = useCallback(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const rect = container.getBoundingClientRect()
    const width = rect.width
    const height = rect.height

    const dpr = window.devicePixelRatio || 1
    canvas.width = width * dpr
    canvas.height = height * dpr
    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.scale(dpr, dpr)
    ctx.clearRect(0, 0, width, height)

    const colorRgb = parseColor(color)
    const colorDarkRgb = parseColor(colorDark)

    const isVertical = orientation === 'vertical'
    const sqrt3 = Math.sqrt(3)

    let horizSpacing: number
    let vertSpacing: number
    let rowOffset: number

    if (isVertical) {
      horizSpacing = sqrt3 * hexSize + gap
      vertSpacing = 1.5 * hexSize + (gap * sqrt3) / 2
      rowOffset = horizSpacing / 2
    } else {
      horizSpacing = 1.5 * hexSize + (gap * sqrt3) / 2
      vertSpacing = sqrt3 * hexSize + gap
      rowOffset = vertSpacing / 2
    }

    const cols = Math.ceil(width / horizSpacing) + 2
    const rows = Math.ceil(height / vertSpacing) + 2

    // Center of canvas for radial calculations
    const centerCanvasX = width / 2
    const centerCanvasY = height / 2
    const maxDistFromCenter = Math.sqrt(centerCanvasX ** 2 + centerCanvasY ** 2)

    // Starting offset based on padding
    const startX = normalizedPadding.left
    const startY = normalizedPadding.top

    for (let row = -1; row < rows; row++) {
      for (let col = -1; col < cols; col++) {
        let centerX: number
        let centerY: number

        if (isVertical) {
          const xOffset = row % 2 === 0 ? 0 : rowOffset
          centerX = startX + col * horizSpacing + xOffset
          centerY = startY + row * vertSpacing
        } else {
          const yOffset = col % 2 === 0 ? 0 : rowOffset
          centerX = startX + col * horizSpacing
          centerY = startY + row * vertSpacing + yOffset
        }

        // Skip if hexagon would be cut off (accounting for padding)
        if (hidePartialHexagons && !isHexagonFullyVisible(centerX, centerY, hexSize, width, height, isVertical, normalizedPadding)) {
          continue
        }

        // Distance from corners
        const distFromTopLeft = Math.sqrt(centerX ** 2 + centerY ** 2)
        const distFromBottomRight = Math.sqrt((width - centerX) ** 2 + (height - centerY) ** 2)
        const minDistFromCorner = Math.min(distFromTopLeft, distFromBottomRight)

        // Distance from center of canvas (for radial gradient and inner carve)
        const distFromCenter = Math.sqrt((centerX - centerCanvasX) ** 2 + (centerY - centerCanvasY) ** 2)

        // Only draw if within corner coverage radius
        if (minDistFromCorner > coverageRadius) {
          continue
        }

        // Inner carve: skip hexagons too close to center (creates frame effect)
        if (innerCarveRadius > 0) {
          const carveThreshold = maxDistFromCenter - innerCarveRadius
          if (distFromCenter < carveThreshold) {
            continue
          }
        }

        // Noise-based holes
        if (noiseGenerator && !noiseGenerator.isVisible(centerX, centerY)) {
          continue
        }

        // Calculate opacity based on gradient fade at inner edge
        let hexOpacity = opacity
        if (gradientFade && innerCarveRadius > 0) {
          const carveThreshold = maxDistFromCenter - innerCarveRadius
          const fadeZone = innerCarveRadius * 0.3
          if (distFromCenter < carveThreshold + fadeZone) {
            const fadeRatio = (distFromCenter - carveThreshold) / fadeZone
            hexOpacity = opacity * fadeRatio
          }
        }

        // Radial color gradient: darker as we move away from corner (toward inner edge)
        // colorT = 0 at corner, 1 at coverageRadius edge
        const colorT = minDistFromCorner / coverageRadius
        const colorTCurved = Math.pow(colorT, 2) // quadratic curve for smooth darkening
        const hexColor = interpolateColor(colorRgb, colorDarkRgb, colorTCurved)

        ctx.fillStyle = hexColor
        ctx.globalAlpha = hexOpacity
        drawHexagon(ctx, centerX, centerY, hexSize, isVertical)
      }
    }
  }, [
    hexSize,
    opacity,
    color,
    colorDark,
    gap,
    normalizedPadding,
    coverageRadius,
    innerCarveRadius,
    gradientFade,
    orientation,
    hidePartialHexagons,
    noiseGenerator,
    parseColor,
    interpolateColor,
    drawHexagon,
    isHexagonFullyVisible,
  ])

  useEffect(() => {
    drawPattern()

    const resizeObserver = new ResizeObserver(() => {
      drawPattern()
    })

    const container = containerRef.current
    if (container) {
      resizeObserver.observe(container)
    }

    return () => {
      resizeObserver.disconnect()
    }
  }, [drawPattern])

  return (
    <div
      ref={containerRef}
      className={`hexagon-overlay ${className}`}
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex,
        overflow: 'hidden',
        opacity: 'var(--hexagon-overlay-opacity, 1)',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
        }}
      />
    </div>
  )
}
