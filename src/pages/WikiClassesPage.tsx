import { Link } from 'react-router-dom'
import { Typography, TypographyVariant } from '../components/Typography'
import { ClassViewer } from '../components/ClassViewer'
import { PLAYER_CLASSES, PlayerClass } from '../mock/classes'
import { usePageTitle } from '../hooks/usePageTitle'
import { ROUTES } from '../config'
import { Icon } from '../components/Icon'

interface ClassCardProps {
  playerClass: PlayerClass
}

function ClassCard({ playerClass }: ClassCardProps) {
  return (
    <div className="wiki-class-card wiki-class-card-large">
      <div className="wiki-class-viewer wiki-class-viewer-large">
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

export function WikiClassesPage() {
  usePageTitle()

  return (
    <div className="wiki-page">
      <div className="wiki-header">
        <Link to={ROUTES.WIKI} className="wiki-back-link">
          <Icon name="chevron-left" size={20} />
          <Typography variant={TypographyVariant.Body}>Wiki</Typography>
        </Link>
        <Typography variant={TypographyVariant.H1}>Classes</Typography>
      </div>

      <div className="wiki-section">
        <div className="wiki-classes-grid">
          {PLAYER_CLASSES.map((playerClass) => (
            <ClassCard key={playerClass.id} playerClass={playerClass} />
          ))}
        </div>
      </div>
    </div>
  )
}
