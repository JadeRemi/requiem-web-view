import { Link } from 'react-router-dom'
import { ROUTES } from '../config'

export function HomePage() {
  return (
    <div className="page home-page">
      <div className="home-content">
        <h1>Requiem</h1>
        <p>Minecraft Skin Viewer</p>
        <Link to={ROUTES.PROFILE} className="nav-link">
          View Profile
        </Link>
      </div>
    </div>
  )
}

