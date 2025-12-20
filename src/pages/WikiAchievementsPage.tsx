import { useState, useMemo, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Typography, TypographyVariant } from '../components/Typography'
import { usePageTitle } from '../hooks/usePageTitle'
import { Icon } from '../components/Icon'
import { ACHIEVEMENTS, isAchievementUnlocked, getUnlockedCount, getTotalCount, UNLOCKED_ACHIEVEMENTS } from '../mock/achievements'
import { useAuth } from '../contexts/AuthContext'

type AchievementFilter = 'all' | 'completed' | 'incomplete'
type AchievementSort = 'newest' | 'oldest' | null

export function WikiAchievementsPage() {
  usePageTitle()
  const location = useLocation()
  const { isLoggedIn } = useAuth()
  const [filter, setFilter] = useState<AchievementFilter>('all')
  const [sort, setSort] = useState<AchievementSort>(null)

  // Reset sort when filter changes
  const handleFilterChange = (newFilter: AchievementFilter) => {
    setFilter(newFilter)
    setSort(null)
  }

  // Sort is disabled when viewing incomplete achievements
  const sortDisabled = filter === 'incomplete'

  const filteredAchievements = useMemo(() => {
    let result = [...ACHIEVEMENTS]

    // Filter
    if (isLoggedIn && filter !== 'all') {
      result = result.filter((achievement) => {
        const unlocked = isAchievementUnlocked(achievement.id)
        return filter === 'completed' ? unlocked : !unlocked
      })
    }

    // Sort - completed achievements sorted by unlock date, incomplete sorted to bottom
    if (isLoggedIn && sort) {
      const unlockedMap = new Map(
        UNLOCKED_ACHIEVEMENTS.map(u => [u.id, new Date(u.unlockedAt).getTime()])
      )

      result.sort((a, b) => {
        const aUnlocked = unlockedMap.has(a.id)
        const bUnlocked = unlockedMap.has(b.id)

        // Both unlocked - sort by date
        if (aUnlocked && bUnlocked) {
          const aTime = unlockedMap.get(a.id)!
          const bTime = unlockedMap.get(b.id)!
          return sort === 'newest' ? bTime - aTime : aTime - bTime
        }

        // One unlocked, one not - incomplete always goes to bottom
        if (aUnlocked !== bUnlocked) {
          return aUnlocked ? -1 : 1 // completed first, incomplete at bottom
        }

        return 0
      })
    }

    return result
  }, [isLoggedIn, filter, sort])

  // Scroll to achievement when hash is present
  useEffect(() => {
    if (!location.hash) return
    const id = location.hash.slice(1) // Remove the '#'

    // Small delay to ensure DOM is rendered
    const timeoutId = setTimeout(() => {
      const element = document.getElementById(id)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    }, 100)

    return () => clearTimeout(timeoutId)
  }, [location.hash])

  return (
    <div className="wiki-page wiki-achievements-page">
      <div className="wiki-header">
        {isLoggedIn && (
          <div className="achievements-header-row">
            <div className="achievements-progress">
              <Typography variant={TypographyVariant.BodySmall} color="var(--grey-400)">
                Progress: {getUnlockedCount()} / {getTotalCount()}
              </Typography>
            </div>
            <div className="achievements-controls">
              <div className="achievements-filter">
                <label className={`filter-option ${filter === 'all' ? 'active' : ''}`}>
                  <input
                    type="radio"
                    name="achievement-filter"
                    value="all"
                    checked={filter === 'all'}
                    onChange={() => handleFilterChange('all')}
                  />
                  <span>All</span>
                </label>
                <label className={`filter-option ${filter === 'completed' ? 'active' : ''}`}>
                  <input
                    type="radio"
                    name="achievement-filter"
                    value="completed"
                    checked={filter === 'completed'}
                    onChange={() => handleFilterChange('completed')}
                  />
                  <span>Completed</span>
                </label>
                <label className={`filter-option ${filter === 'incomplete' ? 'active' : ''}`}>
                  <input
                    type="radio"
                    name="achievement-filter"
                    value="incomplete"
                    checked={filter === 'incomplete'}
                    onChange={() => handleFilterChange('incomplete')}
                  />
                  <span>Incomplete</span>
                </label>
              </div>
              <div className={`achievements-filter ${sortDisabled ? 'filter-disabled' : ''}`}>
                <label className={`filter-option ${sort === 'newest' ? 'active' : ''}`}>
                  <input
                    type="radio"
                    name="achievement-sort"
                    value="newest"
                    checked={sort === 'newest'}
                    onChange={() => setSort('newest')}
                    disabled={sortDisabled}
                  />
                  <span>Newest</span>
                </label>
                <label className={`filter-option ${sort === 'oldest' ? 'active' : ''}`}>
                  <input
                    type="radio"
                    name="achievement-sort"
                    value="oldest"
                    checked={sort === 'oldest'}
                    onChange={() => setSort('oldest')}
                    disabled={sortDisabled}
                  />
                  <span>Oldest</span>
                </label>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="wiki-section">
        <div className="achievements-list">
          {filteredAchievements.map((achievement) => {
            const unlocked = isLoggedIn && isAchievementUnlocked(achievement.id)
            return (
              <div
                key={achievement.id}
                id={achievement.id}
                className={`achievement-card ${unlocked ? 'achievement-card-unlocked' : ''}`}
              >
                <div className="achievement-icon">
                  <Icon name={unlocked ? 'check' : 'lock'} size={20} />
                </div>
                <div className="achievement-content">
                  <Typography
                    variant={TypographyVariant.Body}
                    style={{ fontWeight: 500 }}
                    color={unlocked ? 'var(--grey-100)' : 'var(--grey-300)'}
                  >
                    {achievement.name}
                  </Typography>
                  <Typography
                    variant={TypographyVariant.BodySmall}
                    color={unlocked ? 'var(--grey-300)' : 'var(--grey-500)'}
                  >
                    {achievement.description}
                  </Typography>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
