import { Outlet } from "react-router";
import NavigationMenu from "./components/NavigationMenu";
import TopSection from "./components/TopSection";
import TaskAction from "./components/TaskAction";
import { useSelector } from "react-redux";

const App = () => {
  const isOpenAddTask = useSelector((state) => state.isOpenAddTask);
  return (
    <main className="w-full min-h-screen h-screen bg-background flex flex-col justify-end">
      <div className="h-full">
        <TopSection />
        <Outlet />
      </div>
      <NavigationMenu />
      {isOpenAddTask === true ? <TaskAction /> : ""}
    </main>
  );
};

export default App;
