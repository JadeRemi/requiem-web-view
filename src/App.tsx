import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { ProfilePage } from './pages/ProfilePage'
import { MapPage } from './pages/MapPage'
import ErrorBoundary from './components/ErrorBoundary'
import { ToastProvider } from './components/Toast'
import { ROUTES } from './config'

function App() {
  return (
    <ErrorBoundary>
      <ToastProvider>
        {/* basename comes from Vite's base config - '/' in dev, '/requiem-web-view/' in prod */}
        <BrowserRouter basename={import.meta.env.BASE_URL}>
          <Routes>
            <Route path={ROUTES.HOME} element={<HomePage />} />
            <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
            <Route path={ROUTES.MAP} element={<MapPage />} />
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </ErrorBoundary>
  )
}

export default App
