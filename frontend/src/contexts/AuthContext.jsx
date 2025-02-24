import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );
  const [lastLocation, setLastLocation] = useState(
    localStorage.getItem("lastLocation") || ""
  );

  const [token, setToken] = useState(localStorage.getItem("token"));
  const [authenticatedUserId, setAuthenticatedUserId] = useState(
    JSON.parse(localStorage.getItem("accountInfo"))?.id
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
    setToken(jwt);
    localStorage.setItem(
      "accountInfo",
      JSON.stringify({
        name: user?.name || user?.username || "User",
        image: user?.image || "",
      })
    );
    setAuthenticatedUserId(user?.id);
  };

  const fakeLogin = () => {
    localStorage.setItem("token", "fake-token");
    setToken("fake-token");
    localStorage.setItem(
      "accountInfo",
      JSON.stringify({
        name: "Fake User",
        username: "",
        image: "https://ui-avatars.com/api/?name=" + "Fake User",
      })
    );
    setIsAuthenticated(true);
    setLastLocation("/home");
    setAuthenticatedUserId(null);
  };

  const login = (data) => {
    const { jwt, user } = data;
    setIsAuthenticated(true);
    localStorage.setItem("token", jwt);
    setToken(jwt);
    localStorage.setItem("accountInfo", JSON.stringify(user));
    setAuthenticatedUserId(user?.id);
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
        token,
        authenticatedUserId,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
