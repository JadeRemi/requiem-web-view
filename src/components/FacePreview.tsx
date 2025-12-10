import { useState, useEffect, useRef } from 'react'
import { skinQueue } from '../utils/skinQueue'
import { FACE_TEXTURE } from '../config'

interface FacePreviewProps {
  /** Skin hash to load face from */
  skinHash: string
  /** Size of the face preview in pixels */
  size?: number
  /** Additional class name */
  className?: string
}

/**
 * Face Preview Component
 * 
 * Extracts and displays the face (base + overlay layers) from a skin texture.
 * Uses skinQueue for rate-limited loading.
 */
export function FacePreview({ skinHash, size = 32, className }: FacePreviewProps) {
  const [faceDataUrl, setFaceDataUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    let cancelled = false

    async function loadFace() {
      setLoading(true)

      const skinUrl = await skinQueue.getSkinUrl(skinHash)
      if (cancelled || !skinUrl) {
        setLoading(false)
        return
      }

      // Load the skin image
      const img = new Image()
      img.crossOrigin = 'anonymous'

      img.onload = () => {
        if (cancelled) return

        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        // Canvas is 8x8 (face size from skin)
        canvas.width = FACE_TEXTURE.BASE.size
        canvas.height = FACE_TEXTURE.BASE.size

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        // Disable image smoothing for pixelated look
        ctx.imageSmoothingEnabled = false

        // Draw base face layer (8x8 at position 8,8 in 64x64 skin)
        ctx.drawImage(
          img,
          FACE_TEXTURE.BASE.x,
          FACE_TEXTURE.BASE.y,
          FACE_TEXTURE.BASE.size,
          FACE_TEXTURE.BASE.size,
          0,
          0,
          FACE_TEXTURE.BASE.size,
          FACE_TEXTURE.BASE.size
        )

        // Draw overlay/mask layer on top (8x8 at position 40,8 in 64x64 skin)
        ctx.drawImage(
          img,
          FACE_TEXTURE.OVERLAY.x,
          FACE_TEXTURE.OVERLAY.y,
          FACE_TEXTURE.OVERLAY.size,
          FACE_TEXTURE.OVERLAY.size,
          0,
          0,
          FACE_TEXTURE.OVERLAY.size,
          FACE_TEXTURE.OVERLAY.size
        )

        // Export as data URL
        setFaceDataUrl(canvas.toDataURL())
        setLoading(false)
      }

      img.onerror = () => {
        if (cancelled) return
        setLoading(false)
      }

      img.src = skinUrl
    }

    loadFace()

    return () => {
      cancelled = true
    }
  }, [skinHash])

  return (
    <div 
      className={`face-preview ${className ?? ''}`}
      style={{ width: size, height: size }}
    >
      {/* Hidden canvas for face extraction */}
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      
      {loading ? (
        <div className="face-preview-loading" />
      ) : faceDataUrl ? (
        <img 
          src={faceDataUrl} 
          alt="Player face"
          className="face-preview-image"
          style={{ 
            width: size, 
            height: size,
            imageRendering: 'pixelated',
          }}
        />
      ) : (
        <div className="face-preview-placeholder" />
      )}
    </div>
  )
}

