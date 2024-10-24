import React from 'react';
import {useAuth} from './AuthContext';
import { useNavigate} from "@tanstack/react-router";


const AuthenticatedComponent = ({children}: { children: React.ReactNode }) => {
  const { user, refresh, isLoading, data, isSuccess, error } = useAuth();
  const navigate = useNavigate();

  // Check if the app is offline
  if (!navigator.onLine) {
    return <div>No internet connection. Please try again later.</div>;
  }

  refresh();

  React.useEffect(() => {
    if (!isLoading && !user?.status && (isSuccess || error)) {
      if (!data?.status) {
        navigate({ to: "/auth" });
      }
    }
  }, [user, navigate, isLoading, isSuccess, data]);

  // If authenticated, render the children components
  return <>{children}</>;
};

export default AuthenticatedComponent;
