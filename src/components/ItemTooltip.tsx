import { ItemTooltipData, MC_COLOR_CLASS_MAP, getRarityStars, TextSegment } from '../types/item'

interface ItemTooltipProps {
  item: ItemTooltipData
  className?: string
}

/**
 * Renders a single text segment with MC color styling
 */
function TextSegmentSpan({ segment }: { segment: TextSegment }) {
  const colorClass = MC_COLOR_CLASS_MAP[segment.color]
  const boldClass = segment.bold ? 'mc-bold' : ''

  return (
    <span className={`${colorClass} ${boldClass}`}>
      {segment.text}
    </span>
  )
}

/**
 * Minecraft-style Item Tooltip Component
 *
 * Displays item information with:
 * - Pixel-style double border (outer black, inner purple gradient)
 * - Minecraftia font
 * - Color-coded text segments
 * - Star-based rarity display
 */
export function ItemTooltip({ item, className = '' }: ItemTooltipProps) {
  const nameColorClass = item.nameColor ? MC_COLOR_CLASS_MAP[item.nameColor] : ''
  const rarityStars = item.rarity ? getRarityStars(item.rarity) : null

  return (
    <div className={`mc-tooltip ${className}`}>
      {/* Outer border (black) */}
      <div className="mc-tooltip-border-top" />
      <div className="mc-tooltip-border-left" />
      <div className="mc-tooltip-border-right" />
      <div className="mc-tooltip-border-bottom" />

      {/* Inner content with inner border */}
      <div className="mc-tooltip-inner">
        {/* Inner border (purple) */}
        <div className="mc-tooltip-inner-border-top" />
        <div className="mc-tooltip-inner-border-left" />
        <div className="mc-tooltip-inner-border-right" />
        <div className="mc-tooltip-inner-border-bottom" />

        {/* Content */}
        <div className="mc-tooltip-content">
          {/* Item name - only shown if name is provided */}
          {item.name && (
            <p className={`mc-tooltip-name ${nameColorClass}`}>
              {item.name}
            </p>
          )}

          {/* Rarity stars - only shown if rarity is provided */}
          {rarityStars && (
            <p className="mc-tooltip-rarity">
              <span className="mc-gray">Rarity: </span>
              <span className="mc-gold">{rarityStars}</span>
            </p>
          )}

          {/* Type - only shown if type is provided */}
          {item.type && (
            <p className="mc-tooltip-type">
              <span className="mc-gray">Type: </span>
              <span className="mc-white">{item.type}</span>
            </p>
          )}

          {/* Stats and description lines */}
          {item.lines.map((line, lineIndex) => (
            <p key={lineIndex} className="mc-tooltip-line">
              {line.length === 0 ? (
                // Empty line (spacer)
                <span>&nbsp;</span>
              ) : (
                line.map((segment, segIndex) => (
                  <TextSegmentSpan key={segIndex} segment={segment} />
                ))
              )}
            </p>
          ))}
        </div>
      </div>
    </div>
  )
}
