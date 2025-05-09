import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.authentication.isAuthenticated)

  return isAuthenticated ? children : <Navigate to="/" />
}

export default PrivateRoute
