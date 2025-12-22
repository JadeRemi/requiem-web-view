import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { ProfilePage } from './pages/ProfilePage'
import { LadderPage } from './pages/LadderPage'
import { MapPage } from './pages/MapPage'
import { WikiPage } from './pages/WikiPage'
import { WikiClassesPage } from './pages/WikiClassesPage'
import { WikiItemsPage } from './pages/WikiItemsPage'
import { WikiEnemiesPage } from './pages/WikiEnemiesPage'
import { WikiAttributesPage } from './pages/WikiAttributesPage'
import { WikiAchievementsPage } from './pages/WikiAchievementsPage'
import { WikiTermsPage } from './pages/WikiTermsPage'
import { WikiCardsPage } from './pages/WikiCardsPage'
import { WikiCommandsPage } from './pages/WikiCommandsPage'
import { GuildsPage } from './pages/GuildsPage'
import { ChangelogPage } from './pages/ChangelogPage'
import { AboutPage } from './pages/AboutPage'
import { FaqPage } from './pages/FaqPage'
import { LoginPage } from './pages/LoginPage'
import { SettingsPage } from './pages/SettingsPage'
import { StorePage } from './pages/StorePage'
import { NotFoundPage } from './pages/NotFoundPage'
import ErrorBoundary from './components/ErrorBoundary'
import { ToastProvider } from './components/Toast'
import { AuthProvider } from './contexts/AuthContext'
import { Sidebar } from './components/Sidebar'
import { Header } from './components/Header'
import { ROUTES } from './config'
import { useSettingsStore } from './stores/settingsStore'

function App() {
  const customCursor = useSettingsStore((state) => state.customCursor)

  return (
    <ErrorBoundary>
      <AuthProvider>
        <ToastProvider>
          {/* basename comes from Vite's base config - '/' in dev, '/requiem-web-view/' in prod */}
          <BrowserRouter basename={import.meta.env.BASE_URL}>
            <div className={`app-wrapper ${customCursor ? 'custom-cursor' : ''}`}>
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
                  <Route path={ROUTES.WIKI_ATTRIBUTES} element={<WikiAttributesPage />} />
                  <Route path={ROUTES.WIKI_ACHIEVEMENTS} element={<WikiAchievementsPage />} />
                  <Route path={ROUTES.WIKI_TERMS} element={<WikiTermsPage />} />
                  <Route path={ROUTES.WIKI_CARDS} element={<WikiCardsPage />} />
                  <Route path={ROUTES.WIKI_COMMANDS} element={<WikiCommandsPage />} />
                  <Route path={ROUTES.GUILDS} element={<GuildsPage />} />
                  <Route path={ROUTES.CHANGELOG} element={<ChangelogPage />} />
                  <Route path={ROUTES.ABOUT} element={<AboutPage />} />
                  <Route path={ROUTES.FAQ} element={<FaqPage />} />
                  <Route path={ROUTES.LOGIN} element={<LoginPage />} />
                  <Route path={ROUTES.SETTINGS} element={<SettingsPage />} />
                  <Route path={ROUTES.STORE} element={<StorePage />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </main>
            </div>
          </BrowserRouter>
        </ToastProvider>
      </AuthProvider>
    </ErrorBoundary>
  )
}

export default App
