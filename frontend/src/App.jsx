import { Outlet, useLocation } from "react-router";
import NavigationMenu from "./components/NavigationMenu";
import TopSection from "./components/TopSection";
import TaskAction from "./components/TaskAction";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import dayjs from "dayjs";
import { ToastContainer } from "react-toastify";


const App = () => {
  const isOpenAddTask = useSelector((state) => state.isOpenAddTask);
  const dispatch = useDispatch();
  const location = useLocation();
  useEffect(() => {
    const tasksFromApi = [
      {
        id: 1,
        title: "Complete project report",
        description: "Finish the final draft of the project report for client review.",
        date: dayjs("2024-12-31"),
        time: dayjs().add(2, "hour"),
        priority: "High",
        category: "Work",
        isCompleted: true,
        order: 1,
      },
      {
        id: 2,
        title: "Clean the house",
        description: "Vacuum the floors and clean the kitchen and bathroom.",
        date: dayjs("2025-01-15"),
        time: dayjs().add(3, "hours"),
        priority: "Medium",
        category: "Home",
        isCompleted: false,
        order: 2,
      },
      {
        id: 3,
        title: "Buy groceries",
        description: "Pick up vegetables, fruits, and household essentials.",
        date: dayjs(),
        time: dayjs().add(1, "hour"),
        priority: "Low",
        category: "Grocery",
        isCompleted: true,
        order: 3,
      },
      {
        id: 4,
        title: "Schedule doctor appointment",
        description: "Call the clinic to schedule an appointment for a check-up.",
        date: dayjs().add(1, "day"),
        time: dayjs().add(2, "hour"),
        priority: "Medium",
        category: "Health",
        isCompleted: false,
        order: 4,
      },
      {
        id: 5,
        title: "Submit budget proposal",
        description: "Submit the finalized budget proposal to the finance department.",
        date: dayjs().add(2, "day"),
        time: dayjs().add(1, "hour"),
        priority: "High",
        category: "Work",
        isCompleted: true,
        order: 5,
      },
      {
        id: 6,
        title: "Pick up laundry",
        description: "Pick up cleaned laundry from the dry cleaners.",
        date: dayjs().add(3, "day"),
        time: dayjs().add(1, "hour"),
        priority: "Low",
        category: "Errands",
        isCompleted: false,
        order: 6,
      },
      {
        id: 7,
        title: "Prepare for meeting",
        description: "Prepare materials and agenda for Monday's team meeting.",
        date: dayjs().add(1, "week"),
        time: dayjs().add(4, "hour"),
        priority: "High",
        category: "Work",
        isCompleted: true,
        order: 7,
      },
      {
        id: 8,
        title: "Plan weekend trip",
        description: "Research hotels and activities for a weekend getaway to the mountains.",
        date: dayjs("2025-02-05"),
        time: dayjs().add(5, "hours"),
        priority: "Medium",
        category: "Personal",
        isCompleted: false,
        order: 8,
      },
    ];
    
    dispatch({ type: "SET_TASKS", payload: tasksFromApi });
  }, [dispatch]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return (
    <main
      className={`min-w-full w-full min-h-screen bg-background relative`}
    >
      <div className="flex flex-col items-center  overflow-y-auto pb-20 xl:pb-0 xl:ms-[4%] ">
        <TopSection />
        <Outlet />
      </div>
      <NavigationMenu />
      {isOpenAddTask === true ? <TaskAction /> : ""}
      <ToastContainer />
    </main>
  );
};

export default App;
