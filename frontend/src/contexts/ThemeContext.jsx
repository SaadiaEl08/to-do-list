import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();
export const ThemeProvider = ({ children }) => {
  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
  const savedTheme = localStorage.getItem("theme");
  const [theme, setTheme] = useState(savedTheme || systemTheme);

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
