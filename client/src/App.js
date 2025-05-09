import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import Dashboard from './pages/Dashboard'
import AdminPage from './pages/AdminPage'
import PrivateRoute from './routes/PrivateRoute'
import AdminRoute from './routes/AdminRoute'
import NewRequestPage from './pages/NewRequestPage'
import MyRequestsPage from './pages/MyRequestsPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/dashboard/*"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/*"
          element={
            <AdminRoute>
              <AdminPage />
            </AdminRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
