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
    <div className="bg-muted relative text-foreground w-full flex flex-col items-center justify-center xl:w-[4%]  xl:absolute xl:p-4 xl:rounded-md xl:top-1/2 xl:-translate-y-1/2 xl:ms-1">
      <div className="rounded-full absolute bg-primary w-16 aspect-square flex items-center justify-center -top-8 left-1/2 -translate-x-1/2  md:w-20  xl:static xl:top-0 xl:translate-x-0 xl:translate-y-0 xl:w-10">
        <Plus
          className="w-8 cursor-pointer md:w-12 xl:w-8 aspect-square"
          onClick={() => {
            handleAddTaskClick();
          }}
        />
      </div>
      <nav className="w-full bg-muted list-none flex items-center justify-between  h-full ">
        <ul className="flex items-center justify-start w-full xl:flex-col  h-full">
          <div className="flex items-center justify-evenly  w-2/4  xl:flex-col xl:gap-8 xl:pt-8 ">
            {navigationItems.slice(0, 2).map((item) => (
              <Li key={item.id} item={item} currentPath={currentPath} />
            ))}
          </div>
          <div className="flex items-center justify-evenly  w-2/4 xl:flex-col xl:gap-8 xl:pt-8">
            {navigationItems.slice(2, 4).map((item) => (
              <Li key={item.id} item={item} currentPath={currentPath} />
            ))}
          </div>
        </ul>
      </nav>
    </div>
  );
};
export default NavigationMenu;
const Li = ({ item, currentPath }) => {
  return (
    <li className={`p-2 rounded  md:text-2xl xl:text-[12px] `}>
      <Link
        to={`${item.link}`}
        className={`flex flex-col items-center justify-evenly ${
          currentPath === item.link
            ? "border-b-2  border-primary text-primary"
            : ""
        }`}
      >
        {cloneElement(item.icon, {
          className: "md:w-8 md:h-8 xl:w-6 xl:h-6",
        })}
        <span className="opacity-80 ">{item.name}</span>
      </Link>
    </li>
  );
};
