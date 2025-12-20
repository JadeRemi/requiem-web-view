import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { ProfilePage } from './pages/ProfilePage'
import { LadderPage } from './pages/LadderPage'
import { MapPage } from './pages/MapPage'
import { WikiPage } from './pages/WikiPage'
import { WikiClassesPage } from './pages/WikiClassesPage'
import { WikiItemsPage } from './pages/WikiItemsPage'
import { WikiEnemiesPage } from './pages/WikiEnemiesPage'
import { GuildsPage } from './pages/GuildsPage'
import { ChangelogPage } from './pages/ChangelogPage'
import { AboutPage } from './pages/AboutPage'
import { LoginPage } from './pages/LoginPage'
import { NotFoundPage } from './pages/NotFoundPage'
import ErrorBoundary from './components/ErrorBoundary'
import { ToastProvider } from './components/Toast'
import { AuthProvider } from './contexts/AuthContext'
import { Sidebar } from './components/Sidebar'
import { Header } from './components/Header'
import { ROUTES } from './config'

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <ToastProvider>
          {/* basename comes from Vite's base config - '/' in dev, '/requiem-web-view/' in prod */}
          <BrowserRouter basename={import.meta.env.BASE_URL}>
            <Sidebar />
            <Header />
            <main className="main-content">
              <Routes>
                <Route path={ROUTES.HOME} element={<HomePage />} />
                <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
                <Route path={ROUTES.LADDER} element={<LadderPage />} />
                <Route path={ROUTES.MAP} element={<MapPage />} />
                <Route path={ROUTES.WIKI} element={<WikiPage />} />
                <Route path={ROUTES.WIKI_CLASSES} element={<WikiClassesPage />} />
                <Route path={ROUTES.WIKI_ITEMS} element={<WikiItemsPage />} />
                <Route path={ROUTES.WIKI_ENEMIES} element={<WikiEnemiesPage />} />
                <Route path={ROUTES.GUILDS} element={<GuildsPage />} />
                <Route path={ROUTES.CHANGELOG} element={<ChangelogPage />} />
                <Route path={ROUTES.ABOUT} element={<AboutPage />} />
                <Route path={ROUTES.LOGIN} element={<LoginPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </main>
          </BrowserRouter>
        </ToastProvider>
      </AuthProvider>
    </ErrorBoundary>
  )
}

export default App
