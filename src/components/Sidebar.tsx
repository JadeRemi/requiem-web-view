import { useState } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { Icon, IconName } from './Icon'
import { Typography, TypographyVariant } from './Typography'
import { ROUTES } from '../config'

interface SidebarItem {
  path: string
  label: string
  icon: IconName
}

/** Pages shown in sidebar - add new pages here */
const SIDEBAR_ITEMS: SidebarItem[] = [
  { path: ROUTES.HOME, label: 'Home', icon: 'home' },
  { path: ROUTES.CHANGELOG, label: 'Changelog', icon: 'scroll' },
  { path: ROUTES.EVENTS, label: 'Events', icon: 'calendar' },
  { path: ROUTES.ABOUT, label: 'About', icon: 'search' },
  { path: ROUTES.LADDER, label: 'Ladder', icon: 'trophy' },
  { path: ROUTES.MAP, label: 'Map', icon: 'map' },
  { path: ROUTES.GUILDS, label: 'Guilds', icon: 'users' },
  { path: ROUTES.WIKI, label: 'Wiki', icon: 'book' },
  { path: ROUTES.STORE, label: 'Store', icon: 'gem' },
  { path: ROUTES.FAQ, label: 'FAQ', icon: 'help-circle' },
  { path: ROUTES.JOIN_TEAM, label: 'Join Team', icon: 'briefcase' },
  { path: ROUTES.SETTINGS, label: 'Settings', icon: 'settings' },
]

/**
 * Collapsible Sidebar Navigation
 * - Expands/collapses with burger menu
 * - Shows icons and labels
 * - Active state highlighting
 */
// Wiki subpage paths that should show the back link
const WIKI_SUBPAGES = [
  ROUTES.WIKI_CLASSES,
  ROUTES.WIKI_ITEMS,
  ROUTES.WIKI_ENEMIES,
  ROUTES.WIKI_ATTRIBUTES,
  ROUTES.WIKI_ACHIEVEMENTS,
  ROUTES.WIKI_TERMS,
  ROUTES.WIKI_CARDS,
  ROUTES.WIKI_COMMANDS,
  ROUTES.WIKI_RECIPES,
  ROUTES.RULES,
]

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  const toggleSidebar = () => setIsOpen((prev) => !prev)

  // Show wiki back link when on a wiki subpage and sidebar is collapsed
  const isWikiSubpage = WIKI_SUBPAGES.some(path => location.pathname === path)

  return (
    <>
      {/* Burger toggle button - always visible */}
      <div className="sidebar-toggle-row">
        <button
          className="sidebar-toggle"
          onClick={toggleSidebar}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
        >
          <Icon name={isOpen ? 'close' : 'menu'} size={24} />
        </button>

        {/* Wiki back link - shown when on wiki subpage and sidebar is collapsed */}
        {isWikiSubpage && !isOpen && (
          <Link to={ROUTES.WIKI} className="sidebar-wiki-back">
            <Icon name="chevron-left" size={18} />
            <Typography variant={TypographyVariant.BodySmall}>Wiki</Typography>
          </Link>
        )}
      </div>

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

