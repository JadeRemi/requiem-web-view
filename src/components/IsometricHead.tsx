import { useState, useEffect, useRef } from 'react'
import { skinQueue } from '../utils/skinQueue'

interface IsometricHeadProps {
  /** Skin hash to load head from */
  skinHash: string
  /** Size of the isometric head in pixels */
  size?: number
  /** Additional class name */
  className?: string
}

/**
 * Head texture coordinates in a 64x64 skin
 * Each face is 8x8 pixels
 *
 * Skin layout for head:
 * - Top: (8, 0)
 * - Front: (8, 8)
 * - Right: (0, 8) - visible on the right side when viewing isometrically
 * - Left: (16, 8)
 */
const HEAD_TEXTURES = {
  /** Front face (at position 8, 8) */
  front: { x: 8, y: 8, w: 8, h: 8 },
  /** Right face (at position 0, 8) - shown on right side of isometric view */
  right: { x: 0, y: 8, w: 8, h: 8 },
  /** Top face (at position 8, 0) */
  top: { x: 8, y: 0, w: 8, h: 8 },
}

/**
 * Overlay (helmet) texture coordinates
 */
const HELMET_TEXTURES = {
  front: { x: 40, y: 8, w: 8, h: 8 },
  right: { x: 32, y: 8, w: 8, h: 8 },
  top: { x: 40, y: 0, w: 8, h: 8 },
}

interface FaceImages {
  front: string | null
  right: string | null
  top: string | null
}

/**
 * Isometric Head Component
 *
 * Renders a CSS-based isometric 3D view of a player's head using
 * three faces (front, top, right side) with CSS transforms.
 * No Three.js - pure CSS 3D transforms for performance.
 */
export function IsometricHead({ skinHash, size = 24, className }: IsometricHeadProps) {
  const [faces, setFaces] = useState<FaceImages | null>(null)
  const [loading, setLoading] = useState(true)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    let cancelled = false

    async function loadFaces() {
      setLoading(true)

      const skinUrl = await skinQueue.getSkinUrl(skinHash)
      if (cancelled || !skinUrl) {
        setLoading(false)
        return
      }

      const img = new Image()
      img.crossOrigin = 'anonymous'

      img.onload = () => {
        if (cancelled) return

        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        // Extract each face
        const extractFace = (
          base: { x: number; y: number; w: number; h: number },
          overlay: { x: number; y: number; w: number; h: number }
        ): string => {
          canvas.width = 8
          canvas.height = 8
          ctx.clearRect(0, 0, 8, 8)
          ctx.imageSmoothingEnabled = false

          // Draw base layer
          ctx.drawImage(img, base.x, base.y, base.w, base.h, 0, 0, 8, 8)

          // Draw overlay layer on top
          ctx.drawImage(img, overlay.x, overlay.y, overlay.w, overlay.h, 0, 0, 8, 8)

          return canvas.toDataURL()
        }

        setFaces({
          front: extractFace(HEAD_TEXTURES.front, HELMET_TEXTURES.front),
          right: extractFace(HEAD_TEXTURES.right, HELMET_TEXTURES.right),
          top: extractFace(HEAD_TEXTURES.top, HELMET_TEXTURES.top),
        })
        setLoading(false)
      }

      img.onerror = () => {
        if (cancelled) return
        setLoading(false)
      }

      img.src = skinUrl
    }

    loadFaces()

    return () => {
      cancelled = true
    }
  }, [skinHash])

  // Calculate dimensions for isometric projection
  // The visible width/height depends on the isometric angle
  const faceSize = size * 0.7 // Each face size relative to container

  return (
    <div
      className={`isometric-head ${className ?? ''}`}
      style={{
        width: size,
        height: size,
        position: 'relative',
      }}
    >
      {/* Hidden canvas for texture extraction */}
      <canvas ref={canvasRef} style={{ display: 'none' }} />

      {loading ? (
        <div className="isometric-head-loading" />
      ) : faces ? (
        <div
          className="isometric-head-cube"
          style={{
            width: faceSize,
            height: faceSize,
            position: 'absolute',
            top: '50%',
            left: '50%',
            transformStyle: 'preserve-3d',
            transform: `translate(-50%, -50%) rotateX(-30deg) rotateY(-45deg)`,
          }}
        >
          {/* Front face */}
          <div
            className="isometric-head-face isometric-head-front"
            style={{
              width: faceSize,
              height: faceSize,
              position: 'absolute',
              backgroundImage: `url(${faces.front})`,
              backgroundSize: 'cover',
              imageRendering: 'pixelated',
              transform: `translateZ(${faceSize / 2}px)`,
            }}
          />
          {/* Right face (visible on right side of isometric view) */}
          <div
            className="isometric-head-face isometric-head-right"
            style={{
              width: faceSize,
              height: faceSize,
              position: 'absolute',
              backgroundImage: `url(${faces.right})`,
              backgroundSize: 'cover',
              imageRendering: 'pixelated',
              transform: `rotateY(90deg) translateZ(${faceSize / 2}px) scaleX(-1)`,
            }}
          />
          {/* Top face */}
          <div
            className="isometric-head-face isometric-head-top"
            style={{
              width: faceSize,
              height: faceSize,
              position: 'absolute',
              backgroundImage: `url(${faces.top})`,
              backgroundSize: 'cover',
              imageRendering: 'pixelated',
              transform: `rotateX(90deg) translateZ(${faceSize / 2}px) scaleX(-1)`,
            }}
          />
        </div>
      ) : (
        <div className="isometric-head-placeholder" />
      )}
    </div>
  )
}
