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
    <div className="p-4 flex flex-col gap-4">
      <CalendarComponent
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
      />
      <div className="flex flex-col gap-4">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => <TaskPreview key={task.id} task={task} />)
        ) : (
          <p className="text-foreground text-center ">No tasks for today</p>
        )}
      </div>
    </div>
  );
};

export default Calendar;
