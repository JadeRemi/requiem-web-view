import { useState, useRef } from 'react'
import { usePageTitle } from '../hooks/usePageTitle'
import { GAME_ATTRIBUTES, GameAttribute } from '../mock/attributes'
import { ItemTooltip } from '../components/ItemTooltip'
import { ItemTooltipData, TooltipLine } from '../types/item'

/** Config for random value range */
const ATTRIBUTE_VALUE_MIN = 1
const ATTRIBUTE_VALUE_MAX = 100

/** Generate a random value between min and max */
function getRandomValue(): number {
  return Math.floor(Math.random() * (ATTRIBUTE_VALUE_MAX - ATTRIBUTE_VALUE_MIN + 1)) + ATTRIBUTE_VALUE_MIN
}

/** Create example item tooltip data for an attribute */
function createExampleTooltip(attr: GameAttribute): ItemTooltipData {
  const lines: TooltipLine[] = []

  if (attr.canBeFlat && attr.canBePercent) {
    // Both flat and percent - show flat, "or", then percent
    const flatValue = getRandomValue()
    const percentValue = getRandomValue()
    lines.push([
      { text: `${attr.name}: `, color: 'gray' },
      { text: `+${flatValue}`, color: 'gold' },
    ])
    lines.push([{ text: 'or', color: 'dark_gray' }])
    lines.push([
      { text: `${attr.name}: `, color: 'gray' },
      { text: `+${percentValue}%`, color: 'gold' },
    ])
  } else if (attr.canBeFlat) {
    // Only flat
    const flatValue = getRandomValue()
    lines.push([
      { text: `${attr.name}: `, color: 'gray' },
      { text: `+${flatValue}`, color: 'gold' },
    ])
  } else if (attr.canBePercent) {
    // Only percent
    const percentValue = getRandomValue()
    lines.push([
      { text: `${attr.name}: `, color: 'gray' },
      { text: `+${percentValue}%`, color: 'gold' },
    ])
  }

  return {
    lines,
  }
}

interface AttributeRowProps {
  attr: GameAttribute
}

function AttributeRow({ attr }: AttributeRowProps) {
  const [tooltipData, setTooltipData] = useState<ItemTooltipData | null>(null)
  const rowRef = useRef<HTMLTableRowElement>(null)
  const [tooltipStyle, setTooltipStyle] = useState<React.CSSProperties>({})

  const handleMouseEnter = () => {
    // Create fresh tooltip with new random values on each hover
    setTooltipData(createExampleTooltip(attr))
    if (rowRef.current) {
      const rect = rowRef.current.getBoundingClientRect()
      const gap = 12
      setTooltipStyle({
        position: 'fixed',
        top: rect.top + rect.height / 2,
        left: rect.right + gap,
        transform: 'translateY(-50%)',
      })
    }
  }

  const handleMouseLeave = () => {
    setTooltipData(null)
  }

  return (
    <tr
      ref={rowRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <td className="attribute-name">{attr.name}</td>
      <td className="attribute-description">{attr.description}</td>
      <td className="attribute-modifier">{attr.canBeFlat ? '+1' : '—'}</td>
      <td className="attribute-modifier">{attr.canBePercent ? '+1%' : '—'}</td>
      {tooltipData && (
        <td className="attribute-tooltip-cell" style={{ position: 'relative' }}>
          <div className="attribute-row-tooltip" style={tooltipStyle}>
            <ItemTooltip item={tooltipData} />
          </div>
        </td>
      )}
    </tr>
  )
}

export function WikiAttributesPage() {
  usePageTitle()

  return (
    <div className="wiki-page wiki-attributes-page">
      <div className="wiki-header" />

      <div className="wiki-section">
        <div className="attributes-table-container">
          <table className="attributes-table">
            <thead>
              <tr>
                <th>Attribute</th>
                <th>Description</th>
                <th>Flat</th>
                <th>Percent</th>
              </tr>
            </thead>
            <tbody>
              {GAME_ATTRIBUTES.map((attr) => (
                <AttributeRow key={attr.id} attr={attr} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
