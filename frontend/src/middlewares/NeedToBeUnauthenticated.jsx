import { myToast } from "@/constants";
import { AuthContext } from "@/contexts/AuthContext";
import { useContext, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";

const NeedToBeUnauthenticated = ({ children }) => {
  const { isAuthenticated, lastLocation, setLastLocation } =
    useContext(AuthContext);
  const location = useLocation();
  useEffect(() => {
    if (!isAuthenticated) {
      // setLastLocation(location.pathname);
      setLastLocation("");
    }
  }, [isAuthenticated, location, setLastLocation]);

  if (isAuthenticated && lastLocation !== "") {
    myToast("You need to logout first", "error");
    return <Navigate to={lastLocation || "/home"} replace />;
  }

  return children;
};

export default NeedToBeUnauthenticated;
