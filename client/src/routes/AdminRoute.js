import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const AdminRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.authentication.isAuthenticated)
  const account = useSelector((state) => state.authentication.account)

  if (!isAuthenticated || !account) {
    return <Navigate to="/" />
  }

  const isAdmin = account?.roles?.includes('ROLE_ADMIN')
  return isAdmin ? children : <Navigate to="/dashboard" />
}

export default AdminRoute
