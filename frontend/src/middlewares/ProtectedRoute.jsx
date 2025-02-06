import { myToast } from "@/constants";
import { AuthContext } from "@/contexts/AuthContext";
import { useContext, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, setLastLocation, lastLocation } =
    useContext(AuthContext);
  const location = useLocation();

  useEffect(() => {
    if (isAuthenticated) {
      setLastLocation(location.pathname);
    }
  }, [isAuthenticated, location, setLastLocation]);

  if (!isAuthenticated && lastLocation === "") {
    myToast("You need to login first", "error");
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
