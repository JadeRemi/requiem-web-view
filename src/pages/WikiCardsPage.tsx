import { useState, useEffect, useRef } from 'react'
import { COLLECTIBLE_CARDS, CollectibleCard } from '../mock/cards'
import { usePageTitle } from '../hooks/usePageTitle'

/**
 * Hash function for deterministic randomness from string
 */
function hashString(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash
  }
  return Math.abs(hash)
}

interface CardItemProps {
  card: CollectibleCard
  index: number
  small?: boolean
}

export function CardItem({ card, index, small = false }: CardItemProps) {
  const [isVisible, setIsVisible] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    // Stagger the reveal animation - 30ms delay per card
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, index * 30)

    return () => clearTimeout(timer)
  }, [index])

  // Draw pixelated gradient on canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Low resolution for pixelation
    const pixelSize = small ? 4 : 6
    const width = Math.ceil(canvas.offsetWidth / pixelSize) || 20
    const height = Math.ceil(canvas.offsetHeight / pixelSize) || 30

    canvas.width = width
    canvas.height = height

    // Generate colors deterministically
    const hash = hashString(card.id)

    // Create image data
    const imageData = ctx.createImageData(width, height)

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const i = (y * width + x) * 4

        // Mix multiple noise layers for chaotic effect
        const nx = x / width
        const ny = y / height

        // Base hue from card id
        const baseHue = (hash % 360)

        // Multiple layers of "noise" derived from position and hash
        const layer1 = Math.sin(nx * (3 + (hash % 5)) + (hash * 0.01)) * Math.cos(ny * (4 + (hash % 3)))
        const layer2 = Math.sin((nx + ny) * (5 + (hash % 4)) + hash * 0.02) * 0.5
        const layer3 = Math.cos(nx * 8 - ny * 6 + hash * 0.03) * 0.3

        const combined = (layer1 + layer2 + layer3 + 1) / 2

        // Hue variation
        const hueVar = (combined * 60 - 30 + ((hash >> 8) % 40) - 20)
        const hue = (baseHue + hueVar + 360) % 360

        // Saturation: low for dark muted colors
        const sat = 25 + combined * 30

        // Lightness: very dark
        const light = 8 + combined * 12

        // Convert HSL to RGB
        const c = (1 - Math.abs(2 * light / 100 - 1)) * sat / 100
        const hueSection = hue / 60
        const x2 = c * (1 - Math.abs(hueSection % 2 - 1))
        const m = light / 100 - c / 2

        let r = 0, g = 0, b = 0
        if (hueSection < 1) { r = c; g = x2; b = 0 }
        else if (hueSection < 2) { r = x2; g = c; b = 0 }
        else if (hueSection < 3) { r = 0; g = c; b = x2 }
        else if (hueSection < 4) { r = 0; g = x2; b = c }
        else if (hueSection < 5) { r = x2; g = 0; b = c }
        else { r = c; g = 0; b = x2 }

        imageData.data[i] = Math.floor((r + m) * 255)
        imageData.data[i + 1] = Math.floor((g + m) * 255)
        imageData.data[i + 2] = Math.floor((b + m) * 255)
        imageData.data[i + 3] = 255
      }
    }

    ctx.putImageData(imageData, 0, 0)
  }, [card.id, small])

  return (
    <div className={`collectible-card ${isVisible ? 'visible' : ''} ${small ? 'collectible-card-small' : ''}`}>
      {/* Top half - pixelated gradient */}
      <div className="collectible-card-art">
        <canvas
          ref={canvasRef}
          className="collectible-card-canvas"
        />
      </div>
      {/* Bottom half - card info */}
      <div className="collectible-card-info">
        <span className="collectible-card-title">{card.title}</span>
      </div>
    </div>
  )
}

export function WikiCardsPage() {
  usePageTitle()

  return (
    <div className="wiki-page wiki-cards-page">
      <div className="wiki-section">
        <div className="collectible-cards-grid">
          {COLLECTIBLE_CARDS.map((card, index) => (
            <CardItem key={card.id} card={card} index={index} />
          ))}
        </div>
      </div>
    </div>
  )
}
