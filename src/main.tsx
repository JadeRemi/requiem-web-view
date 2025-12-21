import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// GitHub Pages SPA redirect handler
// Check if we were redirected from 404.html and restore the original path
const ghPagesRedirect = sessionStorage.getItem('gh-pages-redirect')
if (ghPagesRedirect) {
  sessionStorage.removeItem('gh-pages-redirect')
  // Remove the base path prefix if present
  const basePath = import.meta.env.BASE_URL.replace(/\/$/, '')
  const cleanPath = ghPagesRedirect.startsWith(basePath)
    ? ghPagesRedirect.slice(basePath.length)
    : ghPagesRedirect
  // Replace the URL without reloading
  window.history.replaceState(null, '', cleanPath || '/')
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)