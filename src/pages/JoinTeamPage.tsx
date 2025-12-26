import { Typography, TypographyVariant } from '../components/Typography'
import { Icon } from '../components/Icon'
import { usePageTitle } from '../hooks/usePageTitle'
import { useAuth } from '../contexts/AuthContext'
import { CAREER_POSITIONS } from '../mock/careers'

export function JoinTeamPage() {
  usePageTitle()
  const { isLoggedIn } = useAuth()

  return (
    <div className="join-team-page">
      <div className="join-team-content">
        <div className="join-team-header">
          <Typography variant={TypographyVariant.H2}>Join the Team</Typography>
          <Typography variant={TypographyVariant.Body} color="var(--color-text-secondary)">
            Help us build something extraordinary.
          </Typography>
        </div>

        <div className="join-team-positions">
          {CAREER_POSITIONS.map((position) => (
            <div key={position.id} className="career-card">
              <div className="career-icon-wrapper">
                <Icon name={position.icon} size={48} className="career-icon" />
              </div>
              <div className="career-info">
                <Typography variant={TypographyVariant.H3} className="career-title">
                  {position.title}
                </Typography>
                <Typography variant={TypographyVariant.Body} color="var(--color-text-secondary)" className="career-description">
                  {position.description}
                </Typography>
                {isLoggedIn && (
                  <a href="#" className="career-apply-link">
                    Apply
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
