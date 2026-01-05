import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles = ['student', 'admin'] }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const userTypeStored = localStorage.getItem('userType');
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    
    setIsAuthenticated(isLoggedIn && allowedRoles.includes(userTypeStored));
    setUserType(userTypeStored);
    setIsLoading(false);
  }, [allowedRoles]);

  if (isLoading) {
    return (
      <div className="container">
        <div className="loading" style={{height: '50vh'}}>
          Checking authentication...
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
