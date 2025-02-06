import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );
  const [lastLocation, setLastLocation] = useState(
    localStorage.getItem("lastLocation") || ""
  );

  useEffect(() => {
    if (lastLocation != "") localStorage.setItem("lastLocation", lastLocation);
    if (lastLocation === "") localStorage.removeItem("lastLocation");
  }, [lastLocation]);

  useEffect(() => {
    !isAuthenticated && localStorage.removeItem("token");
    !isAuthenticated && localStorage.removeItem("user");
  }, [isAuthenticated]);

  const logout = () => {
    setIsAuthenticated(false);
    setLastLocation("");
  };

  const fakeLogin = () => {
    localStorage.setItem("token", "fake-token");
    localStorage.setItem("user", "fake-user");
    setIsAuthenticated(true);
    setLastLocation("/home");
  };
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        lastLocation,
        setLastLocation,
        logout,
        fakeLogin
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
