import CalendarComponent from "@/components/CalendarComponent";
import TaskPreview from "@/components/TaskPreview";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Calendar = () => {
  const tasks = useSelector((state) => state.tasks);
  const [selectedDay, setSelectedDay] = useState(dayjs());
  const [filteredTasks, setFilteredTasks] = useState([]);

  useEffect(() => {
    const filtered = tasks.filter((task) =>
      task.date.isSame(selectedDay, "day")
    );
    setFilteredTasks(filtered);
  }, [selectedDay, tasks]);

  return (
    <div className="p-4 flex flex-col gap-4 items-center  w-full">
      <div>
        <CalendarComponent
          selectedDay={selectedDay}
          setSelectedDay={setSelectedDay}
        />
      </div>
      <div className="flex flex-col gap-4 w-full  md:flex-row justify-center flex-wrap  md:justify-start ">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <TaskPreview
              key={task.id}
              task={task}
              className={"cursor-default"}
            />
          ))
        ) : (
          <p className="text-foreground text-center m-auto ">
            No tasks for the selected day
          </p>
        )}
      </div>
    </div>
  );
};

export default Calendar;
