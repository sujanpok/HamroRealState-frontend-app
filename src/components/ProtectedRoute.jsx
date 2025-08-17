import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ user, children }) {
  // Debug: Log protection status
  useEffect(() => {
    console.log('🔍 ProtectedRoute: User check:', {
      userExists: !!user,
      user: user,
      willRedirect: !user
    });
  }, [user]);

  if (!user) {
    console.log('🔍 ProtectedRoute: Redirecting to home - no user');
    return <Navigate to="/" replace />;
  }

  console.log('🔍 ProtectedRoute: Allowing access for user:', user.FULL_NAME || user.full_name);
  return children;
}
