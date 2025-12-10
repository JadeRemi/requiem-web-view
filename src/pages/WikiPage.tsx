import { useRef, useState, useCallback, useEffect } from 'react'
import { Typography, TypographyVariant } from '../components/Typography'
import { EnemyViewer } from '../components/EnemyViewer'
import { ENEMY_MODELS, EnemyModel } from '../mock/enemies'
import { useSettingsStore } from '../stores/settingsStore'
import { Icon } from '../components/Icon'

interface VirtualCard {
  virtualIndex: number
  enemy: EnemyModel
}

interface EnemyCardProps {
  enemy: EnemyModel
  autoRotate: boolean
  onToggleRotate: () => void
}

function EnemyCard({ enemy, autoRotate, onToggleRotate }: EnemyCardProps) {
  return (
    <div className="enemy-card">
      <div className="enemy-card-title">
        <Typography 
          variant={TypographyVariant.H3} 
          style={{ textTransform: 'none' }}
        >
          {enemy.name}
        </Typography>
      </div>
      <EnemyViewer 
        model={enemy} 
        autoRotate={autoRotate}
        onToggleRotate={onToggleRotate}
      />
    </div>
  )
}

// How many cards to show in the carousel at once
const VISIBLE_COUNT = 5

// Get enemy at any virtual index (cycles through the array)
function getEnemyAtIndex(virtualIndex: number): EnemyModel {
  const len = ENEMY_MODELS.length
  const normalized = ((virtualIndex % len) + len) % len
  return ENEMY_MODELS[normalized]!
}

// Generate cards for a range of virtual indices
function generateCards(startIndex: number, count: number): VirtualCard[] {
  const cards: VirtualCard[] = []
  for (let i = 0; i < count; i++) {
    const virtualIndex = startIndex + i
    cards.push({
      virtualIndex,
      enemy: getEnemyAtIndex(virtualIndex),
    })
  }
  return cards
}

export function WikiPage() {
  const carouselRef = useRef<HTMLDivElement>(null)
  // The virtual index of the leftmost visible card
  const [windowStart, setWindowStart] = useState(0)
  const [cards, setCards] = useState<VirtualCard[]>(() => generateCards(0, VISIBLE_COUNT))
  
  const enemyRotate = useSettingsStore((state) => state.enemyRotate)
  const setEnemyRotate = useSettingsStore((state) => state.setEnemyRotate)

  // Keep carousel scroll position at the start (cards shift, scroll doesn't)
  useEffect(() => {
    const carousel = carouselRef.current
    if (carousel) {
      carousel.scrollLeft = 0
    }
  }, [cards])

  const scroll = useCallback((direction: 'left' | 'right') => {
    if (direction === 'right') {
      // Move window right: remove leftmost card, add new one on right
      const newStart = windowStart + 1
      setWindowStart(newStart)
      setCards(generateCards(newStart, VISIBLE_COUNT))
    } else {
      // Move window left: remove rightmost card, add new one on left
      const newStart = windowStart - 1
      setWindowStart(newStart)
      setCards(generateCards(newStart, VISIBLE_COUNT))
    }
  }, [windowStart])

  const handleToggleRotate = useCallback(() => {
    setEnemyRotate(!enemyRotate)
  }, [enemyRotate, setEnemyRotate])

  return (
    <div className="wiki-page">
      <div className="wiki-header">
        <Typography variant={TypographyVariant.H1}>Wiki</Typography>
      </div>

      <div className="carousel-container">
        <button 
          className="carousel-arrow carousel-arrow-left"
          onClick={() => scroll('left')}
          aria-label="Scroll left"
        >
          <Icon name="chevron-left" size={24} />
        </button>

        <div className="enemy-carousel" ref={carouselRef}>
          {cards.map((card) => (
            <div key={card.virtualIndex}>
              <EnemyCard
                enemy={card.enemy}
                autoRotate={enemyRotate}
                onToggleRotate={handleToggleRotate}
              />
            </div>
          ))}
        </div>

        <button 
          className="carousel-arrow carousel-arrow-right"
          onClick={() => scroll('right')}
          aria-label="Scroll right"
        >
          <Icon name="chevron-right" size={24} />
        </button>
      </div>
    </div>
  )
}
