import { ThemeContext } from "@/contexts/ThemeContext";
import { Moon, Sun } from "lucide-react";
import { useContext } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";

const TopSection = () => {
  const pathname = useLocation().pathname;
  const { theme, toggleTheme } = useContext(ThemeContext);
  const title = pathname.split("/")[1];
  const { image } = useSelector((state) => state.accountInfo);

  return (
    <div className="w-full text-foreground flex items-center justify-between px-6 py-4">
      <p className="capitalize text-xl md:text-2xl">{title}</p>
      <div className="flex gap-4 items-center">
        {theme === "dark" ? (
          <Sun className="w-6 h-6 cursor-pointer" onClick={toggleTheme} />
        ) : (
          <Moon className="w-6 h-6 cursor-pointer" onClick={toggleTheme} />
        )}
        <img
          src={image}
          alt="profile photo"
          className={`rounded-full w-11 h-11 object-fill ${image.includes("ui-avatars.com") ? "" : "-scale-x-100"} border border-primary`}
        />
        
      </div>
    </div>
  );
};

export default TopSection;
