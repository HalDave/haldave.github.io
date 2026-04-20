import React, { useState } from "react";
import Login from "../Content/Login";

const TOKEN_KEY = "dashboard_token";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(
    sessionStorage.getItem(TOKEN_KEY)
  );

  const handleSuccess = (newToken: string) => {
    sessionStorage.setItem(TOKEN_KEY, newToken);
    setToken(newToken);
  };

  if (!token) {
    return <Login onSuccess={handleSuccess} />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
