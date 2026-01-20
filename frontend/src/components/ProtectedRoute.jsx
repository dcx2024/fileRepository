import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

const ProtectedRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // You should have an endpoint like /api/auth/status that returns 200 if the cookie is valid
        const response = await fetch('http://localhost:3000/api/auth/status', {
          method: 'GET',
          credentials: 'include',
        });
        
        if (response.ok) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  // Show a themed loader while checking the cookie
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-[#050608] flex items-center justify-center">
        <Loader2 className="text-emerald-500 animate-spin" size={40} />
      </div>
    );
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;