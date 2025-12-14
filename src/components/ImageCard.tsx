import { CSSProperties, ReactNode } from 'react'

interface ImageCardProps {
  /** Image source URL */
  src: string
  /** Alt text for accessibility */
  alt: string
  /** Optional description shown below the card */
  description?: ReactNode
  /** Card width */
  width?: number | string
  /** Card height */
  height?: number | string
  /** Additional class for the wrapper */
  className?: string
  /** Additional styles for the card container */
  style?: CSSProperties
}

/**
 * ImageCard Component
 *
 * Reusable card with image and optional description.
 * Image zooms slightly on hover while card stays in place.
 *
 * @example
 * <ImageCard
 *   src="/images/screenshot.jpg"
 *   alt="Game screenshot"
 *   width={540}
 *   height={360}
 *   description="A view of the mystical forest biome"
 * />
 */
export function ImageCard({
  src,
  alt,
  description,
  width = 540,
  height = 360,
  className,
  style,
}: ImageCardProps) {
  const cardStyle: CSSProperties = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
    ...style,
  }

  return (
    <div className={`image-card-wrapper ${className ?? ''}`}>
      <div className="image-card" style={cardStyle}>
        <img src={src} alt={alt} className="image-card-image" />
      </div>
      {description && (
        <p className="image-card-description">{description}</p>
      )}
    </div>
  )
}
