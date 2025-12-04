import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { ProfilePage } from './pages/ProfilePage'
import { LadderPage } from './pages/LadderPage'
import { MapPage } from './pages/MapPage'
import { NotFoundPage } from './pages/NotFoundPage'
import ErrorBoundary from './components/ErrorBoundary'
import { ToastProvider } from './components/Toast'
import { Sidebar } from './components/Sidebar'
import { ROUTES } from './config'

function App() {
  return (
    <ErrorBoundary>
      <ToastProvider>
        {/* basename comes from Vite's base config - '/' in dev, '/requiem-web-view/' in prod */}
        <BrowserRouter basename={import.meta.env.BASE_URL}>
          <Sidebar />
          <main className="main-content">
            <Routes>
              <Route path={ROUTES.HOME} element={<HomePage />} />
              <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
              <Route path={ROUTES.LADDER} element={<LadderPage />} />
              <Route path={ROUTES.MAP} element={<MapPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
        </BrowserRouter>
      </ToastProvider>
    </ErrorBoundary>
  )
}

export default App
