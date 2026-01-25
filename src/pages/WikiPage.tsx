import { useState, useCallback, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Typography, TypographyVariant } from '../components/Typography'
import { EnemyViewer } from '../components/EnemyViewer'
import { EquipmentViewer } from '../components/EquipmentViewer'
import { ClassViewer } from '../components/ClassViewer'
import { ENEMY_MODELS, EnemyModel } from '../mock/enemies'
import { EQUIPMENT_MODELS, EquipmentModel } from '../mock/equipment'
import { getPreviewClasses, PlayerClass } from '../mock/classes'
import { GAME_ATTRIBUTES } from '../mock/attributes'
import { ACHIEVEMENTS } from '../mock/achievements'
import { getRandomCards } from '../mock/cards'
import { CardItem } from './WikiCardsPage'
import { useSettingsStore } from '../stores/settingsStore'
import { usePageTitle } from '../hooks/usePageTitle'
import { Icon } from '../components/Icon'
import { ROUTES } from '../config'

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
    <div className="wiki-class-card wiki-class-card-small">
      <div className="wiki-class-viewer wiki-class-viewer-small">
        <ClassViewer playerClass={playerClass} />
      </div>
      <div className="wiki-class-info">
        <Typography variant={TypographyVariant.H4}>{playerClass.name}</Typography>
        <Typography variant={TypographyVariant.BodySmall} color="var(--color-text-secondary)">
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

  // Random attributes for preview (changes on each render)
  const previewAttributes = useMemo(() => {
    const shuffled = [...GAME_ATTRIBUTES].sort(() => Math.random() - 0.5)
    return shuffled.slice(0, 5)
  }, [])

  // Random achievements for preview
  const previewAchievements = useMemo(() => {
    const shuffled = [...ACHIEVEMENTS].sort(() => Math.random() - 0.5)
    return shuffled.slice(0, 5)
  }, [])

  // Random cards for preview
  const previewCards = useMemo(() => getRandomCards(6), [])

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

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="wiki-page">
      {/* Summary / Table of Contents */}
      <div className="wiki-summary">
        <Typography variant={TypographyVariant.H3}>Summary</Typography>
        <nav className="wiki-toc">
          <button className="wiki-toc-link" onClick={() => scrollToSection('enemies')}>
            Enemies
          </button>
          <button className="wiki-toc-link" onClick={() => scrollToSection('items')}>
            Items
          </button>
          <button className="wiki-toc-link" onClick={() => scrollToSection('classes')}>
            Classes
          </button>
          <button className="wiki-toc-link" onClick={() => scrollToSection('abilities')}>
            Abilities
          </button>
          <button className="wiki-toc-link" onClick={() => scrollToSection('attributes')}>
            Attributes
          </button>
          <button className="wiki-toc-link" onClick={() => scrollToSection('achievements')}>
            Achievements
          </button>
          <button className="wiki-toc-link" onClick={() => scrollToSection('terms')}>
            Terms
          </button>
          <button className="wiki-toc-link" onClick={() => scrollToSection('cards')}>
            Cards
          </button>
          <button className="wiki-toc-link" onClick={() => scrollToSection('commands')}>
            Commands
          </button>
          <button className="wiki-toc-link" onClick={() => scrollToSection('recipes')}>
            Recipes
          </button>
          <button className="wiki-toc-link" onClick={() => scrollToSection('rules')}>
            Rules
          </button>
        </nav>
      </div>

      {/* Enemies Section */}
      <div id="enemies" className="wiki-section">
        <Link to={ROUTES.WIKI_ENEMIES} className="wiki-section-link">
          <Typography variant={TypographyVariant.H2}>Enemies</Typography>
        </Link>
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
        <Link to={ROUTES.WIKI_ENEMIES} className="wiki-view-all-link">
          <Typography variant={TypographyVariant.Body}>View all enemies</Typography>
          <Icon name="chevron-right" size={16} />
        </Link>
      </div>

      {/* Items Section */}
      <div id="items" className="wiki-section">
        <Link to={ROUTES.WIKI_ITEMS} className="wiki-section-link">
          <Typography variant={TypographyVariant.H2}>Items</Typography>
        </Link>
        <div className="wiki-items-grid">
          {EQUIPMENT_MODELS.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
        <Link to={ROUTES.WIKI_ITEMS} className="wiki-view-all-link">
          <Typography variant={TypographyVariant.Body}>View all items</Typography>
          <Icon name="chevron-right" size={16} />
        </Link>
      </div>

      {/* Classes Section */}
      <div id="classes" className="wiki-section">
        <Link to={ROUTES.WIKI_CLASSES} className="wiki-section-link">
          <Typography variant={TypographyVariant.H2}>Classes</Typography>
        </Link>
        <div className="wiki-classes-grid">
          {getPreviewClasses().map((playerClass) => (
            <ClassCard key={playerClass.id} playerClass={playerClass} />
          ))}
        </div>
        <Link to={ROUTES.WIKI_CLASSES} className="wiki-view-all-link">
          <Typography variant={TypographyVariant.Body}>View all classes</Typography>
          <Icon name="chevron-right" size={16} />
        </Link>
      </div>

      {/* Abilities Section */}
      <div id="abilities" className="wiki-section">
        <Typography variant={TypographyVariant.H2}>Abilities</Typography>
        <Link to={ROUTES.WIKI_ABILITIES} className="wiki-view-all-link">
          <Typography variant={TypographyVariant.Body}>View all abilities</Typography>
          <Icon name="chevron-right" size={16} />
        </Link>
      </div>

      {/* Attributes Section */}
      <div id="attributes" className="wiki-section">
        <Link to={ROUTES.WIKI_ATTRIBUTES} className="wiki-section-link">
          <Typography variant={TypographyVariant.H2}>Attributes</Typography>
        </Link>
        <div className="wiki-attributes-preview">
          <table className="attributes-preview-table">
            <tbody>
              {previewAttributes.map((attr) => (
                <tr key={attr.id}>
                  <td className="attribute-name">{attr.name}</td>
                  <td className="attribute-description">{attr.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Link to={ROUTES.WIKI_ATTRIBUTES} className="wiki-view-all-link">
          <Typography variant={TypographyVariant.Body}>View all attributes</Typography>
          <Icon name="chevron-right" size={16} />
        </Link>
      </div>

      {/* Achievements Section */}
      <div id="achievements" className="wiki-section">
        <Link to={ROUTES.WIKI_ACHIEVEMENTS} className="wiki-section-link">
          <Typography variant={TypographyVariant.H2}>Achievements</Typography>
        </Link>
        <div className="wiki-achievements-preview">
          {previewAchievements.map((achievement) => (
            <div key={achievement.id} className="achievement-preview-card">
              <Typography variant={TypographyVariant.BodySmall} style={{ fontWeight: 500 }}>
                {achievement.name}
              </Typography>
              <Typography variant={TypographyVariant.BodySmall} color="var(--grey-400)">
                {achievement.description}
              </Typography>
            </div>
          ))}
        </div>
        <Link to={ROUTES.WIKI_ACHIEVEMENTS} className="wiki-view-all-link">
          <Typography variant={TypographyVariant.Body}>View all achievements</Typography>
          <Icon name="chevron-right" size={16} />
        </Link>
      </div>

      {/* Terms Section */}
      <div id="terms" className="wiki-section">
        <Typography variant={TypographyVariant.H2}>Terms</Typography>
        <Link to={ROUTES.WIKI_TERMS} className="wiki-view-all-link">
          <Typography variant={TypographyVariant.Body}>View all terms</Typography>
          <Icon name="chevron-right" size={16} />
        </Link>
      </div>

      {/* Cards Section */}
      <div id="cards" className="wiki-section">
        <Link to={ROUTES.WIKI_CARDS} className="wiki-section-link">
          <Typography variant={TypographyVariant.H2}>Cards</Typography>
        </Link>
        <div className="wiki-cards-preview-row">
          {previewCards.map((card, index) => (
            <CardItem key={card.id} card={card} index={index} small />
          ))}
        </div>
        <Link to={ROUTES.WIKI_CARDS} className="wiki-view-all-link">
          <Typography variant={TypographyVariant.Body}>View all cards</Typography>
          <Icon name="chevron-right" size={16} />
        </Link>
      </div>

      {/* Commands Section */}
      <div id="commands" className="wiki-section">
        <Typography variant={TypographyVariant.H2}>Commands</Typography>
        <Link to={ROUTES.WIKI_COMMANDS} className="wiki-view-all-link">
          <Typography variant={TypographyVariant.Body}>View all commands</Typography>
          <Icon name="chevron-right" size={16} />
        </Link>
      </div>

      {/* Recipes Section */}
      <div id="recipes" className="wiki-section">
        <Typography variant={TypographyVariant.H2}>Recipes</Typography>
        <Link to={ROUTES.WIKI_RECIPES} className="wiki-view-all-link">
          <Typography variant={TypographyVariant.Body}>View all recipes</Typography>
          <Icon name="chevron-right" size={16} />
        </Link>
      </div>

      {/* Rules Section */}
      <div id="rules" className="wiki-section">
        <Typography variant={TypographyVariant.H2}>Rules</Typography>
        <Link to={ROUTES.RULES} className="wiki-view-all-link">
          <Typography variant={TypographyVariant.Body}>View all rules</Typography>
          <Icon name="chevron-right" size={16} />
        </Link>
      </div>
    </div>
  )
}
