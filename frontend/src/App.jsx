import { Outlet, useLocation } from "react-router";
import NavigationMenu from "./components/NavigationMenu";
import TopSection from "./components/TopSection";
import TaskAction from "./components/TaskAction";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { fakeTasks } from "./constants";
import { useGetTasks } from "./apis/Task";
import Loading from "./components/Loading";
const App = () => {
  const isOpenAddTask = useSelector((state) => state.isOpenAddTask);
  const dispatch = useDispatch();
  const location = useLocation();
  const loginMode = useSelector((state) => state.loginMode);
  const { data: tasksFromApi, isLoading } = useGetTasks();
  useEffect(() => {
    dispatch({
      type: "SET_TASKS",
      payload: loginMode === "fake-user" ? fakeTasks : tasksFromApi?.data || [],
    });
  }, [dispatch, loginMode, tasksFromApi]);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch({
      type: "SET_ACCOUNT_INFO",
      payload: JSON.parse(localStorage.getItem("accountInfo")),
    });
    dispatch({
      type: "SET_LOGIN_MODE",
      payload:
        localStorage.getItem("token") === "fake-token"
          ? "fake-user"
          : "not fake",
    });
  }, [dispatch, location]);
  return (
    <main className={`min-w-full w-full min-h-screen bg-background relative`}>
      <div className="flex flex-col items-center  overflow-y-auto pb-20 xl:pb-0 xl:ms-[4%] ">
        <TopSection />
        {isLoading ? <Loading /> : <Outlet />}
        
      </div>
      <NavigationMenu />
      {isOpenAddTask === true ? <TaskAction /> : ""}
      <ToastContainer />
    </main>
  );
};

export default App;