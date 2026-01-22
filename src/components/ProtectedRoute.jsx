// import { useEffect, useState } from 'react';
// import { Navigate, useLocation } from 'react-router-dom';

// const ProtectedRoute = ({ children, allowedRoles = ['student', 'admin'] }) => {
//   const [isLoading, setIsLoading] = useState(true);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [userType, setUserType] = useState(null);
//   const location = useLocation();

//   useEffect(() => {
//     const userTypeStored = localStorage.getItem('userType');
//     const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    
//     setIsAuthenticated(isLoggedIn && allowedRoles.includes(userTypeStored));
//     setUserType(userTypeStored);
//     setIsLoading(false);
//   }, [allowedRoles]);

//   if (isLoading) {
//     return (
//       <div className="container">
//         <div className="loading" style={{height: '50vh'}}>
//           Checking authentication...
//         </div>
//       </div>
//     );
//   }

//   if (!isAuthenticated) {
//     return <Navigate to="/login" state={{ from: location }} replace />;
//   }

//   return children;
// };

// export default ProtectedRoute;
import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();

  
  useEffect(() => {
    const checkAuth = () => {
      const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
      const userProfile = localStorage.getItem('userProfile') || localStorage.getItem('studentProfile');
      
      setIsAuthenticated(loggedIn && userProfile);
      setIsLoading(false); // ✅ CRITICAL: Stop loading after check
    };

    checkAuth();
  }, []); 

  if (isLoading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: '#f8fafc'
      }}>
        <div style={{
          width: '48px', height: '48px',
          border: '3px solid #e5e7eb', borderTop: '3px solid #0d9488',
          borderRadius: '50%', animation: 'spin 1s linear infinite'
        }} />
      </div>
    );
  }

  // ✅ AUTH CHECK - ONE TIME ONLY
  if (!isAuthenticated) {
    console.log('🔒 Not authenticated, redirecting to /login');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // ✅ AUTHENTICATED - Render children
  return children;
};

export default ProtectedRoute;
