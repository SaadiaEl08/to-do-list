import DropDownMenu from "@/components/DropDownMenu";
import Loading from "@/components/Loading";
import TaskPreview from "@/components/TaskPreview";
import dayjs from "dayjs";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks);
  const [filteredTasks, setFilteredTasks] = useState([]);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const tasksFromApi = [
      {
        id: 1,
        title:
          "Task 1Task 1Task 1Task 1Task 1Task 1Task 1Task 1Task 1Task 1Task 1Task 1Task 1Task 1Task 1Task 1Task 1Task 1Task 1Task 1Task 1Task 1Task 1Task 1Task 1Task 1",
        description:
          "Description 1 Task 1Task 1Task 1Task 1Task 1Task 1Task 1Task 1Task 1Task 1Task 1Task 1Task 1Task 1Task 1Task 1Task 1Task 1Task 1Task 1Task 1Task 1Task 1Task 1Task 1Task 1Task 1Task 1Task 1",
        date: dayjs().add(1, "day"),
        time: dayjs().add(1, "hour"),
        priority: "High",
        category: "Work",
        isCompleted: false,
      },
      {
        id: 2,
        title: "Task 2",
        description: "Description 2",
        date: dayjs().add(1, "day"),
        time: dayjs().add(1, "hour"),
        priority: "Medium",
        category: "Home",
        isCompleted: false,
      },
      {
        id: 3,
        title: "Task 3",
        description: "Description 3",
        date: dayjs().add(1, "day"),
        time: dayjs().add(1, "hour"),
        priority: "Low",
        category: "Grocery",
        isCompleted: true,
      },
    ];
    dispatch({ type: "SET_TASKS", payload: tasksFromApi });
    setLoading(false);
    setFilteredTasks(tasksFromApi);
  }, [dispatch]);
  return (
    <div className="relative">
      {loading ? (
        <Loading />
      ) : filteredTasks.length === 0 ? (
        <div className="w-full h-5/6  text-foreground flex flex-col justify-center items-center">
          <img src="/homePic.svg" alt="home picture" />
          <h1 className="text-2xl opacity-80">What do you want to do today?</h1>
          <p className="opacity-80">Tap + to add your tasks</p>
        </div>
      ) : (
        <div className="w-full h-full p-4 flex flex-col items-start  gap-4">
          <div className="search-container w-full h-fit flex items-center justify-center bg-input border-2 p-3 text-foreground rounded border-muted-foreground">
            <Search
              className="w-14 text-muted-foreground "
              onClick={() => document.getElementById("search").focus()}
            />
            <input
              type="text"
              id="search"
              placeholder="Search for your task..."
              className="w-full   placeholder:text-muted-foreground placeholder:opacity-50  border-0  bg-inherit outline-none"
            />
          </div>
          <div className="">
            <DropDownMenu
              text="Today"
              items={["Today", "Tomorrow", "Upcoming", "Completed"]}
            />
          </div>
          <div className="w-full flex flex-col gap-4">
            {tasks.map((task, index) => {
              return <TaskPreview task={task} key={index} />;
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
