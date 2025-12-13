import { useState, useCallback } from 'react'
import { Typography, TypographyVariant } from '../components/Typography'
import { EnemyViewer } from '../components/EnemyViewer'
import { ENEMY_MODELS, EnemyModel } from '../mock/enemies'
import { useSettingsStore } from '../stores/settingsStore'
import { Icon } from '../components/Icon'

interface EnemyCardProps {
  enemy: EnemyModel
  autoRotate: boolean
  onToggleRotate: () => void
  isExpanding?: boolean
  isCollapsing?: boolean
}

function EnemyCard({ enemy, autoRotate, onToggleRotate, isExpanding, isCollapsing }: EnemyCardProps) {
  let className = 'carousel-item'
  if (isExpanding) className += ' expanding'
  if (isCollapsing) className += ' collapsing'
  
  return (
    <div className={className}>
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
    </div>
  )
}

// Get enemy at cyclic index
function getEnemy(index: number): EnemyModel {
  const len = ENEMY_MODELS.length
  const normalized = ((index % len) + len) % len
  return ENEMY_MODELS[normalized]!
}

interface CardState {
  index: number
  enemy: EnemyModel
  isExpanding?: boolean
  isCollapsing?: boolean
}

export function WikiPage() {
  const [windowStart, setWindowStart] = useState(0)
  const [cards, setCards] = useState<CardState[]>(() => {
    const initial: CardState[] = []
    for (let i = 0; i < 5; i++) {
      initial.push({ index: i, enemy: getEnemy(i) })
    }
    return initial
  })
  const [isAnimating, setIsAnimating] = useState(false)
  
  const enemyRotate = useSettingsStore((state) => state.enemyRotate)
  const setEnemyRotate = useSettingsStore((state) => state.setEnemyRotate)

  const scroll = useCallback((direction: 'left' | 'right') => {
    if (isAnimating) return
    setIsAnimating(true)
    
    if (direction === 'right') {
      // Add new card on right (expanding), mark left for collapse
      const newIndex = windowStart + 5
      const newCards = [
        { ...cards[0]!, isCollapsing: true },
        ...cards.slice(1),
        { index: newIndex, enemy: getEnemy(newIndex), isExpanding: true }
      ]
      setCards(newCards)
      
      setTimeout(() => {
        // Remove collapsed, finalize expanded
        const finalCards: CardState[] = []
        for (let i = 0; i < 5; i++) {
          finalCards.push({ index: windowStart + 1 + i, enemy: getEnemy(windowStart + 1 + i) })
        }
        setCards(finalCards)
        setWindowStart(windowStart + 1)
        setIsAnimating(false)
      }, 300)
    } else {
      // Add new card on left (expanding), mark right for collapse
      const newIndex = windowStart - 1
      const newCards = [
        { index: newIndex, enemy: getEnemy(newIndex), isExpanding: true },
        ...cards.slice(0, -1),
        { ...cards[cards.length - 1]!, isCollapsing: true }
      ]
      setCards(newCards)
      
      setTimeout(() => {
        // Remove collapsed, finalize expanded
        const finalCards: CardState[] = []
        for (let i = 0; i < 5; i++) {
          finalCards.push({ index: windowStart - 1 + i, enemy: getEnemy(windowStart - 1 + i) })
        }
        setCards(finalCards)
        setWindowStart(windowStart - 1)
        setIsAnimating(false)
      }, 300)
    }
  }, [isAnimating, windowStart, cards])

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
          disabled={isAnimating}
          aria-label="Scroll left"
        >
          <Icon name="chevron-left" size={24} />
        </button>

        <div className="enemy-carousel">
          {cards.map((card) => (
            <EnemyCard
              key={card.index}
              enemy={card.enemy}
              autoRotate={enemyRotate}
              onToggleRotate={handleToggleRotate}
              isExpanding={card.isExpanding ?? false}
              isCollapsing={card.isCollapsing ?? false}
            />
          ))}
        </div>

        <button 
          className="carousel-arrow carousel-arrow-right"
          onClick={() => scroll('right')}
          disabled={isAnimating}
          aria-label="Scroll right"
        >
          <Icon name="chevron-right" size={24} />
        </button>
      </div>
    </div>
  )
}
