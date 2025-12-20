import { useMemo } from 'react'
import { Typography, TypographyVariant } from '../components/Typography'
import { Tooltip } from '../components/Tooltip'
import { Markdown } from '../utils/markdown'
import { usePageTitle } from '../hooks/usePageTitle'
import { useAuth } from '../contexts/AuthContext'
import { fetchChangelog, getPatchesSinceDate, type PatchDTO } from '../mock/changelog'
import { formatShortDate, formatRelativeTime } from '../utils/dateFormat'

interface PatchCardProps {
  patch: PatchDTO
  isNew?: boolean
}

function PatchCard({ patch, isNew }: PatchCardProps) {
  return (
    <div className={`patch-card ${isNew ? 'patch-card-new' : ''}`}>
      <div className="patch-card-header">
        <div className="patch-card-version">
          <Typography variant={TypographyVariant.H3} style={{ textTransform: 'none' }}>
            v{patch.version}
          </Typography>
          {patch.title && (
            <Typography
              variant={TypographyVariant.BodySmall}
              color="var(--color-text-secondary)"
              style={{ textTransform: 'none' }}
            >
              — {patch.title}
            </Typography>
          )}
        </div>
        <div className="patch-card-meta">
          {isNew && <span className="patch-new-badge">New</span>}
          <Tooltip content={formatRelativeTime(patch.date)} position="bottom">
            <Typography variant={TypographyVariant.Caption} color="var(--color-text-tertiary)">
              {formatShortDate(patch.date)}
            </Typography>
          </Tooltip>
        </div>
      </div>
      <div className="patch-card-content">
        <Markdown content={patch.content} />
      </div>
    </div>
  )
}

interface SinceLastVisitProps {
  patches: PatchDTO[]
  lastVisitDate: string
}

function SinceLastVisit({ patches, lastVisitDate }: SinceLastVisitProps) {
  if (patches.length === 0) {
    return (
      <div className="since-last-visit since-last-visit-empty">
        <Typography variant={TypographyVariant.Body} color="var(--color-text-secondary)">
          No new patches since your last visit ({formatShortDate(lastVisitDate)})
        </Typography>
      </div>
    )
  }

  return (
    <div className="since-last-visit">
      <div className="since-last-visit-header">
        <Typography variant={TypographyVariant.H3}>Since your last visit</Typography>
        <Typography variant={TypographyVariant.Caption} color="var(--color-text-tertiary)">
          <span className="since-last-visit-count">{patches.length}</span> new{' '}
          {patches.length === 1 ? 'patch' : 'patches'} since {formatShortDate(lastVisitDate)}
        </Typography>
      </div>
      <div className="since-last-visit-summary">
        {[...patches].reverse().map((patch) => (
          <a key={patch.version} href={`#patch-${patch.version}`} className="since-last-visit-item">
            <span className="since-last-visit-version">v{patch.version}</span>
          </a>
        ))}
      </div>
    </div>
  )
}

export function ChangelogPage() {
  usePageTitle()
  const { user } = useAuth()

  // Fetch changelog data
  const { patches, lastVisit } = useMemo(() => {
    const playerUuid = user?.type === 'game' ? user.gameUuid : undefined
    return fetchChangelog(playerUuid)
  }, [user])

  // Get patches since last visit (only if logged in with game account)
  const newPatches = useMemo(() => {
    if (!lastVisit) return []
    return getPatchesSinceDate(lastVisit)
  }, [lastVisit])

  const newPatchVersions = useMemo(() => {
    return new Set(newPatches.map((p) => p.version))
  }, [newPatches])

  return (
    <div className="page changelog-page">
      <div className="changelog-content">
        {user?.type === 'game' && lastVisit && (
          <SinceLastVisit patches={newPatches} lastVisitDate={lastVisit} />
        )}

        <div className="patch-list">
          {patches.map((patch) => (
            <div key={patch.version} id={`patch-${patch.version}`}>
              <PatchCard patch={patch} isNew={newPatchVersions.has(patch.version)} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
