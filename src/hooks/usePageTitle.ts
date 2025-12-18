import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { SITE_NAME, PAGE_TITLES } from '../config'

/**
 * Hook to set the document title based on current route
 * Uses PAGE_TITLES from config to determine title
 * Falls back to just site name for unknown routes
 */
export function usePageTitle(customTitle?: string) {
  const location = useLocation()

  useEffect(() => {
    const pageTitle = customTitle ?? PAGE_TITLES[location.pathname]

    if (pageTitle) {
      document.title = `${pageTitle} | ${SITE_NAME}`
    } else {
      document.title = SITE_NAME
    }
  }, [location.pathname, customTitle])
}
