import { CalendarDays, Clock, Home, Plus, User } from "lucide-react";
import { Link, useLocation } from "react-router";
import { useDispatch } from "react-redux";
import { steps } from "@/constants";

const NavigationMenu = () => {
  const currentPath = useLocation().pathname;
  const dispatch = useDispatch();
  const handleAddTaskClick = () => {
    dispatch({ type: "SET_IS_OPEN_ADD_TASK", payload: true });
    dispatch({ type: "SET_STEP", payload: steps.TASK_FORM });
    dispatch({ type: "SET_MODE", payload: "create" });
  };
  const navigationItems = [
    { id: 1, name: "Home", icon: <Home />, link: "/home" },
    { id: 2, name: "Calendar", icon: <CalendarDays />, link: "/calendar" },
    { id: 3, name: "Timer", icon: <Clock />, link: "/timer" },
    { id: 4, name: "Profile", icon: <User />, link: "/profile" },
  ];
  return (
    <div className="relative text-foreground w-full">
      <nav className="w-full bg-muted list-none flex items-center justify-between">
        <ul className="flex items-center justify-evenly  w-2/5 ">
          {navigationItems.slice(0, 2).map((item) => (
            <li key={item.id} className={` p-2 rounded `}>
              <Link
                to={`${item.link}`}
                className={`flex flex-col items-center justify-evenly ${
                  currentPath === item.link ? "border-b-2  border-primary" : ""
                }`}
              >
                {item.icon}
                <span className="opacity-80">{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
        <ul className="flex items-center justify-evenly  w-2/5 ">
          {navigationItems.slice(2, 4).map((item) => (
            <li key={item.id} className={` p-2 rounded `}>
              <Link
                to={`${item.link}`}
                className={`flex flex-col items-center justify-evenly ${
                  currentPath === item.link ? "border-b-2  border-primary" : ""
                }`}
              >
                {item.icon}
                <span className="opacity-80">{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="rounded-full absolute bg-primary w-16 h-16 flex items-center justify-center -top-8 left-1/2 -translate-x-1/2 ">
        <Plus
          className="w-8 h-8 cursor-pointer"
          onClick={() => {
            handleAddTaskClick();
          }}
        />
      </div>
    </div>
  );
};

export default NavigationMenu;
