import { Link } from 'react-router-dom'
import { Typography, TypographyVariant } from '../components/Typography'
import { ROUTES } from '../config'

export function HomePage() {
  return (
    <div className="page home-page">
      <div className="home-content">
        <Typography variant={TypographyVariant.H1}>Requiem</Typography>
        <Link to={ROUTES.LADDER} className="nav-link" style={{ marginTop: 'var(--space-6)' }}>
          View Leaderboard
        </Link>
      </div>
    </div>
  )
}
