import DropDownMenu from "@/components/DropDownMenu";
import TaskPreview from "@/components/TaskPreview";
import { Search } from "lucide-react";
import {useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";

const Home = () => {
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();
  const search = useSelector((state) => state.search);
  const [filteredTasks, setFilteredTasks] = useState(tasks);
  const [activeTask, setActiveTask] = useState(null);
  const activeItem = useMemo(
    () => filteredTasks.find((item) => item.id === activeTask?.id),
    [activeTask, filteredTasks]
  );
  // Filtering logic
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

  const setSearch = (object) => {
    dispatch({ type: "SET_SEARCH", payload: object });
  };

  useEffect(() => {
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
    const orderedTasks = result.sort((a, b) => a.order - b.order);
    setFilteredTasks(orderedTasks);
  }, [
    HandleIsComplete,
    HandleSearchDate,
    search.date,
    search.isCompleted,
    search.title,
    tasks,
  ]);
  const onDrop = (e, targetTask) => {
    e.preventDefault();
    if (!activeItem || activeItem.id === targetTask.id) return;

    let newTasks = tasks.map((task) => {
      if (activeItem.order < targetTask.order) {
        //  Dragging DOWN (Task is moved DOWN)
        if (task.id === activeItem.id) {
          return { ...task, order: targetTask.order };
        }
        if (
          (task.order > activeItem.order && task.order < targetTask.order) ||
          task.id === targetTask.id
        ) {
          return { ...task, order: task.order - 1 };
        }
      } else if (activeItem.order > targetTask.order) {
        //  Dragging UP (Task is moved UP)
        if (task.id === activeItem.id) {
          return { ...task, order: targetTask.order };
        }
        if (
          (task.order < activeItem.order && task.order > targetTask.order) ||
          task.id === targetTask.id
        ) {
          return { ...task, order: task.order + 1 };
        }
      }
      return task;
    });
    newTasks = newTasks.sort((a, b) => a.order - b.order);
    dispatch({ type: "SET_TASKS", payload: newTasks });
    setActiveTask(null);
  };

  return (
    <div className="relative w-full">
      {tasks.length === 0 ? (
        <div className="w-full h-5/6 text-foreground flex flex-col justify-center items-center">
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
              className="w-full placeholder:text-muted-foreground placeholder:opacity-50 border-0 bg-inherit outline-none"
              onChange={(e) => setSearch({ title: e.target.value })}
              value={search.title}
            />
          </div>
          <div className="w-full flex gap-4 p-4">
            <DropDownMenu
              defaultValue={search.date || "All"}
              items={["Today", "Tomorrow", "Upcoming", "All"]}
              onChange={(item) =>
                setSearch({ date: item === "All" ? "" : item })
              }
            />
            <DropDownMenu
              defaultValue={search.isCompleted || "All"}
              items={["All", "UnCompleted", "Completed"]}
              onChange={(item) =>
                setSearch({
                  isCompleted: item === "All" ? "" : item,
                })
              }
            />
          </div>
          <div className="w-full h-full flex flex-col justify-center gap-4 items-stretch md:flex-wrap md:flex-row md:justify-start">
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
                  <p className="text-foreground text-center m-auto">
                    No tasks for the applied filters
                  </p>
                ) : (
                  filteredTasks.map((task, index) => (
                    <TaskPreview
                      task={task}
                      key={index}
                      index={index}
                      handle={true}
                    />
                  ))
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
