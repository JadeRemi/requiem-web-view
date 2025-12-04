import { Link } from 'react-router-dom'
import { Typography, TypographyVariant } from '../components/Typography'
import { ROUTES } from '../config'

export function HomePage() {
  return (
    <div className="page home-page">
      <div className="home-content">
        <Typography variant={TypographyVariant.H1}>Requiem</Typography>
        <Typography variant={TypographyVariant.Caption} color="var(--color-text-secondary)" style={{ marginBottom: 'var(--space-6)' }}>
          Analytics Portal
        </Typography>
        <Link to={ROUTES.PROFILE} className="nav-link">
          View Profile
        </Link>
      </div>
    </div>
  )
}
