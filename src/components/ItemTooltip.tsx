import { ItemTooltipData, MC_COLOR_CLASS_MAP, RARITY_CONFIG, ITEM_TYPE_LABELS, TextSegment } from '../types/item'

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
 * - Proper text shadows
 */
export function ItemTooltip({ item, className = '' }: ItemTooltipProps) {
  const rarityConfig = RARITY_CONFIG[item.rarity]
  const typeLabel = ITEM_TYPE_LABELS[item.type]
  const nameColorClass = MC_COLOR_CLASS_MAP[item.nameColor]
  const rarityColorClass = MC_COLOR_CLASS_MAP[rarityConfig.color]

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
          {/* Item name */}
          <p className={`mc-tooltip-name ${nameColorClass}`}>
            {item.name}
          </p>

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

          {/* Rarity + Type line */}
          <p className={`mc-tooltip-rarity ${rarityColorClass} mc-bold`}>
            {rarityConfig.label} {typeLabel}
          </p>
        </div>
      </div>
    </div>
  )
}
