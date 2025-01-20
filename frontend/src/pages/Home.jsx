import DropDownMenu from "@/components/DropDownMenu";
import Loading from "@/components/Loading";
import TaskPreview from "@/components/TaskPreview";
import { Search } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  closestCorners,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import dayjs from "dayjs";

const Home = () => {
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();
  const [search, setSearch] = useState({
    title: "",
    date: "Today",
    isCompleted: "",
  });
  const [loading, setLoading] = useState(true);
  // load tasks
  useEffect(() => {
    setLoading(false);
  }, [tasks]);

  // handle drag and drop section
  const handleDragEnd = (e) => {
    const { active, over } = e;
    if (!over || active.id === over.id) return;
    const originalIndex = tasks.findIndex((task) => task.id === active.id);
    const newIndex = tasks.findIndex((task) => task.id === over.id);
    const reorderedTasks = arrayMove(tasks, originalIndex, newIndex);
    dispatch({ type: "SET_TASKS_ORDER", payload: reorderedTasks });
  };
  const sensors = useSensors(
    useSensor(TouchSensor, {
      activationConstraint: {
        distance: 8,
        delay: 1000,
      },
    }),
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 8,
        delay: 1000,
      },
    }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  // handle filter section
  const HandleSearchDate = useCallback(
    (tasksToFilter) => {
      switch (search.date) {
        case "Today":
          return tasksToFilter.filter((task) =>
            task.date.isSame(dayjs(), "day")
          );
        case "Tomorrow":
          return tasksToFilter.filter((task) =>
            task.date.isSame(dayjs().add(1, "day"), "day")
          );
        case "Upcoming":
          return tasksToFilter.filter((task) =>
            task.date.isAfter(dayjs(), "day")
          );
        default:
          return tasksToFilter;
      }
    },
    [search.date]
  );
  const HandleIsComplete = useCallback(
    (tasksToFilter) => {
      switch (search.isCompleted) {
        case "Completed":
          return tasksToFilter.filter((task) => task.isCompleted === true);
        case "UnCompleted":
          return tasksToFilter.filter((task) => task.isCompleted === false);
        default:
          return tasksToFilter;
      }
    },
    [search.isCompleted]
  );
  const filteredTasks = useMemo(() => {
    let result = tasks;
    if (search.title) {
      result = result.filter((task) =>
        task.title.toLowerCase().includes(search.title.toLowerCase())
      );
    }
    if (search.date) {
      result = HandleSearchDate(result);
    }
    if (search.isCompleted) {
      result = HandleIsComplete(result);
    }
    return result;
  }, [
    HandleIsComplete,
    HandleSearchDate,
    search.date,
    search.isCompleted,
    search.title,
    tasks,
  ]);

  return (
    <div className="relative w-full">
      {loading ? (
        <Loading />
      ) : tasks.length === 0 ? (
        <div className="w-full h-5/6  text-foreground flex flex-col justify-center items-center">
          <img src="/homePic.svg" alt="home picture" />
          <h1 className="text-2xl opacity-80">What do you want to do today?</h1>
          <p className="opacity-80">Tap + to add your tasks</p>
        </div>
      ) : (
        <div className="w-full h-full p-4 flex flex-col items-start gap-4 ">
          <div className="search-container w-full h-fit flex items-center justify-center bg-input border-2 p-3 text-foreground rounded border-muted-foreground">
            <Search
              aria-label="Search for tasks"
              className="w-14 text-muted-foreground "
              onClick={() => document.getElementById("search").focus()}
            />
            <input
              type="text"
              id="search"
              placeholder="Search for your task..."
              className="w-full   placeholder:text-muted-foreground placeholder:opacity-50  border-0  bg-inherit outline-none"
              onChange={(e) =>
                setSearch((prev) => ({ ...prev, title: e.target.value }))
              }
              value={search.title}
            />
          </div>
          <div className="w-full flex gap-4 p-4">
            <DropDownMenu
              text="All"
              items={["Today", "Tomorrow", "Upcoming", "All"]}
              onChange={(item) =>
                setSearch({ ...search, date: item === "All" ? "" : item })
              }
            />
            <DropDownMenu
              text="Today"
              items={["All", "UnCompleted", "Completed"]}
              onChange={(item) =>
                setSearch({
                  ...search,
                  isCompleted: item === "All" ? "" : item,
                })
              }
            />
          </div>
          <div className="w-full h-full flex flex-col  justify-center gap-4 items-stretch  md:flex-wrap md:flex-row md:justify-start  ">
            <DndContext
              sensors={sensors}
              collisionDetection={closestCorners}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={filteredTasks}
                strategy={rectSortingStrategy}
              >
                {filteredTasks.length === 0 ? (
                  <p className="text-foreground text-center m-auto ">
                    No tasks for the applied filters
                  </p>
                ) : (
                  filteredTasks.map((task, index) => {
                    return (
                      <TaskPreview
                        task={task}
                        key={index}
                        index={index}
                        className={"cursor-grab active:cursor-grabbing"}
                      />
                    );
                  })
                )}
              </SortableContext>
              <DragOverlay></DragOverlay>
            </DndContext>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
