import DropDownMenu from "@/components/DropDownMenu";
import Loading from "@/components/Loading";
import TaskPreview from "@/components/TaskPreview";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
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

const Home = () => {
  const tasks = useSelector((state) => state.tasks);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
    setFilteredTasks(tasks);
  }, [tasks]);
  const handleDragEnd = (e) => {
    const { active, over } = e;
    if (!over || active.id === over.id) return;

    const originalIndex = filteredTasks.findIndex(
      (task) => task.id === active.id
    );
    const newIndex = filteredTasks.findIndex((task) => task.id === over.id);

    const updatedTasks = arrayMove(filteredTasks, originalIndex, newIndex);
    setFilteredTasks(updatedTasks); // Update the state
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
          <div className="w-full h-full flex flex-col items-center justify-center gap-4 md:flex-wrap md:flex-row border ">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={filteredTasks}
              strategy={rectSortingStrategy}
            >
              {filteredTasks.map((task, index) => {
                return <TaskPreview task={task} key={index} index={index} />;
              })}
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
