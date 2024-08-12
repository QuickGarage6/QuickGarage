import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

// Component to protect routes
// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ element }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return element;
};

export default ProtectedRoute;
