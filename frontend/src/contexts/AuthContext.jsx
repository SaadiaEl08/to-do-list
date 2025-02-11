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
    !isAuthenticated && localStorage.removeItem("accountInfo");
  }, [isAuthenticated]);

  const logout = () => {
    setIsAuthenticated(false);
    setLastLocation("");
  };

  const register = (data) => {
    const { jwt, user } = data;
    setIsAuthenticated(true);
    setLastLocation("/home");
    localStorage.setItem("lastLocation", "/home");
    localStorage.setItem("token", jwt);
    localStorage.setItem(
      "accountInfo",
      JSON.stringify({
        name: user?.name || user?.username || "User",
        image: user?.image || "",
      })
    );
  };

  const fakeLogin = () => {
    localStorage.setItem("token", "fake-token");
    localStorage.setItem("accountInfo", "fake-user");
    setIsAuthenticated(true);
    setLastLocation("/home");
  };

  const login = (data) => {
    const { jwt, user } = data;
    setIsAuthenticated(true);
    localStorage.setItem("token", jwt);
    localStorage.setItem(
      "accountInfo",
      JSON.stringify({
        name: user?.name || user?.username || "User",
        image: user?.image || "",
      })
    );
  };
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        lastLocation,
        setLastLocation,
        logout,
        fakeLogin,
        register,
        login,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
