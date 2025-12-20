import { useState, useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { Typography, TypographyVariant } from '../components/Typography'
import { ClassViewer } from '../components/ClassViewer'
import { PLAYER_CLASSES, PlayerClass } from '../mock/classes'
import { getClassAbilities, ClassAbility } from '../mock/abilities'
import { usePageTitle } from '../hooks/usePageTitle'
import { Icon } from '../components/Icon'

interface AbilityItemProps {
  ability: ClassAbility
  isLast: boolean
}

function AbilityItem({ ability, isLast }: AbilityItemProps) {
  return (
    <div className={`ability-item ${isLast ? 'ability-item-last' : ''}`}>
      <div className="ability-timeline">
        <div className={`ability-circle ${ability.isMainAbility ? 'ability-circle-main' : ''}`}>
          ❂
        </div>
        {!isLast && <div className="ability-line" />}
      </div>
      <div className="ability-content">
        <Typography
          variant={TypographyVariant.BodySmall}
          color={ability.isMainAbility ? 'var(--magenta-400)' : 'var(--grey-200)'}
          style={{ fontWeight: 500 }}
        >
          {ability.name}
          {ability.isMainAbility && <span className="ability-main-tag"> (Main)</span>}
        </Typography>
        <Typography
          variant={TypographyVariant.BodySmall}
          color="var(--grey-400)"
          style={{ whiteSpace: 'pre-wrap', lineHeight: 1.5 }}
        >
          {ability.description}
        </Typography>
      </div>
    </div>
  )
}

interface AbilitiesBlockProps {
  classId: string
  isExpanded: boolean
  onToggle: () => void
}

function AbilitiesBlock({ classId, isExpanded, onToggle }: AbilitiesBlockProps) {
  const abilities = getClassAbilities(classId)

  if (abilities.length === 0) return null

  return (
    <div className="abilities-block">
      <button className="abilities-toggle" onClick={onToggle}>
        <Typography variant={TypographyVariant.BodySmall} color="var(--grey-300)">
          Abilities ({abilities.length})
        </Typography>
        <Icon
          name="chevron-down"
          size={16}
          className={`abilities-chevron ${isExpanded ? 'abilities-chevron-open' : ''}`}
        />
      </button>
      {isExpanded && (
        <div className="abilities-list">
          {abilities.map((ability, index) => (
            <AbilityItem
              key={ability.id}
              ability={ability}
              isLast={index === abilities.length - 1}
            />
          ))}
        </div>
      )}
    </div>
  )
}

interface ClassCardProps {
  playerClass: PlayerClass
  scrollRef?: React.RefObject<HTMLDivElement> | undefined
  expandedClassId: string | null
  onExpandAbilities: (classId: string) => void
}

function ClassCard({ playerClass, scrollRef, expandedClassId, onExpandAbilities }: ClassCardProps) {
  const [isVisible, setIsVisible] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const abilities = getClassAbilities(playerClass.id)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Mount when entering viewport, unmount when leaving
        setIsVisible(entry?.isIntersecting ?? false)
      },
      { rootMargin: '200px' }
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const handleToggleAbilities = () => {
    onExpandAbilities(expandedClassId === playerClass.id ? '' : playerClass.id)
  }

  return (
    <div
      ref={(el) => {
        (cardRef as React.MutableRefObject<HTMLDivElement | null>).current = el
        if (scrollRef) {
          (scrollRef as React.MutableRefObject<HTMLDivElement | null>).current = el
        }
      }}
      id={playerClass.id}
      className="wiki-class-card wiki-class-card-large"
    >
      <div className="wiki-class-viewer wiki-class-viewer-large">
        {isVisible && <ClassViewer playerClass={playerClass} />}
      </div>
      <div className="wiki-class-info">
        <Typography variant={TypographyVariant.H3}>{playerClass.name}</Typography>
        <Typography variant={TypographyVariant.BodySmall} color="var(--color-text-tertiary)">
          Difficulty: {playerClass.difficulty}
        </Typography>
        <Typography variant={TypographyVariant.Body} color="var(--color-text-secondary)">
          {playerClass.description}
        </Typography>
        {abilities.length > 0 && (
          <AbilitiesBlock
            classId={playerClass.id}
            isExpanded={expandedClassId === playerClass.id}
            onToggle={handleToggleAbilities}
          />
        )}
      </div>
    </div>
  )
}

export function WikiClassesPage() {
  usePageTitle()
  const location = useLocation()
  const targetRef = useRef<HTMLDivElement>(null)
  const [expandedClassId, setExpandedClassId] = useState<string | null>(null)

  // Scroll to class if hash is present
  useEffect(() => {
    const hash = location.hash.slice(1) // Remove the # prefix
    if (hash) {
      // Small delay to ensure DOM is rendered
      setTimeout(() => {
        const element = document.getElementById(hash)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
      }, 100)
    }
  }, [location.hash])

  const handleExpandAbilities = (classId: string) => {
    setExpandedClassId(classId || null)
  }

  return (
    <div className="wiki-page">
      <div className="wiki-header" />

      <div className="wiki-section">
        <div className="wiki-classes-grid">
          {PLAYER_CLASSES.map((playerClass) => (
            <ClassCard
              key={playerClass.id}
              playerClass={playerClass}
              scrollRef={location.hash === `#${playerClass.id}` ? targetRef : undefined}
              expandedClassId={expandedClassId}
              onExpandAbilities={handleExpandAbilities}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
