import { Tooltip } from './Tooltip'

export enum BlinkerColor {
  Green = 'green',
}

interface BlinkerProps {
  color?: BlinkerColor
}

/**
 * Blinker - A pulsing circle indicator
 * Used to show online status with an expanding pulse animation
 */
export function Blinker({ color = BlinkerColor.Green }: BlinkerProps) {
  return (
    <Tooltip content="Online" position="top">
      <div className={`blinker blinker-${color}`}>
        <div className="blinker-dot" />
        <div className="blinker-pulse blinker-pulse-1" />
        <div className="blinker-pulse blinker-pulse-2" />
      </div>
    </Tooltip>
  )
}
