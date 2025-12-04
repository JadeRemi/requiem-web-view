import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { ProfilePage } from './pages/ProfilePage'
import ErrorBoundary from './components/ErrorBoundary'
import { ROUTES } from './config'

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter basename="/requiem-web-view">
        <Routes>
          <Route path={ROUTES.HOME} element={<HomePage />} />
          <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  )
}

export default App
