import { useState, useCallback } from 'react'
import { Typography, TypographyVariant } from '../components/Typography'
import { EnemyViewer } from '../components/EnemyViewer'
import { EquipmentViewer } from '../components/EquipmentViewer'
import { ClassViewer } from '../components/ClassViewer'
import { ENEMY_MODELS, EnemyModel } from '../mock/enemies'
import { EQUIPMENT_MODELS, EquipmentModel } from '../mock/equipment'
import { PLAYER_CLASSES, PlayerClass } from '../mock/classes'
import { useSettingsStore } from '../stores/settingsStore'
import { usePageTitle } from '../hooks/usePageTitle'
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

interface ItemCardProps {
  item: EquipmentModel
}

function ItemCard({ item }: ItemCardProps) {
  return (
    <div className="wiki-item-card">
      <div className="wiki-item-viewer">
        <EquipmentViewer model={item} autoRotate={false} />
      </div>
      <div className="wiki-item-info">
        <Typography variant={TypographyVariant.H4}>{item.name}</Typography>
      </div>
    </div>
  )
}

interface ClassCardProps {
  playerClass: PlayerClass
}

function ClassCard({ playerClass }: ClassCardProps) {
  return (
    <div className="wiki-class-card">
      <div className="wiki-class-viewer">
        <ClassViewer playerClass={playerClass} />
      </div>
      <div className="wiki-class-info">
        <Typography variant={TypographyVariant.H3}>{playerClass.name}</Typography>
        <Typography variant={TypographyVariant.Body} color="var(--color-text-secondary)">
          {playerClass.description}
        </Typography>
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
  usePageTitle()
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

      {/* Enemies Section */}
      <div className="wiki-section">
        <Typography variant={TypographyVariant.H2}>Enemies</Typography>
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

      {/* Items Section */}
      <div className="wiki-section">
        <Typography variant={TypographyVariant.H2}>Items</Typography>
        <div className="wiki-items-grid">
          {EQUIPMENT_MODELS.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      </div>

      {/* Classes Section */}
      <div className="wiki-section">
        <Typography variant={TypographyVariant.H2}>Classes</Typography>
        <div className="wiki-classes-grid">
          {PLAYER_CLASSES.map((playerClass) => (
            <ClassCard key={playerClass.id} playerClass={playerClass} />
          ))}
        </div>
      </div>
    </div>
  )
}
