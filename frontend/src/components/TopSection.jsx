import { ThemeContext } from "@/contexts/ThemeContext";
import { Moon, Sun } from "lucide-react";
import { useContext } from "react";
import { useLocation } from "react-router";

const TopSection = () => {
  const pathname = useLocation().pathname;
  const { theme, toggleTheme } = useContext(ThemeContext);
  const title = pathname.split("/")[1];
  return (
    <div className="w-full text-foreground flex items-center justify-between px-6 py-4">
      <p className="capitalize text-xl md:text-2xl">{title}</p>
      <div className="flex gap-4 items-center">
        {theme === "dark" ? (
          <Sun className="w-6 h-6 cursor-pointer" onClick={toggleTheme} />
        ) : (
          <Moon className="w-6 h-6 cursor-pointer"  onClick={toggleTheme} />
        )}

        <img
          src="/logo.svg"
          alt="profile image"
          className="rounded-full w-11 h-11 border"
        />
      </div>
    </div>
  );
};

export default TopSection;
