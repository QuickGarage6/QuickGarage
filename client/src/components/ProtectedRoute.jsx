  import { Navigate } from 'react-router-dom';
  import { useAuth } from './AuthContext';

  const ProtectedRoute = ({ element }) => {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
      alert("Please login..");
      return <Navigate to="/" />;
    }

    return element;
  };

  export default ProtectedRoute;
