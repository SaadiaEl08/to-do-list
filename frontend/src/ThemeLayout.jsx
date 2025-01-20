import { useContext } from "react";
import { Outlet } from "react-router";
import { ThemeContext } from "./contexts/ThemeContext";

const ThemeLayout = () => {
  const {theme} = useContext(ThemeContext);
  return (
    <main
      className={`w-full min-h-screen h-screen ${theme}`}
    >
      <Outlet />
    </main>
  );
};

export default ThemeLayout;
