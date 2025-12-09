import { CSSProperties } from 'react'

interface LoaderProps {
  /** Size of the loader in pixels */
  size?: number
  /** Color of the bars */
  color?: string
  /** Additional class name */
  className?: string
  /** Additional styles */
  style?: CSSProperties
}

/**
 * App-wide Loader Component
 * 
 * 5 vertical bars that animate in a wave pattern left-right-left
 */
export function Loader({ 
  size = 40, 
  color = 'var(--grey-400)', 
  className,
  style 
}: LoaderProps) {
  const barWidth = size / 8
  const gap = size / 10
  const totalWidth = barWidth * 5 + gap * 4

  return (
    <svg
      width={totalWidth}
      height={size}
      viewBox={`0 0 ${totalWidth} ${size}`}
      className={className}
      style={style}
      aria-label="Loading"
    >
      {[0, 1, 2, 3, 4].map((index) => (
        <rect
          key={index}
          x={index * (barWidth + gap)}
          y={size * 0.2}
          width={barWidth}
          height={size * 0.6}
          rx={barWidth / 2}
          fill={color}
        >
          <animate
            attributeName="height"
            values={`${size * 0.3};${size * 0.8};${size * 0.3}`}
            dur="1s"
            repeatCount="indefinite"
            begin={`${index * 0.1}s`}
          />
          <animate
            attributeName="y"
            values={`${size * 0.35};${size * 0.1};${size * 0.35}`}
            dur="1s"
            repeatCount="indefinite"
            begin={`${index * 0.1}s`}
          />
        </rect>
      ))}
    </svg>
  )
}

