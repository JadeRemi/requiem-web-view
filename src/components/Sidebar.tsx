import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Icon, IconName } from './Icon'
import { ROUTES } from '../config'

interface SidebarItem {
  path: string
  label: string
  icon: IconName
}

/** Pages shown in sidebar - add new pages here */
const SIDEBAR_ITEMS: SidebarItem[] = [
  { path: ROUTES.HOME, label: 'Home', icon: 'home' },
  { path: ROUTES.LADDER, label: 'Ladder', icon: 'trophy' },
  { path: ROUTES.MAP, label: 'World Map', icon: 'map' },
  { path: ROUTES.WIKI, label: 'Wiki', icon: 'book' },
]

/**
 * Collapsible Sidebar Navigation
 * - Expands/collapses with burger menu
 * - Shows icons and labels
 * - Active state highlighting
 */
export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleSidebar = () => setIsOpen((prev) => !prev)

  return (
    <>
      {/* Burger toggle button - always visible */}
      <button
        className="sidebar-toggle"
        onClick={toggleSidebar}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isOpen}
      >
        <Icon name={isOpen ? 'close' : 'menu'} size={24} />
      </button>

      {/* Overlay when sidebar is open */}
      {isOpen && (
        <div className="sidebar-overlay" onClick={toggleSidebar} />
      )}

      {/* Sidebar panel */}
      <aside className={`sidebar ${isOpen ? 'sidebar-open' : ''}`}>
        <nav className="sidebar-nav">
          {SIDEBAR_ITEMS.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `sidebar-link ${isActive ? 'sidebar-link-active' : ''}`
              }
              onClick={() => setIsOpen(false)}
            >
              <Icon name={item.icon} size={20} />
              <span className="sidebar-link-label">{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  )
}

