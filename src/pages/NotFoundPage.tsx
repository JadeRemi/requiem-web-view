import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Typography, TypographyVariant } from '../components/Typography'
import { usePageTitle } from '../hooks/usePageTitle'
import { ROUTES } from '../config'

const REDIRECT_DELAY_SECONDS = 5

/**
 * 404 Not Found Page
 * Auto-redirects to home after countdown
 */
export function NotFoundPage() {
  usePageTitle('Page Not Found')
  const navigate = useNavigate()
  const [countdown, setCountdown] = useState(REDIRECT_DELAY_SECONDS)

  useEffect(() => {
    if (countdown <= 0) {
      navigate(ROUTES.HOME)
      return
    }

    const timer = setTimeout(() => {
      setCountdown((prev) => prev - 1)
    }, 1000)

    return () => clearTimeout(timer)
  }, [countdown, navigate])

  return (
    <div className="page not-found-page">
      <div className="not-found-content">
        <Typography variant={TypographyVariant.H1} color="var(--grey-700)" style={{ fontSize: '8rem', lineHeight: 1, marginBottom: 'var(--space-4)' }}>
          404
        </Typography>
        <Typography variant={TypographyVariant.H3} color="var(--grey-300)" style={{ marginBottom: 'var(--space-4)' }}>
          Page Not Found
        </Typography>
        <Typography variant={TypographyVariant.Body} color="var(--grey-500)" style={{ marginBottom: 'var(--space-6)' }}>
          The page you're looking for doesn't exist or has been moved.
        </Typography>
        <Typography variant={TypographyVariant.BodySmall} color="var(--grey-600)" style={{ marginBottom: 'var(--space-6)' }}>
          Redirecting to home in <Typography variant={TypographyVariant.Mono} as="span" color="var(--grey-300)">{countdown}</Typography> seconds...
        </Typography>
        <Link to={ROUTES.HOME} className="nav-link">
          Go Home Now
        </Link>
      </div>
    </div>
  )
}
