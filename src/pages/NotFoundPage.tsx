import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { ROUTES } from '../config'

const REDIRECT_DELAY_SECONDS = 5

/**
 * 404 Not Found Page
 * Auto-redirects to home after countdown
 */
export function NotFoundPage() {
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
        <h1 className="not-found-title">404</h1>
        <p className="not-found-subtitle">Page Not Found</p>
        <p className="not-found-message">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <p className="not-found-redirect">
          Redirecting to home in <span className="countdown">{countdown}</span> seconds...
        </p>
        <Link to={ROUTES.HOME} className="nav-link">
          Go Home Now
        </Link>
      </div>
    </div>
  )
}

