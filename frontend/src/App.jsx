import { Outlet } from "react-router";
import NavigationMenu from "./components/NavigationMenu";
import TopSection from "./components/TopSection";
import TaskAction from "./components/TaskAction";
import { useDispatch, useSelector } from "react-redux";
import { useContext, useEffect } from "react";
import dayjs from "dayjs";
import { ThemeContext } from "./contexts/ThemeContext";

const App = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const isOpenAddTask = useSelector((state) => state.isOpenAddTask);
  const dispatch = useDispatch();
  useEffect(() => {
    const tasksFromApi = [
      {
        id: 1,
        title:
          "Task 1Task 1Task 1Task 1Task 1Task 1Task 1Task 1Task 1Task 1Task 1Task 1Task 1Task 1Task 1Task 1Task 1Task 1Task 1Task 1Task 1Task 1Task 1Task 1Task 1Task 1",
        description:
          "Description 1 Task 1Task 1Task 1Task 1Task 1Task 1Task 1Task 1Task 1Task 1Task 1Task 1Task 1Task 1Task 1Task 1Task 1Task 1Task 1Task 1Task 1Task 1Task 1Task 1Task 1Task 1Task 1Task 1Task 1",
        date: dayjs("2024-12-31"),
        time: dayjs().add(1, "hour"),
        priority: "High",
        category: "Work",
        isCompleted: false,
        order: 1,
      },
      {
        id: 2,
        title: "Task 2 test",
        description: "Description 2",
        date: dayjs("2025-01-15"),
        time: dayjs().add(1, "hour"),
        priority: "Medium",
        category: "Home",
        isCompleted: false,
        order: 2,
      },
      {
        id: 3,
        title: "Task 3",
        description: "Description 3",
        date: dayjs(),
        time: dayjs().add(1, "hour"),
        priority: "Low",
        category: "Grocery",
        isCompleted: true,
        order: 3,
      },
      {
        id: 4,
        title: "Task 3",
        description: "Description 3",
        date: dayjs().add(1, "day"),
        time: dayjs().add(1, "hour"),
        priority: "Low",
        category: "Grocery",
        isCompleted: true,
        order: 4,
      },
      {
        id: 5,
        title: "Task 3",
        description: "Description 3",
        date: dayjs().add(1, "day"),
        time: dayjs().add(1, "hour"),
        priority: "Low",
        category: "Grocery",
        isCompleted: true,
        order: 5,
      },
      {
        id: 6,
        title: "Task 3",
        description: "Description 3",
        date: dayjs().add(1, "day"),
        time: dayjs().add(1, "hour"),
        priority: "Low",
        category: "Grocery",
        isCompleted: true,
        order: 6,
      },
    ];
    dispatch({ type: "SET_TASKS", payload: tasksFromApi });
  }, [dispatch]);

  return (
    <main
      className={`w-full h-screen bg-background flex flex-col justify-end relative ${theme}`}
      // onClick={toggleTheme}
    >
      <div className="h-full xl:ms-[4%] flex flex-col items-center overflow-y-auto ">
        <TopSection />
        <Outlet />
      </div>
      <NavigationMenu />
      {isOpenAddTask === true ? <TaskAction /> : ""}
    </main>
  );
};

export default App;
