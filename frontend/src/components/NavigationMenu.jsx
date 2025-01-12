import { CalendarDays, Clock, Home, Plus, User } from "lucide-react";
import { Link, useLocation } from "react-router";
import { useDispatch } from "react-redux";
import { steps } from "@/constants";
import { cloneElement } from "react";

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
        <ul className="flex items-center justify-between w-full">
          <div className="flex items-center justify-evenly  w-2/4   ">
            {navigationItems.slice(0, 2).map((item) => (
              <Li key={item.id} item={item} currentPath={currentPath} />
            ))}
          </div>
          <div className="flex items-center justify-evenly  w-2/4 ">
            {navigationItems.slice(2, 4).map((item) => (
              <Li key={item.id} item={item} currentPath={currentPath} />
            ))}
          </div>
        </ul>
      </nav>
      <div className="rounded-full absolute bg-primary w-16 h-16 flex items-center justify-center -top-8 left-1/2 -translate-x-1/2  md:w-20 md:h-20">
        <Plus
          className="w-8 h-8 cursor-pointer md:w-12 md:h-12"
          onClick={() => {
            handleAddTaskClick();
          }}
        />
      </div>
    </div>
  );
};
export default NavigationMenu;
const Li = ({ item, currentPath }) => {
  return (
    <li className={` p-2 rounded  md:text-2xl`}>
      <Link
        to={`${item.link}`}
        className={`flex flex-col items-center justify-evenly ${
          currentPath === item.link
            ? "border-b-2  border-primary text-primary"
            : ""
        }`}
      >
        {cloneElement(item.icon, {
          className: "md:w-8 md:h-8",
        })}
        <span className="opacity-80">{item.name}</span>
      </Link>
    </li>
  );
};
