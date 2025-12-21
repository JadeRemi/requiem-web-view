import { CURRENCY } from '../config'
import { assetPath } from '../utils/assetPath'

interface CoinViewerProps {
  size?: number
  className?: string
}

/**
 * CoinViewer - displays animated coin GIF
 * Replaces the heavy 3D model with a lightweight GIF
 */
export function CoinViewer({ size = 24, className = '' }: CoinViewerProps) {
  const { scale, opacity } = CURRENCY.COIN_GIF

  return (
    <div
      className={`coin-viewer ${className}`}
      style={{ width: size, height: size, pointerEvents: 'none' }}
    >
      <img
        src={assetPath('/images/coin-flip.gif')}
        alt="coin"
        className="coin-gif"
        style={{
          width: size,
          height: size,
          objectFit: 'contain',
          opacity,
          transform: `scale(${scale})`,
        }}
      />
    </div>
  )
}
