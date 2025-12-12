import { useRef, useEffect, useCallback } from 'react'

/** Default hexagon size (radius from center to vertex) */
const DEFAULT_HEX_SIZE = 12

/** Default opacity for hexagons */
const DEFAULT_OPACITY = 0.6

/** Default color (bright magenta) */
const DEFAULT_COLOR = '#ff00ff'

interface HexagonOverlayProps {
  /** Size of each hexagon (radius from center to vertex). Default: 12 */
  hexSize?: number
  /** Base opacity of hexagons. Default: 0.6 */
  opacity?: number
  /** Color of hexagons. Default: magenta (#ff00ff) */
  color?: string
  /** Gap between hexagons in pixels. Default: 3 */
  gap?: number
  /** Corner coverage radius in pixels. Default: 150 */
  coverageRadius?: number
  /** Whether to use gradual fade (true) or hard rounded cutoff (false). Default: false */
  gradientFade?: boolean
  /** Hexagon orientation: 'horizontal' (flat top) or 'vertical' (pointy top). Default: 'horizontal' */
  orientation?: 'horizontal' | 'vertical'
  /** Z-index for the overlay. Default: 1 */
  zIndex?: number
  /** Additional CSS class */
  className?: string
}

/**
 * A decorative hexagonal honeycomb overlay that covers corners of its parent.
 * Completely click-through and purely visual.
 * Parent must have position: relative for proper positioning.
 */
export function HexagonOverlay({
  hexSize = DEFAULT_HEX_SIZE,
  opacity = DEFAULT_OPACITY,
  color = DEFAULT_COLOR,
  gap = 3,
  coverageRadius = 150,
  gradientFade = false,
  orientation = 'horizontal',
  zIndex = 1,
  className = '',
}: HexagonOverlayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

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
        // For vertical (pointy-top): start at top vertex
        // For horizontal (flat-top): rotate by 30 degrees
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

  const drawPattern = useCallback(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const rect = container.getBoundingClientRect()
    const width = rect.width
    const height = rect.height

    // Set canvas size with device pixel ratio for sharpness
    const dpr = window.devicePixelRatio || 1
    canvas.width = width * dpr
    canvas.height = height * dpr
    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.scale(dpr, dpr)
    ctx.clearRect(0, 0, width, height)
    ctx.fillStyle = color
    ctx.globalAlpha = opacity

    const isVertical = orientation === 'vertical'

    // Hexagon geometry with gap
    // For a regular hexagon with radius r:
    // - Flat-top: width = 2r, height = sqrt(3)*r
    // - Pointy-top: width = sqrt(3)*r, height = 2r
    
    // To have equal gaps on all sides, we need to account for the honeycomb offset
    // The gap should be measured perpendicular to each edge
    
    const sqrt3 = Math.sqrt(3)
    
    let horizSpacing: number
    let vertSpacing: number
    let rowOffset: number

    if (isVertical) {
      // Pointy-top hexagons
      // Horizontal distance between centers: sqrt(3) * r + gap
      // Vertical distance between centers: 1.5 * r + gap * sqrt(3)/2
      horizSpacing = sqrt3 * hexSize + gap
      vertSpacing = 1.5 * hexSize + gap * sqrt3 / 2
      rowOffset = horizSpacing / 2
    } else {
      // Flat-top hexagons
      // Horizontal distance between centers: 1.5 * r + gap * sqrt(3)/2
      // Vertical distance between centers: sqrt(3) * r + gap
      horizSpacing = 1.5 * hexSize + gap * sqrt3 / 2
      vertSpacing = sqrt3 * hexSize + gap
      rowOffset = vertSpacing / 2
    }

    // Calculate grid dimensions
    const cols = Math.ceil(width / horizSpacing) + 2
    const rows = Math.ceil(height / vertSpacing) + 2

    // Draw hexagons
    for (let row = -1; row < rows; row++) {
      for (let col = -1; col < cols; col++) {
        let centerX: number
        let centerY: number

        if (isVertical) {
          // Pointy-top: offset every other row horizontally
          const xOffset = row % 2 === 0 ? 0 : rowOffset
          centerX = col * horizSpacing + xOffset
          centerY = row * vertSpacing
        } else {
          // Flat-top: offset every other column vertically
          const yOffset = col % 2 === 0 ? 0 : rowOffset
          centerX = col * horizSpacing
          centerY = row * vertSpacing + yOffset
        }

        // Calculate distance from corners (inside the card)
        const distFromTopLeft = Math.sqrt(centerX * centerX + centerY * centerY)
        const distFromBottomRight = Math.sqrt(
          (width - centerX) ** 2 + (height - centerY) ** 2
        )

        const minDistFromCorner = Math.min(distFromTopLeft, distFromBottomRight)

        if (minDistFromCorner < coverageRadius) {
          if (gradientFade) {
            // Gradual fade based on distance
            const fadeRatio = 1 - minDistFromCorner / coverageRadius
            ctx.globalAlpha = opacity * fadeRatio * fadeRatio
          } else {
            // Hard cutoff with full opacity
            ctx.globalAlpha = opacity
          }
          
          drawHexagon(ctx, centerX, centerY, hexSize, isVertical)
        }
      }
    }
  }, [hexSize, opacity, color, gap, coverageRadius, gradientFade, orientation, drawHexagon])

  useEffect(() => {
    drawPattern()

    // Redraw on resize
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
